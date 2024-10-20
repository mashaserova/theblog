import React, { useState } from 'react';
import { useGetArticlesQuery } from '../store/articlesSlice';
import { Pagination, Spin, Alert } from 'antd';
import styles from './App.module.scss';
import { HeaderLayout } from './components/Header/HeaderLayout';
import { Feed } from './components/Feed/Feed';

const App = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 5;
    const { data, isLoading, isError, error } = useGetArticlesQuery({
        limit,
        offset: (currentPage - 1) * limit,
    });
    const handleCurrentPage = (page) => {
        setCurrentPage(page);
    };
    if (isLoading) {
        return (
            <HeaderLayout>
                <div className={styles.spin_container}>
                    <Spin size="large" spinning={true}></Spin>
                    <h2 className={styles.loadingText}>Feed is loading...</h2>
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

    return (
        <>
            <HeaderLayout>
                <Feed data={data} />
            </HeaderLayout>
            <div className={styles.pagination_container}>
                <Pagination
                    current={currentPage}
                    pageSize={limit}
                    total={data ? data.articlesCount : 0}
                    onChange={handleCurrentPage}
                    showSizeChanger={false}
                />
            </div>
        </>
    );
};
export default App;
