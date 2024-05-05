import React, { useEffect, useRef, useState } from "react";
import "../style/Createpost.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Logo from "../images/Brand.png";

const Createpost = () => {
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const hiddenFileInput = useRef(null);
  const onClick = () => {
    hiddenFileInput.current.click();
    // let load = document.getElementById("upload-btn");
    // load.style.display = "none";
  };
  // useRef
  const notifyA = (err) => toast.error(err);
  const notifyB = (err) => toast.success(err);

  useEffect(() => {
    if (url) {
      fetch("http://localhost:5000/createPost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          body,
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            notifyA(data.error);
          } else {
            notifyB("Successfully Posted");
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [url]);

  // posting image to cloudianary
  const postDetails = () => {
    console.log(body, image);
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "knvmcloud");
    fetch("https://api.cloudinary.com/v1_1/knvmcloud/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => setUrl(data.url))
      .catch((err) => console.log(err));
  };

  const loadFile = (event) => {
    let output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
    if (output.src) {
      let load = document.getElementById("upload-btn");
      load.style.display = "none";
    }
  };

  return (
    <div className="darkB">
      <div className="create-post">
        <div className="header">
          <h4>Create New Post</h4>
          <button id="post-btn" onClick={postDetails}>
            Share
          </button>
        </div>
        <div className="main-div">
          <img
            id="output"
            src={Logo} // src="https://lh3.googleusercontent.com/EbXw8rOdYxOGdXEFjgNP8lh-YAuUxwhOAe2jhrz3sgqvPeMac6a6tHvT35V6YMbyNvkZL4R_a2hcYBrtfUhLvhf-N2X3OB9cvH4uMw=w1064-v0"
          />
          <input
            type="file"
            accept="image/*"
            ref={hiddenFileInput}
            style={{ display: "none" }}
            onChange={(event) => {
              loadFile(event);
              setImage(event.target.files[0]);
            }}
          />
          <button id="upload-btn" onClick={onClick}>
            Upload Post
          </button>
        </div>
        <div className="details">
          <div className="card-header">
            <div className="card-pic">
              <img
                src="https://images.unsplash.com/photo-1541576980233-97577392db9a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTJ8NzYwODI3NzR8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </div>
            <h5>Krish</h5>
          </div>
          <textarea
            value={body}
            onChange={(event) => {
              setBody(event.target.value);
            }}
            type="text"
            placeholder="Write a caption...."
          ></textarea>
        </div>
      </div>
    </div>
  );
};
export default Createpost;
