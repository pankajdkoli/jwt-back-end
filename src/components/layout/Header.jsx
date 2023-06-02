import { Link } from "react-router-dom";
import "./header.css";

function Header() {
  return (
    <header className="header">
      <div className="logo">Global Vision-Tech</div>
      <nav>
        <ul className="menu">
          <Link to="/">
            <li>
              <a href="#home">Home</a>
            </li>
          </Link>

          <Link to="/signup">
            <li>
              <a href="#signup">SignUp</a>
            </li>
          </Link>
          <Link to="/login">
            <li>
              <a href="#login">LogIn</a>
            </li>
          </Link>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
