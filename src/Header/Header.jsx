import styles from './Header.module.css'

const Header = ({links}) => {
    return (
        <header className={styles.header}>
            {
                links.map((link) => (
                    link.link ? (
                        <a href={link.link} key={link.link}>{link.name}</a>
                    ) : (
                        <span key="current">{link.name}</span>
                    )
                ))
            }
        </header>
    )
}

export default Header;