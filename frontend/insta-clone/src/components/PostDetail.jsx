import React, { useState } from "react";
import "../style/PostDetail.css";
import { IoMdClose } from "react-icons/io";
// import { MdDelete } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const PostDetail = ({ item, user, viewDetails }) => {
  // const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [comment, setComment] = useState([]);
  const [data, setData] = useState([]);
  const notifyA = (err) => toast.error(err);
  const notifyB = (err) => toast.success(err);
  const [show, setShow] = useState(false);
  // const [item, setItem] = useState([]);

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
        window.location.reload();
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

  const deletePost = (postId) => {
    // console.log(postId);

    if (window.confirm("You really want to DELETE this post ?")) {
      fetch(`http://localhost:5000/deletePost/${postId}`, {
        method: "delete",
        headers: {
          Authorization: "Bearer" + localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          viewDetails();
          navigate("/");
          notifyB(result.message);
        });
    }
  };
  return (
    <div>
      <div className="showComment">
        <div className="container">
          <div className="postPic">
            <img src={item.photo} alt="" />
          </div>
          <div className="details">
            <div className="card-header">
              <div className="card-pic">
                <img src={user.Photo} alt="" />
              </div>
              <h5>{user.name}</h5>
              <div className="deletePost">
                {/* <MdDelete /> */}
                <RiDeleteBin6Line
                  onClick={() => {
                    deletePost(item._id);
                  }}
                />
              </div>
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

                    <span className="user-comment-text">{comment.comment}</span>
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
          <IoMdClose className="c" onClick={() => viewDetails()} />
        </div>
        {/* <IoClose className="c" /> */}
        {/* alternate {()=>viewComment()} */}
      </div>
    </div>
  );
};
export default PostDetail;
