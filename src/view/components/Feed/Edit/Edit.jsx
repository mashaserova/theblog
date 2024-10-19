import React, { useState } from 'react';
import { HeaderLayout } from '../../Header/HeaderLayout';
import { useForm } from 'react-hook-form';
import styles from './Edit.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEditArticleMutation } from '../../../../store/articlesSlice';

export const Edit = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const article = location.state?.article;
    const {
        register,
        formState: { errors },
        setValue,
        handleSubmit,
    } = useForm();
    const [tags, setTags] = useState(article.tagList);
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
    const [editArticle, { isLoading }] = useEditArticleMutation();
    const onSubmit = async (data) => {
        try {
            const articleData = {
                article: {
                    title: data.title,
                    description: data.description,
                    body: data.body,
                    tagList: tags,
                },
            };
            await editArticle({
                slug: article.slug,
                articleData,
            }).unwrap();
            navigate('/');
        } catch (error) {
            console.log('ошибка', error);
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
                            className={styles.edit_article_input}
                            type="text"
                            defaultValue={article.title}
                            placeholder="Title"
                            {...register('title', {
                                required: 'Title is required',
                            })}
                        />
                    </label>
                    {errors.title && errors.title.message}
                    <label className={styles.edit_article_label}>
                        Short description
                        <input
                            className={styles.edit_article_input}
                            type="text"
                            defaultValue={article.description}
                            {...register('description', {
                                required: 'Short description is required',
                            })}
                        />
                    </label>
                    {errors.description && errors.description.message}
                    <label className={styles.edit_article_label}>
                        Text
                        <input
                            className={styles.edit_article_input}
                            type="text"
                            defaultValue={article.body}
                            placeholder="Text"
                            {...register('body', {
                                required: 'Text is required',
                            })}
                        />
                    </label>
                    {errors.body && errors.body.message}
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
                                    {tag}
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
