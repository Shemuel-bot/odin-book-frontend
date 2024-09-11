import style from "../css/Modules.module.css";
import larry from "../assets/logos/larry.png";
import house from "../assets/icons/home.png";
import hashtag from '../assets/icons/hashtag.png'
import bell from '../assets/icons/bell.png'
import user from '../assets/icons/user.png'

function Modules() {
  return (
    <div className={style.body}>
      <img src={larry} alt="" className={style.logo} />
      <div>
        <button className={style.group}>
          <img src={house} alt="" className={style.icon} />
          <h3>Home</h3>
        </button>

        <button className={style.group}>
          <img src={hashtag} alt="" className={style.icon} />
          <h3>Explore</h3>
        </button>

        <button className={style.group}>
          <img src={bell} alt="" className={style.icon} />
          <h3>Notifications</h3>
        </button>

        <button className={style.group}>
          <img src={user} alt="" className={style.icon} />
          <h3>Profile</h3>
        </button>

        <button className={style.tweetBtn}><h3>Tweet</h3></button>
      </div>
    </div>
  );
}

export default Modules;
