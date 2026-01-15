from models import Director, Movie

def test_create_director(session):
    new_director = Director(name="Steven Spielberg")
    session.add(new_director)
    session.commit()
    assert new_director.id is not None

def test_get_director(session, sample_data):
    director = sample_data["directors"][0]
    result = session.query(Director).filter_by(id=director.id).first()
    assert result.name == "Christopher Nolan"

def test_update_director(session, sample_data):
    director = sample_data["directors"][0]
    director.name = "C. Nolan"
    session.commit()
    updated = session.query(Director).get(director.id)
    assert updated.name == "C. Nolan"

def test_delete_director(session, sample_data):
    director = sample_data["directors"][1]
    session.delete(director)
    session.commit()
    result = session.query(Director).filter_by(id=director.id).first()
    assert result is None

def test_director_movies(session, sample_data):
    director = sample_data["directors"][0]
    movies = session.query(Movie).filter_by(director_id=director.id).all()
    assert len(movies) > 0
    assert movies[0].title == "Inception"
