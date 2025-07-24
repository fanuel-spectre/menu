  import React from "react";
  import Header from "./components/Header";
  import Menu from "./components/Menu";
  import Navbar from "./components/Navbar";
  import "./App.css";

  const App = () => (
    <div className="App" id="home">
      <Navbar />
      <div id="menu">
        <Menu />
      </div>
      <div id="contact">
        <p>📞 Contact us at +123456789</p>
      </div>
    </div>
  );

  export default App;
