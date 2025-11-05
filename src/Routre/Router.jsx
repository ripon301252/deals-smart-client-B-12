import React from 'react';
import { createBrowserRouter } from 'react-router';
import Root from '../Pages/Root';
import Home from '../Pages/Home';
import AllProduct from '../Pages/AllProduct';
import MyProduct from '../Pages/MyProduct';
import MyBids from '../Pages/MyBids';
import CreateProduct from '../Pages/CreateProduct';
import SignIn from '../Pages/SignIn';
import SignUp from '../Pages/SignUp';
import PrivateRoute from './PrivateRoute';
import ResetPassword from '../Pages/ResetPassword';
import MyProfile from '../Pages/MyProfile';
import ProductDetails from '../Components/ProductDetails';

export const router = createBrowserRouter([
    {
        path: '/',
        Component: Root,
        children: [
            {
                path: '/',
                Component: Home,
            },
            {
                path: '/allProducts',
                Component: AllProduct,
            },
            {
                path: '/myProducts',
                element: <PrivateRoute>
                    <MyProduct></MyProduct>
                </PrivateRoute>
            },
            {
                path: '/myBids',
                element: <PrivateRoute>
                    <MyBids></MyBids>
                </PrivateRoute>
            },
            {
                path: '/myProfile',
                element: <PrivateRoute>
                    <MyProfile></MyProfile>
                </PrivateRoute>
            },
            {
                path: '/productDetails/:id',
                loader: ({ params })=> fetch(`http://localhost:3000/products/${params.id}`),
                element: <PrivateRoute>
                    <ProductDetails></ProductDetails>
                </PrivateRoute>
            },
            {
                path: '/createProduct',
                element: <CreateProduct></CreateProduct>
            },
            {
                path: '/signin',
                Component: SignIn
            },
            {
                path: '/signup',
                Component: SignUp,
            },
            {
                path: '/forgotPassword',
                Component: ResetPassword,
            }

        ]
    }
])