from app.extensions import db
from seeds.seed import seed_data
from seeds.seed_posters import seed_posters
from seeds.seed_movie_posters import seed_movie_posters
from seeds.seed_movie_descriptions import seed_movie_descriptions
from seeds.seed_actor_director_images import seed_actor_director_images

def run_all_seeds():
    print("Starting full database seeding...")

    seed_data()
    seed_posters()
    seed_movie_posters()
    seed_movie_descriptions()
    seed_actor_director_images()

    print("All data seeded successfully!")
