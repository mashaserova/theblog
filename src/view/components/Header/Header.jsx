import React, { useEffect } from 'react';
import styles from './Header.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/authSlice';
import { useGetCurrentUserQuery } from '../../../store/currentUserSlice';

export const Header = () => {
    const token = localStorage.getItem('token');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data, isLoading, refetch } = useGetCurrentUserQuery(undefined, {
        skip: !token,
    });
    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('./');
    };
    useEffect(() => {
        if (token) {
            refetch();
        }
    }, [token, refetch]);
    return (
        <header className={styles.header_container}>
            <Link to={'/'}>
                <button className={styles.header_button}>theblog</button>
            </Link>
            {!token ? (
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
            ) : (
                <div className={styles.header_buttons}>
                    <Link to={'/new-article'}>
                        <button className={styles.create_article_button}>
                            Create article
                        </button>
                    </Link>
                    <Link to={'/profile'}>
                        <div className={styles.header_buttons}>
                            <button className={styles.profile_button}>
                                {isLoading
                                    ? 'Загрузка...'
                                    : data?.user?.username || 'Профиль'}
                            </button>
                            {data?.user?.image ? (
                                <img
                                    className={styles.user_image}
                                    src={data.user.image}
                                    alt={data.user.username}
                                />
                            ) : (
                                <img
                                    className={styles.user_image}
                                    src="https://static.productionready.io/images/smiley-cyrus.jpg"
                                    alt="user without image"
                                />
                            )}
                        </div>
                    </Link>
                    <Link to={'./'}>
                        <button
                            className={styles.log_out_button}
                            onClick={handleLogout}
                        >
                            Log out
                        </button>
                    </Link>
                </div>
            )}
        </header>
    );
};
