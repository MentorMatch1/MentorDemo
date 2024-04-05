import { useEffect } from "react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const DashBoard = () => {
  const [Name, setName] = useState("");
  const [Match, setMatch] = useState("");
  const [MatchDescription, setMatchDescription] = useState("");

  useEffect(() => {
    const storedLoginData = localStorage.getItem("loginData");
    console.log(typeof storedLoginData);
    const Data = JSON.parse(storedLoginData);
    const userData = Data.logged_user;

    if (userData.response) {
      setMatch(userData.response.match[0]);
      setMatchDescription(userData.response.match[1]);
    }
    setName(userData.Name);
  }, []);

  return (
    <section className="dashboard-section">
      <div>
        <div class="dashboard">
          <div class="sidebar">
            <Link className="home-link" to="/">
              MentorMatch
            </Link>
            <nav>
              <a href="#" className="dashboard-links">
                Surveys
              </a>
              <a href="#" className="dashboard-links">
                Messages
              </a>
              <a href="#" className="dashboard-links">
                Notifications
              </a>
              <a href="#" className="dashboard-links">
                Settings
              </a>
            </nav>
          </div>
          <div class="content">
            {Name && <h1 className="">Hello {Name}, Welcome Back.</h1>}
            {Match && <p className="">Your Match: {Match}</p>}
            {MatchDescription && (
              <p className="dashboard-match">
                Why we Believe This is the best Match for You:
                {MatchDescription}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashBoard;
