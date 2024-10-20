import React, { useState } from 'react';
import { HeaderLayout } from '../../Header/HeaderLayout';
import styles from './NewArticle.module.scss';
import { useForm } from 'react-hook-form';
import { useCreateNewArticleMutation } from '../../../../store/articlesSlice';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

export const NewArticle = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
    } = useForm();
    const navigate = useNavigate();
    const [tags, setTags] = useState([]);
    const [createNewArticle] = useCreateNewArticleMutation();

    const onSubmit = async (data) => {
        try {
            await createNewArticle({
                title: data.title,
                description: data.description,
                body: data.body,
                tagList: tags,
            }).unwrap();
            navigate('/');
            message.success('The article is created successfully!');
        } catch (error) {
            message.error(
                'An error occurred while creating the article, please try again.'
            );
        }
    };

    const handleAddTag = () => {
        const newTag = document.getElementById('tagInput').value.trim();
        if (newTag) {
            setTags((prevTags) => [...prevTags, newTag]);
            setValue('tagInput', '');
            document.getElementById('tagInput').focus();
        }
    };

    const handleEditTag = (index, newValue) => {
        const updatedTags = tags.map((tag, i) =>
            i === index ? newValue : tag
        );
        setTags(updatedTags);
    };

    const handleDeleteTag = (index) => {
        const newTags = tags.filter((_, i) => i !== index);
        setTags(newTags);
    };

    return (
        <HeaderLayout>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={styles.create_article_container}
            >
                <fieldset>
                    <legend className={styles.new_article_title}>
                        Create new article
                    </legend>
                    <label className={styles.new_article_label}>
                        Title
                        <input
                            className={`${styles.new_article_input} ${errors.title && styles.error_input}`}
                            type="text"
                            placeholder="Title"
                            {...register('title', {
                                required: 'Title is required',
                            })}
                        />
                        {errors.title && (
                            <div className={styles.error_message}>
                                {errors.title.message}
                            </div>
                        )}
                    </label>
                    <label className={styles.new_article_label}>
                        Short description
                        <input
                            className={`${styles.new_article_input} ${errors.description && styles.error_input}`}
                            type="text"
                            placeholder="Short description"
                            {...register('description', {
                                required: 'Short description is required',
                            })}
                        />
                        {errors.description && (
                            <div className={styles.error_message}>
                                {errors.description.message}
                            </div>
                        )}
                    </label>
                    <label className={styles.new_article_label}>
                        Text
                        <input
                            className={`${styles.new_article_input} ${errors.body && styles.error_input}`}
                            placeholder="Text"
                            {...register('body', {
                                required: 'Text is required',
                            })}
                        />
                        {errors.body && (
                            <div className={styles.error_message}>
                                {errors.body.message}
                            </div>
                        )}
                    </label>
                    <label className={styles.new_article_label}>
                        Tags
                        <input
                            id="tagInput"
                            className={styles.new_article_input}
                            type="text"
                            placeholder="Tag"
                            {...register('tagInput')}
                        />
                        <div className={styles.tags_container}>
                            {tags.map((tag, index) => (
                                <div key={index} className={styles.tag_item}>
                                    <input
                                        className={styles.editable_tag_input}
                                        value={tag}
                                        onChange={(event) =>
                                            handleEditTag(
                                                index,
                                                event.target.value
                                            )
                                        }
                                    />
                                    <button
                                        className={styles.delete_tag_button}
                                        onClick={() => handleDeleteTag(index)}
                                        type="button"
                                    >
                                        Delete tag
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button
                            className={styles.add_tag_button}
                            onClick={handleAddTag}
                            type="button"
                        >
                            Add tag
                        </button>
                    </label>
                    <button className={styles.send_button}>
                        {isSubmitting ? 'Loading...' : 'Send'}
                    </button>
                </fieldset>
            </form>
        </HeaderLayout>
    );
};
