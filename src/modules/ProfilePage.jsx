import style from "../css/ProfilePage.module.css";

function ProfilePage() {
  return (
    <div className={style.container}>
      <header className={style.header}>
        <div className={style.profile}></div>
      </header>
      <div className={style.uibody}>
        <div className={style.info}>
          <h2>Username</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Cupiditate, non! Laborum aperiam, nisi voluptatibus ratione numquam
            non est eius, repellat facilis sunt totam, ut a odit ea quia qui
            cumque.
          </p>
          <div className={style.followinginfo}>
            <h4>0 Following</h4>
            <h4>0 Followers</h4>
          </div>
        </div>

        <div className={style.options}>
          <button className={style.optionsbtns}>
            <h4>Tweets</h4>
          </button>
          <button className={style.optionsbtns}>
            <h4>Replies</h4>
          </button>
          <button className={style.optionsbtns}>
            <h4>Likes</h4>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
