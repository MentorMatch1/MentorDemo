import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="nav-bar">
      <h2 className="nav-title">MentorMatch</h2>
      <div className="nav-link-container">
        <Link className="nav-links" to="/">
          Home
        </Link>
        <Link className="nav-links" to="/Login">
          Login
        </Link>
        {/* <Link className="nav-links" to="/">
          Help Centre
        </Link> */}
      </div>
    </div>
  );
};

export default Navbar;
