import React from "react";

import "./Users.css";
import LeftSidebar from "../../components/LeftSidebar/LeftSideBar";
import { useDispatch, useSelector } from "react-redux";
import UsersList from "./UsersList";

const Users = ({ slideIn, handleSlideIn }) => {
  let theme=useSelector((state)=>state.fetchWeather);
  theme=theme?.data;
  return (
    <div className={`${theme!=="dark"?"home-container-1":"home-container-1-dark"}`}>
      <LeftSidebar slideIn={slideIn} handleSlideIn={handleSlideIn} />
      <div className="home-container-2" style={{ marginTop: "30px" }}>
        <h1 style={{ fontWeight: "400" }}>Users</h1>
        <UsersList />
      </div>
    </div>
  );
};

export default Users;