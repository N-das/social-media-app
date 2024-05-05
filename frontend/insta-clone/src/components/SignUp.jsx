import React, { useContext, useEffect, useState } from "react";
import logo from "../images/Brand.png";
import "../style/Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { ToastContainer, toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { LoginContext } from "../context/LoginContext";

const SignUp = () => {
  // const fetchData = async () => {
  //   const response = await fetch("http://localhost:5000/");
  //   const data = await response.json();
  //   console.log(data);
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);
  const { setUserLogin } = useContext(LoginContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const notifyA = (err) => toast.error(err);
  const notifyB = (err) => toast.success(err);

  const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passwordValidation =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  const postData = () => {
    if (!emailValidation.test(email)) {
      // console.log("true");
      notifyA("Invalid email");
      return;
    } else if (!passwordValidation.test(password)) {
      notifyA(
        "password must contain 8 characters , including 1 lowercase , 1 uppercase , 1 numeric character and atleast one special character @,#,$,%,^ etc"
      );
      return;
    }

    fetch("http://localhost:5000/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        userName: userName,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyA(data.error);
        } else {
          notifyB(data.message);
          navigate("/SignIn");
        }

        console.log(data);
      });
  };

  const continueWithGoogle = (credentialResponse) => {
    console.log(credentialResponse);
    const jwtDetail = jwtDecode(credentialResponse.credential);
    console.log(jwtDetail);
    fetch("http://localhost:5000/googleLogin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: jwtDetail.name,
        email: jwtDetail.email,
        userName: jwtDetail.name,
        email_verified: jwtDetail.email_verified,
        clientId: credentialResponse.clientId,
        Photo: jwtDetail.picture,
        // password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyA(data.error);
        } else {
          notifyB("Signed in successfully");
          console.log(data);
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          setUserLogin(true);
          navigate("/");
        }

        console.log(data);
      });
  };

  return (
    <div className="signup">
      <div className="container">
        <div className="form">
          <img className="signup-Logo" src={logo} alt="" />
          <p className="box">
            Sign up to see photos and videos <br />
            from your friends
          </p>
          <div>
            <input
              type="email"
              value={email}
              placeholder="Email"
              name="email"
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="text"
              value={name}
              placeholder="Full name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              name="name"
              id="name"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Username"
              value={userName}
              name="username"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              id="username"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              id="password"
            />
          </div>
          <div
            className="box"
            style={{
              fontSize: "13px",
              fontWeight: "500",
              margin: "5px 0",
              color: "black",
            }}
          >
            By signing up, you agree to our Terms <br /> , Privacy Policy and
            Cookies Policy .
          </div>
          <input
            type="submit"
            id="submit-btn"
            value="sign-up"
            onClick={postData}
          />
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              // console.log(credentialResponse);
              // const jwtDetail = jwtDecode(credentialResponse.credential);
              // console.log(jwtDetail);
              continueWithGoogle(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>

        <div className="form2">
          Have an account ?{" "}
          <Link to="/SignIn">
            <span
              style={{ color: "#1773EA", cursor: "pointer", fontSize: "1rem" }}
            >
              Sign-in
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
