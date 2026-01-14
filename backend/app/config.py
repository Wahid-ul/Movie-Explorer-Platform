import os
from dotenv import load_dotenv

load_dotenv()  # Load .env file

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    RESTX_MASK_SWAGGER = False
    ERROR_404_HELP = False
