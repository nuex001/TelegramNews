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
function AddNews() {
  const [isUploaded, setIsUploaded] = useState(false);
  const [timer, setTimer] = useState(null);
  const [role, setRole] = useState(null);
  const formRef = useRef(null);
  const [file, setFile] = useState(null);
  const [posts, setposts] = useState(false);

  const navigate = useNavigate();

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
      const res = await axios.post(
        "https://b3bf-102-90-58-52.ngrok-free.app/api/post/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);
      successMsg(res.data.msg);
      clearTimeout(timer);
      setTimer(() =>
        setTimeout(() => {
          navigate("/");
        }, 5000)
      );
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

  // FECTH POSTS
  const fetchPosts = async () => {
    try {
      const res = await axios.get("https://b3bf-102-90-58-52.ngrok-free.app/api/post/");
      setposts(res.data);
    } catch (error) {
      console.log(error);
      errorMsgs("Server Error");
    }
  };
  //
  const approve = async (e) => {
    const id = e.target.getAttribute("data-id");
    const granny = e.target.parentNode.parentNode;
    // console.log(id);
    try {
      const res = await axios.put(`https://b3bf-102-90-58-52.ngrok-free.app/api/post/`, {
        id: id,
        status: "approve",
      });
      granny.remove();
      successMsg(res.data.msg);
      clearTimeout(timer);
      setTimer(() =>
        setTimeout(() => {
          window.location.reload();
        }, 5000)
      );
    } catch (error) {
      console.log(error);
    }
  };
  //
  const decline = async (e) => {
    const id = e.target.getAttribute("data-id");
    const granny = e.target.parentNode.parentNode;
    // console.log(id);
    try {
      const res = await axios.put(`https://b3bf-102-90-58-52.ngrok-free.app/api/post/`, {
        id: id,
        status: "decline",
      });
      granny.remove();
      successMsg(res.data.msg);
      clearTimeout(timer);
      setTimer(() =>
        setTimeout(() => {
          window.location.reload();
        }, 5000)
      );
    } catch (error) {
      console.log(error);
    }
  };

  // updateUser
  const updateUser = async (e) => {
    e.preventDefault();
    const type = e.target.getAttribute("data-type");
    const username = formRef.current.username.value;
    try {
      const res = await axios.put(`https://b3bf-102-90-58-52.ngrok-free.app/api/user/`, {
        username: username,
        status: type,
      });
      successMsg(res.data.msg);
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
    setRole(localStorage.getItem("role"));
    if (localStorage.getItem("role") === "reviewer") {
      fetchPosts();
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
              <button data-type="remove" onClick={updateUser}>
                Remove
              </button>
              <button data-type="add" onClick={updateUser}>
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
