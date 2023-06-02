import React from "react";
import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer-text">© 2023 Your Website. All rights reserved.</p>
      <p>
        Created with <i className="fa fa-heart"></i> by
        <a target="rel" href="https://www.linkedin.com/in/pankajdkoli">
          Pankaj Koli
        </a>
        - Read how I created this and how you can join the challenge
        <a target="rel" href="https://github.com/pankajdkoli">
          here
        </a>
        .
      </p>
    </footer>
  );
}

export default Footer;
