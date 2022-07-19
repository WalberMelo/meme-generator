import React from "react";
import Troll from "../assets/Troll-Face.png";

function Header() {
  return (
    <div className="header">
      <img className="header--image" src={Troll} alt="Troll face"></img>
      <h1 className="header--title">Meme Generator</h1>
    </div>
  );
}

export default Header;
