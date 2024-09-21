import user from "/home/shemuel/repos/odin-book-frontend/src/assets/icons/user.png";
import red_heart from "/home/shemuel/repos/odin-book-frontend/src/assets/icons/red_heart.png";
import heart from "/home/shemuel/repos/odin-book-frontend/src/assets/icons/heart.png";
import comments from "/home/shemuel/repos/odin-book-frontend/src/assets/icons/chat.png";
import retweet from "/home/shemuel/repos/odin-book-frontend/src/assets/icons/reload.png";
import style from "../css/ExplorerDisplay.module.css";
import { useState } from "react";

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


const clickHandler = async (route) => {
  const results = await fetch(`http://localhost:3000/api/v1/posts/${route}`, {
    method: "get",
    headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") },
  }).then(async (res) => {
    const a = await res.json();
    const ui = [];
    a.message.forEach((x) => {
      ui.push(
        <div className={style.post}>
          <div className={style.dividend}>
            <img src={x.profile} alt="" className={style.userimg} />
            <div>
              <h4>{x.username}</h4>
              <p>{x.text}</p>
            </div>
          </div>
          <div className={style.postoptions}>
            <button className={style.postoptionsbtn}>
              <img src={comments} alt="" />
            </button>
            <button className={style.postoptionsbtn}>
              <img src={retweet} alt="" />
            </button>

            {x.likesId.includes(a.userid) ? (
              <button
                className={style.postoptionsbtn}
                onClick={async () => {
                  await dislikeHandler(x.id);
                  x.likes += 1;
                  document.getElementById(x.id).src = heart;
                }}
              >
                <img src={red_heart} id={x.id} alt="" />
                {x.likes}
              </button>
            ) : (
              <button
                className={style.postoptionsbtn}
                onClick={async () => {
                  await likeHandler(x.id);
                  document.getElementById(x.id).src = red_heart;
                }}
              >
                <img src={heart} id={x.id} alt="" />
                {x.likes}
              </button>
            )}
          </div>
        </div>
      );
    });
    return ui;
  });

  return results;
};

function ExplorerDisplay() {
  const [posts, setPosts] = useState([]);

  return (
    <>
      <header className={style.optionsdiv}>
        <button
          className={style.options}
          onClick={async () => {
            const result = await clickHandler("top");
            setPosts(result);
          }}
        >
          <h4>Top</h4>
        </button>
        <button
          className={style.options}
          onClick={async () => {
            const result = await clickHandler("latest");
            setPosts(result);
          }}
        >
          <h4>Latest</h4>
        </button>
        <button
          className={style.options}
          onClick={async () => {
            const result = await clickHandler("photos");
            setPosts(result);
          }}
        >
          <h4>Photos</h4>
        </button>
      </header>
      {posts}
    </>
  );
}

export default ExplorerDisplay;
