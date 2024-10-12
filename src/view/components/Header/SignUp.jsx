import React from 'react';
import { HeaderLayout } from './HeaderLayout';
import { Link } from 'react-router-dom';
import styles from './SignUp.module.scss';

export const SignUp = () => {
    return (
        <HeaderLayout>
            <div className={styles.sign_up_container}>
                <form>
                    <fieldset>
                        <legend className={styles.sign_up_title}>
                            Create new account
                        </legend>
                        <label className={styles.sign_up_label}>
                            Username
                            <input
                                type="text"
                                placeholder="Username"
                                required
                                className={styles.sign_up_input}
                            />
                        </label>
                        <label className={styles.sign_up_label}>
                            Email address
                            <input
                                type="email"
                                placeholder="Email address"
                                required
                                className={styles.sign_up_input}
                            ></input>
                        </label>
                        <label className={styles.sign_up_label}>
                            Password
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                className={styles.sign_up_input}
                            ></input>
                        </label>
                        <label className={styles.sign_up_label}>
                            Repeat Password
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                className={styles.sign_up_input}
                            ></input>
                        </label>
                        <label className={styles.sign_up_label}>
                            <input
                                type="checkbox"
                                required
                                className={styles.sign_up_checkbox}
                            />
                            I agree to the processing of my personal information
                        </label>
                        <button className={styles.create_button}>Create</button>
                    </fieldset>
                    <div className={styles.sign_up_footer}>
                        Already have an account?{' '}
                        <Link to="/sign-up" className={styles.anchor_blue}>
                            Sign In.
                        </Link>
                    </div>
                </form>
            </div>
        </HeaderLayout>
    );
};
