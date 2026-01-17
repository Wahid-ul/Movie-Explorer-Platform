from app.models import Actor


def test_get_actor(seeded_db):
    actor = Actor.query.filter_by(name="Leonardo DiCaprio").first()
    assert actor is not None


def test_actor_movies(seeded_db):
    actor = Actor.query.first()
    assert len(actor.movies) == 1
