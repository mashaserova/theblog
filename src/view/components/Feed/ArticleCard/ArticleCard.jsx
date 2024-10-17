import React from 'react';
import styles from './ArticleCard.module.scss';
import like from '../../../../assets/images/like.svg';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useDeleteArticleMutation } from '../../../../store/deleteArticleSlice';
import { useGetCurrentUserQuery } from '../../../../store/currentUserSlice';

export const ArticleCard = ({ article, fullContent }) => {
    const formattedDate = (dateStr) => {
        const date = new Date(dateStr);
        return format(date, 'LLLL dd, yyyy');
    };
    const [deleteArticle] = useDeleteArticleMutation();
    const onDelete = async () => {
        try {
            console.log(article.slug);
            const result = await deleteArticle(article.slug).unwrap();
            console.log(result);
        } catch (err) {
            console.error('Ошибка входа:', err);
        }
    };
    const { data } = useGetCurrentUserQuery();
    const isAuthor = data?.user?.username === article.author.username;
    return (
        <div className={styles.article_card}>
            <div className={styles.article_content}>
                <div className={styles.article_header}>
                    <Link to={`/article/${article.slug}`} state={{ article }}>
                        <h1 className={styles.article_title}>
                            {article.title}
                        </h1>
                    </Link>
                    <img className={styles.article_like} src={like} />
                    <span className={styles.like_count}>
                        {article.favoritesCount}
                    </span>
                </div>
                <div className={styles.article_tags}>
                    {article.tagList.map((tag, index) => (
                        <span
                            key={`${index}-${tag}`}
                            className={styles.article_tag}
                        >
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
                {data && isAuthor && fullContent && (
                    <div className={styles.article_buttons}>
                        {console.log(isAuthor)}
                        <Link
                            to={`/article/${article.slug}/edit`}
                            state={{ article }}
                        >
                            Edit
                        </Link>
                        <button type="button" onClick={() => onDelete()}>
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
