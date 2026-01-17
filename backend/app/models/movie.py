from app.extensions import db
from app.models.association import movie_actor, movie_genre

class Movie(db.Model):
    __tablename__ = "movies"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False, index=True)
    release_year = db.Column(db.Integer, nullable=False)
    rating = db.Column(db.Float)

    poster_url = db.Column(db.String(255))
    movie_poster_url=db.Column(db.String(255))
    director_id = db.Column(db.Integer, db.ForeignKey("directors.id"), nullable=False)

    director = db.relationship("Director", back_populates="movies")

    actors = db.relationship(
        "Actor",
        secondary=movie_actor,
        back_populates="movies"
    )

    genres = db.relationship(
        "Genre",
        secondary=movie_genre,
        back_populates="movies"
    )
    industry = db.Column(db.String(50))  # Hollywood, Bollywood, Tamil
    movie_description = db.Column(db.Text)
    def __repr__(self):
        return f"<Movie {self.title} ({self.release_year})>"
