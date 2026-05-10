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
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (code && !localStorage.getItem("accessToken")) {
        // Send code to backend
        const callbackResponse = await fetch(
          "https://greasy-sallie-panda-bear-studios-863963ff.koyeb.app/api/v1/users/github/callback",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code }),
          }
        );

        if (!callbackResponse.ok) {
          const errorText = await callbackResponse.text();
          throw new Error(`Callback failed: ${callbackResponse.status} ${errorText}`);
        }

        const callbackData = await callbackResponse.json();
        localStorage.setItem("accessToken", callbackData.data.access_token);
      }

      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        navigate('/');
        return;
      }

      const meResponse = await fetch("https://greasy-sallie-panda-bear-studios-863963ff.koyeb.app/api/v1/users/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!meResponse.ok) {
        const errorText = await meResponse.text();
        throw new Error(`Me endpoint failed: ${meResponse.status} ${errorText}`);
      }

      const userData = await meResponse.json();
      if (userData.value === false) {
        navigate('/');
      }
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
