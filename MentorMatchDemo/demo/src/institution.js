import React, { useState } from "react";
import mentorphoto from "/Users/ardenmonaghan/Desktop/MentorProject/MentorMatchDemo/demo/src/images/simple.png";
import { Link } from "react-router-dom";
import Navbar from "./Navbar.js";

const Institution = () => {
  // Variables, only accounting for 1 institution so far
  const testCode = {
    key_id_1: [2024, "University of Calgary"],
    key_id_2: [2025, "University of Alberta"],
  };

  const [code, SetCode] = useState("");
  const [validCode, setValidCode] = useState(false);

  // Submit event
  function onSubmit(e) {
    e.preventDefault();

    if (code == testCode.key_id_1[0]) {
      setValidCode(true);
    } else {
      setValidCode(false);
      SetCode("");
    }
  }

  return (
    <section className="front-page">
      <Navbar />
      <div className="App container">
        <div className="grid">
          <div class="welcome-area">
            <h1 className="welcome">
              An Easier Way to match Mentors and Mentees for your Program
            </h1>
            <p className="welcome-description">
              <span style={{ color: "#1f7ea1", fontWeight: "500" }}>
                MentorMatch
              </span>{" "}
              Provides a Simple way for Institutions to Help Monitor and
              Facilitate Mentor and Mentee Matches using the power of AI.
            </p>
            <div>
              <h1 className="institution-h1">
                Enter your Institution's code and start a Profile Here.
              </h1>
              <form className="form" onSubmit={onSubmit}>
                <input
                  type="text"
                  value={code}
                  placeholder="Your Institution's Code"
                  onChange={(e) => SetCode(e.target.value)}
                  className="institution-code"
                ></input>
              </form>
            </div>
          </div>
          <img src={mentorphoto} className="mentor-photo" />
        </div>
        {validCode && (
          <p className="institution-display">
            Institution Entered: {testCode.key_id_1[1]}
          </p>
        )}
        {/* <p className="institution-display">
          Institution Entered: {validCode && testCode.key_id_1[1]}
        </p> */}
        {validCode && (
          <Link to="/ProfileCreation" className="creation-link">
            Start Profile
          </Link>
        )}
      </div>
    </section>
  );
};

export default Institution;
