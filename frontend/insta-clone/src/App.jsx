import { createContext, useEffect, useState } from "react";
import "./App.css";
import "./style/Navbar.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Profile from "./components/Profile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Createpost from "./components/Createpost";
import { LoginContext } from "./context/LoginContext";
import Model from "./components/Model";
import UserProfile from "./components/UserProfile";
import MyFollowingPost from "./components/MyFollowingPost";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Loader from "./components/Loader";

// import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  const [userLogin, setUserLogin] = useState(false);
  const [model, setModel] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Simulate loading delay (Remove this in your actual implementation)
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust as needed

    return () => clearTimeout(timeout);
  }, []);
  // useEffect
  return (
    <BrowserRouter>
      <div className="App">
        <Loader loading={loading} />
        <GoogleOAuthProvider clientId="404752276702-b2ns027c0fin75hlb2e409h82vmh7fj8.apps.googleusercontent.com">
          <LoginContext.Provider value={{ setUserLogin, setModel }}>
            <Navbar login={userLogin} />
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/signup" element={<SignUp />}></Route>
              <Route path="/signin" element={<SignIn />}></Route>
              <Route exact path="/profile" element={<Profile />}></Route>
              <Route path="/createpost" element={<Createpost />}></Route>
              <Route path="/profile/:userId" element={<UserProfile />}></Route>
              <Route
                path="/followingpost"
                element={<MyFollowingPost />}
              ></Route>
            </Routes>
            <ToastContainer theme="dark" position="bottom-right" />
            {/* <Model></Model> */}
            {model && <Model setmodel={setModel}></Model>}
          </LoginContext.Provider>
        </GoogleOAuthProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
