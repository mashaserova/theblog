import React from 'react';
import { HeaderLayout } from '../../Header/HeaderLayout';
import styles from './NewArticle.module.scss';

export const NewArticle = () => {
    return (
        <HeaderLayout>
            <form className={styles.create_article_container}>
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
                        />
                    </label>
                    <label className={styles.new_article_label}>
                        Short description
                        <input
                            className={styles.new_article_input}
                            type="text"
                            placeholder="Title"
                        />
                    </label>
                    <label className={styles.new_article_label}>
                        Text
                        <input
                            className={styles.new_article_input}
                            type="text"
                            placeholder="Text"
                        />
                    </label>
                    <label className={styles.new_article_label}>
                        Tags
                        <input
                            className={styles.new_article_input}
                            type="text"
                            placeholder="Tag"
                        />
                        <button className={styles.delete_tag_button}>
                            Delete tag
                        </button>
                        <button className={styles.add_tag_button}>
                            Add tag
                        </button>
                    </label>
                    <button className={styles.send_button}>Send</button>
                </fieldset>
            </form>
        </HeaderLayout>
    );
};
