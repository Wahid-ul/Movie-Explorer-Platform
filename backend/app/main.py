from flask import Flask
from app.extensions import db, migrate, api
from app.config import Config

from app.api.movies import movies_ns
from app.api.actors import actors_ns
from app.api.directors import directors_ns
from app.api.genres import genres_ns
from flask_cors import CORS


def create_app():
    app = Flask(__name__)

    CORS(app)
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)
    api.init_app(app)

    # Register Swagger Namespaces
    api.add_namespace(movies_ns, path='/api/movies')
    api.add_namespace(actors_ns, path='/api/actors')
    api.add_namespace(directors_ns, path='/api/directors')
    api.add_namespace(genres_ns, path='/api/genres')

    return app
