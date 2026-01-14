from app.extensions import db
from app.models.association import movie_genre

class Genre(db.Model):
    __tablename__ = "genres"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)

    movies = db.relationship(
        "Movie",
        secondary=movie_genre,
        back_populates="genres"
    )

    def __repr__(self):
        return f"<Genre {self.name}>"
