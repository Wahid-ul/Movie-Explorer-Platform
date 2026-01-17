from app.models import Genre
from app.tests.utils import seed_test_data


def test_get_genre(session):
    seed_test_data(session)

    genre = Genre.query.filter_by(name="Action").first()
    assert genre is not None


def test_genre_movies(session):
    seed_test_data(session)

    genre = Genre.query.first()
    assert len(genre.movies) == 1
