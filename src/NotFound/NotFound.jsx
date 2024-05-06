import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate()

    const goBack = () => {
        navigate(-1);
    }

    document.title = 'Не найдено';
    return (
        <>
        <h1>Страница не найдена</h1>
        <button onClick={goBack}>Вернуться назад</button>
        </>
    )
}

export default NotFound;