import { useState, useEffect } from "react";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import styles from './Tasks.module.css';
import { createPortal } from "react-dom";
import { serverURL } from "../links";


const Tasks = () => {
    const Task = (/* {id, name, description, isCompleted} */ props) => {
        const EditTask = () => {
            const [nameValue, setNameValue] = useState(name);
            const [descriptionValue, setDescriptionValue] = useState(description)
            const saveEdit = () => {
                // setName(nameValue);
                // setDescription(descriptionValue);
                const tasks = [...tasksList];
                tasks[props.id].name = nameValue;
                tasks[props.id].description = descriptionValue;
                setTaskList(tasks);
                setShowEditPortal(false);
            }
            return (
                <div className={`${styles.dialog} ${styles.editFormBox}`}>
                    <span className={styles.closeBtn} onClick={() => setShowEditPortal(false)}><i className="fa-solid fa-xmark"></i></span>
                    <p>Редактировать задачу</p>
                    <form className={styles.editForm}>
                        <input type="text" name="name" id="name" className={styles.nameInput} value={nameValue} onChange={(e) => setNameValue(e.target.value)} />
                        <input type="text" name="description" id="description" className={styles.descriptionInput} value={descriptionValue} onChange={(e) => setDescriptionValue(e.target.value)} />
                    </form>
                    <button className="blueBtn" onClick={saveEdit}>Сохранить</button>
                </div>
            )
        }
    
        const DeleteMsg = () => {
            const deleteTask = () => {
                const param = {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                    }
                }
                fetch(`${serverURL}/tasks/${props.id}`, param)
                .then(() => {
                    const updatedTasks = tasksList.filter(task => task.id !== props.id)
                    setTaskList(updatedTasks);
                    setShowDeletePortal(false);
                })
            }

            return (
                <div className={`${styles.dialog} ${styles.deleteMsg}`}>
                    <p>Вы действительно хотите удалить заметку?</p>
                    <div className={styles.buttons}>
                        <button className="blueBtn" onClick={deleteTask}>Да</button>
                        <button className="blueBtn" onClick={() => setShowDeletePortal(false)}>Нет</button>
                    </div>
                </div>
            )
        }
    
        const [name, setName] = useState(props.name)
        const [description, setDescription] = useState(props.description)
        const [isCompleted, setIsCompleted] = useState(props.isCompleted);
    
        const [showEditPortal, setShowEditPortal] = useState(false);
        const [showDeletePortal, setShowDeletePortal] = useState(false);
    
        const toggleCompleted = () => {
            setIsCompleted(!isCompleted);
        }
    
        const toggleMenu = () => {
            const menu = document.getElementById(`task-menu-${props.id}`);
            if (menu.style.display != 'block') {
                menu.style.display = 'block';
            } else {
                menu.style.display = 'none';
            }
        }
    
        const showEdit = () => {
            setShowEditPortal(true);
            toggleMenu();
        }
        const showDelete = () => {
            setShowDeletePortal(true);
            toggleMenu();
        }
    
        return (
            <>
            {showEditPortal && createPortal(
                <EditTask />, document.body)}
            {showDeletePortal && createPortal(
                <DeleteMsg />, document.body)}
            <div className={styles.task}>
                <button className={styles.taskCompletedBtn} onClick={toggleCompleted}>
                    {isCompleted && <div className={styles.taskCompleted}></div>}
                </button>
                <div className={styles.taskName}>{name}</div>
                <div className={styles.taskDescription}>{description}</div>
                <div className={styles.taskMenuContainer}>
                    <div id={`task-menu-btn-${props.id}`} className={styles.taskMenuBtn} onClick={toggleMenu}><i className="fa-solid fa-ellipsis-vertical"></i></div>
                    <div id={`task-menu-${props.id}`} className={styles.taskMenu}>
                        <div onClick={showEdit}><i className="fa-solid fa-pen"></i>Редактировать задачу</div>
                        <div onClick={showDelete}><i className="fa-regular fa-trash-can"></i>Удалить задачу</div>
                    </div>
                </div>
            </div>
            </>
        )
    }

    const CreateTask = () => {
        const addTask = () => {
            const newTask = {
                taskName: nameValue,
                taskDescription: descriptionValue,
                date: date
            };
            const param = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                },
                body: JSON.stringify(newTask)
            }
            fetch(serverURL + '/tasks', param)
            .then(() => {
                setTaskList([...tasksList, newTask]);
                setShowCreatePortal(false)
            })
        }
        const [nameValue, setNameValue] = useState('');
        const [descriptionValue, setDescriptionValue] = useState('');
        const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

        return (
            <div className={`${styles.dialog} ${styles.createFormBox}`}>
                <span className={styles.closeBtn} onClick={() => setShowCreatePortal(false)}><i className="fa-solid fa-xmark"></i></span>
                <p>Список задач на день</p>
                <form className={styles.createForm}>
                    <input type="text" name="name" id="name" className={styles.nameInput} placeholder="Название задачи" 
                    onChange={(e) => setNameValue(e.target.value)} />
                    <input type="text" name="description" id="description" className={styles.descriptionInput} placeholder="Описание" 
                    onChange={(e) => setDescriptionValue(e.target.value)} />
                </form>
                <div>
                    <span className={styles.dateInput}>
                        <i className="fa-regular fa-calendar-days"></i>
                        <input type="date" name="task-date" id="task-date-create" defaultValue={new Date().toISOString().split('T')[0]} 
                        onChange={(e) => setDate(e.target.value)}/>
                    </span>
                    <button className="blueBtn" onClick={addTask}>Сохранить</button>
                </div>
            </div>
        )
    }

    const links = [
        {
            name: 'Главная',
            link: '/'
        },
        {
            name: 'Задачи',
            link: ''
        }
    ]
    
    const months = [
        'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ]
    const daysOfWeek = [
        'Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг',
        'Пятница', 'Суббота'
    ]    
    const [currentDate, setCurrentDate] = useState(new Date());
    const [day, setDay] = useState();
    const [month, setMonth] = useState();
    const [dayOfWeek, setDayOfWeek] = useState();
    const prevDate = () => {
        setCurrentDate(currentDate => new Date(currentDate.setDate(currentDate.getDate() - 1)));
    }
    const nextDate = () => {
        setCurrentDate(currentDate => new Date(currentDate.setDate(currentDate.getDate() + 1)));
    }
    useEffect(() => {
        setDay(currentDate.getDate());
        setMonth(months[currentDate.getMonth()]);
        setDayOfWeek(daysOfWeek[currentDate.getDay()]);
    }, [currentDate])
    
    const [showCreatePortal, setShowCreatePortal] = useState(false);
    
    const [tasksList, setTaskList] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const params = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                }
            };
            const date = currentDate.toISOString().split('T')[0]
            const response = await fetch(serverURL + `/tasks?date=${date}`, params);
            const jsonData = await response.json();
            setTaskList(jsonData);
        };
        fetchData()
    }, [currentDate])
    
    return (
        <Menu>
            {showCreatePortal && createPortal(
                <CreateTask />, document.body
            )}
            <Header links={links} />
            <div className={styles.tasks}>
                <h1>Список задач на день</h1>
                <div className={styles.taskList}>
                <div className={styles.date}>
                    <span className={styles.day}>
                        <span>{day} {month}</span> | {dayOfWeek}
                    </span>
                    <span className={styles.arrows}>
                        <span className={styles.arrowBtn} onClick={prevDate}><i className="fa-solid fa-arrow-left"></i></span>
                        <span className={styles.arrowBtn} onClick={nextDate}><i className="fa-solid fa-arrow-right"></i></span>
                    </span>
                </div>
                <div className={styles.tasksList}>
                    {
                        tasksList.map(task => (
                            <Task key={task.id} id={task.id} name={task.taskName} description={task.taskDescription} isCompleted={false}/>
                        ))
                    }
                </div>
                <div className={styles.createTask}>
                    <button className="blueBtn" onClick={() => setShowCreatePortal(true)}>Создать задачу</button>
                </div>
                </div>
            </div>
        </Menu>
    )
}

export default Tasks