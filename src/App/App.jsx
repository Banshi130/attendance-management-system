import SignUp from '../SignUp/SignUp';
import styles from './App.module.css';
import logInImage from '../images/dude.svg';
import { useNavigate } from 'react-router-dom';

const App = () => {
    const navigate = useNavigate();
    const goToLogIn = () => {
        navigate('/login')
    }

    return (
        <div className={styles.app}>
            {/* <SignUp /> */}
            <button className={styles.logInBtn} onClick={goToLogIn}>Вход</button>
            {/* todo поменять изображние */}
            {/* <img src={logInImage} alt="" className={styles.logInImage} /> */}
        </div>
    )
}

export default App;