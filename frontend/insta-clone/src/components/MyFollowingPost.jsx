import React, { useEffect, useState } from "react";
import "../style/Home.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
// import { IoClose } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
// import { FaRegComment } from "react-icons/fa";
import { MdOutlineModeComment } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa";
import { RxGrid } from "react-icons/rx";
// import { SiCodesandbox } from "react-icons/si";
import { MdCheckBoxOutlineBlank } from "react-icons/md";

const MyFollowingPost = () => {
  let picLink = "https://cdn-icons-png.flaticon.com/128/847/847969.png";
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [comment, setComment] = useState([]);
  const [show, setShow] = useState(false);
  const [item, setItem] = useState([]);
  const [gridView, setGridView] = useState(true);

  const notifyA = (err) => toast.error(err);
  const notifyB = (err) => toast.success(err);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("./signin");
    }
    fetch("http://localhost:5000/myfollowingpost", {
      headers: {
        Authorization: "Bearer" + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result);
      })
      .catch((err) => console.log(err));
  }, []);

  const likePost = (id) => {
    fetch("http://localhost:5000/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id == result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setData(newData);
        console.log(result);
      });
  };

  const unlikePost = (id) => {
    fetch("http://localhost:5000/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id == result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setData(newData);
        console.log(result);
      });
  };

  const makeComment = (text, id) => {
    console.log(comment);
    fetch("http://localhost:5000/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        text: text,
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id == result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setData(newData);
        setComment("");
        notifyB("commented successfully");
        console.log(result);
      });
  };

  const viewComment = (posts) => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      setItem(posts);
      console.log(item);
    }
  };

  const toggleView = () => {
    setGridView(!gridView);
  };

  return (
    <div className={gridView ? "home grid-view" : "home"}>
      <button className="grid-btn" onClick={toggleView}>
        {gridView ? <RxGrid /> : <MdCheckBoxOutlineBlank />}
      </button>
      {data.map((posts) => {
        return (
          <div className="card">
            <div>
              <div className="card-image">
                <img
                  src={posts.photo}
                  alt=""
                  onClick={() => {
                    viewComment(posts);
                  }}
                />
              </div>
              <div className="card-header">
                <div className="like-comment">
                  <div className="card-pic">
                    {/* <img
                      src="https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=1966&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""
                      /> */}
                    <img
                      src={
                        posts.postedBy.Photo ? posts.postedBy.Photo : picLink
                      }
                      // onDoubleClick={() => {
                      //   likePost(posts._id);
                      // }}
                      alt=""
                    />

                    <h5>
                      <Link
                        to={`/profile/${posts.postedBy._id}`}
                        style={{ color: "#000" }}
                      >
                        {" "}
                        {posts.postedBy.name}
                      </Link>
                    </h5>
                  </div>
                  <div className="card-content">
                    <p id="like">{posts.likes.length} likes</p>
                    {posts.likes.includes(
                      JSON.parse(localStorage.getItem("user"))._id
                    ) ? (
                      <span
                        className="material-symbols-outlined material-symbols-outlined-red"
                        onClick={() => {
                          unlikePost(posts._id);
                        }}
                      >
                        favorite
                      </span>
                    ) : (
                      <span
                        className="material-symbols-outlined"
                        id="fav"
                        onClick={() => {
                          likePost(posts._id);
                        }}
                      >
                        favorite
                      </span>
                    )}
                    {/* <span
                  id="like-on-center"
                  className="material-symbols-outlined material-symbols-outlined-red"
                >
                  favorite
                </span> */}
                    <MdOutlineModeComment
                      id="message"
                      onClick={() => {
                        viewComment(posts);
                      }}
                    />
                    {/* <FaRegBookmark id="bookMark" /> */}

                    {/* <p
                      style={{ fontWeight: "bolder", cursor: "pointer" }}
                      onClick={() => {
                        viewComment(posts);
                      }}
                    >
                      {" "}
                      view all comments
                    </p> */}
                  </div>
                </div>
              </div>
              <div className="add-comment">
                <span className="material-symbols-outlined">mood</span>
                <input
                  type="text"
                  placeholder="Add a comment"
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
                <button
                  type="button"
                  className="btn btn-primary post-comment"
                  onClick={() => {
                    if (comment.trim() !== "") {
                      // Check if comment is not empty or only contains whitespace
                      makeComment(comment, posts._id);
                      setComment(""); // Clear the input field after posting
                    } else {
                      notifyA("Please enter a comment before posting."); // Show an alert if comment is empty
                    }
                  }}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {show && (
        <div className="showComment">
          <div className="container">
            <div className="postPic">
              <img src={item.photo} alt="" />
            </div>
            <div className="details">
              <div className="card-header">
                <div className="card-pic">
                  <img src={item.postedBy.Photo} alt="" />
                </div>
                <h5>{item.postedBy.name}</h5>
              </div>
              <div className="comment-section">
                {item.comments.map((comment) => {
                  return (
                    <p className="add-comment">
                      <span
                        className="user-comment"
                        style={{ fontWeight: "bolder", margin: "5px" }}
                      >
                        {comment.postedBy.name}
                      </span>

                      <span className="user-comment-text">
                        {comment.comment}
                      </span>
                    </p>
                  );
                })}
              </div>
              <div className="card-content">
                <p id="like">{item.likes.length} likes</p>
                <p>{item.body}</p>
              </div>
              <div className="add-comment">
                <span className="material-symbols-outlined">mood</span>
                <input
                  type="text"
                  placeholder="Add a comment"
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
                <button
                  type="button"
                  className="btn btn-primary post-comment"
                  onClick={() => {
                    makeComment(comment, item._id);
                    viewComment();
                  }}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
          <div className="close-comment">
            {/* <IoClose className="c" /> */}
            <IoMdClose className="c" onClick={() => setShow(false)} />
            {/* alternate {()=>viewComment()} */}
          </div>
        </div>
      )}
    </div>
  );
};
export default MyFollowingPost;
