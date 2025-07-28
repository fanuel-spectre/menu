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
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  const sortRef = useRef();

  const categories = ["All", ...new Set(menuData.map((item) => item.category))];

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const handleCategoryClick = (category) => {
    setCategory(category);
  };

  const highlightMatch = (text, term) => {
    if (!term) return text;
    const regex = new RegExp(`(${term})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} style={{ backgroundColor: "yellow" }}>
          {part}
        </span>
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

  const handleToggleSortMenu = () => {
    if (!showSortMenu && sortRef.current) {
      const rect = sortRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
    setShowSortMenu((prev) => !prev);
  };

  const handleClearFilters = () => {
    setCategory("All");
    setSearchTerm("");
    setSortOption("");
    setShowOnlyFavorites(false);
  };

  // --- Filtering ---
  let filteredMenu = menuData.filter(
    (item) =>
      (category === "All" || item.category === category) &&
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (category !== "All") {
    filteredMenu = filteredMenu.filter((item) => item.category === category);
  }

  if (searchTerm) {
    filteredMenu = filteredMenu.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (showOnlyFavorites) {
    filteredMenu = filteredMenu.filter((item) => favorites.includes(item.id));
  }

  // --- Sorting ---
  if (sortOption === "name") {
    filteredMenu.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === "price") {
    filteredMenu.sort(
      (a, b) =>
        parseFloat(a.price.replace(/[^0-9.]/g, "")) -
        parseFloat(b.price.replace(/[^0-9.]/g, ""))
    );
  }

  return (
    <div className="menu-wrapper">
      {/* <h2>Our Menu</h2> */}

      <div className="controls">
        <button
          className={`favorites-toggle ${showOnlyFavorites ? "active" : ""}`}
          onClick={() => setShowOnlyFavorites((prev) => !prev)}
          aria-pressed={showOnlyFavorites}
          title={
            showOnlyFavorites ? "Showing Favorites" : "Show Only Favorites"
          }
        >
          {showOnlyFavorites ? <FaStar /> : <FaRegStar />}
        </button>
        <div
          className="sort-menu-wrapper"
          ref={sortRef}
          style={{ display: "inline-block", position: "relative" }}
        >
          <FaFilter
            className="sort-icon"
            onClick={handleToggleSortMenu}
            style={{ cursor: "pointer" }}
          />
          {showSortMenu && (
            <div
              className="sort-dropdown"
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                marginTop: "8px",
                background: "white",
                border: "1px solid #ddd",
                borderRadius: "4px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                width: "140px",
                zIndex: 1000,
              }}
            >
              <button
                onClick={() => {
                  setSortOption("name");
                  setShowSortMenu(false);
                }}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  width: "100%",
                  textAlign: "left",
                  border: "none",
                  background: "transparent",
                }}
              >
                Name (A–Z)
              </button>
              <button
                onClick={() => {
                  setSortOption("price");
                  setShowSortMenu(false);
                }}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  width: "100%",
                  textAlign: "left",
                  border: "none",
                  background: "transparent",
                }}
              >
                Price (Low–High)
              </button>
            </div>
          )}
        </div>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="clear-btn" onClick={handleClearFilters}>
          Clear
        </button>
      </div>
      <div
        className="category-tabs"
        style={{ overflowX: "auto", whiteSpace: "nowrap" }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            className={category === cat ? "active" : ""}
            onClick={() => setCategory(cat)}
            style={{ display: "inline-block" }}
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
              highlightMatch={(text) => highlightMatch(text, searchTerm)}
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
