import { useState, useEffect } from "react";
import Header from '../Header/Header';
import Menu from '../Menu/Menu';
import styles from './Calendar.module.css'

const Calendar = () => {
    const links = [
        {
            name: 'Главная',
            link: '/'
        },
        {
            name: 'Календарь',
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
    const [year, setYear] = useState()
    const [dayOfWeek, setDayOfWeek] = useState();
    useEffect(() => {
        setDay(currentDate.getDate());
        setMonth(months[currentDate.getMonth()]);
        setYear(currentDate.getFullYear())
        setDayOfWeek(daysOfWeek[currentDate.getDay()]);
    }, [currentDate])
    
    // const firstDayOfWeek = new Date(currentDate);
    // firstDayOfWeek.setDate(currentDate.getDate() - day);

    // let weekNumbers = [];

    // for (let i = 0; i < 7; i++) {
    //     let date = new Date(firstDayOfWeek);
    //     date.setDate(firstDayOfWeek.getDate() + i + 1);
    //     weekNumbers.push(date);
    // }

    return (
        <Menu>
            <Header links={links} />
            <div className={styles.calendar}>
                <div>
                    <span className={styles.date}>{day} {month} {year}</span>
                    <button className="blueBtn">Создать</button>
                </div>
                <div>
                    <span className={styles.buttons}>
                        <button className="blueBtn">День</button>
                        <button className="grayBtn">Неделя</button>
                    </span>
                    <span>
                        <button className="arrowBtn"><i className="fa-solid fa-arrow-left"></i></button>
                        <button className="arrowBtn"><i className="fa-solid fa-arrow-right"></i></button>
                    </span>
                </div>
                <table className={styles.dayCalendar}>
                    <thead>
                        <tr>
                            <th className={styles.eventCounter}>2 события</th>
                            {/* <th>{weekNumbers[0].getDate()}</th>
                            <th>{weekNumbers[1].getDate()}</th>
                            <th>{weekNumbers[2].getDate()}</th>
                            <th>{weekNumbers[3].getDate()}</th>
                            <th>{weekNumbers[4].getDate()}</th>
                            <th>{weekNumbers[5].getDate()}</th>
                            <th>{weekNumbers[6].getDate()}</th> */}
                            <th className={styles.tableDate}>
                                <span className={styles.day}>
                                    <span>{day} {month}</span> | {dayOfWeek}
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td rowSpan='12' className={styles.time}>
                                <table className={styles.time}>
                                    <tbody>
                                        {/* <tr><td></td></tr> */}
                                        <tr><td>9:00</td></tr>
                                        <tr><td>10:00</td></tr>
                                        <tr><td>11:00</td></tr>
                                        <tr><td>12:00</td></tr>
                                        <tr><td>13:00</td></tr>
                                        <tr><td>14:00</td></tr>
                                        <tr><td>15:00</td></tr>
                                        <tr><td>16:00</td></tr>
                                        <tr><td>17:00</td></tr>
                                        <tr><td>18:00</td></tr>
                                        {/* <tr><td></td></tr> */}
                                    </tbody>
                                </table>
                            </td>
                            {/* {
                                [...Array(7).keys()].map(i => 
                                    <td>{i}</td>
                                )
                            } */}
                        </tr>
                        <tr>
                            <td></td>
                        </tr>
                        <tr>
                            <td className={styles.event}>Пара</td>
                        </tr>
                        <tr>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                        </tr>
                        <tr>
                            <td className={styles.event}>Собеседование</td>
                        </tr>
                        <tr>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                        </tr>
                        {/* <tr>
                            {
                                [...Array(7).keys()].map(i => 
                                    <td>{i}</td>
                                )
                            }
                        </tr>
                        <tr>
                            {
                                [...Array(7).keys()].map(i => 
                                    <td>{i}</td>
                                )
                            }
                        </tr>
                        <tr>
                            {
                                [...Array(7).keys()].map(i => 
                                    <td>{i}</td>
                                )
                            }
                        </tr>
                        <tr>
                            {
                                [...Array(7).keys()].map(i => 
                                    <td>{i}</td>
                                )
                            }
                        </tr>
                        <tr>
                            {
                                [...Array(7).keys()].map(i => 
                                    <td>{i}</td>
                                )
                            }
                        </tr>
                        <tr>
                            {
                                [...Array(7).keys()].map(i => 
                                    <td>{i}</td>
                                )
                            }
                        </tr>
                        <tr>
                            {
                                [...Array(7).keys()].map(i => 
                                    <td>{i}</td>
                                )
                            }
                        </tr>
                        <tr>
                            {
                                [...Array(7).keys()].map(i => 
                                    <td>{i}</td>
                                )
                            }
                        </tr>
                        <tr>
                            {
                                [...Array(7).keys()].map(i => 
                                    <td>{i}</td>
                                )
                            }
                        </tr>
                        <tr>
                            {
                                [...Array(7).keys()].map(i => 
                                    <td>{i}</td>
                                )
                            }
                        </tr> */}
                    </tbody>
                </table>
            </div>
        </Menu>
    )
}

export default Calendar;