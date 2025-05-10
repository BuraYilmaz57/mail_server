import React, { useState } from 'react';
import axios from 'axios';

const BACKEND_URL = "http://localhost:5010";

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [emails, setEmails] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showCompose, setShowCompose] = useState(false);

  const selectedEmail = emails.find(e => e.id === selectedId);

  const handleLogin = async () => {
    if (!username || !password) return alert("Please enter a username and a password");

    try {
      await axios.post(`${BACKEND_URL}/auth/login`, { username, password });
      setLoggedIn(true);
      loadInbox();
      loadSent();
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Login failed";
      alert(`❌ ${errorMsg}`);
    }
  };

  const handleRegister = async () => {
    if (!username || !password) return alert("Please enter both username and password");
  
    try {
      await axios.post(`${BACKEND_URL}/auth/register`, { username, password });
      alert("✅ Registration successful! You can now log in.");
      setIsRegistering(false);
      setPassword("");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Registration failed";
      alert(`❌ ${errorMsg}`);
    }
  };  

  const handleLogout = () => {
    setUsername("");
    setLoggedIn(false);
    setEmails([]);
    setSelectedId(null);
    setShowCompose(false);
  };

  const handleDelete = async (emailId) => {
    try {
      await axios.delete(`${BACKEND_URL}/mail/delete/${emailId}`);
      alert("Email deleted");
      loadInbox();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete email");
    }
  };

  const handleSend = async (email) => {
    try {
      await axios.post(`${BACKEND_URL}/mail/send`, {
        from: username,
        ...email,
      });
      alert("📤 Email sent!");
      setShowCompose(false);
      loadInbox();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to send email");
    }
  };

  const loadInbox = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/mail/inbox/${username}`);
      setEmails(res.data);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to load inbox");
    }
  };

  const loadSent = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/mail/sent/${username}`);
      setEmails(res.data);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to load sent emails");
    }
  };
  
  if (!loggedIn) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-80">
          <h2 className="text-xl mb-4 font-semibold">
            {isRegistering ? "Register" : "Login"}
          </h2>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="border px-3 py-2 rounded w-full mb-3"
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border px-3 py-2 rounded w-full mb-4"
          />
          {isRegistering ? (
            <>
              <button
                onClick={handleRegister}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full mb-2"
              >
                Register
              </button>
              <button
                onClick={() => setIsRegistering(false)}
                className="text-blue-500 hover:underline text-sm"
              >
                Already have an account? Login
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleLogin}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full mb-2"
              >
                Login
              </button>
              <button
                onClick={() => setIsRegistering(true)}
                className="text-green-600 hover:underline text-sm"
              >
                New user? Register here
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-gray-100">
      
      <aside className="w-1/4 bg-white border-r flex flex-col">
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-xl font-semibold">Inbox</h2>
          <button
            onClick={() => setShowCompose(true)}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Compose
          </button>
        </div>
        <div className="p-2 text-sm text-gray-600 border-b">Logged in as: {username}</div>
        <div className="flex justify-around py-2 border-b">
          <button
            onClick={() => loadInbox()}
            className={`px-3 py-1 rounded "bg-blue-500 text-white"`}
          >
            Inbox
          </button>
          <button
            onClick={() => loadSent()}
            className={`px-3 py-1 rounded "bg-blue-500 text-white"`}
          >
            Sent
          </button>
        </div>
        <ul className="overflow-auto flex-grow">
          {emails.map(email => (
            <li
              key={email.id}
              onClick={() => setSelectedId(email.id)}
              className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${email.id === selectedId ? 'bg-gray-200' : ''}`}
            >
              <p className="font-medium">{email.subject}</p>
              <p className="text-sm text-gray-600 truncate">
                {email.to_user ? `To: ${email.to_user}` : `From: ${email.from}`}
              </p>
              <button
                key={email.id}
                onClick={() => handleDelete(email.id)}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-red-500 text-white m-4 px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white m-4 px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </aside>

      <main className="flex-1 p-6 overflow-auto">
        {selectedEmail ? (
          <div>
            <h3 className="text-2xl font-semibold mb-2">{selectedEmail.subject}</h3>
            <p className="text-sm text-gray-600 mb-4">From: {selectedEmail.from}</p>
            <div className="bg-white p-4 rounded shadow whitespace-pre-wrap">{selectedEmail.body}</div>
          </div>
        ) : (
          <p className="text-gray-500">Select an email to view</p>
        )}
      </main>

      {showCompose && (
        <ComposePopup onClose={() => setShowCompose(false)} onSend={handleSend} />
      )}
    </div>
  );
}

function ComposePopup({ onClose, onSend }) {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSend({ to, subject, body });
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg w-2/5 h-2/5 p-4 shadow-lg flex flex-col z-50">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Compose</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2 flex-1">
        <input
          type="text"
          placeholder="To"
          value={to}
          onChange={e => setTo(e.target.value)}
          required
          className="w-full border px-2 py-1 rounded focus:outline-none focus:ring"
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={e => setSubject(e.target.value)}
          required
          className="w-full border px-2 py-1 rounded focus:outline-none focus:ring"
        />
        <textarea
          placeholder="Body"
          value={body}
          onChange={e => setBody(e.target.value)}
          required
          className="w-full border px-2 py-1 rounded h-full focus:outline-none focus:ring"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
