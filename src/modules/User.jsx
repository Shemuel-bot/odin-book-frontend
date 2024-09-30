/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import style from "../css/UserSearch.module.css";
import { useNavigate } from "react-router-dom";

function User({ profile, username, id, bio, following, followers }) {
  const navigate = useNavigate()

  const profilePageClickHandler = () => {
    localStorage.setItem("userProfile", JSON.stringify({
      id: id,
      profile: profile,
      username: username,
      bio: bio,
      following: following,
      followers: followers
    }))
    navigate('/feed/profile-page')
  }

  const followClickHandler = async () => {
    await fetch("https://greasy-sallie-panda-bear-studios-863963ff.koyeb.app/api/v1/users/follow", {
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
          unFollowClickHandler();
        }}
      >
        <h4>UnFollow</h4>
      </button>
    );
  };

  const unFollowClickHandler = async () => {
    await fetch("https://greasy-sallie-panda-bear-studios-863963ff.koyeb.app/api/v1/users/unfollow", {
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

  const [button, setButton] = useState(
    <button
      onClick={() => {
        followClickHandler();
      }}
    >
      <h4>Follow</h4>
    </button>
  );

  useEffect(() => {
    fetch("https://greasy-sallie-panda-bear-studios-863963ff.koyeb.app/api/v1/user", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    }).then(async (res) => {
      const a = await res.json();
      if (a.message.following.includes(id)) {
        setButton(
          <button
            onClick={() => {
              unFollowClickHandler();
            }}
          >
            <h4>UnFollow</h4>
          </button>
        );
      }
    });
  }, []);

  return (
    <div className={style.userdiv}>
      <img src={profile} alt="" className={style.icons} onClick={() => {profilePageClickHandler()}}/>
      <h4 style={{ marginLeft: "5px", marginRight: "auto" }}>{username}</h4>
      {button}
    </div>
  );
}

export default User;
