import React from 'react';

export const AuthorizedFeed = () => {
    return <div>{localStorage.getItem('token')}</div>;
};
