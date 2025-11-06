import React from 'react';
import Products from './Products';


const allProductPromise = fetch('http://localhost:3000/products').then(res => res.json())

const AllProduct = () => {
    return (
        <div>
            <h1 className='text-3xl text-center font-semibold my-7'>All <span className='text-[#5633e4]'>Product</span></h1>
            <Products allProductPromise={allProductPromise}></Products>
        </div>
    );
};

export default AllProduct;