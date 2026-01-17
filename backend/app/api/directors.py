from flask_restx import Namespace, Resource, fields
from app.models import Director, Movie
from app.extensions import db

directors_ns = Namespace('Directors', description='Director related operations')

# ---------- Swagger Models ----------
movie_summary_model = directors_ns.model('MovieSummary', {
    'id': fields.Integer,
    'title': fields.String,
    'poster_url': fields.String,
    'movie_poster_url': fields.String,
    'rating': fields.Float,
    'release_year': fields.Integer
})
director_model = directors_ns.model('Director', {
    'id': fields.Integer(readOnly=True),
    'name': fields.String(required=True),
    'movies': fields.List(fields.Nested(movie_summary_model)),
    'director_hero_image_url': fields.String,
    'director_cast_image_url': fields.String
})

@directors_ns.route('/')
class DirectorList(Resource):

    @directors_ns.marshal_list_with(director_model)
    def get(self):
        directors = Director.query.all()
        result = []
        for d in directors:
            result.append(serialize_director(d))
        return result

    @directors_ns.expect(director_model)
    @directors_ns.marshal_with(director_model, code=201)
    def post(self):
        data = directors_ns.payload
        director = Director(name=data['name'])
        db.session.add(director)
        db.session.commit()
        return director, 201


@directors_ns.route('/<int:id>')
class DirectorResource(Resource):

    @directors_ns.marshal_with(director_model)
    def get(self, id):
        director = Director.query.get_or_404(id)
        return serialize_director(director)

    def delete(self, id):
        director = Director.query.get_or_404(id)
        db.session.delete(director)
        db.session.commit()
        return {'message': 'Director deleted'}

    @directors_ns.expect(director_model)
    @directors_ns.marshal_with(director_model)
    def put(self, id):
        director = Director.query.get_or_404(id)
        data = directors_ns.payload
        director.name = data['name']
        db.session.commit()
        return director


# ---------- Helper ----------
def serialize_director(director):
    return {
        'id': director.id,
        'name': director.name,
        'director_hero_image_url': director.director_hero_image_url,
        'director_cast_image_url': director.director_cast_image_url,
        "movies": [
            {
                "id": m.id,
                "title": m.title,
                "poster_url": m.poster_url,
                "movie_poster_url": m.movie_poster_url,
                "rating": m.rating,
                "release_year": m.release_year,
            }
            for m in director.movies
        ]
    }   