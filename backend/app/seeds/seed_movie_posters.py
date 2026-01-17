from app.extensions import db
from app.models import Movie

def seed_movie_posters():
    print("Seeding movie poster URLs...")

    for movie in Movie.query.all():
        filename = (
            movie.title.lower()
            .replace(" ", "_")
            .replace("!", "")
            .replace(":", "")
            .replace(".", "")
            + "_movie_poster.jpg"
        )

        movie.movie_poster_url = f"/static/movie_posters/{filename}"

    db.session.commit()
    print("Movie poster URLs updated successfully!")