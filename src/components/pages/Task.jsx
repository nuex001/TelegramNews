import React, { useEffect, useRef, useState } from "react";
import "../../assets/css/task.css";
import { BiSolidBadgeDollar } from "react-icons/bi";
import { FaTelegramPlane, FaDiscord } from "react-icons/fa";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { errorMsgs, successMsg } from "../../utils/utils";
import WebApp from "@twa-dev/sdk";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  clear,
  createTask,
  fetchTasks,
  getUser,
  post,
  updateUser,
  claimTask,
} from "../../redux/Tnews";

function Task() {
  const formRef = useRef(null);
  const [role, setRole] = useState(null);
  // const [tasks, setTasks] = useState([]);
  const [userId, setUserId] = useState(6393211028);
  const [timer, setTimer] = useState(null);
  const [clickedTasks, setClickedTasks] = useState([]);
  //
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tasks, error, success } = useSelector((state) => state.Tnews);

  // FECTH Tasks
  const fetchuserId = async () => {
    try {
      const tg = WebApp;

      // Access initDataUnsafe
      const initDataUnsafe = tg.initDataUnsafe;
      const user = initDataUnsafe?.user;
      const referrerIdParam = new URLSearchParams(window.location.search).get(
        "referrerId"
      );

      if (user) {
        // console.log(user)
        const { id } = user;
        setUserId(id);
      }
    } catch (error) {
      console.log(error);
      errorMsgs("Server Error");
    }
  };

  // Handle the click event
  const handleClick = (idx, link) => {
    // Update the state to include the clicked task index
    setClickedTasks((prev) => [...prev, idx]);
    // Open the link in a new tab
    window.open(link, "_blank", "noopener,noreferrer");
  };

  // Claim Task
  const claimtask = async (e) => {
    e.preventDefault();
    const taskId = e.target.getAttribute("data-id");
    const granny = e.target.parentNode;
    dispatch(claimTask({ taskId, userId }));
    granny.remove();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    try {
      dispatch(createTask(formData));
    } catch (error) {
      console.log(error);
      if (error.response.data.err) {
        errorMsgs(error.response.data.err);
      } else {
        console.log(error);
        errorMsgs("Server Error");
      }
    }
  };
  const cancelForm = (e) => {
    e.preventDefault();
    formRef.current.reset();
  };

  useEffect(() => {
    setRole(sessionStorage.getItem("role"));
    if (sessionStorage.getItem("role") !== "admin") {
      dispatch(fetchTasks());
      fetchuserId();
    }
    return () => {
      clearTimeout(timer);
    };
  }, []);

  //
  useEffect(() => {
    if (error !== null) {
      errorMsgs(error.err);
      dispatch(clear());
    } else {
      successMsg(success);
      if (formRef.current) {
        formRef.current.reset();
      }
    }
    dispatch(clear());
  }, [success, error]);

  return (
    <>
      <div className="task">
        <ToastContainer />
        <h1>NP</h1>
        <h1>1 task available</h1>
        <h2>
          We’ll reward you immediately with points after each task completion.
        </h2>
        {role !== "admin" ? (
          <ul className="task-list">
            {tasks &&
              tasks.length > 0 &&
              tasks.map((task, idx) => (
                <li className="task-list__item" key={idx}>
                  <div className="task-list__item-content">
                    {task.description.includes("telegram") ? (
                      <FaTelegramPlane
                        className="task-list__icon"
                        aria-hidden="true"
                        style={{color:"#0088cc"}}
                      />
                    ) : task.description.includes("twitter") ? (
                      <FaXTwitter
                        className="task-list__icon"
                        aria-hidden="true"
                        style={{color:"#fff"}}
                      />
                    ) : task.description.includes("discord") ? (
                      <FaDiscord
                        className="task-list__icon"
                        aria-hidden="true"
                        style={{color:"#5865F2"}}
                      />
                    ) : task.description.includes("instgram") ? (
                      <FaInstagram
                        className="task-list__icon"
                        aria-hidden="true"
                      />
                    ) : (
                      <BiSolidBadgeDollar
                        className="task-list__icon"
                        aria-hidden="true"
                      />
                    )}

                    <h2 className="task-list__title">
                      {task.description}{" "}
                      <span className="task-list__bonus">
                        + {task.points} NP
                      </span>
                    </h2>
                  </div>
                  {clickedTasks.includes(idx) ? (
                    <a
                      className="task-list__link claim"
                      aria-label="Claim task"
                      onClick={claimtask}
                      data-id={task._id}
                    >
                      Claim
                    </a>
                  ) : (
                    <a
                      href={task.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="task-list__link"
                      aria-label="Check task details"
                      onClick={() => handleClick(idx, task.link)}
                    >
                      Check
                    </a>
                  )}
                </li>
              ))}
          </ul>
        ) : (
          <div className="addnews">
            <form
              action=""
              encType="multipart/form-data"
              ref={formRef}
              onSubmit={onSubmit}
            >
              <input
                type="text"
                name="description"
                id="description"
                placeholder="description"
              />
              <input
                type="number"
                name="points"
                id="points"
                placeholder="points"
              />
              <input type="url" name="link" id="link" placeholder="link" />
              <div className="controls">
                <button onClick={cancelForm}>Cancel</button>
                <button>Add</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default Task;
