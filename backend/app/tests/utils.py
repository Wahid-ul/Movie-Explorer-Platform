from app.models import Movie, Director, Actor, Genre


def seed_test_data(session):
    # Genres
    action = session.query(Genre).filter_by(name="Action").first()
    if not action:
        action = Genre(name="Action")
        session.add(action)

    drama = session.query(Genre).filter_by(name="Drama").first()
    if not drama:
        drama = Genre(name="Drama")
        session.add(drama)

    # Director
    nolan = session.query(Director).filter_by(name="Christopher Nolan").first()
    if not nolan:
        nolan = Director(name="Christopher Nolan")
        session.add(nolan)

    # Actor
    dicaprio = session.query(Actor).filter_by(name="Leonardo DiCaprio").first()
    if not dicaprio:
        dicaprio = Actor(name="Leonardo DiCaprio")
        session.add(dicaprio)

    session.flush()  # IMPORTANT

    # Movie
    inception = session.query(Movie).filter_by(title="Inception").first()
    if not inception:
        inception = Movie(
            title="Inception",
            release_year=2010,
            rating=8.8,
            director=nolan,
            actors=[dicaprio],
            genres=[action, drama],
            industry="Hollywood",
        )
        session.add(inception)

    session.commit()
