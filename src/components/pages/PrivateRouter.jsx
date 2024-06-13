import React, { useContext, useEffect } from "react";
import { Route, Navigate, useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
import WebApp from "@twa-dev/sdk";

const PrivateRoute = ({ children }) => {
  // Retrieve data from sessionStorage
  const getData = (key) => {
    return sessionStorage.getItem(key);
  };
  const fetchUserData = async () => {
    const tg = WebApp;

    // Access initDataUnsafe
    const initDataUnsafe = tg.initDataUnsafe;
    const user = initDataUnsafe?.user;
    const referId = new URLSearchParams(window.location.search).get(
      "referrerId"
    );
    if (!user) {
      // const { id, username, first_name } = user;
      const formdata = {
        username: "fddfdfdfdf",
        id: 12222323,
        referId: 11111111111111,
      };
      //   const formdata = {
      //   username: username ? username : first_name,
      //   id: id,
      //   referId: referId,
      // };
      // alert(JSON.stringify(formdata));
      const res = await axios.post(`https://telegramnews.onrender.com/api/user/`, formdata);
    console.log(res.data);
    sessionStorage.setItem("token", res.data.jwt);
    sessionStorage.setItem("role", res.data.role);
    sessionStorage.setItem("myId", res.data.myId);
    }
  };
  useEffect(() => {
    const token = getData("token");
    console.log(token);
    if (!token) {
      fetchUserData();
    }
  }, []);
  return  <Outlet />;
};

export default PrivateRoute;
