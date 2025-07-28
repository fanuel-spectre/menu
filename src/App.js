  import React from "react";
  import Menu from "./components/Menu";
  import Navbar from "./components/Navbar";
  import TodaysSpecial from "./components/TodaysSpecial";
  import Footer from "./components/Footer";
  import "./App.css";

  const App = () => (
    <div className="App" id="home">
      <Navbar />
      <TodaysSpecial />
      <div id="menu">
        <Menu />
      </div>
      <Footer />
    </div>
  );

  export default App;
