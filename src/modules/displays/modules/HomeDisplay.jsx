import user from "/home/shemuel/repos/odin-book-frontend/src/assets/icons/user.png";
import heart from "/home/shemuel/repos/odin-book-frontend/src/assets/icons/heart.png";
import comments from "/home/shemuel/repos/odin-book-frontend/src/assets/icons/chat.png";
import retweet from "/home/shemuel/repos/odin-book-frontend/src/assets/icons/reload.png";
import style from "../css/HomeDisplay.module.css";

const clickHandler = async () => {
  const result = await fetch("http://localhost:3000/api/v1/posts", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: {
      text: document.getElementById("text").textContent,
      img: "",
    },
  }).then(async (res) => {
    const a = await res.json();
    return a.message;
  });
  return result;
};

function HomeDisplay() {
  return (
    <div className={style.container}>
      <header className={style.header}>
        <h2>Home</h2>
        <div className={style.tweetarea}>
          <div className={style.inputarea}>
            <img src={user} alt="" className={style.userimg} />
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
      <div className={style.postcontainer}>
        <div className={style.post}>
          <div className={style.dividend}>
            <img src={user} alt="" className={style.userimg} />
            <div>
              <h4>User</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
                fuga similique voluptas iusto tempora maiores nisi repellat
                consequuntur possimus porro enim explicabo, ipsum nam mollitia
                dolorem officiis ab aspernatur fugiat.
              </p>
            </div>
          </div>
          <div className={style.postoptions}>
            <button className={style.postoptionsbtn}>
              <img src={comments} alt="" />
            </button>
            <button className={style.postoptionsbtn}>
              <img src={retweet} alt="" />
            </button>
            <button className={style.postoptionsbtn}>
              <img src={heart} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeDisplay;
