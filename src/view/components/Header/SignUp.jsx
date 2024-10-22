import React from 'react';
import { HeaderLayout } from './HeaderLayout';
import { Link, useNavigate } from 'react-router-dom';
import styles from './SignUp.module.scss';
import { useForm } from 'react-hook-form';
import { useRegisterUserMutation } from '../../../store/registerSlice';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../../store/authSlice';
import { message } from 'antd';

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
            const passwordBuffer = new TextEncoder().encode(password);
            const passwordBase64 = btoa(String.fromCharCode(...passwordBuffer));

            const result = await registerUser({
                ...userData,
                password: passwordBase64,
            }).unwrap();
            dispatch(
                loginSuccess({ token: result.user.token, user: result.user })
            );
            message.success('Ragistration is successed!');
            localStorage.setItem('token', result.user.token);
            navigate('/');
        } catch (error) {
            message.error('Registration is failed, please, try again.');
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
                                className={`${styles.sign_up_input} ${(isError || errors.username) && styles.error_input}`}
                            />
                            {errors.username && (
                                <div className={styles.error_message}>
                                    {errors.username.message}
                                </div>
                            )}
                            {error?.data.errors.username && (
                                <div className={styles.error_message}>
                                    Username {error.data.errors.username}
                                </div>
                            )}
                        </label>
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
                                className={`${styles.sign_up_input} ${(isError || errors.email) && styles.error_input}`}
                            ></input>
                            {errors.email && (
                                <div className={styles.error_message}>
                                    {errors.email.message}
                                </div>
                            )}
                            {error?.data.errors.username && (
                                <div className={styles.error_message}>
                                    Email {error.data.errors.username}
                                </div>
                            )}
                        </label>
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
                                className={`${styles.sign_up_input} ${(isError || errors.password) && styles.error_input}`}
                            ></input>
                            {errors.password && (
                                <div className={styles.error_message}>
                                    {errors.password.message}
                                </div>
                            )}
                        </label>
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
                                className={`${styles.sign_up_input} ${(isError || errors.repeatPassword) && styles.error_input}`}
                            ></input>
                            {errors.repeatPassword && (
                                <div className={styles.error_message}>
                                    {errors.repeatPassword.message}
                                </div>
                            )}
                        </label>
                        <label className={styles.sign_up_label}>
                            <input
                                type="checkbox"
                                {...register('agreeToTerms', {
                                    required: 'You must agree to the terms',
                                })}
                                className={`${styles.sign_up_checkbox} ${(isError || errors.agreeToTerms) && styles.error_input}`}
                            />
                            I agree to the processing of my personal information
                            {errors.agreeToTerms && (
                                <div className={styles.error_message}>
                                    {errors.agreeToTerms.message}
                                </div>
                            )}
                        </label>
                        <button
                            disabled={isSubmitting}
                            type="submit"
                            className={styles.create_button}
                        >
                            {isSubmitting ? 'Loading...' : 'Create'}
                        </button>
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
