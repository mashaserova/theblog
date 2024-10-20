import React, { useState } from 'react';
import { HeaderLayout } from '../../Header/HeaderLayout';
import { useForm } from 'react-hook-form';
import styles from './Edit.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEditArticleMutation } from '../../../../store/articlesSlice';
import { message } from 'antd';
export const Edit = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const article = location.state?.article;
    const [editArticle, { isLoading }] = useEditArticleMutation();
    const {
        register,
        formState: { errors },
        setValue,
        handleSubmit,
    } = useForm();
    const [tags, setTags] = useState(
        article.tagList.map((tag) => ({ value: tag }))
    );
    const handleDeleteTag = (index) => {
        const newTags = tags.filter((_, i) => i !== index);
        setTags(newTags);
    };
    const handleAddTag = () => {
        const newTag = document.getElementById('tagInput').value.trim();
        if (newTag) {
            setTags([...tags, newTag]);
            setValue('tagInput', '');
            document.getElementById('tagInput').focus();
        }
    };
    const handleTagChange = (index, newValue) => {
        const updatedTags = tags.map((tag, i) =>
            i === index ? { ...tag, value: newValue } : tag
        );
        setTags(updatedTags);
    };
    const onSubmit = async (data) => {
        try {
            const articleData = {
                article: {
                    title: data.title,
                    description: data.description,
                    body: data.body,
                    tagList: tags.map((tag) => tag.value),
                },
            };
            await editArticle({
                slug: article.slug,
                articleData,
            }).unwrap();
            message.success('The article is edited successfully!');
            navigate('/');
        } catch (error) {
            message.error('The article editing is failed, please, try again.');
        }
    };
    return (
        <HeaderLayout>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={styles.edit_article_container}
            >
                <fieldset>
                    <legend className={styles.edit_article_title}>
                        Edit article
                    </legend>
                    <label className={styles.edit_article_label}>
                        Title
                        <input
                            className={`${styles.edit_article_input} ${errors.title && styles.error_input}`}
                            type="text"
                            defaultValue={article.title}
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
                    <label className={styles.edit_article_label}>
                        Short description
                        <input
                            className={`${styles.edit_article_input} ${errors.description && styles.error_input}`}
                            type="text"
                            defaultValue={article.description}
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
                    <label className={styles.edit_article_label}>
                        Text
                        <input
                            className={`${styles.edit_article_input} ${errors.body && styles.error_input}`}
                            type="text"
                            defaultValue={article.body}
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
                    <label className={styles.edit_article_label}>
                        Tags
                        <input
                            id="tagInput"
                            className={styles.edit_article_input}
                            type="text"
                            placeholder="Tag"
                            {...register('tagInput')}
                        />
                        <div className={styles.tags_container}>
                            {tags.map((tag, index) => (
                                <div key={index} className={styles.tag_item}>
                                    <input
                                        className={styles.editable_tag_input}
                                        value={tag.value}
                                        onChange={(event) =>
                                            handleTagChange(
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
                        {isLoading ? 'Loading...' : 'Send'}
                    </button>
                </fieldset>
            </form>
        </HeaderLayout>
    );
};
