import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Admin from "./containers/admin";
import Home from "./containers/home";
import Login from "./containers/login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/login/*"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/admin/*" element={<Admin isLoggedIn={isLoggedIn} />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
