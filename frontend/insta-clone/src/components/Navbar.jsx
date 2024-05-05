import React, { useContext, useState } from "react";
import "../style/Navbar.css";
import Logo from "../images/Brand.png";
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
  const [activePage, setActivePage] = useState("home");

  const handleSetActivePage = (page) => {
    setActivePage(page);
  };

  const getIconStyle = (page) => {
    return activePage === page ? { color: "#000" } : { color: "grey" };
  };

  const loginStatus = () => {
    const token = localStorage.getItem("jwt");
    // console.log(token);
    if (login || token) {
      return [
        <>
          <Link
            to="/"
            className={activePage === "home" ? "active" : ""}
            onClick={() => handleSetActivePage("home")}
          >
            <li>
              <GoHomeFill style={getIconStyle("home")} />
            </li>
          </Link>

          <Link
            to="/createPost"
            className={activePage === "Add" ? "active" : ""}
            onClick={() => handleSetActivePage("add")}
          >
            <li>
              <MdOutlineAddBox style={getIconStyle("add")} />
            </li>
          </Link>
          <Link
            to={"followingpost"}
            className={activePage === "following" ? "active" : ""}
            onClick={() => handleSetActivePage("following")}
          >
            <li>
              {" "}
              <MdOutlineExplore style={getIconStyle("following")} />
            </li>
          </Link>
          <Link
            to="/Profile"
            className={activePage === "profile" ? "active" : ""}
            onClick={() => handleSetActivePage("profile")}
          >
            <li>
              {" "}
              <CgProfile style={getIconStyle("profile")} />
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
          id="logo"
          alt=""
          onClick={() => {
            navigate("/");
          }}
        />

        <ul className="navbar-list">{loginStatus()}</ul>
        <ul className="navbar-mobile">{loginStatusForMobile()}</ul>
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
      </div>
    </div>
  );
};
export default Navbar;
// import React, { useContext } from "react";
// import "../style/Navbar.css";
// import Logo from "../images/Logo.png";
// import { Link, useNavigate } from "react-router-dom";
// import { LoginContext } from "../context/LoginContext";
// import { GoHomeFill } from "react-icons/go";
// import { CgProfile } from "react-icons/cg";
// import { MdOutlineExplore } from "react-icons/md";
// import { IoIosLogOut } from "react-icons/io";
// // import { IoCreateOutline } from "react-icons/io5";
// import { MdOutlineAddBox } from "react-icons/md";

// const Navbar = ({ login }) => {
//   const navigate = useNavigate();
//   const { setModel } = useContext(LoginContext);
//   const loginStatus = () => {
//     const token = localStorage.getItem("jwt");
//     // console.log(token);
//     if (login || token) {
//       return [
//         <>
//           <Link to=".">
//             <li>
//               {" "}
//               <div className="flex-nav">
//                 <GoHomeFill className="nav" />
//                 Home
//               </div>
//             </li>
//           </Link>
//           <Link to="/Profile">
//             <li>
//               {" "}
//               <div className="flex-nav">
//                 <CgProfile className="nav" />
//                 Profile
//               </div>
//             </li>
//           </Link>
//           <Link to="/createPost">
//             <li>
//               {" "}
//               <div className="flex-nav">
//                 <MdOutlineAddBox className="nav" />
//                 Create
//               </div>
//             </li>
//           </Link>
//           <Link to={"followingpost"}>
//             <li>
//               {" "}
//               <div className="flex-nav">
//                 <MdOutlineExplore className="nav" />
//                 Explore
//               </div>
//             </li>
//           </Link>
//           <Link to={""}>
//             <button
//               className="primaryBtn"
//               onClick={() => {
//                 setModel(true);
//               }}
//             >
//               Log-out
//             </button>
//           </Link>
//         </>,
//       ];
//     } else {
//       return [
//         <>
//           {/* <Link to="/SignUp">
//             <li>Sign-up</li>
//           </Link>
//           <Link to="/SignIn">
//             <li>Sign-in</li>
//           </Link> */}
//         </>,
//       ];
//     }
//   };

//   const loginStatusForMobile = () => {
//     const token = localStorage.getItem("jwt");
//     // console.log(token);
//     if (login || token) {
//       return [
//         <>
//           <Link to="/">
//             <li>
//               <GoHomeFill />
//             </li>
//           </Link>
//           <Link to="/Profile">
//             <li>
//               <CgProfile />
//             </li>
//           </Link>
//           <Link to="/createPost">
//             <li>
//               <MdOutlineAddBox />
//             </li>
//           </Link>
//           <Link to={"followingpost"}>
//             <li>
//               <MdOutlineExplore />
//             </li>
//           </Link>
//           <Link to={""}>
//             <li
//               // className="primaryBtn"
//               onClick={() => {
//                 setModel(true);
//               }}
//             >
//               <IoIosLogOut />
//             </li>
//           </Link>
//         </>,
//       ];
//     } else {
//       return [
//         <>
//           {/* <Link to="/SignUp">
//             <li>Sign-up</li>
//           </Link>
//           <Link to="/SignIn">
//             <li>Sign-in</li>
//           </Link> */}
//         </>,
//       ];
//     }
//   };

//   return (
//     <div className="main">
//       <div className="navbar">
//         <p id="insta-logo">Socio-Pedia</p>

//         <ul className="navbar-list">{loginStatus()}</ul>
//         <ul className="navbar-mobile">{loginStatusForMobile()}</ul>
//       </div>
//     </div>
//   );
// };
// export default Navbar;
