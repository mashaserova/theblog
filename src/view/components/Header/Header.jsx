import React from 'react';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';

export const Header = () => {
    return (
        <header className={styles.header_container}>
            <Link to={'/'}>
                <button className={styles.header_button}>theblog</button>
            </Link>
            <div className={styles.header_buttons}>
                <Link to={'/sign-in'}>
                    <button
                        className={`${styles.sign_in_button} ${styles.header_button}`}
                    >
                        Sign In
                    </button>
                </Link>
                <Link to={'/sign-up'}>
                    <button
                        className={`${styles.sign_up_button} ${styles.header_button}`}
                    >
                        Sign Up
                    </button>
                </Link>
            </div>
        </header>
    );
};
