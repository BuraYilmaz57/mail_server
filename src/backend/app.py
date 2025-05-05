from flask import Flask
from routes.auth import auth_bp
from routes.mail import mail_bp
from flask_cors import CORS

from db import init_db

app = Flask(__name__)
CORS(app)

init_db()

app.register_blueprint(auth_bp)
app.register_blueprint(mail_bp)

if __name__ == "__main__":
    app.run(port=5010)
