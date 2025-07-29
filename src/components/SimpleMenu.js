import React, { useState } from "react";
import "./SimpleMenu.css";

const simpleMenuItems = {
  Starters: [
    {
      name: "Greek Salad",
      description: "Feta cheese, olives, tomatoes, cucumbers & vinaigrette",
      price: "$6",
    },
    {
      name: "Tomato Soup",
      description: "Roasted tomatoes, basil, and a dash of cream",
      price: "$5",
    },
  ],
  Mains: [
    {
      name: "Grilled Chicken",
      description: "Served with garlic herb butter and steamed vegetables",
      price: "$10",
    },
    {
      name: "Pasta Alfredo",
      description: "Creamy parmesan sauce with mushrooms and grilled shrimp",
      price: "$8",
    },
  ],
  Desserts: [
    {
      name: "Chocolate Lava Cake",
      description: "Warm molten chocolate center with vanilla ice cream",
      price: "$5",
    },
    {
      name: "Tiramisu",
      description: "Coffee-soaked ladyfingers layered with mascarpone cream",
      price: "$6",
    },
  ],
};

const SimpleMenu = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredMenu = Object.entries(simpleMenuItems).reduce(
    (acc, [category, items]) => {
      if (selectedCategory !== "All" && category !== selectedCategory)
        return acc;

      const filteredItems = items.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (filteredItems.length > 0) {
        acc[category] = filteredItems;
      }

      return acc;
    },
    {}
  );
  return (
    <div>
      <div className="menu-controls">
        <input
          type="text"
          placeholder="Search dishes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-filter"
        >
          <option value="All">All</option>
          {Object.keys(simpleMenuItems).map((category, idx) => (
            <option key={idx} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="simple-menu-container">
        <h1
          className="simple-menu-title"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          Today's Menu
        </h1>
        {/* <button className="print-btn" onClick={() => window.print()}>
        🖨️ Print Menu
      </button> */}

        {Object.keys(filteredMenu).map((category, idx) => (
          <div key={idx} className="menu-category">
            <h2 className="category-title">{category}</h2>
            {filteredMenu[category].map((item, i) => (
              <div className="simple-menu-item" key={i}>
                <div className="item-header">
                  <span className="item-name">{item.name}</span>
                  <span className="item-price">{item.price}</span>
                </div>
                <p className="item-description">{item.description}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimpleMenu;
