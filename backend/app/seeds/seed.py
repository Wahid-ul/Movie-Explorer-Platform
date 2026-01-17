from app.extensions import db
from app.models import Movie, Actor, Director, Genre

def seed_data():
    db.drop_all()
    db.create_all()

    # Genres
    action = Genre(name="Action")
    drama = Genre(name="Drama")
    scifi = Genre(name="Sci-Fi")
    comedy = Genre(name="Comedy")
    romance = Genre(name="Romance")
    thriller = Genre(name="Thriller")

    # Hollywood Directors
    nolan = Director(name="Christopher Nolan")
    spielberg = Director(name="Steven Spielberg")

    # Bollywood Directors
    rajkumar_hirani = Director(name="Rajkumar Hirani")
    ss_rajamouli = Director(name="S. S. Rajamouli")

    # Hollywood Actors
    dicaprio = Actor(name="Leonardo DiCaprio")
    bale = Actor(name="Christian Bale")
    hardy = Actor(name="Tom Hardy")
    hanks = Actor(name="Tom Hanks")

    # Bollywood Actors
    aamir = Actor(name="Aamir Khan")
    srk = Actor(name="Shah Rukh Khan")
    deepika = Actor(name="Deepika Padukone")
    prabhas = Actor(name="Prabhas")
    rana = Actor(name="Rana Daggubati")

    # Hollywood Movies
    inception = Movie(
        title="Inception",
        release_year=2010,
        rating=8.8,
        director=nolan,
        actors=[dicaprio, hardy],
        genres=[scifi, action, thriller],
        industry="Hollywood"
    )

    dark_knight = Movie(
        title="The Dark Knight",
        release_year=2008,
        rating=9.0,
        director=nolan,
        actors=[bale, hardy],
        genres=[action, drama, thriller],
        industry="Hollywood"
    )

    saving_private_ryan = Movie(
        title="Saving Private Ryan",
        release_year=1998,
        rating=8.6,
        director=spielberg,
        actors=[hanks],
        genres=[drama, action],
        industry="Hollywood"
    )

    # Bollywood Movies
    three_idiots = Movie(
        title="3 Idiots",
        release_year=2009,
        rating=8.4,
        director=rajkumar_hirani,
        actors=[aamir],
        genres=[comedy, drama],
        industry="Bollywood"
    )

    pk = Movie(
        title="PK",
        release_year=2014,
        rating=8.1,
        director=rajkumar_hirani,
        actors=[aamir],
        genres=[comedy, drama, scifi],
        industry="Bollywood"
    )

    chak_de = Movie(
        title="Chak De! India",
        release_year=2007,
        rating=8.2,
        director=rajkumar_hirani,
        actors=[srk],
        genres=[drama],
        industry="Bollywood"
    )

    # South Indian Movies
    bahubali = Movie(
        title="Baahubali: The Beginning",
        release_year=2015,
        rating=8.0,
        director=ss_rajamouli,
        actors=[prabhas, rana],
        genres=[action, drama],
        industry="Tamil"
    )

    bahubali2 = Movie(
        title="Baahubali 2: The Conclusion",
        release_year=2017,
        rating=8.2,
        director=ss_rajamouli,
        actors=[prabhas, rana],
        genres=[action, drama, romance],
        industry="Tamil"
    )

    rrr = Movie(
        title="RRR",
        release_year=2022,
        rating=8.0,
        director=ss_rajamouli,
        actors=[prabhas],
        genres=[action, drama, thriller],
        industry="Tamil"
    )

    db.session.add_all([
        action, drama, scifi, comedy, romance, thriller,
        nolan, spielberg, rajkumar_hirani, ss_rajamouli,
        dicaprio, bale, hardy, hanks,
        aamir, srk, deepika, prabhas, rana,
        inception, dark_knight, saving_private_ryan,
        three_idiots, pk, chak_de,
        bahubali, bahubali2, rrr
    ])

    db.session.commit()
    print("Database seeded with Hollywood, Bollywood, and South Indian movies successfully!")
