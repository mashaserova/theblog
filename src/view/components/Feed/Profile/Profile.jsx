import React, { useEffect } from 'react';
import styles from './Profile.module.scss';
import { HeaderLayout } from '../../Header/HeaderLayout';
import { useForm } from 'react-hook-form';
import { useEditProfileMutation } from '../../../../store/editProfileSlice';
import { useGetCurrentUserQuery } from '../../../../store/currentUserSlice';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useGetArticlesQuery } from '../../../../store/articlesSlice';
export const Profile = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        reset,
    } = useForm();
    const navigate = useNavigate();
    const [editProfile] = useEditProfileMutation();
    const { data: user, isLoading } = useGetCurrentUserQuery();
    const { refetch: refetchArticles } = useGetArticlesQuery({
        limit: 5,
        offset: 0,
    });
    useEffect(() => {
        if (user && !isLoading) {
            reset({
                username: user.user.username,
                email: user.user.email,
                password: user.user.password,
                image: user.user.image,
            });
        }
    }, [user, isLoading, reset]);
    const onSubmit = async (data) => {
        let hasError = false;
        try {
            const response = await editProfile({ user: data }).unwrap();
            if (response.errors) {
                hasError = true;
                for (const field in response.errors) {
                    setError(field, {
                        type: 'server',
                        message: response.errors[field],
                    });
                }
            }
        } catch (error) {
            hasError = true;
            if (error.status === 422 && error.data && error.data.errors) {
                for (const field in error.data.errors) {
                    setError(field, {
                        type: 'server',
                        message: error.data.errors[field],
                    });
                }
                message.error('Validation error. Please check the fields.');
            } else {
                message.error(error?.message || 'An error occurred');
            }
        } finally {
            if (!hasError) {
                message.success('Profile edited successfully');
                refetchArticles();
                navigate('/');
            }
        }
    };
    return (
        <HeaderLayout>
            <div className={styles.profile_container}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset>
                        <legend className={styles.profile_title}>
                            Edit Profile
                        </legend>
                        <label className={styles.profile_label}>
                            Username
                            <input
                                className={`${styles.profile_input} ${errors.username && styles.error_input}`}
                                type="text"
                                placeholder="Username"
                                {...register('username', {
                                    required: 'Username is required',
                                })}
                            />
                            {errors.username &&
                                errors.username.type === 'server' && (
                                    <div className={styles.error_message}>
                                        {errors.username.message}
                                    </div>
                                )}
                        </label>
                        <label className={styles.profile_label}>
                            Email address
                            <input
                                className={`${styles.profile_input} ${errors.email && styles.error_input}`}
                                type="text"
                                placeholder="Email address"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: 'Invalid email address',
                                    },
                                })}
                            />
                            {errors.email && (
                                <div className={styles.error_message}>
                                    {errors.email.message}
                                </div>
                            )}
                        </label>
                        <label className={styles.profile_label}>
                            New password
                            <input
                                className={`${styles.profile_input} ${errors.password && styles.error_input}`}
                                placeholder="New password"
                                type="password"
                                {...register('password', {
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
                            />
                            {errors.password && (
                                <div className={styles.error_message}>
                                    {errors.password.message}
                                </div>
                            )}
                        </label>
                        <label className={styles.profile_label}>
                            Avatar image (url)
                            <input
                                className={styles.profile_input}
                                type="text"
                                placeholder="Avatar image"
                                {...register('image')}
                            />
                        </label>
                        <button
                            type="submit"
                            className={styles.save_button}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Loading...' : 'Save'}
                        </button>
                    </fieldset>
                </form>
            </div>
        </HeaderLayout>
    );
};
