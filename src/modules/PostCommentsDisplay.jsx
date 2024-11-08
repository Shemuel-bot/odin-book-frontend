import red_heart from "../assets/icons/red_heart.png";
import heart from "../assets/icons/heart.png";
import comment from "../assets/icons/chat.png";
import retweet from "../assets/icons/reload.png";
import Comment from "./Components/Comment";
import { useEffect, useState } from "react";
import style from "../css/PostCommentsDisplay.module.css";

const likeHandler = async (id) => {
  await fetch(
    `https://greasy-sallie-panda-bear-studios-863963ff.koyeb.app/api/v1/posts/likes`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        id: id,
      }),
    }
  ).catch((err) => {
    console.log(err);
  });
};

const dislikeHandler = async (id) => {
  await fetch(
    `https://greasy-sallie-panda-bear-studios-863963ff.koyeb.app/api/v1/posts/dislikes`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        id: id,
      }),
    }
  ).catch((err) => {
    console.log(err);
  });
};

const replyHandler = async () => {
  const post = JSON.parse(localStorage.getItem("post"));

  await fetch(
    "https://greasy-sallie-panda-bear-studios-863963ff.koyeb.app/api/v1/comments",
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        text: document.getElementById("reply").value,
        postId: post.id,
      }),
    }
  );
};

function PostCommentsDisplay() {
  const post = JSON.parse(localStorage.getItem("post"));
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(post.likes);

  useEffect(() => {
    fetch(
      "https://greasy-sallie-panda-bear-studios-863963ff.koyeb.app/api/v1/posts/comments",
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: post.id,
        }),
      }
    ).then(async (res) => {
      const a = await res.json();
      const ui = [];
      a.message.forEach((x) => {
        ui.push(
          <Comment username={x.username} profile={x.profile} text={x.text} />
        );
      });
      setComments(ui);
    });
  }, []);

  return (
    <div id="container">
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
