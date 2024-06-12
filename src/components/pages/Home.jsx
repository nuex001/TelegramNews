import React, { useEffect, useState } from "react";
import "../../assets/css/home.css";
import dp from "../../assets/images/dp.jpg";
import { formatNumber, successMsg } from "../../utils/utils";
import { BsPatchPlus } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { FaSmile, FaFire } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import { FaPeoplePulling } from "react-icons/fa6";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Home() {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    const res = await axios.get(`http://localhost:5000/api/user/`);
    // console.log(res.data);
    setUserInfo(res.data);
  };
  const copyRefferLink = async () => {
    const id = localStorage.getItem("myId");
    // console.log(id);
    const refferLink = `https://t.me/raffle_fairbot?start=${id}`;
    await navigator.clipboard.writeText(refferLink);
    successMsg("Refferal link copied successfully");
  };
  const logout = (e) => {
    e.preventDefault();
    localStorage.setItem("token", "");
    localStorage.setItem("role", "");
    localStorage.setItem("myId", "");
    navigate("sign");
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <div className="home">
      <ToastContainer />
      <img src={dp} alt="" />
      <h1>{userInfo && userInfo.username}</h1>
      {/* <h3>NuelYoungteck@gmail.com</h3> */}
      <h2>
        <span>TN</span>
        {formatNumber(userInfo ? userInfo.point : "0")}
      </h2>
      <div className="count">
        <div className="box">
          <BsPatchPlus className="icon post" />
          <h4>{userInfo && userInfo.post}</h4>
        </div>
        <div className="box">
          <FaSmile className="icon reaction" />
          <h4>{userInfo && userInfo.react}</h4>
        </div>
      </div>
      <div className="count">
        <div className="box">
          <BsFillCalendarCheckFill className="icon calendar" />
          <h4>{userInfo && userInfo.loginCounts}</h4>
        </div>
        <div className="box">
          <FaFire className="icon streak" />
          <h4>{userInfo && userInfo.streak}</h4>
        </div>
      </div>
      <button className="invite" onClick={copyRefferLink}>
        Invite a fren
        <FaPeoplePulling className="icon" />
      </button>
      <button className="logout" onClick={logout}>
        <FaSignOutAlt className="icon" />
        Sign Out
      </button>
    </div>
  );
}

export default Home;
