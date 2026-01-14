from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restx import Api

db = SQLAlchemy()
migrate = Migrate()

api = Api(
    title="Movie Explorer API",
    version="1.0",
    description="Explore Movies, Actors, Directors and Genres",
    doc="/api/docs" 
)
