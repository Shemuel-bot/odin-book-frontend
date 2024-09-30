import style from "../css/ExplorerDisplay.module.css";
import Post from "../../Post";
import { useState } from "react";

const clickHandler = async (route) => {
  const results = await fetch(`https://greasy-sallie-panda-bear-studios-863963ff.koyeb.app/api/v1/posts/${route}`, {
    method: "get",
    headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") },
  }).then(async (res) => {
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
          userId={a.userId}
        />
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
      </header>
      <div className={style.postcontainer}>
      {posts}
      </div>
    </>
  );
}

export default ExplorerDisplay;
