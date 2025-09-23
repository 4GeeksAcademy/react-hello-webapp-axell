import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="navbar navbar-light bg-light">
    <div className="container">
      <Link to="/">
        <span className="navbar-brand mb-0 h1">React Boilerplate</span>
      </Link>
      <div className="ml-auto">
       
      </div>
    </div>
  </nav>
);

export default Navbar;
