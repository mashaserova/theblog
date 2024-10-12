import React from 'react';
import styles from './Feed.module.scss';
import { Link } from 'react-router-dom';
import { ArticleCard } from './ArticleCard/ArticleCard';

export const Feed = ({ data }) => {
    return (
        <div className={styles.feed_container}>
            {data &&
                data.articles.map((article) => (
                    <Link
                        key={article.slug}
                        to={`/article/${article.slug}`}
                        state={{ article }}
                    >
                        <ArticleCard article={article} />
                    </Link>
                ))}
        </div>
    );
};
