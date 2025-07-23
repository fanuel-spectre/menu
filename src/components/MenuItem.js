import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const MenuItem = ({ item, highlightMatch, isFavorite, toggleFavorite }) => (
  <div className="menu-item">
    <div className="image-container">
      <img src={item.image} alt={item.name} className="menu-image" />
      <button
        className="fav-btn"
        onClick={() => toggleFavorite(item.id)}
        aria-label="Toggle Favorite"
      >
        {isFavorite ? (
          <FaHeart className="fav-icon filled" />
        ) : (
          <FaRegHeart className="fav-icon" />
        )}
      </button>
    </div>
    <h3>{highlightMatch ? highlightMatch(item.name, "") : item.name}</h3>
    <p>
      {highlightMatch ? highlightMatch(item.description, "") : item.description}
    </p>
    <strong>{item.price}</strong>
  </div>
);

export default MenuItem;
