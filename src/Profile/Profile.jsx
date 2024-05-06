import Menu from "../Menu/Menu";
import styles from './Profile.module.css';
import avatar from './avatar.png'
import Header from "../Header/Header";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { serverURL } from "../links";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const Copy = (event) => {
        const text = event.target.textContent;
        navigator.clipboard.writeText(text);

        const elemId = event.target.id;
        const copiedMsg = document.getElementById('copied-' + elemId);
        copiedMsg.style.visibility = 'visible';
        setTimeout(() => {
            copiedMsg.style.visibility = 'hidden';
          }, 2000)
    }

    const [user, setUser] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            const params = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                }
            }
            const response = await fetch(serverURL + '/data/profile', params);
            const jsonData = await response.json();
            setUser(jsonData);
        };
        fetchData();
    }, [])

    const navigate = useNavigate();

    const links = [
        {
            name: 'Главная',
            link: ''
        }
    ]

    const [showInstruction, setShowInstruction] = useState(false);

    document.title = 'Профиль';

    if (!localStorage.getItem('accessToken')) {
        navigate('/')
    } else {
    return (
        <>
        {showInstruction && createPortal(
            <div className={styles.overlay}>
            <div className={styles.instruction}>
                <span className={styles.closeBtn} onClick={() => setShowInstruction(false)}><i className="fa-solid fa-xmark"></i></span>
                <h1>Инструкция по использованию сайта</h1>
                <ul>
                    <li>Раздел «Мой профиль»  позволяет увидеть полезные ссылки.</li>
                    <li>
                        Также на странице профиля представлены этапы стажировки. 
                        В зависимости от того, на каком этапе вы находитесь, 
                        система автоматически подсвечивает данный этап.</li>
                    <li>
                        Раздел «Календарь» показывает ваше расписание на текущий 
                        день, позволяя редактировать его и вносить изменения. 
                        Вы также можете просмотреть календарь на день и на неделю.</li>
                    <li>
                        Раздел «Задачи на день» содержит список ваших личных задач 
                        на текущий день. Вы составляете их самостоятельно и отмечаете по 
                        мере выполнения. Вы можете создать задачи на следующий день или 
                        просмотреть задачи предыдущего дня, используя соответствующие стрелки.
                    </li>
                    <li>При нажатии на кнопку «Выйти», вы покидаете систему.</li>
                </ul>
            </div>
        </div>
        , document.body
        )}
        <Menu>
            <Header links={links}></Header>
            <div className={styles.profile}>
                <div className={styles.userInfoContainer}>
                    <div className={styles.avatar}>
                        <img src={avatar} alt="avatar" />
                    </div>
                    <div className={styles.userInfo}>
                        <div className={styles.nameContainer}>
                            <span className={styles.name}>{user.fullName}</span>
                            <span className={styles.role}>{user.post}</span>
                            <span className={styles.editBtn}><i className="fa-solid fa-pen"></i></span>
                        </div>
                        <div className={styles.contactData}>
                            <div>
                                <span id="phone" onClick={Copy}><i className={`fa-solid fa-phone ${styles.icon}`}></i>{user.phone}</span>
                                <span id="copied-phone" className={styles.copiedMsg}>Скопировано в буфер обмена</span>
                            </div>
                            <div>
                                <span id="email" onClick={Copy}><i className={`fa-regular fa-envelope ${styles.icon}`}></i>{user.email}</span>
                                <span id="copied-email" className={styles.copiedMsg}>Скопировано в буфер обмена</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <p className={styles.heading}>Полезная информация</p>
                    <div>Инструкция по использованию сайта <span onClick={() => setShowInstruction(true)}><i className="fa-solid fa-chevron-down"></i></span></div>
                    <div className={styles.links}>
                        <a href="https://reliabschool.getcourse.ru/">Getcourse TH</a>
                        <a >ГК ТН</a>
                        <a >ТН ВК</a>
                    </div>
                </div>
                <div className={styles.internshipStages}>
                    <div className={styles.heading}>Стадии прохождения стажировки</div>
                    <div className={styles.internshipStagesList}>
                        <div>
                            <p className={styles.stageName} id="stage1">1 месяц</p>
                            <p className={styles.stageDescription}>Изучение теории</p>
                        </div>
                        <div>
                            <p className={styles.stageName} id="stage2">2 месяц</p>
                            <p className={styles.stageDescription}>Применение теории на практике</p>
                        </div>
                        <div>
                            <p className={styles.stageName} id="stage3">3-6 месяцы</p>
                            <p className={styles.stageDescription}>Работа над проектом</p>
                        </div>
                        <div>
                            <p className={styles.stageName} id="stage4">6-12 месяцы</p>
                            <p className={styles.stageDescription}>Проектная стажировка</p>
                        </div>
                        <div>
                            <p className={styles.stageName} id="stage5">Итоговое собеседование</p>
                            <p className={styles.stageDescription}>Проверка знаний</p>
                        </div>
                    </div>
                </div>
            </div>
        </Menu>
        </>
    )
    }
}

export default Profile