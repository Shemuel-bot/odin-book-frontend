/* eslint-disable react/prop-types */
import heart from "/home/shemuel/repos/odin-book-frontend/src/assets/icons/heart.png";
import red_heart from "../assets/icons/red_heart.png";
import comments from "/home/shemuel/repos/odin-book-frontend/src/assets/icons/chat.png";
import retweet from "/home/shemuel/repos/odin-book-frontend/src/assets/icons/reload.png";
import style from "../css/ProfilePage.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const likeHandler = async (id) => {
  await fetch(`http://localhost:3000/api/v1/posts/likes`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
    body: JSON.stringify({
      id: id,
    }),
  }).catch((err) => {
    console.log(err);
  });
};

const dislikeHandler = async (id) => {
  await fetch(`http://localhost:3000/api/v1/posts/dislikes`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
    body: JSON.stringify({
      id: id,
    }),
  }).catch((err) => {
    console.log(err);
  });
};

function Post({ id, profile, username, text, likes, likesId, userId }) {
  const [myLikes, setMyLikes] = useState(likes);
  const [myLikesId, setMyLikesId] = useState(likesId);
  const post = {
    id: id,
    profile: profile,
    username: username,
    text: text,
    likes: myLikes,
    likesId: myLikesId,
  };

  return (
    <div className={style.post}>
      <div className={style.dividend}>
        <img src={profile} alt="" className={style.userimg} />
        <div>
          <h4>{username}</h4>
          <p>{text}</p>
        </div>
      </div>
      <div className={style.postoptions}>
        <Link to="/feed/comments">
          <button
            className={style.postoptionsbtn}
            onClick={() => {
              localStorage.setItem("post", JSON.stringify(post));
              localStorage.setItem("userid", userId);
            }}
          >
            <img src={comments} alt="" />
          </button>
        </Link>
        <Link to="/post">
          <button
            className={style.postoptionsbtn}
            onClick={() => {
              localStorage.setItem("retweet", text);
            }}
          >
            <img src={retweet} alt="" />
          </button>
        </Link>

        {myLikesId.includes(userId) ? (
          <button
            className={style.postoptionsbtn}
            onClick={() => {
              const a = myLikesId;
              a.splice(a.indexOf(userId), 1);

              dislikeHandler(id);
              document.getElementById(id).src = heart;

              setMyLikes(myLikes - 1);
              setMyLikesId(a);
            }}
          >
            <img src={red_heart} id={id} alt="" />
            {myLikes}
          </button>
        ) : (
          <button
            className={style.postoptionsbtn}
            onClick={() => {
              const a = myLikesId;
              a.push(userId);

              likeHandler(id);
              document.getElementById(id).src = red_heart;

              setMyLikes(myLikes + 1);
              setMyLikesId(a);
            }}
          >
            <img src={heart} id={id} alt="" />
            {myLikes}
          </button>
        )}
      </div>
    </div>
  );
}

export default Post;
