import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import SignIn from "./components/pages/SignIn";
import Nav from "./components/layout/Nav";
import Task from "./components/pages/Task";
import AddNews from "./components/pages/AddNews";
import PrivateRouter from "./components/pages/PrivateRouter";
import WebApp from "@twa-dev/sdk";
import ScrollToTop from "./components/pages/ScrollToTop";

function App() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      // Expand the Web App to full screen
      WebApp.expand();

      // Set the background color
      // WebApp.setBackgroundColor("#fff");
    }
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 5000);
    // Cleanup function
    return () => {
      clearTimeout(timeoutId); // Clear the timeout when component unmounts
    };
  }, []);
  return (
    <BrowserRouter>
      <div className="container">
        {loading && (
          <div className="sketch-loading-container">
            <svg viewBox="0 0 150 50" class="sketch-loading-svg">
              <text x="0" y="40" class="sketch-loading-text">
                TN
              </text>
            </svg>
            <svg viewBox="0 0 200 20" class="sketch-loading-svg2">
              <text x="60" y="13" class="sketch-loading-text" font-size="10px">
                Telegram News
              </text>
            </svg>
            <svg viewBox="0 0 200 20" class="sketch-loading-svg2">
              <text x="12" y="13" class="sketch-loading-text" font-size="6px">
                We here to serve you the best and top news here on telegram
              </text>
            </svg>
          </div>
        )}
        <ScrollToTop />
        <Routes>
          <Route exact path="/sign" element={<SignIn />} />
          <Route element={<PrivateRouter />}>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/task" element={<Task />} />
            <Route exact path="/create" element={<AddNews />} />
          </Route>
        </Routes>
        <Nav />
      </div>
    </BrowserRouter>
  );
}

export default App;
