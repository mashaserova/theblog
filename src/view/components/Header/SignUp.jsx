import React from 'react';
import { HeaderLayout } from './HeaderLayout';
import { Link, useNavigate } from 'react-router-dom';
import styles from './SignUp.module.scss';
import { useForm } from 'react-hook-form';
import { useRegisterUserMutation } from '../../../store/registerSlice';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../../store/authSlice';

export const SignUp = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
    } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [registerUser, { isError, error }] = useRegisterUserMutation();
    const onSubmit = async (data) => {
        try {
            const { password, repeatPassword, agreeToTerms, ...userData } =
                data;
            if (password !== repeatPassword) {
                console.error("Passwords don't match");
                return;
            }

            if (!agreeToTerms) {
                console.error('Must agree to terms');
                return;
            }
            const passwordBuffer = new TextEncoder().encode(password); // Создаем буфер
            const passwordBase64 = btoa(String.fromCharCode(...passwordBuffer)); // Кодируем в base64

            const result = await registerUser({
                ...userData,
                password: passwordBase64,
            }).unwrap();
            dispatch(
                loginSuccess({ token: result.user.token, user: result.user })
            );
            localStorage.setItem('token', result.user.token);
            navigate('/');
        } catch (error) {
            console.error('Registration failed', error);
        }
    };
    const password = watch('password');
    return (
        <HeaderLayout>
            <div className={styles.sign_up_container}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset>
                        <legend className={styles.sign_up_title}>
                            Create new account
                        </legend>
                        <label className={styles.sign_up_label}>
                            Username
                            <input
                                type="text"
                                placeholder="Username"
                                {...register('username', {
                                    required: 'Username is required',
                                    validate: (value) => {
                                        if (
                                            value.length < 3 ||
                                            value.length > 20
                                        ) {
                                            return 'Username must be 3-20 characters in length';
                                        }
                                        return true;
                                    },
                                })}
                                className={styles.sign_up_input}
                            />
                        </label>
                        {errors.username && (
                            <div>{errors.username.message}</div>
                        )}
                        <label className={styles.sign_up_label}>
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
                                className={styles.sign_up_input}
                            ></input>
                        </label>
                        {errors.email && <div>{errors.email.message}</div>}
                        <label className={styles.sign_up_label}>
                            Password
                            <input
                                type="password"
                                placeholder="Password"
                                {...register('password', {
                                    required: 'Password is required',
                                    validate: (value) => {
                                        if (
                                            value.length < 6 ||
                                            value.length > 40
                                        ) {
                                            return 'Password must be 6-40 characters in length';
                                        }
                                        return true;
                                    },
                                })}
                                className={styles.sign_up_input}
                            ></input>
                        </label>
                        {errors.password && (
                            <div>{errors.password.message}</div>
                        )}
                        <label className={styles.sign_up_label}>
                            Repeat Password
                            <input
                                type="password"
                                placeholder="Password"
                                {...register('repeatPassword', {
                                    required: 'Repeating password is required',
                                    validate: (value) => {
                                        if (value !== password) {
                                            return 'Passwords must be identical';
                                        }
                                        return true;
                                    },
                                })}
                                className={styles.sign_up_input}
                            ></input>
                        </label>
                        {errors.repeatPassword && (
                            <div>{errors.repeatPassword.message}</div>
                        )}
                        <label className={styles.sign_up_label}>
                            <input
                                type="checkbox"
                                {...register('agreeToTerms', {
                                    required: 'You must agree to the terms',
                                })}
                                className={styles.sign_up_checkbox}
                            />
                            I agree to the processing of my personal information
                        </label>
                        {errors.agreeToTerms && (
                            <div>{errors.agreeToTerms.message}</div>
                        )}
                        <button
                            disabled={isSubmitting}
                            type="submit"
                            className={styles.create_button}
                        >
                            {isSubmitting ? 'Loading...' : 'Create'}
                        </button>
                    </fieldset>
                    {isError && (
                        <div>
                            {error.data.errors.username ||
                                error.data.errors.email ||
                                'Registration failed. Please try again later.'}
                        </div>
                    )}
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
// email: "mashaserova@gmail.com"
// token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MGQyNDQ4Y2UxOGQwMWIwMDJiMjNkYiIsInVzZXJuYW1lIjoibWFzaGFzZXJvdmEiLCJleHAiOjE3MzQwOTg1MDQsImlhdCI6MTcyODkxNDUwNH0.pea6WChoF_HGYnaAqQ9ej1irwEC4PUVog0cAnLgmqRw"
// username: "mashaserova"
