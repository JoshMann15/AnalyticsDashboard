
import os

class Config:
    DEBUG = os.environ.get("FLASK_DEBUG", "False").lower() in ["true", "1", "t"]
    SECRET_KEY = os.environ.get("SECRET_KEY", "your-secret-key")

