from flask import Blueprint, request, jsonify

auth_bp = Blueprint("auth", __name__, url_prefix="/auth")
users = set()  

@auth_bp.route("/login", methods=["POST"])
def login():
    username = request.json.get("username")
    if not username:
        return jsonify({"error": "Username required"}), 400

    users.add(username)
    return jsonify({"message": "Logged in", "username": username}), 200
