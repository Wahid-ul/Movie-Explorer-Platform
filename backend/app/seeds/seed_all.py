# app/seeds/seed_all.py
from app.seeds.seed import seed_data
from app.seeds.seed_posters import seed_posters
from app.seeds.seed_movie_posters import seed_movie_posters
from app.seeds.seed_movie_descriptions import seed_movie_descriptions
from app.seeds.seed_actor_director_images import seed_actor_director_images

def seed_everything():
    seed_data()
    seed_posters()
    seed_movie_posters()
    seed_movie_descriptions()
    seed_actor_director_images()
