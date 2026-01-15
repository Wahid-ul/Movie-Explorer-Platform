from models import Movie, Genre, Actor

def test_create_movie(session, sample_data):
    director = sample_data["directors"][0]
    movie = Movie(title="Interstellar", release_year=2014, rating=8.6, director=director)
    session.add(movie)
    session.commit()
    assert movie.id is not None

def test_get_movies(session, sample_data):
    movies = session.query(Movie).all()
    assert len(movies) == 2

def test_movie_genres(session, sample_data):
    movie = sample_data["movies"][0]
    genre = sample_data["genres"][0]
    movie.genres.append(genre)
    session.commit()
    movies = session.query(Movie).filter(Movie.genres.any(id=genre.id)).all()
    assert movies[0].title == "Inception"

def test_movie_actors(session, sample_data):
    movie = sample_data["movies"][0]
    actor = sample_data["actors"][0]
    movie.actors.append(actor)
    session.commit()
    movies = session.query(Movie).filter(Movie.actors.any(id=actor.id)).all()
    assert movies[0].title == "Inception"
