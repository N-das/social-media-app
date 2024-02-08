import React, { useEffect, useState } from "react";
import "../style/Profile.css";
import PostDetail from "./PostDetail";
import ProfilePic from "./ProfilePic";
const Profile = () => {
  let picLink = "https://cdn-icons-png.flaticon.com/128/847/847969.png";
  const [pic, setPic] = useState([]);
  const [show, setShow] = useState(false);
  const [savedPost, setSavedPost] = useState(false);
  const [post, setPost] = useState([]);
  const [changePic, setChangePic] = useState(false);
  const [user, setUser] = useState("");

  const viewPost = () => {
    if (savedPost) {
      setSavedPost(false);
    } else {
      setSavedPost(true);
    }
  };

  const viewDetails = (posts) => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      setPost(posts);
      console.log(posts);
    }
  };

  const changeprofile = () => {
    if (changePic) {
      setChangePic(false);
    } else {
      setChangePic(true);
    }
  };

  useEffect(() => {
    fetch(
      `http://localhost:5000/user/${
        JSON.parse(localStorage.getItem("user"))._id
      }`,
      {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("jwt"),
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setPic(result.post);
        setUser(result.user);
        console.log(pic);
      });
    // console.log("ffee");
  }, []);
  return (
    <div className="profile">
      <div className="profile-frame">
        <div className="profile-pic">
          <img
            onClick={changeprofile}
            style={{ cursor: "pointer" }}
            src={user.Photo ? user.Photo : picLink}
            alt=""
          />
        </div>
        <div className="user-data">
          <h2>{JSON.parse(localStorage.getItem("user")).userName}</h2>
          <div className="profile-info">
            <p>{pic ? pic.length : "0"} posts</p>
            <p>{user.followers ? user.followers.length : "0"} follower</p>
            <p>{user.following ? user.following.length : "0"} following</p>
          </div>
          <h2>{JSON.parse(localStorage.getItem("user")).name}</h2>
        </div>
      </div>
      <hr style={{ width: "90%", margin: "15px auto", opacity: "0.8" }} />
      <span className="toggle-post">
        <p
          onClick={() => {
            viewPost();
          }}
        >
          POSTS
        </p>
        <p
          onClick={() => {
            viewPost();
          }}
        >
          SAVEDPOST
        </p>
      </span>
      {savedPost ? (
        <div>
          <h1>saved post</h1>
          <img src={user.Photo} alt="" />
        </div>
      ) : (
        <div className="all-post">
          {pic.map((pics) => {
            return (
              <img
                key={pics._id}
                src={pics.photo}
                className="item"
                onClick={() => {
                  viewDetails(pics);
                }}
              ></img>
            );
          })}
        </div>
      )}

      {show && <PostDetail item={post} user={user} viewDetails={viewDetails} />}
      {changePic && <ProfilePic changeprofile={changeprofile} />}
    </div>
  );
};
export default Profile;
