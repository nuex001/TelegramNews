import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import WebApp from "@twa-dev/sdk";
import { useDispatch } from "react-redux";
import { logorsign } from "../../redux/Tnews";

const PrivateRoute = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.investment);
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
        dispatch(logorsign(formdata));
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
          NP
          </text>
        </svg>
        <svg viewBox="0 0 200 20" class="sketch-loading-svg2">
          <text x="60" y="13" class="sketch-loading-text" font-size="10px">
            News Points
          </text>
        </svg>
        <svg viewBox="0 0 200 20" class="sketch-loading-svg2">
          <text x="12" y="13" class="sketch-loading-text" font-size="6px">
          Here to serve you the best and top news here on telegram
          </text>
        </svg>
      </div>
    ); // Render a loading indicator while data is being fetched
  }

  return <Outlet />;
};

export default PrivateRoute;
