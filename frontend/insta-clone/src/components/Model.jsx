import React, { useContext } from "react";
import { IoClose } from "react-icons/io5";
import "../style/model.css";
import { LoginContext } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";
const Model = ({ setmodel }) => {
  const navigate = useNavigate();
  const { setModel } = useContext(LoginContext);
  return (
    <div
      className="darkBg"
      onClick={() => {
        setmodel(false);
      }}
    >
      <div className="center">
        <div className="model">
          <div className="model-header">
            <h5 className="heading">Confirm</h5>
          </div>
          <button className="close-btn">
            <IoClose
              onClick={() => {
                setModel(false);
              }}
            />
          </button>
          <div className="model-content">Really want to Log-out ?</div>
          <div className="model-actions">
            <div className="action-container">
              <button
                className="logout-btn"
                onClick={() => {
                  setmodel(false);
                  localStorage.clear();
                  navigate("./signin");
                }}
              >
                Log-out
              </button>
              <button
                className="cancel-btn"
                onClick={() => {
                  setmodel(false);
                }}
              >
                cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Model;
