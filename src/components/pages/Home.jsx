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
import WebApp from "@twa-dev/sdk";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../redux/Tnews";

function Home() {
  const [profile, setprofile] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.Tnews);

  const fetchProfile = async () => {
    try {
      const tg = WebApp;

      // Access initDataUnsafe
      const initDataUnsafe = tg.initDataUnsafe;
      const user = initDataUnsafe?.user;
      if (user) {
        const { id } = user;

        // Fetch user's profile photo
        const response = await axios.get(
          `https://api.telegram.org/bot${
            import.meta.env.VITE_TELEGRAM_BOT_TOKEN
          }/getUserProfilePhotos`,
          {
            params: {
              user_id: id,
              limit: 1, // Fetch only the first profile photo
            },
          }
        );

        const photos = response.data.result.photos;
        if (photos.length > 0) {
          // Get the largest version of the first photo
          const photo = photos[0][photos[0].length - 1];
          const fileId = photo.file_id;

          // Fetch the file URL
          const fileResponse = await axios.get(
            `https://api.telegram.org/bot${
              import.meta.env.VITE_TELEGRAM_BOT_TOKEN
            }/getFile`,
            {
              params: {
                file_id: fileId,
              },
            }
          );

          const filePath = fileResponse.data.result.file_path;
          const profilePhotoUrl = `https://api.telegram.org/file/bot${
            import.meta.env.VITE_TELEGRAM_BOT_TOKEN
          }/${filePath}`;
          setprofile(profilePhotoUrl);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  const copyRefferLink = async () => {
    const id = sessionStorage.getItem("myId");
    // console.log(id);
    const refferLink = `https://t.me/raffle_fairbot?start=${id}`;
    await navigator.clipboard.writeText(refferLink);
    successMsg("Refferal link copied successfully");
  };

  useEffect(() => {
    // console.log(user);
      fetchProfile();
      if (!user) {
      dispatch(getUser());
    }
  }, []);
  return (
    <div className="home">
      <ToastContainer />
      <img src={profile ? profile : dp} alt="" />
      <h1>{user && user.username}</h1>
      <h2>
        <span>NP</span>
        {formatNumber(user && user.point > 0 ? user.point : "0")}
      </h2>
      <div className="count">
        <div className="box">
          <BsPatchPlus className="icon post" />
          <h4>{user && user.post}</h4>
        </div>
        <div className="box">
          <FaSmile className="icon reaction" />
          <h4>{user && user.react}</h4>
        </div>
      </div>
      <div className="count">
        <div className="box">
          <BsFillCalendarCheckFill className="icon calendar" />
          <h4>{user && user.loginCounts}</h4>
        </div>
        <div className="box">
          <FaFire className="icon streak" />
          <h4>{user && user.streak}</h4>
        </div>
      </div>
      <button className="invite" onClick={copyRefferLink}>
        Invite a fren
        <FaPeoplePulling className="icon" />
      </button>
      {/* <button className="logout" onClick={logout}>
        <FaSignOutAlt className="icon" />
        Sign Out
      </button> */}
    </div>
  );
}

export default Home;
