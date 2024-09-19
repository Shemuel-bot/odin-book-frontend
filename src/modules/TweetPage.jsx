import { useNavigate, Link } from 'react-router-dom'
import larry from '../assets/logos/larry.png'
import style from '../css/TweetPage.module.css'

const clickHandler = async () => {
    const result = await fetch("http://localhost:3000/api/v1/posts", {
        method: 'post',
        headers: { "Content-Type": "application/json" },
        body:{
            text: document.getElementById('text').textContent,
            img: ''
        }
    }).then(async res => {
        const a = await res.json()
        return a.message;
    })

    return result
}


function TweetPage() {
    const navigate = useNavigate();

    return(
        <>
            <div className={style.tweetbox}>
                <img src={larry} className={style.img} alt="" />
                <textarea name="" className={style.textarea} placeholder='Type here'></textarea>
                <button className={style.button} onClick={async () => {
                    const result = await clickHandler();
                    if(result)
                        navigate('feed')
                }}>Tweet</button>
                <Link to='/feed'>
                <button className={style.button}>Cancel</button>
                </Link>
                
            </div>
        </>
    )
}

export default TweetPage