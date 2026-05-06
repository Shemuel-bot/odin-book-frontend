/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import style from "../../css/UserSearch.module.css";
import { useNavigate } from "react-router-dom";

function User({ profile, username, id, bio, following, followers, isFollowing = false, onFollowChange }) {
  const navigate = useNavigate();
  const [isFollowingState, setIsFollowingState] = useState(isFollowing);
  const [isLoading, setIsLoading] = useState(false);

  const profilePageClickHandler = () => {
    const profileData = {
      id,
      profile,
      username,
      bio,
      following,
      followers,
    };

    localStorage.setItem("userProfile", JSON.stringify(profileData));
    navigate("/feed/profile-page", { state: { userProfile: profileData } });
  };

  const followClickHandler = async () => {
    setIsLoading(true);
    const response = await fetch("https://greasy-sallie-panda-bear-studios-863963ff.koyeb.app/api/v1/users/follow", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        id,
      }),
    }).catch((err) => {
      console.log(err);
    });

    setIsLoading(false);
    if (!response || !response.ok) return;

    setIsFollowingState(true);
    onFollowChange?.(id, true, {
      profile,
      username,
      id,
      bio,
      followers,
      following,
    });
  };

  const unFollowClickHandler = async () => {
    setIsLoading(true);
    const response = await fetch("https://greasy-sallie-panda-bear-studios-863963ff.koyeb.app/api/v1/users/unfollow", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        id,
      }),
    }).catch((err) => {
      console.log(err);
    });

    setIsLoading(false);
    if (!response || !response.ok) return;

    setIsFollowingState(false);
    onFollowChange?.(id, false, {
      profile,
      username,
      id,
      bio,
      followers,
      following,
    });
  };

  useEffect(() => {
    setIsFollowingState(isFollowing);
  }, [isFollowing]);

  return (
    <div className={style.userdiv}>
      <img
        src={profile}
        alt=""
        className={style.icons}
        onClick={profilePageClickHandler}
      />
      <h4 style={{ marginLeft: "5px", marginRight: "auto" }}>{username}</h4>
      {isFollowingState ? (
        <button onClick={unFollowClickHandler} disabled={isLoading}>
          <h4>UnFollow</h4>
        </button>
      ) : (
        <button onClick={followClickHandler} disabled={isLoading}>
          <h4>Follow</h4>
        </button>
      )}
    </div>
  );
}

export default User;
