import { useState } from 'react';
import styles from './Form.module.css';

const Form = ({heading, submitButton, submit}) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        submit(login, password)
    }

    return (
        <div className={styles.formDiv}>
            <h1>{heading}</h1>
            <form method="POST" onSubmit={handleSubmit} className={styles.form}>
            {/* <div className={styles.inputs}> */}
                {/* <div> */}
                    {/* <label htmlFor="login">Логин:&nbsp;</label> */}
                    <input type="text" name="login" id="login" placeholder='Логин'
                    required
                    onChange={event => setLogin(event.target.value)} />
                {/* </div>
                <div> */}
                    {/* <label htmlFor="password">Пароль:&nbsp;</label> */}
                    <input type="password" name="password" id="password" placeholder='Пароль'
                    required
                    onChange={event => setPassword(event.target.value)} />
                {/* </div> */}
            {/* </div> */}
            <button type="submit">{submitButton}</button>
        </form>
    </div>
    )
}

export default Form;