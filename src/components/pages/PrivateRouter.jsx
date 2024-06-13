import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import WebApp from "@twa-dev/sdk";

const PrivateRoute = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const getData = (key) => {
    return sessionStorage.getItem(key);
  };

  const fetchUserData = async () => {
    try {
      const tg = WebApp;
      const initDataUnsafe = tg.initDataUnsafe;
      const user = initDataUnsafe?.user;
      const referId = new URLSearchParams(window.location.search).get(
        "referrerId"
      );

      if (user) {
        const formdata = {
          username: user.username ? user.username : user.first_name,
          id: user.id,
          referId: referId || null,
        };

        const res = await axios.post(
          `https://telegramnews.onrender.com/api/user/`,
          formdata
        );
        sessionStorage.setItem("token", res.data.jwt);
        sessionStorage.setItem("role", res.data.role);
        sessionStorage.setItem("myId", res.data.myId);
      } else {
        // Handle the case where user is not defined
        console.error("User data is not available");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    const token = getData("token");
    if (!token) {
      fetchUserData();
      const timeoutId = setTimeout(() => {
        setIsLoading(false);
      }, 5000);
      // Cleanup function
      return () => {
        clearTimeout(timeoutId); // Clear the timeout when component unmounts
      };
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
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
    ); // Render a loading indicator while data is being fetched
  }

  return <Outlet />;
};

export default PrivateRoute;
