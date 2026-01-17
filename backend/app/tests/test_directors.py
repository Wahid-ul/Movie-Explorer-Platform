from app.models import Director
from app.tests.utils import seed_test_data


def test_get_director(session):
    seed_test_data(session)

    director = Director.query.first()
    assert director.name == "Christopher Nolan"


def test_director_movies(session):
    seed_test_data(session)

    director = Director.query.first()
    assert director.movies.count() == 1
