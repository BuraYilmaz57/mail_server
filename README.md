# Mail Server

## Description
A lightweight mail server backend built with **Flask, ReactJS, TailwindCSS, and SQLite**, providing user authentication and email functionalities. Designed to support simple frontends for login, registration, and message exchange.

---

## Features

- ✅ User Registration & Login
- ✉️ Send and receive emails (internally)
- 🔐 Password hashing with Werkzeug
- 📦 RESTful API structure using Flask Blueprints
- 🗃️ SQLite for local database storage
- 🧪 GitHub Actions CI Workflow

---

## Project Structure

```
src/backend/
├── app.py              # Entry point for the Flask app
├── db.py               # Database connection & schema
├── routes/
│   ├── auth.py         # Auth routes (register, login)
│   └── mail.py         # Mail routes (send, receive)
├── requirements.txt    # Python dependencies
└── users.db            # SQLite database
```

---

## Setup & Installation

```
git clone https://github.com/BuraYilmaz57/mail_server.git
cd mail_server
```

- Install Required Dependencies for Backend:
```
cd src/backend
pip install -r requirements.txt
```

- Install Required Dependencies for Frontend:
```
cd src/frontend/src
npm install
npm run start
```

- Start the Bakcend
```
cd backend
python app.py
```

- Start the Frontend
```
cd frontend/src
npm start
```
---

## API Endpoints

### Authentication (`/auth`)
- `POST /auth/register`: Register a new user
- `POST /auth/login`: Log in with existing credentials

### Mail (`/mail`)
- `POST /mail/send`: Send an email to another user
- `GET /mail/inbox/<username>`: Fetch inbox messages
- `GET /mail/sent/<username>`: Fetch sent messages

---

## Testing

Basic CI is set up using **GitHub Actions** under `.github/workflows/ci.yml`. You can expand this workflow to include linters, unit tests, etc.

---

## License

MIT License. See [`LICENSE`](LICENSE) for details.

---

## Contributing

Pull requests are welcome! Please open an issue first to discuss your ideas.

---

## Authors
- [Burak Yilmaz](https://github.com/BuraYilmaz57)
- [Bektas Kaan Yilmaz](https://github.com/ybektaskaan)

---

## Roadmap:
- ~~Sending/recieving mails.~~
- ~~Mail inbox.~~
- ~~Mail composition pop up.~~
- ~~Mail inbox view.~~
- ~~User database with login/register.~~
- ~~Password encryption.~~
- ~~Sent mail view.~~
- ~~Deleting mails.~~
- Tag/category system (current development phase).
- Dark mode and customizable theme selector (current development phase).
- Profile customization.
- Mail attachments (image, video, sound, etc.)
- CC/BCC implementation.
- STMP implementation.
- Full web deployment.

---

## Notes
This project is currently **under active development**, most of the stuff are being **actively changed**.

There are 2 testing/example accounts on the database: alice (password: test), and bob (password: test).
