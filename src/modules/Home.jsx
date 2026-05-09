import Modules from "./Modules";
import ModuleDisplay from "./ModuleDisplay";
import UserSearch from "./UserSearch";
import style from "../css/Home.module.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  useEffect( () => {
    async function checkToken() {
      await fetch("https://greasy-sallie-panda-bear-studios-863963ff.koyeb.app/api/v1/users/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then(async res => {
        const a = await res.json();
        console.log(a);
        if(a.value === false)
          navigate('/')
      }).catch(err => {
        console.log(err);
        navigate('/')
      })
    }
    checkToken();

  }, []);

  return (
    <>
      <div className={style.body}>
        <Modules />
        <ModuleDisplay />
        <UserSearch />
      </div>
    </>
  );
}

export default Home;
