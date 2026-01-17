from app.extensions import db
from app.models import Actor, Director 

def seed_actor_director_images():
    print("Seeding actor and director image URLs...")

    for actor in Actor.query.all():
        hero_filename = (
            actor.name.lower()
            .replace(" ", "_")
            .replace("!", "")
            .replace(":", "")
            .replace(".", "")
            + "_hero.jpg"
        )
        cast_filename = (
            actor.name.lower()
            .replace(" ", "_")
            .replace("!", "")
            .replace(":", "")
            .replace(".", "")
            + "_cast.jpg"
        )

        actor.actor_hero_image_url = f"/static/actor_images/{hero_filename}"
        actor.actor_cast_image_url = f"/static/actor_images/{cast_filename}"

    for director in Director.query.all():
        hero_filename = (
            director.name.lower()
            .replace(" ", "_")
            .replace("!", "")
            .replace(":", "")
            .replace(".", "")
            + "_hero.jpg"
        )
        cast_filename = (
            director.name.lower()
            .replace(" ", "_")
            .replace("!", "")
            .replace(":", "")
            .replace(".", "")
            + "_cast.jpg"
        )

        director.director_hero_image_url = f"/static/director_images/{hero_filename}"
        director.director_cast_image_url = f"/static/director_images/{cast_filename}"

    db.session.commit()
    print("Actor and director image URLs updated successfully!")
