import React, { useState } from 'react';
import styles from './ArticleCard.module.scss';
import like from '../../../../assets/images/like.svg';
import redLike from '../../../../assets/images/redLike.svg';
import { format } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import { useDeleteArticleMutation } from '../../../../store/articlesSlice';
import { useGetCurrentUserQuery } from '../../../../store/currentUserSlice';
import {
    useDislikeArticleMutation,
    useLikeArticleMutation,
} from '../../../../store/likeSlice';
import { Popconfirm, message } from 'antd';
import MarkdownToJsx from 'markdown-to-jsx';

export const ArticleCard = ({ article, fullContent }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [likes, setLikes] = useState(article.favoritesCount);
    const [isLiked, setIsLiked] = useState(article.favorited);
    const [deleteArticle] = useDeleteArticleMutation();
    const [likeArticle] = useLikeArticleMutation();
    const [dislikeArticle] = useDislikeArticleMutation();
    const { data } = useGetCurrentUserQuery(undefined, { skip: !token });
    const isAuthor = data?.user?.username === article.author.username;
    const options = {
        overrides: {
            h1: {
                component: 'h1',
                props: {
                    className: styles.markdown_h1,
                },
            },
            h2: {
                component: 'h2',
                props: {
                    className: styles.markdown_h2,
                },
            },
            h3: {
                component: 'h3',
                props: {
                    className: styles.markdown_h3,
                },
            },
            p: {
                component: 'p',
                props: {
                    className: styles.markdown_p,
                },
            },
            a: {
                component: 'a',
                props: {
                    className: styles.markdown_a,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                },
            },
            img: {
                component: 'img',
                props: {
                    className: styles.markdown_img,
                    style: { maxWidth: '100%', height: 'auto' },
                },
            },
            strong: {
                component: 'strong',
                props: {
                    className: styles.markdown_strong,
                },
            },
            ul: {
                component: 'ul',
                props: {
                    className: styles.markdown_ul,
                },
            },
            ol: {
                component: 'ol',
                props: {
                    className: styles.markdown_ol,
                },
            },
            li: {
                component: 'li',
                props: {
                    className: styles.markdown_li,
                },
            },
            blockquote: {
                component: 'blockquote',
                props: {
                    className: styles.markdown_blockquote,
                },
            },
            code: {
                component: 'code',
                props: {
                    className: styles.markdown_code,
                },
            },
            pre: {
                component: 'pre',
                props: {
                    className: styles.markdown_pre,
                },
            },
        },
    };
    const formattedDate = (dateStr) => {
        const date = new Date(dateStr);
        return format(date, 'LLLL dd, yyyy');
    };
    const onDelete = async () => {
        try {
            await deleteArticle(article.slug).unwrap();
            message.success('Article is deleted successfully!');
            navigate('/');
        } catch (err) {
            message.error('Error while deleting article');
        }
    };
    const handleLikeArticle = async () => {
        if (!token) {
            message.error('You need to be logged in to like articles.');
            return;
        }
        if (!isLiked) {
            setLikes(likes + 1);
            setIsLiked(true);
            try {
                await likeArticle(article.slug).unwrap();
            } catch (error) {
                setLikes(likes - 1);
                setIsLiked(false);
                message.error('Error while liking the article: ', error);
            }
        } else {
            setLikes(likes - 1);
            setIsLiked(false);
            try {
                await dislikeArticle(article.slug).unwrap();
            } catch (error) {
                setLikes(likes + 1);
                setIsLiked(true);
                message.error('Error while liking the article: ', error);
            }
        }
    };
    return (
        <div className={styles.article_card}>
            <div className={styles.article_content}>
                <div className={styles.article_header}>
                    <Link to={`/article/${article.slug}`} state={{ article }}>
                        <h1 className={styles.article_title}>
                            {article.title}
                        </h1>
                    </Link>
                    <img
                        onClick={handleLikeArticle}
                        className={styles.article_like}
                        src={isLiked ? redLike : like}
                    />
                    <span className={styles.like_count}>{likes}</span>
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
                    <div className={styles.article_body}>
                        <MarkdownToJsx options={options}>
                            {article.body}
                        </MarkdownToJsx>
                    </div>
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
