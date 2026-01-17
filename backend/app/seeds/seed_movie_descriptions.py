from app.extensions import db
from app.models import Movie

def seed_movie_descriptions():
    print("Seeding movie descriptions...")

    # Descriptions for Hollywood Movies
    inception_desc = (
        "A thief who steals corporate secrets through the use of dream-sharing technology is given "
        "the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may "
        "doom the project and his team to disaster."
    )   
    dark_knight_desc = (
        "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and "
        "chaos on the people of Gotham. The Dark Knight must accept one of the greatest psychological "
        "and physical tests of his ability to fight injustice."
    )
    saving_private_ryan_desc = (
        "Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a "
        "paratrooper whose brothers have been killed in action."
    )   
    # Descriptions for Bollywood Movies
    three_idiots_desc = (
        "Two friends are searching for their long lost friend, who has been missing for years."
    )   
    bahubali_desc = (
        "In ancient India, an adventurous man learns about his royal heritage and must reclaim his "
        "kingdom from a treacherous usurper."   
    )
    bahubali_2_desc = (
        "The sequel continues the story of Baahubali, revealing the events that led to his mother's "
        "sacrifice and his rise to power."
    )
    pk_desc = (
        "An alien on Earth loses the only device he can use to communicate with his spaceship. "
        "He befriends a human who helps him find it."
    )
    # Descriptions for South Indian Movies
    
    rrr_desc = (
        "In pre-independent India, two revolutionaries from different regions fight against the "
        "British Raj and their own personal struggles."
    )
    chak_de_desc = (
        "A disgraced hockey player coaches a women's hockey team and helps them win a national championship."
    )
    # Mapping movie titles to their descriptions
    descriptions = {
        "Inception": inception_desc,
        "The Dark Knight": dark_knight_desc,
        "Saving Private Ryan": saving_private_ryan_desc,
        "3 Idiots": three_idiots_desc,
        "Baahubali: The Beginning": bahubali_desc,
        "Baahubali 2: The Conclusion": bahubali_2_desc,
        "PK": pk_desc,
        "RRR": rrr_desc,
        "Chak De! India": chak_de_desc
    }
    for movie in Movie.query.all():
        if movie.title in descriptions:
            movie.movie_description = descriptions[movie.title]
    
    db.session.commit()
    print("Movie descriptions updated successfully!")