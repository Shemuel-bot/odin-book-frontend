
import style from "../css/ProfilePage.module.css";
import { useState } from "react";
import Post from "./Components/Post";
import Comment from "./Components/Comment";

function UsersProfilePage() {
  const user = JSON.parse(localStorage.getItem("userProfile"))
  const [tweets, setTweets] = useState([]);

  const tweetsClickHandler = async (username) => {
    await fetch(`https://greasy-sallie-panda-bear-studios-863963ff.koyeb.app/api/v1/users/posts/${username}`, {
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
    await fetch(
      `https://greasy-sallie-panda-bear-studios-863963ff.koyeb.app/api/v1/user/comments/${username}`
    ).then(async (res) => {
      const a = await res.json();
      console.log(a);
      const ui = [];
      a.message.forEach((x) => {
        ui.push(
          <Comment profile={x.profile} username={x.username} text={x.text} />
        );
      });

      setTweets(ui);
    }).catch(err => {
      console.log(err)
    });
  };

  const likedPostClickHandler = async (id) => {
    await fetch(
      `https://greasy-sallie-panda-bear-studios-863963ff.koyeb.app/api/v1/user/posts/liked/${id}`
    ).then(async (res) => {
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
    }).catch(err => {
      console.log(err)
    });
  };

  return (
    <div className={style.container}>
      <header className={style.header}>
        <img src={user.profile} alt="" className={style.profile} />
      </header>
      <div className={style.uibody}>
        <div className={style.info}>
          <h2>
            {user.username}
          </h2>

          {user.bio === "" ? (
            <p
            id="bio"
            className={style.textarea}
            spellCheck={false}
          >No bio here</p>
          ) : (
            <p
              id="bio"
              className={style.textarea}
              spellCheck={false}
            >{user.bio}</p>
          )}

          <div className={style.followinginfo}>
            <h4>{Array.isArray(user.following) ? user.following.length : 0} Following</h4>
            <h4>{Array.isArray(user.followers) ? user.followers.length : 0} Followers</h4>
          </div>
        </div>

        <div className={style.options}>
          <button
            className={style.optionsbtns}
            onClick={() => {
              tweetsClickHandler(user.username);
            }}
          >
            <h4>Tweets</h4>
          </button>
          <button
            className={style.optionsbtns}
            onClick={() => {
              repliesClickHandler(user.username);
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

export default UsersProfilePage;
