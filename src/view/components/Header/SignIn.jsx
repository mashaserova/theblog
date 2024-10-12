import React from 'react';
import { Link } from 'react-router-dom';
import { HeaderLayout } from './HeaderLayout';
import styles from './SignIn.module.scss';

export const SignIn = () => {
    return (
        <HeaderLayout>
            <div className={styles.sign_in_container}>
                <form>
                    <fieldset>
                        <legend className={styles.sign_in_title}>
                            Sign In
                        </legend>
                        <label className={styles.sign_in_label}>
                            Email address
                            <input
                                type="email"
                                placeholder="Email address"
                                required
                                className={styles.sign_in_input}
                            ></input>
                        </label>
                        <label className={styles.sign_in_label}>
                            Password
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                className={styles.sign_in_input}
                            ></input>
                        </label>
                        <button className={styles.login_button}>Login</button>
                    </fieldset>
                    <div className={styles.sign_in_footer}>
                        Don’t have an account?{' '}
                        <Link to="/sign-up" className={styles.anchor_blue}>
                            Sign up.
                        </Link>
                    </div>
                </form>
            </div>
        </HeaderLayout>
    );
};
