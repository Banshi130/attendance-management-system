import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from './Menu.module.css';
import { serverURL } from "../links";

const Menu = ({children}) => {
    const navigate = useNavigate();

    const logOut = () => {
        const params = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        }
        fetch(serverURL + '/logout')
        .then(() => {
            localStorage.removeItem('accessToken');
            navigate('/')
        })
    }

    return (
        <>
        <div className={styles.menuFlex}>
            <nav className={styles.sideMenu}>
                <div className={styles.siteName}>
                    <p>СУП</p>
                </div>
                <div className={styles.links}>
                    <NavLink className={styles.link} to='/'>
                        <i className="fa-regular fa-circle-user"></i>Мой профиль
                    </NavLink>
                    <NavLink className={styles.link} to='/calendar'>
                        <i className="fa-regular fa-calendar-days"></i>Календарь
                    </NavLink>
                    <NavLink className={styles.link} to='/tasks'>
                        <i className="fa-regular fa-circle-check"></i>Задачи
                    </NavLink>
                </div>
                <div className={styles.logOut}>
                    <Link className={styles.link} onClick={logOut}>
                        <i className="fa-solid fa-arrow-right-from-bracket"></i>Выйти
                    </Link>
                </div>
            </nav>
            <main className={styles.child}>
                {children}
            </main>
        </div>
        </>
    )
}

export default Menu;