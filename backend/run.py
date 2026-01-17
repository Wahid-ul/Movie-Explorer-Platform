from app.main import create_app
from app.seeds.seed_all import seed_everything

app = create_app()

@app.cli.command("seed")
def seed():
    """Seed the entire database with sample data"""
    seed_everything()
