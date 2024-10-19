import React, { useState } from 'react';
import { useGetArticlesQuery } from '../store/articlesSlice';
import { Pagination } from 'antd';
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
        return <div>Loading...</div>;
    }
    if (isError) {
        return (
            <div>
                Error: {error.status} - {error.data.message}
            </div>
        );
    }
    if (!data) {
        return <div>Loading data...</div>; // Или другой подходящий индикатор загрузки
    }
    return (
        <>
            <HeaderLayout>
                <Feed data={data} />
            </HeaderLayout>
            <div className={styles.antd_container}>
                <Pagination
                    current={currentPage}
                    pageSize={limit}
                    total={data.articlesCount}
                    onChange={handleCurrentPage}
                    showSizeChanger={false}
                />
            </div>
        </>
    );
};

export default App;
