import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import ProfileCreation from "./profileCreation";
import Institution from "./institution.js";
import Login from "./Login.js";
import DashBoard from "./Dashboard.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Institution />} />
        <Route path="/ProfileCreation" element={<ProfileCreation />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Dashboard" element={<DashBoard />} />
      </Routes>
    </Router>
  );
}

export default App;
