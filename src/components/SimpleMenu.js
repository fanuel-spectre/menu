import React from "react";
import simpleMenu from "../data/simplemenuData";
import "./SimpleMenu.css";

const SimpleMenu = () => {
  return (
    <div className="simple-menu-container">
      <h2 className="simple-menu-title">Today's Specials</h2>
      {simpleMenu.map((item, index) => (
        <div className="menu-line" key={index}>
          <span className="menu-name">{item.name}</span>
          <span className="menu-dots"></span>
          <span className="menu-price">${item.price}</span>
        </div>
      ))}
    </div>
  );
};

export default SimpleMenu;
