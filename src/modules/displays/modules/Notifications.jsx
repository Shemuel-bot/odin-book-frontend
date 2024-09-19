import style from '../css/Notifications.module.css'

function Notifications() {
    return(
        <>
            <header className={style.optionsdiv}>
                <button className={style.options}><h4>Request</h4></button>
                <button className={style.options}><h4>Post</h4></button>
            </header>
        </>
    );
}

export default Notifications