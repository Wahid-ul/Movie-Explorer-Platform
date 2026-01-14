from flask_restx import Namespace, Resource, fields, reqparse
from app.models import Actor, Movie, Genre
from app.extensions import db

actors_ns = Namespace('Actors', description='Actor related operations')

# Request parser for filtering
actor_filter_parser = reqparse.RequestParser()
actor_filter_parser.add_argument('movie', type=str)
actor_filter_parser.add_argument('genre', type=str)

# Response model
actor_model = actors_ns.model('Actor', {
    'id': fields.Integer(readOnly=True),
    'name': fields.String(required=True),
    'movies': fields.List(fields.String),
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
            result.append({
                'id': actor.id,
                'name': actor.name,
                'movies': [m.title for m in actor.movies]
            })
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
        return {
            'id': actor.id,
            'name': actor.name,
            'movies': [m.title for m in actor.movies]
        }

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
