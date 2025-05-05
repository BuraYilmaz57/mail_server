from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import sqlite3

auth_bp = Blueprint("auth", __name__, url_prefix="/auth")

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data.get('username')
    raw_password = data.get('password')
    hashed_password = generate_password_hash(raw_password)

    try:
        with sqlite3.connect("users.db") as connection:
            cursor = connection.cursor()
            cursor.execute("INSERT INTO users (username, password) VALUES (?, ?)",
                           (username, hashed_password))
            connection.commit()
        return jsonify({"message": "Registration successful"}), 201
    except sqlite3.IntegrityError as e:
        print(f"\n[ERROR] Registration failed: Username '{username}' already exists.")
        return jsonify({"message": "Username already exists"}), 409


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    try:
        with sqlite3.connect("users.db") as connection:
            cursor = connection.cursor()
            cursor.execute("SELECT password FROM users WHERE username = ?", (username,))
            row = cursor.fetchone()
            if row and check_password_hash(row[0], password):
                return jsonify({"message": "Login successful!"}), 200
            else:
                print(f"\n[ERROR] Login failed: Invalid password.")
                return jsonify({"message": "Invalid password"}), 401
    except sqlite3.IntegrityError as e:
        print(f"\n[ERROR] Login failed: Invalid username.")
        return jsonify({"message": "Invalid username or password"}), 401
