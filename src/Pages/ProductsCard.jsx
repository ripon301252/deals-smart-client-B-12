import React from 'react';

const ProductsCard = ({ product }) => {
    const { _id, title, price_min, price_max, image } = product;
    return (
        <div>
             <div className="card bg-base-100 w-96 shadow-sm">
        <figure className="px-4 pt-4">
          <img
            src={image}
            alt={image}
            className="rounded-xl"
          />
        </figure>
        <div className="card-body ">
          <h2 className="card-title">{title}</h2>
          <p>
            Price: {price_min} - {price_max}
          </p>
          <div className="card-actions">
            <Link to={`/productDetails/${_id}`} className="btn btn-primary w-full">View Details</Link>
          </div>
        </div>
      </div>
        </div>
    );
};

export default ProductsCard;