import style from "../css/ProfilePage.module.css"

function Comment({ profile, username, text}) {
  return (
    <div className={style.dividend}>
      <img src={profile} alt="" className={style.userimg} />
      <div>
        <h4>{username}</h4>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default Comment
