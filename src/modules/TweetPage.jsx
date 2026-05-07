import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import larry from "../assets/logos/larry.png";
import style from "../css/TweetPage.module.css";

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

  return result;
};

function TweetPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

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
        <p className={style.img}>x</p>
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
      </div>
    </>
  );
}

export default TweetPage;
