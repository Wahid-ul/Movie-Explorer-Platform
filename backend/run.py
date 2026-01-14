from app.main import create_app
from app.seed import seed_data

app = create_app()

@app.cli.command("seed")
def seed():
    """Seed the database with sample data"""
    seed_data()
