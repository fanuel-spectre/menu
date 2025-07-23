import React from "react";

const MenuItem = ({ item }) => (
  <div className="menu-item">
    <img src={item.image} alt={item.name} />
    <h3>{item.name}</h3>
    <p>{item.description}</p>
    <strong>{item.price}</strong>
  </div>
);

export default MenuItem;
