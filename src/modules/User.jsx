/* eslint-disable react/prop-types */
import { useState } from "react";
import style from "../css/UserSearch.module.css";

function User({ profile, username, id }) {
  const followClickHandler = async () => {
    await fetch("http://localhost:3000/api/v1/users/follow", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        id: id,
      }),
    });

    setButton(
      <button
        onClick={() => {
          followClickHandler();
        }}
      >
        <h4>Follow</h4>
      </button>
    );
  };
  const unFollowClickHandler = async () => {
    await fetch("http://localhost:3000/api/v1/users/unfollow", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        id: id,
      }),
    });

    setButton(
      <button
        onClick={() => {
          unFollowClickHandler()
        }}
      >
        <h4>UnFollow</h4>
      </button>
    );
  };
  const [button, setButton] = useState(
    <button
      onClick={() => {
        followClickHandler();
      }}
    >
      <h4>Follow</h4>
    </button>
  );

  return (
    <div className={style.userdiv}>
      <img src={profile} alt="" className={style.icons} />
      <h4 style={{ marginLeft: "5px", marginRight: "auto" }}>{username}</h4>
      {button}
    </div>
  );
}

export default User;
