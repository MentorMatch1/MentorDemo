import React, { useState } from "react";
import "./App.css";
import Navbar from "./Navbar.js";
import { useNavigate } from "react-router-dom";

function ProfileCreation() {
  // Variable Declarations
  const [Description, setDescription] = useState("");
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [response, setResponse] = useState("");
  const [error, SetError] = useState("");

  const profile = { Name, Email, Description };
  const navigate = useNavigate();
  // End of Declarations

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://127.0.0.1:8080/Users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });

    if (res.status === 400) {
      // Unsuccessful Reponse, sends back an error
      const data = await res.json();
      console.log(data.message);
      SetError(data.message);
    } else {
      // Successful Response, Will create a New Account With a Match
      SetError("");
      const data = await res.json();
      setResponse(data);
      console.log(data.match);

      setDescription("");
      setName("");
      setEmail("");
      navigate("/");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="profile-container">
          <div class="profile">
            <div className="profile-left">
              <h1>Create Your Profile</h1>
              <p>
                By Creating an Profile You Gain Access to Your Own Dashboard and
                will be Officially Registered For the program
              </p>
            </div>
            <label>Name</label>
            <input
              className="input-box"
              value={Name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />

            <label>Email</label>
            <input
              type="text"
              className="input-box"
              value={Email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="profile-right">
            <label for="description">About You</label>
            <textarea
              className="profile-description"
              type="text"
              value={Description}
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              id="description"
            ></textarea>
            <button onClick={handleSubmit} className="profile-button">
              Submit
            </button>
          </div>
          {error && <p className="profile-error">Error! {error}</p>}
          {/* {response && <p className="Match">Match: {response.match[1]}</p>} */}
        </div>
      </div>
    </div>
  );
}

export default ProfileCreation;
