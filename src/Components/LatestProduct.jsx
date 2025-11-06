import React, { use } from 'react';
import ProductCard from '../Pages/ProductCard';

const LatestProduct = ({ latestProductPromise }) => {
    const products = use(latestProductPromise)
    console.log(products)
    return (
        <div className='max-w-7xl mx-auto'>
            <h1 className='text-3xl text-center font-semibold py-7'>Recent <span className='text-[#5633e4]'>Products</span></h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    products.map(product => <ProductCard key={product._id} product={product}></ProductCard>)
                }
            </div>
        </div>
    );
};

export default LatestProduct;