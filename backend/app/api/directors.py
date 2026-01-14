from flask_restx import Namespace, Resource, fields
from app.models import Director, Movie
from app.extensions import db

directors_ns = Namespace('Directors', description='Director related operations')

director_model = directors_ns.model('Director', {
    'id': fields.Integer(readOnly=True),
    'name': fields.String(required=True),
    'movies': fields.List(fields.String),
})

@directors_ns.route('/')
class DirectorList(Resource):

    @directors_ns.marshal_list_with(director_model)
    def get(self):
        directors = Director.query.all()
        result = []
        for d in directors:
            result.append({
                'id': d.id,
                'name': d.name,
                'movies': [m.title for m in d.movies]
            })
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
        return {
            'id': director.id,
            'name': director.name,
            'movies': [m.title for m in director.movies]
        }

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
