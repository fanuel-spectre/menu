import React, { useState } from "react";
import menuData from "../data/menuData";
import MenuItem from "./MenuItem";

const Menu = () => {
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const categories = ["All", ...new Set(menuData.map((item) => item.category))];

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const highlightMatch = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i}>{part}</mark>
      ) : (
        part
      )
    );
  };

  const handleClearFilters = () => {
    setCategory("All");
    setSearchTerm("");
    setSortOption("");
    setShowOnlyFavorites(false);
  };

  let filteredMenu = menuData.filter((item) => {
    const matchesCategory = category === "All" || item.category === category;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const isFav = favorites.includes(item.id);

    return matchesCategory && matchesSearch && (!showOnlyFavorites || isFav);
  });

  if (sortOption === "name") {
    filteredMenu.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === "price") {
    filteredMenu.sort((a, b) => {
      const priceA = parseFloat(a.price.replace("$", ""));
      const priceB = parseFloat(b.price.replace("$", ""));
      return priceA - priceB;
    });
  }

  return (
    <div className="menu-wrapper">
      <h2>Our Menu</h2>

      <div className="controls">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort</option>
          <option value="name">Name (A–Z)</option>
          <option value="price">Price (Low–High)</option>
        </select>

        <label>
          <input
            type="checkbox"
            checked={showOnlyFavorites}
            onChange={(e) => setShowOnlyFavorites(e.target.checked)}
          />
          Show Only Favorites
        </label>

        <button className="clear-btn" onClick={handleClearFilters}>
          Clear
        </button>
      </div>

      <div className="category-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            className={category === cat ? "active" : ""}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="menu-grid">
        {filteredMenu.length > 0 ? (
          filteredMenu.map((item) => (
            <MenuItem
              key={item.id}
              item={item}
              highlightMatch={highlightMatch}
              isFavorite={favorites.includes(item.id)}
              toggleFavorite={toggleFavorite}
            />
          ))
        ) : (
          <p>No items found.</p>
        )}
      </div>
    </div>
  );
};

export default Menu;
