import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar.js";

function Login() {
  // Variable Declarations
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const userLogin = { Name, Email };
  // End of Declarations

  // Login In Request, sent to Flask
  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("Login attempt with:", Name, Email);

    const res = await fetch("http://127.0.0.1:8080/Login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userLogin),
    });
    console.log(res);

    if (res.status === 400) {
      // unsuccessful, error message returned
      const loginData = await res.json();
      setError(loginData.message);
    } else {
      // successful response
      setError("");
      const loginData = await res.json();
      console.log(loginData);
      localStorage.setItem("loginData", JSON.stringify(loginData));

      navigate("/dashboard");
    }
  };

  return (
    <section>
      <Navbar />
      <div className="container">
        <div className="login-grid">
          <div class="login-container">
            <form onSubmit={handleLogin} className="input-group">
              <div class>
                <label for="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={Name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label for="email">Email:</label>
                <input
                  type="text"
                  id="email"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button type="submit">Log In</button>
            </form>
            {error && <p className="login-error">Error! {error}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
