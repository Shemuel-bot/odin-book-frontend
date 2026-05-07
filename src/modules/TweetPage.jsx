import { useNavigate } from "react-router-dom";
import { useState } from "react";
import larry from "../assets/logos/larry.png";
import style from "../css/TweetPage.module.css";

function TweetPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const clickHandler = async () => {
    const result = await fetch(
      "https://greasy-sallie-panda-bear-studios-863963ff.koyeb.app/api/v1/posts",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        body: JSON.stringify({
          text: document.getElementById("text").value,
          img: "",
        }),
      }
    ).then(async (res) => {
      const a = await res.json();
      return a.message;
    });

    // Navigate to /feed after posting
    navigate("/feed");
    return result;
  };

   async function github() {
    await fetch(
      "https://greasy-sallie-panda-bear-studios-863963ff.koyeb.app/api/v1/user",
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }
    ).then(async (res) => {
      const a = await res.json();
      if (a.status === 403) navigate("/");
      setUser(a.message)
    });
  }

  useState(() => {
    github();
  }, []);
  return (
    <>
      <div className={style.tweetbox}>
        <button
          className={style.img}
          onClick={() => navigate("/feed/myprofile")}
        >
          x
        </button>
        <div className={style.textbox}>
          <img src={user.img} alt="" />
        <textarea
          name=""
          className={style.textarea}
          id="text"
          placeholder="Type here"
        >
          {localStorage.getItem("retweet")}
        </textarea>
        </div>

      <button className={style.tweetbtn} onClick={clickHandler}>
        Post
      </button>
      </div>
    </>
  );
}

export default TweetPage;
