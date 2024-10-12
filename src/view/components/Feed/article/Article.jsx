import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Article.module.scss';
import { ArticleCard } from '../ArticleCard/ArticleCard';
import { HeaderLayout } from '../../Header/HeaderLayout';

export const Article = () => {
    const location = useLocation();
    const article = location.state?.article;
    if (!article) {
        return <div>Article not found</div>;
    }
    return (
        <HeaderLayout>
            <div className={styles.article_container}>
                <ArticleCard article={article} fullContent={true} />
            </div>
        </HeaderLayout>
    );
};
