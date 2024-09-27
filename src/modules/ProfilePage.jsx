// import profile from "/home/shemuel/repos/odin-book-frontend/src/assets/icons/user.png";
// import heart from "/home/shemuel/repos/odin-book-frontend/src/assets/icons/heart.png";
// import comments from "/home/shemuel/repos/odin-book-frontend/src/assets/icons/chat.png";
// import retweet from "/home/shemuel/repos/odin-book-frontend/src/assets/icons/reload.png";
import style from "../css/ProfilePage.module.css";
import { useState } from "react";
import { useEffect } from "react";
import Post from "./Post";
import Comment from "./Comment";

function ProfilePage() {
  const [user, setUser] = useState({});
  const [tweets, setTweets] = useState([]);

  const tweetsClickHandler = async (username) => {
    await fetch(`http://localhost:3000/api/v1/users/posts/${username}`, {
      headers: { "Content-Type": "application/json" },
    })
      .then(async (res) => {
        const a = await res.json();
        const ui = [];
        a.message.forEach((x) => {
          ui.push(
            <Post
              id={x.id}
              profile={x.profile}
              username={x.username}
              text={x.text}
              likes={x.likes}
              likesId={x.likesId}
              userId={user.id}
            />
          );
        });
        setTweets(ui);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const repliesClickHandler = async (username) => {
    await fetch(`http://localhost:3000/api/v1/user/comments/${username}`).then(
      async (res) => {
        const a = await res.json();
        console.log(a)
        const ui = [];
        a.message.forEach((x) => {
          ui.push(
            <Comment profile={x.profile} username={x.username} text={x.text} />
          );
        });

        setTweets(ui);
      }
    );
  };

  const likedPostClickHandler = async (id) => {
    await fetch(`http://localhost:3000/api/v1/user/posts/liked/${id}`).then(
      async (res) => {
        const a = await res.json();
        const ui = [];
        a.message.forEach((x) => {
          ui.push(
            <Post
              id={x.id}
              profile={x.profile}
              username={x.username}
              text={x.text}
              likes={x.likes}
              likesId={x.likesId}
              userId={user.id}
            />
          );
        });
        setTweets(ui);
      }
    );
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/user", {
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    }).then(async (res) => {
      const a = await res.json();
      setUser(a.message);
    });
  }, []);

  return (
    <div className={style.container}>
      <header className={style.header}>
        <img src={user.img} alt="" className={style.profile} />
        <button className={style.btn}>
          <h4>Save</h4>
        </button>
      </header>
      <div className={style.uibody}>
        <div className={style.info}>
          <h2>{user.userName}</h2>
          <textarea
            className={style.textarea}
            spellCheck={false}
            rows={3}
            maxLength={160}
            placeholder="Bio must be within 160 characters"
          ></textarea>
          <div className={style.followinginfo}>
            <h4>0 Following</h4>
            <h4>0 Followers</h4>
          </div>
        </div>

        <div className={style.options}>
          <button
            className={style.optionsbtns}
            onClick={() => {
              tweetsClickHandler(user.userName);
            }}
          >
            <h4>Tweets</h4>
          </button>
          <button
            className={style.optionsbtns}
            onClick={() => {
              repliesClickHandler(user.userName);
            }}
          >
            <h4>Replies</h4>
          </button>
          <button
            className={style.optionsbtns}
            onClick={() => {
              likedPostClickHandler(user.id);
            }}
          >
            <h4>Likes</h4>
          </button>
        </div>
      </div>

      <div className={style.postcontainer}>{tweets}</div>
    </div>
  );
}

export default ProfilePage;
