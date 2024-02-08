import React, { useEffect, useRef, useState } from "react";
// import "./Profile.css";
const ProfilePic = ({ changeprofile }) => {
  const hiddenFileInput = useRef(null);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const postDetails = () => {
    // console.log(body, image);
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

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const postPic = () => {
    fetch("http://localhost:5000/uploadProfilePic", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        pic: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // if (data.error) {
        //   notifyA(data.error);
        // } else {
        //   notifyB("Successfully Posted");
        //   navigate("/");
        // }
        changeprofile();
        window.location.reload();
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (url) {
      postPic();
    }
  }, [url]);

  useEffect(() => {
    if (image) {
      postDetails();
    }
  }, [image]);

  return (
    <div className="profile-pic darkBg">
      <div className="changepic center">
        <div>
          <h2 style={{ color: "#4c4c4c" }}>change profile pic</h2>
        </div>
        <div>
          <button
            className="upload-btn"
            style={{ color: "#0d6efd" }}
            onClick={handleClick}
          >
            upload
          </button>
          <input
            type="file"
            ref={hiddenFileInput}
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
        </div>
        <div>
          <button
            className="upload-btn"
            style={{ color: "#ed4956" }}
            onClick={() => {
              setUrl(null);
              postPic();
            }}
          >
            Remove Current Photo
          </button>
        </div>
        <div>
          <button style={{ color: "#6f6f6f" }} onClick={() => changeprofile()}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProfilePic;
