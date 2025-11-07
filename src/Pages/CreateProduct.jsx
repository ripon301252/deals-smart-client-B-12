import axios from "axios";
import React from "react";
import Swal from "sweetalert2";
import useAuth from "../Hooks/UseAuth";

const CreateProduct = () => {
  const {user} = useAuth()
  const handleCreateAProduct = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const image = form.image.value;
    const price_min = form.price_min.value;
    const price_max = form.price_max.value;
    console.log(title, image, price_min, price_max);
    const newProduct = { title, image, price_min, price_max,
      email: user.email,
      seller_name: user.displayName
     };
    axios.post("http://localhost:3000/products", newProduct).then((data) => {
      console.log(data);
      if (data.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your product has been created",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div>
      <h1>Create Product</h1>
      <form onSubmit={handleCreateAProduct}>
        <div className="card-body">
          <fieldset className="fieldset">
            <label className="label">Name</label>
            <input type="text" name="title" className="input w-full" />
            <label className="label">Image URL</label>
            <input type="text" name="image" className="input w-full" />

            <label className="label">Min Price</label>
            <input
              type="text"
              name="price_min"
              className="input w-full"
              placeholder="Minimum Price"
            />

            <label className="label">Max Price</label>
            <input
              type="text"
              name="price_max"
              className="input w-full"
              placeholder="Max Price"
            />
            <button className="btn btn-neutral mt-4">Add A Product</button>
          </fieldset>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
