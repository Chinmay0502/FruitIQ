import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import { AnimatePresence } from "motion/react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Predict from "./pages/Predict";
import Analysis from "./pages/Analysis";
import History from "./pages/History";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <>
      <Navbar />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />

          <Route path="/predict" element={<Predict />} />

          <Route path="/analysis" element={<Analysis />} />

          <Route path="/analysis/:id" element={<Analysis />} />

          <Route path="/history" element={<History />} />
        </Routes>
      </AnimatePresence>

      <Footer />
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
};

export default App;
