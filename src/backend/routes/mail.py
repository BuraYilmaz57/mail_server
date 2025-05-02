from flask import Blueprint, request, jsonify
from datetime import datetime

mail_bp = Blueprint("mail", __name__, url_prefix="/mail")

messages = []

@mail_bp.route("/send", methods=["POST"])
def send():
    data = request.json
    required = ["from", "to", "subject", "body"]
    if not all(k in data for k in required):
        return jsonify({"error": "Missing fields"}), 400

    message = {
        "from": data["from"],
        "to": data["to"],
        "subject": data["subject"],
        "body": data["body"],
        "timestamp": datetime.utcnow().isoformat()
    }
    messages.append(message)
    return jsonify({"message": "Sent"}), 200

@mail_bp.route("/inbox/<username>", methods=["GET"])
def inbox(username):
    user_messages = [m for m in messages if m["to"] == username]
    return jsonify(user_messages), 200
