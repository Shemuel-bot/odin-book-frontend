import style from "../css/Modules.module.css";
import larry from "../assets/logos/larry.png";
import house from "../assets/icons/home.png";
import houseBlue from "../assets/icons/homeblue.png";
import hashtag from "../assets/icons/hashtag.png";
import bell from "../assets/icons/bell.png";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Modules() {
  const [user, setUser] = useState({});
  const navigate = useNavigate()

  async function github() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      // Send code to backend
      await fetch("http://localhost:3000/api/v1/users/github/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      }).then(async (response) => {
        const a = await response.json();
        localStorage.setItem("accessToken", a.data.access_token);
      });
    }
    await fetch("http://localhost:3000/api/v1/user", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    }).then(async (res) => {
      const a = await res.json();
      if(a.status === 403)
        navigate('/')
      setUser(a.message);
    });
  }

  useEffect(() => {
    github();
  }, []);

  return (
    <div className={style.body}>
      <img src={larry} alt="" className={style.logo} />
      <nav>
        <Link to="home">
          <button
            className={style.group}
            onClick={() => {
              document.getElementById("houseimg").src = houseBlue;
            }}
          >
            <img src={house} alt="" className={style.icon} />
            <h3>Home</h3>
          </button>
        </Link>

        <Link to="explore">
          <button className={style.group}>
            <img src={hashtag} alt="" className={style.icon} />
            <h3>Explore</h3>
          </button>
        </Link>

        <Link to="notifications">
          <button className={style.group}>
            <img src={bell} alt="" className={style.icon} />
            <h3>Notifications</h3>
          </button>
        </Link>
        <Link to="myprofile">
          <button className={style.group}>
            <img src={user.img} alt="" className={style.icon} />
            <h3>Profile</h3>
          </button>
        </Link>
        <Link to="/post">
          <button className={style.tweetBtn}>
            <h3>Tweet</h3>
          </button>
        </Link>
      </nav>
    </div>
  );
}

export default Modules;
