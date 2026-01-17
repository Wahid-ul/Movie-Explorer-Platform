from app.extensions import db

class Director(db.Model):
    __tablename__ = "directors"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False, unique=True)
    bio = db.Column(db.Text)
    director_hero_image_url = db.Column(db.String(255))
    director_cast_image_url = db.Column(db.String(255))

    movies = db.relationship("Movie", back_populates="director", lazy="dynamic")

    def __repr__(self):
        return f"<Director {self.name}>"
