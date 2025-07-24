import React, { useState, useEffect, useRef } from "react";
import menuData from "../data/menuData";
import MenuItem from "./MenuItem";
import { FaFilter, FaStar, FaRegStar } from "react-icons/fa";

const Menu = () => {
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const sortRef = useRef();

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setShowSortMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
        <button className="clear-btn" onClick={handleClearFilters}>
          Clear
        </button>

        <button
          className={`favorites-toggle ${showOnlyFavorites ? "active" : ""}`}
          onClick={() => setShowOnlyFavorites((prev) => !prev)}
          aria-pressed={showOnlyFavorites}
          aria-label="Toggle show only favorites"
          title={
            showOnlyFavorites ? "Showing Favorites" : "Show Only Favorites"
          }
        >
          {showOnlyFavorites ? <FaStar /> : <FaRegStar />}
        </button>
      </div>

      <div className="category-tabs">
        <div className="sort-menu-wrapper" ref={sortRef}>
          <FaFilter
            className="sort-icon"
            onClick={() => setShowSortMenu(!showSortMenu)}
          />
          {showSortMenu && (
            <div className="sort-dropdown">
              <div
                onClick={() => {
                  setSortOption("name");
                  setShowSortMenu(false);
                }}
              >
                Name (A–Z)
              </div>
              <div
                onClick={() => {
                  setSortOption("price");
                  setShowSortMenu(false);
                }}
              >
                Price (Low–High)
              </div>
            </div>
          )}
        </div>
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
