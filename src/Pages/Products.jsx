import React, { use } from 'react';
import ProductCard from './ProductCard';

const Products = ({ allProductPromise }) => {
    const products = use(allProductPromise)
    console.log(products)
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {
                products.map(product => <ProductCard key={product._id} product={product}></ProductCard>)
            }
        </div>
    );
};

export default Products;