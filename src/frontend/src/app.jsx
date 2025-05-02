import React, { useState } from "react";
import axios from "axios";

const BACKEND_URL = "http://localhost:5000";

function App() {
  const [username, setUsername] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const [formData, setFormData] = useState({
    to: "",
    subject: "",
    body: "",
  });

  const [inbox, setInbox] = useState([]);

  const handleLogin = async () => {
    if (!username) return alert("Please enter a username");

    try {
      await axios.post(`${BACKEND_URL}/auth/login`, { username });
      setLoggedIn(true);
      alert("✅ Logged in as " + username);
    } catch (err) {
      console.error(err);
      alert("❌ Login failed");
    }
  };

  const handleLogout = () => {
    setUsername("");
    setLoggedIn(false);
    setFormData({ to: "", subject: "", body: "" });
    setInbox([]);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSend = async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}/mail/send`, {
        from: username,
        ...formData,
      });
      alert("📤 Email sent!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to send email");
    }
  };

  const loadInbox = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/mail/inbox/${username}`);
      setInbox(res.data);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to load inbox");
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      {!loggedIn ? (
        <div>
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleLogin} style={{ marginLeft: "1rem" }}>
            Login
          </button>
        </div>
      ) : (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2>Welcome, {username}</h2>
            <button onClick={handleLogout}>🔓 Logout</button>
          </div>

          <div style={{ marginTop: "2rem" }}>
            <h3>Send Mail</h3>
            <input
              type="text"
              name="to"
              placeholder="To"
              value={formData.to}
              onChange={handleChange}
              style={{ display: "block", marginBottom: "1rem", width: "300px" }}
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              style={{ display: "block", marginBottom: "1rem", width: "300px" }}
            />
            <textarea
              name="body"
              placeholder="Body"
              value={formData.body}
              onChange={handleChange}
              style={{ display: "block", marginBottom: "1rem", width: "300px", height: "150px" }}
            />
            <button onClick={handleSend}>Send</button>
          </div>

          <div style={{ marginTop: "3rem" }}>
            <h3>Your Inbox</h3>
            <button onClick={loadInbox}>📥 Refresh Inbox</button>
            {inbox.length === 0 ? (
              <p>No messages</p>
            ) : (
              <ul>
                {inbox.map((msg, i) => (
                  <li key={i} style={{ marginTop: "1rem", borderBottom: "1px solid #ccc", paddingBottom: "1rem" }}>
                    <strong>From:</strong> {msg.from} <br />
                    <strong>Subject:</strong> {msg.subject} <br />
                    <strong>Body:</strong> {msg.body} <br />
                    <small style={{ color: "#666" }}>
                      Sent: {new Date(msg.timestamp).toLocaleString()}
                    </small>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
