from flask_restx import Namespace, Resource, fields, reqparse
from app.models import Actor, Movie, Genre
from app.extensions import db

actors_ns = Namespace('Actors', description='Actor related operations')

# Request parser for filtering
actor_filter_parser = reqparse.RequestParser()
actor_filter_parser.add_argument('movie', type=str)
actor_filter_parser.add_argument('genre', type=str)

# Response model
movie_summary_model = actors_ns.model('MovieSummary', {
    'id': fields.Integer,
    'title': fields.String,
    'poster_url': fields.String,
    'movie_poster_url': fields.String,
    'rating': fields.Float,
    'release_year': fields.Integer
})

actor_model = actors_ns.model('Actor', {
    'id': fields.Integer(readOnly=True),
    'name': fields.String(required=True),
    'actor_hero_image_url': fields.String,
    'actor_cast_image_url': fields.String,
    'movies': fields.List(fields.Nested(movie_summary_model))
})



@actors_ns.route('/')
class ActorList(Resource):

    @actors_ns.expect(actor_filter_parser)
    @actors_ns.marshal_list_with(actor_model)
    def get(self):
        """List all actors, optionally filter by movie or genre"""
        args = actor_filter_parser.parse_args()
        query = Actor.query

        if args['movie']:
            query = query.join(Actor.movies).filter(Movie.title.ilike(f"%{args['movie']}%"))

        if args['genre']:
            query = query.join(Actor.movies).join(Movie.genres).filter(Genre.name.ilike(f"%{args['genre']}%"))

        actors = query.all()
        result = []
        for actor in actors:
            result.append(serialize_actor(actor))
        return result

    @actors_ns.expect(actor_model)
    @actors_ns.marshal_with(actor_model, code=201)
    def post(self):
        """Create a new actor"""
        data = actors_ns.payload
        actor = Actor(name=data['name'])
        db.session.add(actor)
        db.session.commit()
        return actor, 201


@actors_ns.route('/<int:id>')
class ActorResource(Resource):

    @actors_ns.marshal_with(actor_model)
    def get(self, id):
        actor = Actor.query.get_or_404(id)
        return serialize_actor(actor)
    
    def delete(self, id):
        actor = Actor.query.get_or_404(id)
        db.session.delete(actor)
        db.session.commit()
        return {'message': 'Actor deleted'}

    @actors_ns.expect(actor_model)
    @actors_ns.marshal_with(actor_model)
    def put(self, id):
        actor = Actor.query.get_or_404(id)
        data = actors_ns.payload
        actor.name = data['name']
        db.session.commit()
        return actor
def serialize_actor(actor):
    return {
        "id": actor.id,
        "name": actor.name,
        "actor_hero_image_url": actor.actor_hero_image_url,
        "actor_cast_image_url": actor.actor_cast_image_url,
        "movies": [
            {
                "id": m.id,
                "title": m.title,
                "poster_url": m.poster_url,
                "movie_poster_url": m.movie_poster_url,
                "rating": m.rating,
                "release_year": m.release_year,
            }
            for m in actor.movies
        ]
    }
