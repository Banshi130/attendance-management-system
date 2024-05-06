import Form from '../Form/Form';

const SignUp = () => {
    const submit = (login, password) => {
        if (login && password) {
            console.log(login, password)
        } else {
            console.error('Пустая строка')
        }
    } 

    document.title = 'Регистрация';
    return (
        // <div className={styles.form}>
        //     <h1>Создать аккаунт</h1>
        //     <Form submitButton="Создать" submit={submit} />
        // </div>
        <Form heading="Регистрация" submitButton="Зарегистрироваться" submit={submit} />
    )
}

export default SignUp;