import React from 'react';
import styles from './ArticleCard.module.scss';
import like from '../../../../assets/images/like.svg';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDeleteArticleMutation } from '../../../../store/deleteArticleSlice';

//DELETE BUTTON через запрос на сервер
export const ArticleCard = ({ article, fullContent }) => {
    const formattedDate = (dateStr) => {
        const date = new Date(dateStr);
        return format(date, 'LLLL dd, yyyy');
    };
    const [deleteArticle] = useDeleteArticleMutation();
    const onDelete = async (slug) => {
        try {
            const result = await deleteArticle(slug).unwrap();
            console.log(result);
        } catch (err) {
            console.error('Ошибка входа:', err);
        }
    };
    const currentUser = useSelector((state) => state.auth.user);
    console.log('курент юзер', currentUser);
    const isAuthor =
        currentUser && currentUser.username === article.author.username;
    console.log(isAuthor);
    return (
        <div className={styles.article_card}>
            <div className={styles.article_content}>
                <div className={styles.article_header}>
                    <h1 className={styles.article_title}>{article.title}</h1>
                    <img className={styles.article_like} src={like} />
                    <span className={styles.like_count}>
                        {article.favoritesCount}
                    </span>
                </div>
                <div className={styles.article_tags}>
                    {article.tagList.map((tag) => (
                        <span key={tag} className={styles.article_tag}>
                            {tag}
                        </span>
                    ))}
                </div>
                <p className={styles.article_description}>
                    {article.description}
                </p>
                {fullContent && (
                    <p className={styles.article_body}>{article.body}</p>
                )}
            </div>
            <div className={styles.article_info}>
                <div>
                    <h2 className={styles.author_title}>
                        {article.author.username}
                    </h2>
                    <span className={styles.article_date}>
                        {formattedDate(article.updatedAt)}
                    </span>
                </div>
                <img
                    className={styles.author_image}
                    src={article.author.image}
                />
                {isAuthor && (
                    <div className={styles.article.buttons}>
                        <Link to={`/article/${article.slug}/edit`}>Edit</Link>
                        <button onClick={() => onDelete(article.slug)}>
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
