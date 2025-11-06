import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLoaderData } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const [bids, setBids] = useState([]);
  const product = useLoaderData();
  console.log(product);
  const { _id: productId, title, price_min, price_max, image } = product;
  const bidModalRef = useRef(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch(`http://localhost:3000/products/bids/${productId}`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("bids for this product", data);
        setBids(data);
      });
  }, [productId, user]);

  const handleBidModalOpen = () => {
    bidModalRef.current.showModal();
  };

  const handleBidSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const bid = form.bid.value;
    console.log(productId, name, email, bid);
    const newBid = {
      product: productId,
      buyer_name: name,
      buyer_email: email,
      buyer_image: user?.photoURL,
      bid_price: bid,
      status: "pending",
    };
    fetch("http://localhost:3000/bids", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("after placing bid", data);
        if (data.insertedId) {
          bidModalRef.current.close();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your bid has been placed",
            showConfirmButton: false,
            timer: 1500,
          });
            //   add the new bid to the state
            newBid._id = data.insertedId;
            const newBids = [...bids, newBid]
            newBids.sort((a, b)=> b.bid_price - a.bid_price)
            setBids(newBids)
        }
      });
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* product info */}
      <div className="flex justify-between items-center">
        <div>
          <h3>Left side</h3>
          <div className="card bg-base-100 w-96 shadow-sm">
            <figure className="px-4 pt-4">
              <img src={image} alt={image} className="rounded-xl" />
            </figure>
            <div className="card-body ">
              <h2 className="card-title">{title}</h2>
              <p>
                Price: {price_min} - {price_max}
              </p>
              <div className="card-actions">
                <Link to={`/`} className="btn btn-primary w-full">
                  Go back
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3>right side</h3>
          <button onClick={handleBidModalOpen} className="btn btn-primary">
            I want to By this Product
          </button>
          <dialog
            ref={bidModalRef}
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg ml-6">Give the best offer!</h3>
              <p className="py-4 ml-6">Offer something seller can not resist</p>
              <form onSubmit={handleBidSubmit}>
                <div className="card-body">
                  <fieldset className="fieldset">
                    <label className="label">Name</label>
                    <input
                      type="text"
                      name="name"
                      className="input w-full"
                      defaultValue={user?.displayName}
                      readOnly
                    />
                    <label className="label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="input w-full"
                      defaultValue={user?.email}
                      readOnly
                    />
                    {/* bid amount */}
                    <label className="label">Bid</label>
                    <input
                      type="text"
                      name="bid"
                      className="input w-full"
                      placeholder="Your Bid"
                    />
                    <button className="btn btn-neutral mt-4">
                      Please Your Bid
                    </button>
                  </fieldset>
                </div>
              </form>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn mr-5">Cancel</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
      {/* bids for this product */}
      <div>
        <h3 className="text-center text-3xl font-bold my-7">
          Bids for this product :{" "}
          <span className="text-[#5633e4]">{bids.length}</span>{" "}
        </h3>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>
                   SL No.
                </th>
                <th>Buyer Name</th>
                <th>Buyer Email</th>
                <th>Bid Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {
                bids.map((bid, index) =>  <tr>
                <th>
                    {index + 1}
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{bid.buyer_name}</div>
                      <div className="text-sm opacity-50">United States</div>
                    </div>
                  </div>
                </td>
                <td>
                 {bid.buyer_email}
                </td>
                <td>{bid.bid_price}</td>
                <th>
                  <button className="btn btn-ghost btn-xs">details</button>
                </th>
              </tr>)
              }  
            
            
             
            </tbody>
           
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
