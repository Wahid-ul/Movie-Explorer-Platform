from flask import Flask
from app.extensions import db, migrate, api
from app.config import Config

from app.api.movies import movies_ns
from app.api.actors import actors_ns
from app.api.directors import directors_ns
from app.api.genres import genres_ns


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)
    api.init_app(app)

    # Register Swagger Namespaces
    api.add_namespace(movies_ns, path='/movies')
    api.add_namespace(actors_ns, path='/actors')
    api.add_namespace(directors_ns, path='/directors')
    api.add_namespace(genres_ns, path='/genres')

    return app
