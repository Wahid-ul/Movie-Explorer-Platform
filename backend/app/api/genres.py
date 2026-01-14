from flask_restx import Namespace, Resource, fields
from app.models import Genre, Movie
from app.extensions import db

genres_ns = Namespace('Genres', description='Genre related operations')

genre_model = genres_ns.model('Genre', {
    'id': fields.Integer(readOnly=True),
    'name': fields.String(required=True),
    'movies': fields.List(fields.String),
})

@genres_ns.route('/')
class GenreList(Resource):

    @genres_ns.marshal_list_with(genre_model)
    def get(self):
        genres = Genre.query.all()
        result = []
        for g in genres:
            result.append({
                'id': g.id,
                'name': g.name,
                'movies': [m.title for m in g.movies]
            })
        return result

    @genres_ns.expect(genre_model)
    @genres_ns.marshal_with(genre_model, code=201)
    def post(self):
        data = genres_ns.payload
        genre = Genre(name=data['name'])
        db.session.add(genre)
        db.session.commit()
        return genre, 201


@genres_ns.route('/<int:id>')
class GenreResource(Resource):

    @genres_ns.marshal_with(genre_model)
    def get(self, id):
        genre = Genre.query.get_or_404(id)
        return {
            'id': genre.id,
            'name': genre.name,
            'movies': [m.title for m in genre.movies]
        }

    def delete(self, id):
        genre = Genre.query.get_or_404(id)
        db.session.delete(genre)
        db.session.commit()
        return {'message': 'Genre deleted'}

    @genres_ns.expect(genre_model)
    @genres_ns.marshal_with(genre_model)
    def put(self, id):
        genre = Genre.query.get_or_404(id)
        data = genres_ns.payload
        genre.name = data['name']
        db.session.commit()
        return genre
