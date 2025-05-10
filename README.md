## Description
This is a React based email project, which the users can currently log in, register as a user (stored in our database where passwords are encrypted), send/recieve/delete emails (stored in our database), view their inbox/sent mails.

## Technologies
- Frontend: React, TailwindCSS
- Backend: React, Python


## Project Setup

- Clone the repository:
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

## Authors
- [Burak Yilmaz](https://github.com/BuraYilmaz57)
- [Bektas Kaan Yilmaz](https://github.com/ybektaskaan)

## Roadmap:
- ~~Sending/recieving mails.~~
- ~~Mail inbox.~~
- ~~Mail composition pop up.~~
- ~~Mail inbox view.~~
- ~~User database with login/register.~~
- ~~Password encryption.~~
- ~~Sent mail view.~~
- Deleting mails (current development phase).
- Tag/category system.
- Dark mode and customizable theme selector.
- Profile customization.
- Mail attachments (image, video, sound, etc.)
- CC/BCC implementation.
- STMP implementation.
- Full web deployment.


## Notes
This project is currently **under active development**, most of the stuff are being **actively changed**.

There are 2 testing/example accounts on the database: alice (password: test), and bob (password: test).
