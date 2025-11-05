import React from 'react';
import Banner from '../Components/Banner';
import LatestProduct from '../Components/LatestProduct';

const latestProductPromise = fetch('http://localhost:3000/latest-products').then(res => res.json())

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <LatestProduct latestProductPromise={latestProductPromise}></LatestProduct>
        </div>
    );
};

export default Home;