from models import Actor, Movie

def test_create_actor(session):
    actor = Actor(name="Tom Hanks")
    session.add(actor)
    session.commit()
    assert actor.id is not None

def test_get_actor(session, sample_data):
    actor = sample_data["actors"][0]
    result = session.query(Actor).filter_by(id=actor.id).first()
    assert result.name == "Leonardo DiCaprio"

def test_actor_movies(session, sample_data):
    actor = sample_data["actors"][0]
    movie = sample_data["movies"][0]
    movie.actors.append(actor)
    session.commit()
    movies = session.query(Movie).filter(Movie.actors.any(id=actor.id)).all()
    assert movies[0].title == "Inception"
