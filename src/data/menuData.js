import lava from "../assets/lava.jpg";
import pizza from "../assets/pizza.jpg";
import salad from "../assets/salads.jpg";
import chicken from "../assets/chicken.jpg";
import bread from "../assets/bread.jpg";
import minestrone from "../assets/minestrone.jpg";
import panna from "../assets/panna.jpg";
import tiramisu from "../assets/tiramisu.jpg";

const menuData = [
  {
    id: 1,
    name: "Margherita Pizza",
    category: "Main",
    price: "$8.99",
    description: "Classic pizza with tomato sauce and mozzarella",
    image: pizza,
  },
  {
    id: 2,
    name: "Caesar Salad",
    category: "Starters",
    price: "$5.49",
    description: "Fresh romaine lettuce with Caesar dressing",
    image: salad,
  },
  {
    id: 3,
    name: "Chocolate Lava Cake",
    category: "Desserts",
    price: "$4.99",
    description: "Warm chocolate cake with gooey center",
    image: lava,
  },
  {
    id: 4,
    name: "Grilled Chicken",
    category: "Main",
    price: "$10.99",
    description: "Juicy grilled chicken breast with herbs",
    image: chicken,
  },
  {
    id: 5,
    name: "Tiramisu",
    category: "Desserts",
    price: "$5.49",
    description: "Coffee-flavored Italian dessert with mascarpone",
    image: tiramisu,
  },
  {
    id: 6,
    name: "Minestrone Soup",
    category: "Starters",
    price: "$4.49",
    description: "Hearty Italian vegetable soup with pasta",
    image: minestrone,
  },
  {
    id: 7,
    name: "Panna Cotta",
    category: "Desserts",
    price: "$5.99",
    description: "Creamy vanilla dessert with berry sauce",
    image: panna,
  },
  {
    id: 8,
    name: "Garlic Bread",
    category: "Starters",
    price: "$3.99",
    description: "Toasted bread with garlic and butter",
    image: bread,
  },
];

export default menuData;
