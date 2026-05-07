import style from "../css/ExplorerDisplay.module.css";
import Post from "../../Components/Post"; 
import { useState } from "react";
import { useEffect } from "react";

const fetchPosts = async (route) => {
  try {
    const res = await fetch(`https://greasy-sallie-panda-bear-studios-863963ff.koyeb.app/api/v1/posts/${route}`, {
      method: "get",
      headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") },
    });
    const data = await res.json();
    return { posts: data.message, userId: data.userId };
  } catch (err) {
    console.log(err);
    return { posts: [], userId: null };
  }
};

function ExplorerDisplay() {
  const [postData, setPostData] = useState([]);
  const [userId, setUserId] = useState(null);
  const [section, setSection] = useState("latest");

  const loadPosts = async (route) => {
    const { posts, userId: fetchedUserId } = await fetchPosts(route);
    setPostData(posts);
    setUserId(fetchedUserId);
    setSection(route);
  };

  useEffect(() => {
    loadPosts("latest");
  }, []);

  return (
    <>
      <header className={style.optionsdiv}>
        <button
          className={style.options}
          onClick={() => loadPosts("top")}
        >
          <h4>Top</h4>
        </button>
        <button
          className={style.options}
          onClick={() => loadPosts("latest")}
        >
          <h4>Latest</h4>
        </button>
      </header>
      <div className={style.postcontainer}>
        {postData.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            profile={post.profile}
            username={post.username}
            text={post.text}
            likes={post.likes}
            likesId={post.likesId}
            userId={userId}
          />
        ))}
      </div>
    </>
  );
}

export default ExplorerDisplay;
