from models import Genre, Movie

def test_create_genre(session):
    genre = Genre(name="Comedy")
    session.add(genre)
    session.commit()
    assert genre.id is not None

def test_get_genre(session, sample_data):
    genre = sample_data["genres"][0]
    result = session.query(Genre).filter_by(id=genre.id).first()
    assert result.name == "Sci-Fi"

def test_genre_movies(session, sample_data):
    genre = sample_data["genres"][0]
    movie = sample_data["movies"][0]
    movie.genres.append(genre)
    session.commit()
    movies = session.query(Movie).filter(Movie.genres.any(id=genre.id)).all()
    assert movies[0].title == "Inception"
