import React from "react";
import "../../assets/css/task.css";
import { BiSolidBadgeDollar } from "react-icons/bi";
import { FaTelegramPlane } from "react-icons/fa";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
function Task() {
  return (
    <div className="task">
      <h1>TN</h1>
      <h1>1 task available</h1>
      <h2>
        We’ll reward you immediately with points after each task completion.
      </h2>
      <ul className="task-list">
        <li className="task-list__item">
          <div className="task-list__item-content">
            <BiSolidBadgeDollar
              className="task-list__icon"
              aria-hidden="true"
            />
            <h2 className="task-list__title">
              Invite 5 frens 5 / 5{" "}
              <span className="task-list__bonus">+ 120 TN</span>
            </h2>
          </div>
          <a
            href="#"
            target="_blank"
            className="task-list__link"
            aria-label="Check task details"
          >
            Check
          </a>
        </li>
        <li className="task-list__item">
          <div className="task-list__item-content">
            <BiSolidBadgeDollar
              className="task-list__icon"
              aria-hidden="true"
            />
            <h2 className="task-list__title">
              Boost Tonnews <span className="task-list__bonus">+ 120 TN</span>
            </h2>
          </div>
          <a
            href="#"
            target="_blank"
            className="task-list__link claim"
            aria-label="Check task details"
          >
            Claim
          </a>
        </li>
        <li className="task-list__item">
          <div className="task-list__item-content">
            <FaTelegramPlane className="task-list__icon" aria-hidden="true" />
            <h2 className="task-list__title">
              Subscribe to Tonnews{" "}
              <span className="task-list__bonus">+ 200 TN</span>
            </h2>
          </div>
          <a
            href="#"
            target="_blank"
            className="task-list__link"
            aria-label="Check task details"
          >
            Check
          </a>
        </li>
        <li className="task-list__item">
          <div className="task-list__item-content">
            <FaInstagram className="task-list__icon" aria-hidden="true" />
            <h2 className="task-list__title">
              Join Tonnews’s Instagram
              <span className="task-list__bonus">+ 250 TN</span>
            </h2>
          </div>
          <a
            href="#"
            target="_blank"
            className="task-list__link"
            aria-label="Check task details"
          >
            Check
          </a>
        </li>
        <li className="task-list__item">
          <div className="task-list__item-content">
            <FaXTwitter className="task-list__icon" aria-hidden="true" />
            <h2 className="task-list__title">
              Follow Tonnews on X
              <span className="task-list__bonus">+ 200 TN</span>
            </h2>
          </div>
          <a
            href="#"
            target="_blank"
            className="task-list__link"
            aria-label="Check task details"
          >
            Check
          </a>
        </li>
        <li className="task-list__item">
          <div className="task-list__item-content">
            <FaXTwitter className="task-list__icon" aria-hidden="true" />
            <h2 className="task-list__title">
              Follow Tonnews's CEO on X
              <span className="task-list__bonus">+ 90 TN</span>
            </h2>
          </div>
          <a
            href="#"
            target="_blank"
            className="task-list__link"
            aria-label="Check task details"
          >
            Check
          </a>
        </li>
        <li className="task-list__item">
          <div className="task-list__item-content">
            <FaXTwitter className="task-list__icon" aria-hidden="true" />
            <h2 className="task-list__title">
              Follow Tonnews's CMO on X
              <span className="task-list__bonus">+ 90 TN</span>
            </h2>
          </div>
          <a
            href="#"
            target="_blank"
            className="task-list__link"
            aria-label="Check task details"
          >
            Check
          </a>
        </li>
        <li className="task-list__item">
          <div className="task-list__item-content">
            <FaXTwitter className="task-list__icon" aria-hidden="true" />
            <h2 className="task-list__title">
              Follow Tonnews's Dev on X
              <span className="task-list__bonus">+ 150 TN</span>
            </h2>
          </div>
          <a
            href="#"
            target="_blank"
            className="task-list__link"
            aria-label="Check task details"
          >
            Check
          </a>
        </li>
        <li className="task-list__item">
          <div className="task-list__item-content">
            <FaXTwitter className="task-list__icon" aria-hidden="true" />
            <h2 className="task-list__title">
              Join Tonnews's Discord
              <span className="task-list__bonus">+ 200 TN</span>
            </h2>
          </div>
          <a
            href="#"
            target="_blank"
            className="task-list__link"
            aria-label="Check task details"
          >
            Check
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Task;
