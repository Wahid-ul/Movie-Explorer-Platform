from flask_restx import Namespace, Resource, fields, reqparse
from app.models import Movie, Actor, Director, Genre
from app.extensions import db

movies_ns = Namespace('Movies', description='Movie related operations')

# ---------- Filters ----------
movie_filter_parser = reqparse.RequestParser()
movie_filter_parser.add_argument('genre', type=str)
movie_filter_parser.add_argument('actor', type=str)
movie_filter_parser.add_argument('director', type=str)
movie_filter_parser.add_argument('year', type=int)

# ---------- Swagger Models ----------

director_model = movies_ns.model('Director', {
    'id': fields.Integer,
    'name': fields.String,
    'director_hero_image_url': fields.String,
    'director_cast_image_url': fields.String
})

actor_model = movies_ns.model('Actor', {
    'id': fields.Integer,
    'name': fields.String,
    'actor_hero_image_url': fields.String,
    'actor_cast_image_url': fields.String
})


genre_model = movies_ns.model('Genre', {
    'id': fields.Integer,
    'name': fields.String
})

movie_model = movies_ns.model('Movie', {
    'id': fields.Integer(readOnly=True),
    'title': fields.String(required=True),
    'release_year': fields.Integer,
    'rating': fields.Float,
    'poster_url': fields.String,
    'movie_poster_url': fields.String,
    'director': fields.Nested(director_model),
    'actors': fields.List(fields.Nested(actor_model)),
    'genres': fields.List(fields.Nested(genre_model)),
    'industry': fields.String,
    'movie_description': fields.String
})

movie_create_model = movies_ns.model('MovieCreate', {
    'title': fields.String(required=True),
    'release_year': fields.Integer(required=True),
    'rating': fields.Float,
    'director_id': fields.Integer(required=True),
    'actor_ids': fields.List(fields.Integer),
    'genre_ids': fields.List(fields.Integer),
})


# ---------- Routes ----------
@movies_ns.route('/')
class MovieList(Resource):

    @movies_ns.expect(movie_filter_parser)
    @movies_ns.marshal_list_with(movie_model)
    def get(self):
        """List movies with filters"""
        args = movie_filter_parser.parse_args()
        query = Movie.query

        if args['genre']:
            query = query.join(Movie.genres).filter(Genre.name.ilike(f"%{args['genre']}%"))

        if args['actor']:
            query = query.join(Movie.actors).filter(Actor.name.ilike(f"%{args['actor']}%"))

        if args['director']:
            query = query.join(Movie.director).filter(Director.name.ilike(f"%{args['director']}%"))

        if args['year']:
            query = query.filter(Movie.release_year == args['year'])

        movies = query.distinct().all()   # <<< THIS FIX PREVENTS POSTGRES CRASH
        return [serialize_movie(m) for m in movies]

    @movies_ns.expect(movie_create_model)
    @movies_ns.marshal_with(movie_model, code=201)
    def post(self):
        """Create a new movie"""
        data = movies_ns.payload

        director = Director.query.get_or_404(data['director_id'])
        actors = Actor.query.filter(Actor.id.in_(data.get('actor_ids', []))).all()
        genres = Genre.query.filter(Genre.id.in_(data.get('genre_ids', []))).all()

        movie = Movie(
            title=data['title'],
            release_year=data['release_year'],
            rating=data.get('rating'),
            director=director,
            actors=actors,
            genres=genres
        )

        db.session.add(movie)
        db.session.commit()
        return serialize_movie(movie), 201


@movies_ns.route('/<int:id>')
class MovieResource(Resource):

    @movies_ns.marshal_with(movie_model)
    def get(self, id):
        movie = Movie.query.get_or_404(id)
        return serialize_movie(movie)

    def delete(self, id):
        movie = Movie.query.get_or_404(id)
        db.session.delete(movie)
        db.session.commit()
        return {'message': 'Movie deleted'}

    @movies_ns.expect(movie_create_model)
    @movies_ns.marshal_with(movie_model)
    def put(self, id):
        movie = Movie.query.get_or_404(id)
        data = movies_ns.payload

        movie.title = data['title']
        movie.release_year = data['release_year']
        movie.rating = data.get('rating')
        movie.director = Director.query.get_or_404(data['director_id'])
        movie.actors = Actor.query.filter(Actor.id.in_(data.get('actor_ids', []))).all()
        movie.genres = Genre.query.filter(Genre.id.in_(data.get('genre_ids', []))).all()

        db.session.commit()
        return serialize_movie(movie)


# ---------- Helper ----------
def serialize_movie(movie):
    return {
        'id': movie.id,
        'title': movie.title,
        'release_year': movie.release_year,
        'rating': movie.rating,
        'poster_url': movie.poster_url,
        'movie_poster_url': movie.movie_poster_url,
        'director': {
            'id': movie.director.id,
            'name': movie.director.name,
            'director_hero_image_url': movie.director.director_hero_image_url,
            'director_cast_image_url': movie.director.director_cast_image_url
        } if movie.director else None,
        'actors': [
            {'id': a.id, 'name': a.name, 'actor_hero_image_url': a.actor_hero_image_url, 'actor_cast_image_url': a.actor_cast_image_url} for a in movie.actors
        ],
        'genres': [
            {'id': g.id, 'name': g.name} for g in movie.genres
        ],
        'industry': movie.industry,
        'movie_description': movie.movie_description
    }