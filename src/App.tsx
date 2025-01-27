import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Docs from "./pages/Docs";
// import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { useTheme } from "./stores/useTheme";

const App: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Router>
      <div
        className={`flex flex-col min-h-screen ${
          theme === "light" ? "bg-white" : "bg-gray-800/95"
        }`}
      >
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/docs" element={<Docs />} />
          </Routes>
        </main>
        {/* <Footer /> */}
      </div>
    </Router>
  );
};

export default App;
