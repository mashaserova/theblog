import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './view/App';
import store from './store/store';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SignUp } from './view/components/Header/SignUp';
import { SignIn } from './view/components/Header/SignIn';
import { Article } from './view/components/Feed/article/Article';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <div>404</div>,
    },
    {
        path: '/sign-in',
        element: <SignIn />,
    },
    {
        path: '/sign-up',
        element: <SignUp />,
    },
    {
        path: '/article/:id',
        element: <Article />,
    },
]);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
