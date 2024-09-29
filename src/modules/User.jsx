/* eslint-disable react/prop-types */
import style from "../css/UserSearch.module.css";

function User({profile, username, id, userId}) {
    return(
        <div className={style.userdiv}>
          <img src={profile} alt="" className={style.icons} />
          <h4 style={{marginLeft: "5px",marginRight: "auto"}}>{username}</h4>
          <button><h4>Follow</h4></button>
        </div>
    )
}

export default User