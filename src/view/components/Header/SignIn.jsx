import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeaderLayout } from './HeaderLayout';
import styles from './SignIn.module.scss';
import { useForm } from 'react-hook-form';
import { useLoginUserMutation } from '../../../store/loginSlice';

export const SignIn = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();
    const navigate = useNavigate();
    const [loginUser, { isError, error }] = useLoginUserMutation();
    const onSubmit = async (data) => {
        try {
            const userPayload = {
                user: {
                    email: data.email,
                    password: data.password,
                },
            };
            console.log('Data being sent:', userPayload);
            const result = await loginUser(userPayload).unwrap();
            console.log('Login successful: ', result);
            navigate('/authorized');
        } catch (error) {
            console.log('Login failed', error);
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
                                className={styles.sign_in_input}
                            ></input>
                        </label>
                        {errors.email && <div>{errors.email.message}</div>}
                        <label className={styles.sign_in_label}>
                            Password
                            <input
                                type="password"
                                placeholder="Password"
                                {...register('password', {
                                    required: 'Password is required',
                                })}
                                className={styles.sign_in_input}
                            ></input>
                        </label>
                        {errors.password && (
                            <div>{errors.password.message}</div>
                        )}
                        <button className={styles.login_button}>
                            {isSubmitting ? 'Loading...' : 'Login'}
                        </button>
                    </fieldset>
                    {isError && (
                        <div>
                            {error.data.errors.username ||
                                error.data.errors.email ||
                                'Login failed. Please try again later.'}
                        </div>
                    )}
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
