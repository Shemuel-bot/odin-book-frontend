import Post from "../../Post.jsx";
import style from "../css/HomeDisplay.module.css";
import { useEffect, useState } from "react";

const clickHandler = async () => {
  const result = await fetch("https://greasy-sallie-panda-bear-studios-863963ff.koyeb.app/api/v1/posts", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
    body: JSON.stringify({
      text: document.getElementById("input").value,
    }),
  }).then(async (res) => {
    const a = await res.json();
    return a.message;
  });
  return result;
};

function HomeDisplay() {
  const [post, setPost] = useState([]);
  const [user, setUser] = useState({});

  

  useEffect(() => {
    fetch("https://greasy-sallie-panda-bear-studios-863963ff.koyeb.app/api/v1/posts/following", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    }).then(async (res) => {
      const a = await res.json();
      console.log(a)
      const ui = [];
      a.message.forEach((x) => {
        ui.push(
          <Post
            id={x.id}
            profile={x.profile}
            userId={a.userId}
            username={x.username}
            text={x.text}
            likes={x.likes}
            likesId={x.likesId}
          />
        );
        setPost(ui);
      });
    });

    fetch("https://greasy-sallie-panda-bear-studios-863963ff.koyeb.app/api/v1/user", {
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
        <h2>Home</h2>
        <div className={style.tweetarea}>
          <div className={style.inputarea}>
            <img src={user.img} alt="" className={style.userimg} />
            <input
              type="text"
              className={style.input}
              placeholder="What's happening?"
              id="input"
            />
          </div>
          <button
            className={style.tweetBtn}
            onClick={async () => {
              const result = await clickHandler();
              if (result) document.getElementById("input").textContent = "";
            }}
          >
            <h4>Tweet</h4>
          </button>
        </div>
      </header>
      <div className={style.postcontainer}>{post}</div>
    </div>
  );
}

export default HomeDisplay;
