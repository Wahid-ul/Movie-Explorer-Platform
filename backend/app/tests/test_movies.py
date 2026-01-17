from app.models import Movie
from app.tests.utils import seed_test_data


def test_get_movies(session):
    seed_test_data(session)

    movies = Movie.query.all()
    assert len(movies) == 1


def test_movie_details(session):
    seed_test_data(session)

    movie = Movie.query.first()
    assert movie.title == "Inception"


def test_movie_actors(session):
    seed_test_data(session)

    movie = Movie.query.first()
    assert len(movie.actors) == 1


def test_movie_genres(session):
    seed_test_data(session)

    movie = Movie.query.first()
    assert len(movie.genres) == 2
