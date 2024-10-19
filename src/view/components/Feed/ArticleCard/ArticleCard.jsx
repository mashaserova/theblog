import React from 'react';
import styles from './ArticleCard.module.scss';
import like from '../../../../assets/images/like.svg';
import { format } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import { useDeleteArticleMutation } from '../../../../store/articlesSlice';
import { useGetCurrentUserQuery } from '../../../../store/currentUserSlice';
import { Popconfirm, message } from 'antd';

export const ArticleCard = ({ article, fullContent }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const formattedDate = (dateStr) => {
        const date = new Date(dateStr);
        return format(date, 'LLLL dd, yyyy');
    };
    const [deleteArticle] = useDeleteArticleMutation();
    const onDelete = async () => {
        try {
            await deleteArticle(article.slug).unwrap();
            message.success('Article is deleted successfully!');
            navigate('/');
        } catch (err) {
            message.error('Error while deleting article');
        }
    };
    const { data } = useGetCurrentUserQuery(undefined, { skip: !token });
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
                <div className={styles.author_block}>
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
                </div>
                {data && isAuthor && fullContent && (
                    <div className={styles.article_buttons}>
                        <Popconfirm
                            title="Are you sure you really want to delete this article?"
                            onConfirm={onDelete}
                            okText="Delete"
                            cancelText="Cancel"
                        >
                            <button
                                type="button"
                                className={styles.delete_button}
                            >
                                Delete
                            </button>
                        </Popconfirm>
                        <Link
                            to={`/article/${article.slug}/edit`}
                            state={{ article }}
                            className={styles.edit_button}
                        >
                            Edit
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};
