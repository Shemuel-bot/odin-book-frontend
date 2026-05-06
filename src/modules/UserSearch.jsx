import profile from "../assets/icons/user.png";
import white_magnify from "../assets/icons/white_magnify.png";
import magnify from "../assets/icons/magnify.png";
import style from "../css/UserSearch.module.css";
import User from "./Components/User";
import { useEffect, useState } from "react";

function UserSearch() {
  const [people, setPeople] = useState([]);
  const [following, setFollowing] = useState([]);
  const [currentFollowing, setCurrentFollowing] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const normalizeUser = (x, followingIds = []) => ({
    profile: x.img === "" ? profile : x.img,
    username: x.userName,
    id: x.id,
    bio: x.bio,
    followers: x.followers,
    following: x.following,
    isFollowing: followingIds.includes(x.id),
  });

  const fetchPeople = async (query = "", followingIds = currentFollowing) => {
    const url = query
      ? `https://greasy-sallie-panda-bear-studios-863963ff.koyeb.app/api/v1/users/search/${query}`
      : "https://greasy-sallie-panda-bear-studios-863963ff.koyeb.app/api/v1/users";

    try {
      const res = await fetch(url);
      const a = await res.json();
      setPeople(
        a.message
          .filter((x) => !followingIds.includes(x.id))
          .map((x) => normalizeUser(x, followingIds))
      );
    } catch (err) {
      console.log(err);
    }
  };

  const fetchFollowing = async (followingIds = currentFollowing) => {
    try {
      const res = await fetch(
        "https://greasy-sallie-panda-bear-studios-863963ff.koyeb.app/api/v1/users/following",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        }
      );
      const a = await res.json();
      setFollowing(
        a.message.map((x) => ({
          ...normalizeUser(x, followingIds),
          isFollowing: true,
        }))
      );
    } catch (err) {
      console.log(err);
    }
  };

  const searchClickHandler = () => {
    const query = document.getElementById("search").value.trim();
    setSearchQuery(query);
    fetchPeople(query, currentFollowing);
  };

  const handleFollowChange = (id, isFollowing, userData) => {
    const nextFollowingIds = isFollowing
      ? [...new Set([...currentFollowing, id])]
      : currentFollowing.filter((item) => item !== id);

    setCurrentFollowing(nextFollowingIds);

    setPeople((prev) =>
      prev
        .filter((user) => (isFollowing ? user.id !== id : true))
        .map((user) =>
          user.id === id ? { ...user, isFollowing } : user
        )
    );

    setFollowing((prev) => {
      if (isFollowing) {
        const alreadyFollowing = prev.some((user) => user.id === id);
        if (alreadyFollowing) return prev;
        const newFollowUser = userData || people.find((user) => user.id === id);
        return newFollowUser ? [...prev, { ...newFollowUser, isFollowing: true }] : prev;
      }
      return prev.filter((user) => user.id !== id);
    });

    fetchPeople(searchQuery, nextFollowingIds);
    fetchFollowing(nextFollowingIds);
  };

  useEffect(() => {
    fetch("https://greasy-sallie-panda-bear-studios-863963ff.koyeb.app/api/v1/user", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then(async (res) => {
        const a = await res.json();
        const ids = Array.isArray(a.message.following) ? a.message.following : [];
        setCurrentFollowing(ids);

        fetchPeople("", ids);
        fetchFollowing(ids);
      })
      .catch((err) => {
        console.log(err);
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
        {people.map((user) => (
          <User
            key={user.id}
            {...user}
            onFollowChange={handleFollowChange}
          />
        ))}
      </div>

      <div className={style.people}>
        <h3>Following</h3>
        {following.map((user) => (
          <User
            key={user.id}
            {...user}
            onFollowChange={handleFollowChange}
          />
        ))}
      </div>
    </div>
  );
}

export default UserSearch;
