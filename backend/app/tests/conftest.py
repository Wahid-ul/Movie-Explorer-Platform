import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base, Director, Actor, Genre, Movie

# In-memory SQLite database for tests
@pytest.fixture(scope="session")
def engine():
    return create_engine("sqlite:///:memory:", echo=False)

@pytest.fixture(scope="session")
def tables(engine):
    Base.metadata.create_all(engine)
    yield
    Base.metadata.drop_all(engine)

@pytest.fixture
def session(engine, tables):
    """Creates a new session for a test."""
    connection = engine.connect()
    transaction = connection.begin()
    Session = sessionmaker(bind=connection)
    session = Session()
    yield session
    session.close()
    transaction.rollback()
    connection.close()

@pytest.fixture
def sample_data(session):
    """Insert sample data for tests."""
    # Directors
    director1 = Director(name="Christopher Nolan")
    director2 = Director(name="Quentin Tarantino")
    session.add_all([director1, director2])
    session.commit()

    # Actors
    actor1 = Actor(name="Leonardo DiCaprio")
    actor2 = Actor(name="Brad Pitt")
    session.add_all([actor1, actor2])
    session.commit()

    # Genres
    genre1 = Genre(name="Sci-Fi")
    genre2 = Genre(name="Action")
    session.add_all([genre1, genre2])
    session.commit()

    # Movies
    movie1 = Movie(title="Inception", release_year=2010, rating=8.8, director=director1)
    movie2 = Movie(title="Once Upon a Time in Hollywood", release_year=2019, rating=7.6, director=director2)
    session.add_all([movie1, movie2])
    session.commit()

    return {
        "directors": [director1, director2],
        "actors": [actor1, actor2],
        "genres": [genre1, genre2],
        "movies": [movie1, movie2],
    }
