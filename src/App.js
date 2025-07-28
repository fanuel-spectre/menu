  import React from "react";
  import Menu from "./components/Menu";
  import Navbar from "./components/Navbar";
  import TodaysSpecial from "./components/TodaysSpecial";
  import "./App.css";

  const App = () => (
    <div className="App" id="home">
      <Navbar />
      <TodaysSpecial />
      <div id="menu">
        <Menu />
      </div>
      <div id="contact">
        <p>📞 Contact us at +123456789</p>
      </div>
    </div>
  );

  export default App;
