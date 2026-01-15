from app.extensions import db
from app.models import Movie

def seed_posters():
    print("Seeding poster URLs...")

    for movie in Movie.query.all():
        filename = (
            movie.title.lower()
            .replace(" ", "_")
            .replace("!", "")
            .replace(":", "")
            .replace(".", "")
            + ".jpg"
        )

        movie.poster_url = f"/static/posters/{filename}"

    db.session.commit()
    print("Poster URLs updated successfully!")
