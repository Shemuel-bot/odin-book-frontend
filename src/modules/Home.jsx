import Modules from "./Modules";
import ModuleDisplay from "./ModuleDisplay";
import UserSearch from "./UserSearch";
import style from "../css/Home.module.css";
import { useEffect, useState } from "react";

function Home() {
    
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
