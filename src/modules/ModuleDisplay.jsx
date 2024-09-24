import style from '../css/ModuleDisplay.module.css'
import { Outlet } from 'react-router-dom'
import ProfilePage from './ProfilePage'

function ModuleDisplay() {
    return(
        <div className={style.body}>
            <ProfilePage />
            {/* <Outlet /> */}
        </div>
    )
}

export default ModuleDisplay