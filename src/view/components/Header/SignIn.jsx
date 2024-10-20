import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeaderLayout } from './HeaderLayout';
import styles from './SignIn.module.scss';
import { useForm } from 'react-hook-form';
import { useLoginUserMutation } from '../../../store/loginSlice';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../../store/authSlice';
import { message } from 'antd';

export const SignIn = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginUser, { isError }] = useLoginUserMutation();
    const onSubmit = async (data) => {
        try {
            const result = await loginUser({
                email: data.email,
                password: data.password,
            }).unwrap();
            dispatch(
                loginSuccess({ token: result.user.token, user: result.user })
            );
            message.success('You logged in successfully!');
            localStorage.setItem('token', result.user.token);
            localStorage.setItem('username', result.user.username);
            navigate('/');
        } catch (error) {
            message.error(
                `Email or password ${error.data.errors['email or password']}.`
            );
        }
    };

    return (
        <HeaderLayout>
            <div className={styles.sign_in_container}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset>
                        <legend className={styles.sign_in_title}>
                            Sign In
                        </legend>
                        <label className={styles.sign_in_label}>
                            Email address
                            <input
                                type="email"
                                placeholder="Email address"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: 'Invalid email address',
                                    },
                                })}
                                className={`${styles.sign_in_input} ${(isError || errors.email) && styles.error_input}`}
                            ></input>
                            {errors.email && (
                                <div className={styles.error_message}>
                                    {errors.email.message}
                                </div>
                            )}
                        </label>
                        <label className={styles.sign_in_label}>
                            Password
                            <input
                                type="password"
                                placeholder="Password"
                                {...register('password', {
                                    required: 'Password is required',
                                })}
                                className={`${styles.sign_in_input} ${(isError || errors.password) && styles.error_input}`}
                            ></input>
                            {errors.password && (
                                <div className={styles.error_message}>
                                    {errors.password.message}
                                </div>
                            )}
                        </label>
                        <button className={styles.login_button}>
                            {isSubmitting ? 'Loading...' : 'Login'}
                        </button>
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
