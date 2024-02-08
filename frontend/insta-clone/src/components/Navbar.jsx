import React, { useContext } from "react";
import "../style/Navbar.css";
import Logo from "../images/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import { GoHomeFill } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { MdOutlineExplore } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
// import { IoCreateOutline } from "react-icons/io5";
import { MdOutlineAddBox } from "react-icons/md";

const Navbar = ({ login }) => {
  const navigate = useNavigate();
  const { setModel } = useContext(LoginContext);
  const loginStatus = () => {
    const token = localStorage.getItem("jwt");
    // console.log(token);
    if (login || token) {
      return [
        <>
          <Link to="/Profile">
            <li>Profile</li>
          </Link>
          <Link to="/createPost">
            <li>Create</li>
          </Link>
          <Link to={"followingpost"}>
            <li>My Following Post</li>
          </Link>
          <Link to={""}>
            <button
              className="primaryBtn"
              onClick={() => {
                setModel(true);
              }}
            >
              Log-out
            </button>
          </Link>
        </>,
      ];
    } else {
      return [
        <>
          <Link to="/SignUp">
            <li>Sign-up</li>
          </Link>
          <Link to="/SignIn">
            <li>Sign-in</li>
          </Link>
        </>,
      ];
    }
  };

  const loginStatusForMobile = () => {
    const token = localStorage.getItem("jwt");
    // console.log(token);
    if (login || token) {
      return [
        <>
          <Link to="/">
            <li>
              <GoHomeFill />
            </li>
          </Link>
          <Link to="/Profile">
            <li>
              <CgProfile />
            </li>
          </Link>
          <Link to="/createPost">
            <li>
              <MdOutlineAddBox />
            </li>
          </Link>
          <Link to={"followingpost"}>
            <li>
              <MdOutlineExplore />
            </li>
          </Link>
          <Link to={""}>
            <li
              // className="primaryBtn"
              onClick={() => {
                setModel(true);
              }}
            >
              <IoIosLogOut />
            </li>
          </Link>
        </>,
      ];
    } else {
      return [
        <>
          {/* <Link to="/SignUp">
            <li>Sign-up</li>
          </Link>
          <Link to="/SignIn">
            <li>Sign-in</li>
          </Link> */}
        </>,
      ];
    }
  };

  return (
    <div className="main">
      <div className="navbar">
        <img
          src={Logo}
          id="insta-logo"
          alt=""
          onClick={() => {
            navigate("/");
          }}
        />
        <ul className="navbar-list">{loginStatus()}</ul>
        <ul className="navbar-mobile">{loginStatusForMobile()}</ul>
      </div>
    </div>
  );
};
export default Navbar;
