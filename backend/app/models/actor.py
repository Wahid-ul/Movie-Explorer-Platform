from app.extensions import db
from app.models.association import movie_actor

class Actor(db.Model):
    __tablename__ = "actors"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False, unique=True)
    bio = db.Column(db.Text)
    actor_hero_image_url = db.Column(db.String(255))
    actor_cast_image_url = db.Column(db.String(255))

    movies = db.relationship(
        "Movie",
        secondary=movie_actor,
        back_populates="actors"
    )

    def __repr__(self):
        return f"<Actor {self.name}>"
