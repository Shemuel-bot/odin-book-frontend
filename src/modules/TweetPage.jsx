import { useNavigate, Link } from "react-router-dom";
import larry from "../assets/logos/larry.png";
import style from "../css/TweetPage.module.css";

const clickHandler = async () => {
  const result = await fetch("http://localhost:3000/api/v1/posts", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
    body: JSON.stringify({
      text: document.getElementById("text").value,
      img: "",
    }),
  }).then(async (res) => {
    const a = await res.json();
    return a.message;
  });

  return result;
};

function TweetPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className={style.tweetbox}>
        <img src={larry} className={style.img} alt="" />
        <textarea
          name=""
          className={style.textarea}
          id="text"
          placeholder="Type here"
        >
          {localStorage.getItem("retweet")}
        </textarea>
        <button
          className={style.button}
          onClick={async () => {
            const result = await clickHandler();
            localStorage.setItem("retweet", "");
            if (result) navigate("/feed");
          }}
        >
          Tweet
        </button>
        <Link to="/feed">
          <button
            className={style.button}
            onClick={() => {
              localStorage.setItem("retweet", "");
            }}
          >
            Cancel
          </button>
        </Link>
      </div>
    </>
  );
}

export default TweetPage;
