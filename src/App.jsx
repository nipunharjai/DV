import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Q2 from "./components/Q2.jsx";
import Q1 from "./components/Q1.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" Component={Q1} />
        <Route exact path="/q2" Component={Q2} />
      </Routes>
    </Router>
  );
};

export default App;
