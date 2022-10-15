
import './App.css';
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/NavBar"
import Home from "./pages/home/Home"
import About from "./pages/about/About"
import Members from "./pages/members/Members"
function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>ELECTENG209 2022 - Team 20</h1>
      </header>
      <nav className="nav">
        <NavBar />
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/members" element={<Members />} />
      </Routes>
    </div>
  );
}

export default App;
