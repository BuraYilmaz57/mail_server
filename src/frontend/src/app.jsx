import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const GOOGLE_CLIENT_ID = "1078233913485-gtt0bt6tc1es23i5gs93ahc0pto5of2n.apps.googleusercontent.com";

function App() {
  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const accessToken = credentialResponse.access_token;

      const res = await axios.post("http://localhost:5000/send-email", {
        access_token: accessToken,
        to: "someone@example.com", 
        subject: "Hello from custom Gmail client!",
        body: "This is a test email sent via Gmail API.",
      });

      console.log("Backend response:", res.data);
      alert("Email sent!");
    } catch (error) {
      console.error("Failed to send email:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div style={{ padding: "2rem", fontFamily: "Arial" }}>
        <h1>My Gmail Client</h1>
        <p>Login with your Google Account to send email:</p>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={() => console.log("Login Failed")}
          scope="https://www.googleapis.com/auth/gmail.send"
        />
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
