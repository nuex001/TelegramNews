import React, { useEffect, useRef, useState } from "react";
import "../../assets/css/addnews.css";
import { FaCloudUploadAlt } from "react-icons/fa";
import { selectStyle } from "../../utils/utils";
import Select from "react-select";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { errorMsgs, successMsg } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import dp from "../../assets/images/dp.jpg";
import { ImCrying2 } from "react-icons/im";
import { useSelector, useDispatch } from "react-redux";
import {
  clear,
  fetchPosts,
  getUser,
  post,
  updatePost,
  updateUser,
} from "../../redux/Tnews";

function AddNews() {
  const [isUploaded, setIsUploaded] = useState(false);
  const [timer, setTimer] = useState(null);
  const [role, setRole] = useState(null);
  const formRef = useRef(null);
  const [file, setFile] = useState(null);
  //
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { posts, error, success } = useSelector((state) => state.Tnews);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setIsUploaded(true);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    if (file) {
      formData.append("file", file);
    }
    try {
      dispatch(post(formData));
    } catch (error) {
      console.log(error);
    }
  };
  const cancelForm = (e) => {
    e.preventDefault();
    formRef.current.reset();
  };
  const options = [
    { value: "", label: "Category" },
    { value: "crypto", label: "Crypto" },
    { value: "finance", label: "Finance" },
    { value: "memes", label: "Memes" },
    { value: "hackathons", label: "Hackathons" },
  ];

  //
  const approve = async (e) => {
    const id = e.target.getAttribute("data-id");
    const granny = e.target.parentNode.parentNode;
    // console.log(id);
    try {
      dispatch(
        updatePost({
          id: id,
          status: "approve",
        })
      );
      granny.remove();
      dispatch(getUser());
    } catch (error) {
      console.log(error);
    }
  };
  //
  const decline = async (e) => {
    const id = e.target.getAttribute("data-id");
    const granny = e.target.parentNode.parentNode;
    try {
      dispatch(
        updatePost({
          id: id,
          status: "decline",
        })
      );
      granny.remove();
      dispatch(getUser());
    } catch (error) {
      console.log(error);
    }
  };

  // update user
  const updateuser = async (e) => {
    e.preventDefault();
    const type = e.target.getAttribute("data-type");
    const username = formRef.current.username.value;
    try {
      dispatch(
        updateUser({
          username: username,
          status: type,
        })
      );
    } catch (error) {
      if (error.response.data.err) {
        errorMsgs(error.response.data.err);
      } else {
        console.log(error);
        errorMsgs("Server Error");
      }
    }
  };
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

  useEffect(() => {
    setRole(sessionStorage.getItem("role"));
    if (sessionStorage.getItem("role") === "reviewer") {
      dispatch(fetchPosts());
    }
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {role === "user" ? (
        <div className="addnews">
          <ToastContainer />
          <h1>Add News</h1>
          <form
            action=""
            encType="multipart/form-data"
            ref={formRef}
            onSubmit={onSubmit}
          >
            <input type="text" name="title" id="title" placeholder="Title" />
            <textarea
              name="paragraph"
              id="paragraph"
              placeholder="Paragraph"
            ></textarea>
            <label htmlFor="file">
              <FaCloudUploadAlt className="icon" />
              <p>{isUploaded ? "Uploaded" : "Upload Thumbnail"}</p>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </label>
            <Select
              defaultValue={options[0]}
              menuPlacement="top"
              options={options}
              styles={selectStyle}
              className="selectInput"
              name="category"
            />
            <div className="controls">
              <button onClick={cancelForm}>Cancel</button>
              <button>Submit</button>
            </div>
          </form>
        </div>
      ) : role === "reviewer" ? (
        <div className="review">
          <ToastContainer />
          <h1>Review News</h1>
          {posts.length > 0 ? (
            <div className="rows">
              {posts &&
                posts.map((item, idx) => (
                  <div className="box" key={idx}>
                    <div
                      className="display"
                      style={{ backgroundImage: `url(${item.cover})` }}
                    ></div>
                    <h2>{item.title}</h2>
                    <h2>Category: {item.category}</h2>
                    <p>{item.text}</p>
                    <div className="btns">
                      <button data-id={item._id} onClick={decline}>
                        Decline
                      </button>
                      <button data-id={item._id} onClick={approve}>
                        Approve
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="empty">
              <ImCrying2 className="icon" />
              <h1>Sorry No new post!</h1>
            </div>
          )}
        </div>
      ) : role === "admin" ? (
        <div className="addnews admin">
          <ToastContainer />
          <h1>Add Reviewer</h1>
          <form action="" ref={formRef}>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="username"
            />
            <div className="controls">
              <button data-type="remove" onClick={updateuser}>
                Remove
              </button>
              <button data-type="add" onClick={updateuser}>
                Add
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
}

export default AddNews;
