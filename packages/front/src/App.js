import { Routes, Route } from "react-router-dom";
import Admin from "./containers/admin";
import Home from "./containers/home";
import Login from "./containers/login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login/*" element={<Login />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
