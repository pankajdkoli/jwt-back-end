import React from "react";
import "./contact.css";

const Contact = () => {
  return (
    <>
      <div className="toggle-border">
        <input id="one" type="checkbox" />
        <label htmlFor="one">
          <div className="handle"></div>
        </label>
      </div>
    </>
  );
};

export default Contact;
