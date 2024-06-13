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
  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      // Expand the Web App to full screen
      WebApp.expand();
    }
  }, []);
  return (
    <BrowserRouter>
      <div className="container">
        <ScrollToTop />
        <Routes>
          {/* <Route exact path="/sign" element={<SignIn />} /> */}
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
