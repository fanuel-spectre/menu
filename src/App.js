import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import TodaysSpecial from "./components/TodaysSpecial";
import Footer from "./components/Footer";
import SimpleMenu from "./components/SimpleMenu";
import "./App.css";

const AppContent = () => {
  const location = useLocation();
  const isSimpleMenu = location.pathname === "/simple-menu";

  return (
    <div className="App" id="home">
      <Navbar />
      <Routes>
        <Route path="/simple-menu" element={<SimpleMenu />} />
      </Routes>
      {!isSimpleMenu && (
        <>
          <TodaysSpecial />
          <div id="menu">
            <Menu />
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
