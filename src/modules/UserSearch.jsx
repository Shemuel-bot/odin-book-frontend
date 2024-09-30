import profile from "../assets/icons/user.png";
import white_magnify from "../assets/icons/white_magnify.png";
import magnify from "../assets/icons/magnify.png";
import style from "../css/UserSearch.module.css";
import User from "./User";
import { useEffect, useState } from "react";

function UserSearch() {
  const [people, setPeople] = useState([]);
  const [following, setFollowing] = useState([]);

  const searchClickHandler = () => {
    fetch(
      `https://greasy-sallie-panda-bear-studios-863963ff.koyeb.app/api/v1/users/search/${
        document.getElementById("search").value
      }`
    ).then(async (res) => {
      const a = await res.json();
      const ui = [];

      a.message.forEach((x) => {
        ui.push(<User profile={x.img} username={x.userName} id={x.id} />);
      });
      setPeople(ui);
    });
  };

  useEffect(() => {
    fetch("https://greasy-sallie-panda-bear-studios-863963ff.koyeb.app/api/v1/users", {
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    }).then(async (res) => {
      const a = await res.json();
      const ui = [];
      a.message.forEach((x) => {
        if (x.img === "") {
          ui.push(
            <User
              profile={profile}
              username={x.userName}
              bio={x.bio}
              followers={x.followers}
              following={x.following}
            />
          );
        } else {
          ui.push(
            <User
              profile={x.img}
              username={x.userName}
              bio={x.bio}
              followers={x.followers}
              following={x.following}
            />
          );
        }
      });
      setPeople(ui);
    });

    fetch("http://localhost:3000/api/v1/users/following", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    }).then(async (res) => {
      const a = await res.json();
      const ui = [];
      a.message.forEach((x) => {
        ui.push(
          <User
            profile={x.img}
            username={x.userName}
            id={x.id}
            bio={x.bio}
            followers={x.followers}
            following={x.following}
          />
        );
      });
      setFollowing(ui);
    });
  }, []);

  return (
    <div className={style.body}>
      <div className={style.searchbox}>
        <img src={magnify} alt="" className={style.magnify} />
        <input
          type="text"
          className={style.input}
          placeholder="Search for users"
          id="search"
        />
        <button
          className={style.searchbtn}
          onClick={() => {
            searchClickHandler();
          }}
        >
          <img
            src={white_magnify}
            alt=""
            style={{
              width: "20px",
              height: "20px",
            }}
          />
        </button>
      </div>
      <div className={style.people}>
        <h3>Discover People</h3>
        {people}
      </div>

      <div className={style.people}>
        <h3>Folowing</h3>
        {following}
      </div>
    </div>
  );
}

export default UserSearch;
