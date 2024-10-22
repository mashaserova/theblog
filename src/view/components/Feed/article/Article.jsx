import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './Article.module.scss';
import { ArticleCard } from '../ArticleCard/ArticleCard';
import { HeaderLayout } from '../../Header/HeaderLayout';
import { useGetArticleBySlugQuery } from '../../../../store/articlesSlice';
import { Alert, Spin } from 'antd';

export const Article = () => {
    const { slug } = useParams();
    const {
        data: article,
        isLoading,
        isError,
        error,
    } = useGetArticleBySlugQuery(slug);
    if (isLoading) {
        return (
            <HeaderLayout>
                <div className={styles.spin_container}>
                    <Spin size="large" spinning={true}></Spin>
                    <h2 className={styles.loadingText}>
                        Article is loading...
                    </h2>
                </div>
            </HeaderLayout>
        );
    }

    if (isError) {
        return (
            <HeaderLayout>
                <div className={styles.alert_container}>
                    <Alert
                        message="Oops..."
                        description={`Error occured: ${error.status} - ${error.data.message}. Please, try again later.`}
                        type="error"
                        showIcon
                        closeIcon
                    />
                </div>
            </HeaderLayout>
        );
    }
    if (!article?.article) {
        return (
            <HeaderLayout>
                <div className={styles.alert_container}>
                    <Alert
                        message="Oops..."
                        description={`Article did not found. Sorry(`}
                        type="error"
                        showIcon
                        closeIcon
                    />
                </div>
            </HeaderLayout>
        );
    }
    if (article && article.article) {
        return (
            <HeaderLayout>
                <div className={styles.article_container}>
                    <ArticleCard
                        article={article?.article}
                        fullContent={true}
                    />
                </div>
            </HeaderLayout>
        );
    }
};
