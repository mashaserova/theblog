import React from 'react';
import styles from './Feed.module.scss';
import { ArticleCard } from './ArticleCard/ArticleCard';

export const Feed = ({ data }) => {
    return (
        <div className={styles.feed_container}>
            {data &&
                data.articles.map((article) => (
                    <ArticleCard key={article.slug} article={article} />
                ))}
        </div>
    );
};
