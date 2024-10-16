import React, { useState } from 'react';
import { HeaderLayout } from '../../Header/HeaderLayout';
import styles from './NewArticle.module.scss';
import { useForm } from 'react-hook-form';
import { useCreateNewArticleMutation } from '../../../../store/newArticleSlice';

export const NewArticle = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
    } = useForm();
    const [tags, setTags] = useState([]);
    const [createNewArticle] = useCreateNewArticleMutation();
    const onSubmit = async (data) => {
        try {
            console.log('AAAA', {
                title: data.title,
                description: data.description,
                body: data.body,
                tags: tags,
            });
            const result = await createNewArticle({
                title: data.title,
                description: data.description,
                body: data.body,
                tagList: tags,
            });
            console.log(result);
        } catch (error) {
            console.log('ошибка', error);
        }
    };
    const handleAddTag = () => {
        const newTag = document.getElementById('tagInput').value.trim();
        if (newTag) {
            setTags([...tags, newTag]);
            setValue('tagInput', '');
            document.getElementById('tagInput').focus();
        }
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
                            className={styles.new_article_input}
                            type="text"
                            placeholder="Title"
                            {...register('title', {
                                required: 'Title is required',
                            })}
                        />
                    </label>
                    {errors.title && errors.title.message}
                    <label className={styles.new_article_label}>
                        Short description
                        <input
                            className={styles.new_article_input}
                            type="text"
                            placeholder="Title"
                            {...register('description', {
                                required: 'Short description is required',
                            })}
                        />
                    </label>
                    {errors.description && errors.description.message}
                    <label className={styles.new_article_label}>
                        Text
                        <input
                            className={styles.new_article_input}
                            type="text"
                            placeholder="Text"
                            {...register('body', {
                                required: 'Text is required',
                            })}
                        />
                    </label>
                    {errors.body && errors.body.message}
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
                        {isSubmitting ? 'Loading...' : 'Send'}
                    </button>
                </fieldset>
            </form>
        </HeaderLayout>
    );
};
