import user from "/home/shemuel/repos/odin-book-frontend/src/assets/icons/user.png";
import red_heart from "/home/shemuel/repos/odin-book-frontend/src/assets/icons/red_heart.png";
import heart from "/home/shemuel/repos/odin-book-frontend/src/assets/icons/heart.png";
import comment from "/home/shemuel/repos/odin-book-frontend/src/assets/icons/chat.png";
import retweet from "/home/shemuel/repos/odin-book-frontend/src/assets/icons/reload.png";
import Comment from "./Comment";
import { useEffect, useState } from "react";
import style from "../css/PostCommentsDisplay.module.css";

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

const replyHandler = async () => {
  const post = JSON.parse(localStorage.getItem("post"));

  await fetch("http://localhost:3000/api/v1/comments", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
    body: JSON.stringify({
      text: document.getElementById("reply").value,
      postId: post.id,
    }),
  });
};

function PostCommentsDisplay() {
  const post = JSON.parse(localStorage.getItem("post"));
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(post.likes);
  const [test, setTest] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/posts/comments", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: post.id,
      }),
    }).then(async (res) => {
      const a = await res.json();
      const ui = [];
      a.message.forEach((x) => {
        ui.push(
          <div className={style.dividend}>
            <img src={x.profile} alt="" className={style.userimg} />
            <div>
              <h4>{x.username}</h4>
              <p>{x.text}</p>
            </div>
          </div>
        );
      });
      setComments(ui);
    });
  }, []);

  return (
    <div id='container'>
      <div className={style.post}>
        <div className={style.dividend}>
          <img src={post.profile} alt="" className={style.userimg} />
          <div>
            <h4>{post.username}</h4>
            <p>{post.text}</p>
          </div>
        </div>
        <div className={style.postoptions}>
          <button className={style.postoptionsbtn}>
            <img src={comment} alt="" />
          </button>
          <button className={style.postoptionsbtn}>
            <img src={retweet} alt="" />
          </button>
          {post.likesId.includes(Number(localStorage.getItem("userid"))) ? (
            <button
              className={style.postoptionsbtn}
              onClick={() => {
                dislikeHandler(post.id);
                document.getElementById(post.id).src = heart;
                setLikes(likes - 1);
              }}
            >
              <img src={red_heart} id={post.id} alt="" />
              {likes}
            </button>
          ) : (
            <button
              className={style.postoptionsbtn}
              onClick={() => {
                likeHandler(post.id);
                document.getElementById(post.id).src = red_heart;
                setLikes(likes + 1);
              }}
            >
              <img src={heart} id={post.id} alt="" />
              {likes}
            </button>
          )}
        </div>
      </div>

      <div className={style.replybox}>
        <input
          type="text"
          id="reply"
          className={style.input}
          placeholder="Post your reply"
        />
        <button
          className={style.replybtn}
          onClick={async () => {
            await replyHandler();
          }}
        >
          <h4>Reply</h4>
        </button>
      </div>
      {comments}
    </div>
  );
}

export default PostCommentsDisplay;
