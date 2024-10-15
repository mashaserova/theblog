import React from 'react';
import styles from './Profile.module.scss';
import { HeaderLayout } from '../../Header/HeaderLayout';
import { useForm } from 'react-hook-form';

export const Profile = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();
    const onSubmit = () => {
        console.log('Account edited');
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
                                className={styles.profile_input}
                                type="text"
                                placeholder="Username"
                                {...register('username', {
                                    required: 'Username is required',
                                })}
                            />
                        </label>
                        {errors.username && (
                            <div>{errors.username.message}</div>
                        )}
                        <label className={styles.profile_label}>
                            Email address
                            <input
                                className={styles.profile_input}
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
                        </label>
                        {errors.email && <div>{errors.email.message}</div>}
                        <label className={styles.profile_label}>
                            New password
                            <input
                                className={styles.profile_input}
                                type="text"
                                placeholder="New password"
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
                        </label>
                        {errors.password && (
                            <div>{errors.password.message}</div>
                        )}
                        <label className={styles.profile_label}>
                            Avatar image (url)
                            <input
                                className={styles.profile_input}
                                type="text"
                                placeholder="Avatar image"
                            />
                        </label>
                        <button
                            type="submit"
                            className={styles.save_button}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Loading...' : 'Save'}
                        </button>
                    </fieldset>
                </form>
            </div>
        </HeaderLayout>
    );
};
