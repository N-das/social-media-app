import React, { useEffect, useState } from "react";
import "../style/Profile.css";
import PostDetail from "./PostDetail";
import { useParams } from "react-router-dom";
const UserProfile = () => {
  const [user, setUser] = useState("");
  //   const [show, setShow] = useState(false);

  const [post, setPost] = useState([]);
  const [follow, setFollow] = useState(false);
  const { userId } = useParams();
  let picLink = "https://cdn-icons-png.flaticon.com/128/847/847969.png";
  //   console.log(userId);

  //   const viewDetails = (posts) => {
  //     if (show) {
  //       setShow(false);
  //     } else {
  //       setShow(true);
  //       setPost(posts);
  //       console.log(posts);
  //     }
  //   };

  const followUser = (userId) => {
    fetch("http://localhost:5000/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setFollow(true);
        console.log(data);
      });
  };

  const unfollowUser = (userId) => {
    fetch("http://localhost:5000/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setFollow(false);
        console.log(data);
      });
  };

  useEffect(() => {
    fetch(`http://localhost:5000/user/${userId}`, {
      headers: {
        Authorization: "Bearer" + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setUser(result.user);
        setPost(result.post);
        if (
          result.user.followers.includes(
            JSON.parse(localStorage.getItem("user"))._id
          )
        ) {
          setFollow(true);
        }
        console.log(result);
      });
    // console.log("ffee");
  }, [follow]);
  return (
    <div className="profile">
      <div className="profile-frame">
        <div className="profile-pic">
          <img src={user.Photo ? user.Photo : picLink} alt="" />
        </div>
        <div className="user-data">
          <div className="user-follow">
            <h2>{user.userName}</h2>

            <span
              // className="follow-btn"
              onClick={() => {
                if (follow) {
                  unfollowUser(user._id);
                } else {
                  followUser(user._id);
                }
              }}
            >
              {follow ? (
                <button id="following">Following</button>
              ) : (
                <button>Follow</button>
              )}
            </span>
          </div>

          <div className="profile-info">
            <p>{post.length} posts</p>
            <p>{user.followers ? user.followers.length : "0"} follower</p>
            <p>{user.following ? user.following.length : "0"} following</p>
          </div>
          <h2>{JSON.parse(localStorage.getItem("user")).name}</h2>
          <h5 style={{ color: " rgb(111, 102, 102)" }}>
            created-at
            {user.createdAt}
          </h5>
        </div>
      </div>
      <hr style={{ width: "90%", margin: "28px auto", opacity: "0.8" }} />
      <div className="all-post">
        {post.map((pics) => {
          return (
            <img
              key={pics._id}
              src={pics.photo}
              className="item"
              //   onClick={() => {
              //     viewDetails(pics);
              //   }}
            ></img>
          );
        })}
      </div>
      {/* {show && <PostDetail item={post} viewDetails={viewDetails} />} */}
    </div>
  );
};
export default UserProfile;
