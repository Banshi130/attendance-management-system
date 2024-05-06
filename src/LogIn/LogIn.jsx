import { useState } from 'react';
// import Form from '../Form/Form';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import Profile from '../Profile/Profile';
import { serverURL } from '../links';

const LogIn = () => {
    const navigate = useNavigate()
    
    const [login, setLogin] = useState();
    const [password, setPassword] = useState();
    const [showPassword, setShowPassword] = useState(true);
    
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
        let passwordInputType = showPassword ? 'text' : 'password';
        document.getElementById('password').type = passwordInputType;
        
        let showPasswordBtn = document.getElementById('show-password-btn');
        showPasswordBtn.classList.toggle('bi-eye');
        showPasswordBtn.classList.toggle('bi-eye-slash');
    }

    const submit = (event) => {
        event.preventDefault();

        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login: login,
                password: password
            })
        }
        fetch(serverURL + '/auth/sign-in', params)
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            navigate('/profile')
        })

        
    } 

    document.title = 'Вход';
    if (localStorage.getItem('accessToken')) {
        return <Profile />
    } else {
    return (
        <>
        <div className={styles.logInContainer}>
        <div className={styles.formDiv}>
        {/* <h1>{heading}</h1> */}
        <h1>Добро пожаловать</h1>
            <form method="POST" onSubmit={submit} className={styles.form}>
                {/* <div className={styles.inputContainer}> */}
                    <label className={styles.label} htmlFor="login">Логин</label>
                    <input type="text" name="login" id="login" className={styles.input}
                    required onChange={event => setLogin(event.target.value)} />
                    {/* <p>   </p> */}
                {/* </div>
                <div className={styles.inputContainer}> */}
                    <label className={styles.label} htmlFor="password">Пароль</label>
                    <div className={styles.password}>
                    <input type="password" name="password" id="password" className={styles.input}
                    required onChange={event => setPassword(event.target.value)} />
                    <i className={`bi bi-eye-slash ${styles.showPasswordBtn}`} id='show-password-btn'
                    onClick={toggleShowPassword}></i>
                    </div>
                    {/* <div>
                        <input type="checkbox" name="show_passowrd" id="show_password" 
                        onChange={toggleShowPassword}/>
                        <label htmlFor="show_password">Показать пароль</label>
                    </div> */}
                {/* </div> */}
            <button type="submit" className={styles.button}>Войти</button>
            </form>
        </div>
        <div className={styles.bg}>
            {/* <img src={logInImage} alt="" className={styles.logInImage} /> */}
        </div>
        </div>
        </>
    )
    }
}

export default LogIn;