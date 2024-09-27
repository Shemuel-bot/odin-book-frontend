import style from '../css/ModuleDisplay.module.css'
import { Outlet } from 'react-router-dom'

function ModuleDisplay() {
    return(
        <div className={style.body}>
            <Outlet />
        </div>
    )
}

export default ModuleDisplay