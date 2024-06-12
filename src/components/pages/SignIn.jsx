import React, { useEffect, useState } from "react";
import "../../assets/css/signin.css";
import WebApp from "@twa-dev/sdk";
import axios from "axios";
import { BiSolidChevronsRight } from "react-icons/bi";
import dp from "../../assets/images/dp.jpg";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { errorMsgs, successMsg } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [userInfo, setUserInfo] = useState({
    id: null,
    username: "",
    email: "",
    referId: "",
    profilePhotoUrl: "",
  });
  const [timer, setTimer] = useState(null);
  const navigate = useNavigate();

  const { id, username, email, referId, profilePhotoUrl } = userInfo;
  const fetchUserData = async () => {
    try {
      const tg = WebApp;

      // Access initDataUnsafe
      const initDataUnsafe = tg.initDataUnsafe;
      const user = initDataUnsafe?.user;
      const referrerIdParam = new URLSearchParams(window.location.search).get(
        "referrerId"
      );

      if (user) {
        const { id, username } = user;

        // Update the state with user information
        setUserInfo({
          id,
          username,
          referId: referrerIdParam,
        });

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

          // Update the state with the profile photo URL merged with existing user information
          setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            profilePhotoUrl,
          }));
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update the userInfo state with the new value
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  const onsubmit = async (e) => {
    e.preventDefault();
    try {
      if (email.trim() !== "" && username.trim() !== "" && id) {
        // console.log();
        const res = await axios.post(`http://localhost:5000/api/user/`, {
          username,
          email,
          id,
          referId,
        });
        localStorage.setItem("token", res.data.jwt);
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("myId", res.data.myId);
        successMsg(res.data.msg);
        clearTimeout(timer);
        setTimer(() =>
          setTimeout(() => {
            navigate("/");
          }, 5000)
        );
      } else {
        errorMsgs("Please fill all inputs");
      }
    } catch (error) {
      // console.log(error);
      if (error.response.data.err) {
        errorMsgs(error.response.data.err);
      } else {
        console.log(error);
        errorMsgs("Server Error");
      }
    }
  };

  useEffect(() => {
    fetchUserData();
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div className="signin">
      <ToastContainer />
      <h1>
        Account <br /> Basic Info
      </h1>
      <h2>Create An account so you can enjoy all features of the app</h2>
      <form action="" onSubmit={onsubmit}>
        <img src={userInfo && profilePhotoUrl ? profilePhotoUrl : dp} alt="" />
        <div className="box">
          <label htmlFor="">Your Username</label>
          <input
            type="text"
            placeholder="Brooklyn S."
            name="username"
            value={userInfo && username ? username : ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="box">
          <label htmlFor="">Your Email</label>
          <input
            type="email"
            name="email"
            placeholder="brooklyn@gmail.com"
            value={userInfo && email ? email : ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="box">
          <label htmlFor="">Referrer Id</label>
          <input
            name="text"
            type="referId"
            value={userInfo && referId}
            onChange={handleInputChange}
          />
        </div>
        <button>
          Continue
          <BiSolidChevronsRight className="icon" />
        </button>
      </form>
    </div>
  );
}

export default SignIn;
