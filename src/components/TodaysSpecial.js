import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../styles/TodaysSpecial.css";
import minestrone from "../assets/minestrone.jpg";
import chicken from "../assets/chicken.jpg";
import tiramisu from "../assets/tiramisu.jpg";

const specials = [
  {
    name: "Chicken Breast",
    image: chicken,
    description: "Juicy chicken breast grilled to perfection.",
  },
  {
    name: "Minestrone Soup",
    image: minestrone,
    description: "A hearty Italian soup loaded with fresh vegetables.",
  },
  {
    name: "Tiramisu",
    image: tiramisu,
    description: "A classic Italian dessert made with coffee-soaked ladyfingers and mascarpone cheese.",
  },
];

const TodaysSpecial = () => {
  return (
    <div className="specials-section" id="specials">
      <h2>Today's Specials</h2>
      <Carousel
        showThumbs={false}
        infiniteLoop
        autoPlay
        interval={5000}
        showStatus={false}
        swipeable
        emulateTouch
        dynamicHeight
      >
        {specials.map((item, index) => (
          <div key={index} className="carousel-slide">
            <img src={item.image} alt={item.name} className="carousel-image" />
            <p className="legend">
              <strong>{item.name}</strong>
              <br />
              {item.description}
            </p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default TodaysSpecial;
