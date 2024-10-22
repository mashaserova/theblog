import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './view/App';
import store from './store/store';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SignUp } from './view/components/Header/SignUp';
import { SignIn } from './view/components/Header/SignIn';
import { Article } from './view/components/Feed/Article/Article';
import { NewArticle } from './view/components/Feed/NewArticle/NewArticle';
import { Profile } from './view/components/Feed/Profile/Profile';
import { Edit } from './view/components/Feed/Edit/Edit';
import PrivateRoute from './view/components/PrivateRoute/PrivateRoute';
import { ROUTES } from './constants/routes';
const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
    {
        path: ROUTES.HOME,
        element: <App />,
        errorElement: <div>404</div>,
    },
    {
        path: ROUTES.SIGN_IN,
        element: <SignIn />,
    },
    {
        path: ROUTES.SIGN_UP,
        element: <SignUp />,
    },
    {
        path: ROUTES.ARTICLE,
        element: <Article />,
    },
    {
        element: <PrivateRoute />,
        children: [
            {
                path: ROUTES.NEW_ARTICLE,
                element: <NewArticle />,
            },
            {
                path: ROUTES.PROFILE,
                element: <Profile />,
            },
            {
                path: ROUTES.EDIT_ARTICLE,
                element: <Edit />,
            },
        ],
    },
]);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
