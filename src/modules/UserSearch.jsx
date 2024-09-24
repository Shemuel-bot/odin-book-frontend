import user from "../assets/icons/user.png";
import magnify from '../assets/icons/magnify.png'
import style from "../css/UserSearch.module.css";
import { useEffect, useState } from "react";

function UserSearch() {
  const [people, setPeople] = useState([]);
  
  
  useEffect(() => {
    fetch("http://localhost:3000/api/v1/users", {
      method: 'get',
      headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") }
    }).then(async res => {
      const a = await res.json();
      const ui = [];
      a.message.forEach(x => {
        if(x.img === ''){
        ui.push(<div className={style.userdiv}>
          <img src={user} alt="" className={style.icons} />
          <h4 style={{marginLeft: "5px",marginRight: "auto"}}>{x.userName}</h4>
          <button><h4>Follow</h4></button>
        </div>)
        }else{
          console.log(x.img)
          ui.push(<div className={style.userdiv}>
            <img src={x.img} alt="" className={style.icons} />
            <h4 style={{marginLeft: "5px",marginRight: "auto"}}>{x.userName}</h4>
            <button><h4>Follow</h4></button>
          </div>)
        }
      })
      setPeople(ui);
    })

    
  }, [])
  

  return (
    <div className={style.body}>
        <div className={style.searchbox}>
          <img src={magnify} alt="" className={style.magnify}/>
      <input
        type="text"
        className={style.input}
        placeholder="Search for users"
      />
      </div>
      <div className={style.people}>
        <h3>Discover People</h3>
        {people}
      </div>

      <div className={style.people}>
        <h3>Friends</h3>
        <div className={style.userdiv}>
          <img src={user} alt="" className={style.icons} />
          <h4 style={{marginLeft: "5px",marginRight: "auto"}}>User</h4>
        </div>

        
      </div>
    </div>
  );
}

export default UserSearch;
