import style from "../css/Modules.module.css";
import larry from "../assets/logos/larry.png";
import house from "../assets/icons/home.png";
import hashtag from '../assets/icons/hashtag.png'
function Modules() {
  return (
    <div className={style.body}>
      <img src={larry} alt="" className={style.logo} />
      <div>
        <button className={style.group}>
          <img src={house} alt="" className={style.icon} />
          <h2>Home</h2>
        </button>

        <button className={style.group}>
          <img src={hashtag} alt="" className={style.icon} />
          <h2>Explore</h2>
        </button>
      </div>
    </div>
  );
}

export default Modules;
