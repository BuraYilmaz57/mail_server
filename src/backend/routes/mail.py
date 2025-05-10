from flask import Blueprint, request, jsonify
from datetime import datetime
import sqlite3


mail_bp = Blueprint("mail", __name__, url_prefix="/mail")

messages = []

@mail_bp.route("/send", methods=["POST"])
def send():
    data = request.json
    required = ["from", "to", "subject", "body"]
    if not all(k in data for k in required):
        return jsonify({"error": "Missing fields"}), 400

    timestamp = datetime.utcnow().isoformat()
    
    try:
        with sqlite3.connect("users.db") as connection:
            cursor = connection.cursor()
            cursor.execute("""
                INSERT INTO Emails (from_user, to_user, subject, body, timestamp)
                VALUES (?, ?, ?, ?, ?)
            """, (data["from"], data["to"], data["subject"], data["body"], timestamp))
            connection.commit()
        return jsonify({"message": "Sent"}), 200
    except Exception as e:
        print(f"[ERROR] Failed to save email: {e}")
        return jsonify({"error": "Failed to send email"}), 500


@mail_bp.route("/inbox/<username>", methods=["GET"])
def inbox(username):
    try:
        with sqlite3.connect("users.db") as connection:
            cursor = connection.cursor()
            cursor.execute("""
                SELECT id, from_user, subject, body, timestamp
                FROM Emails
                WHERE to_user = ?
                ORDER BY timestamp DESC
            """, (username,))
            emails = cursor.fetchall()
            email_list = [
                {
                    "id": row[0],
                    "from": row[1],
                    "subject": row[2],
                    "body": row[3],
                    "timestamp": row[4]
                }
                for row in emails
            ]
        return jsonify(email_list), 200
    except Exception as e:
        print(f"[ERROR] Failed to fetch inbox: {e}")
        return jsonify({"error": "Failed to load inbox"}), 500
    
@mail_bp.route("/sent/<username>", methods=["GET"])
def sent(username):
    try:
        with sqlite3.connect("users.db") as connection:
            cursor = connection.cursor()
            cursor.execute("""
                SELECT id, from_user, subject, body, timestamp
                FROM Emails
                WHERE from_user = ?
                ORDER BY timestamp DESC
            """, (username,))
            emails = cursor.fetchall()
            email_list = [
                {
                    "id": row[0],
                    "from": row[1],
                    "subject": row[2],
                    "body": row[3],
                    "timestamp": row[4]
                }
                for row in emails
            ]
        return jsonify(email_list), 200
    except Exception as e:
        print(f"[ERROR] Failed to fetch inbox: {e}")
        return jsonify({"error": "Failed to load inbox"}), 500

@mail_bp.route("/delete/<id>", methods=["DELETE"])
def delete_email(id):
    try:
        with sqlite3.connect("users.db") as connection:
            cursor = connection.cursor()
            cursor.execute("DELETE FROM Emails WHERE id = ?", (id))
            connection.commit()
            if cursor.rowcount == 0:
                return jsonify({"error": "Email not found"}), 404
        return jsonify({"message": "Email deleted"}), 200
    except Exception as e:
        print(f"[ERROR] Failed to delete email: {e}")
        return jsonify({"error": "Failed to delete email"}), 500