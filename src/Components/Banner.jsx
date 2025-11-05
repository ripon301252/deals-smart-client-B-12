import React from "react";
import ImgLft from "../assets/bg-hero-left.png";
import ImgRgt from "../assets/bg-hero-right.png";
import { IoSearchSharp } from "react-icons/io5";

const Banner = () => {
  return (
    <div className="bg-gradient-to-r from-[#fbe9fb] to-[#edf1f8]">
      <div className="flex justify-between items-center gap-20">
        <div>
          <img src={ImgLft} alt={ImgLft} />
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-5xl font-bold text-center text-black">
            Deal your <span className="text-[#5633e4]">Products</span> <br /> in
            a <span className="text-[#5633e4]">Smart</span> way !
          </h1>
          <p className="text-gray-400 my-5">
            SmartDeals helps you sell, resell, and shop from tru sted local
            sellers — all in one place!
          </p>
          <div className="relative w-[400px]">
            <IoSearchSharp className="text-gray-500 text-xl absolute left-3 top-1/2 -translate-y-1/2 z-10" />
            <input
              type="search"
              placeholder="Search"
              className="input w-full pl-10 bg-white text-black border border-gray-300 rounded-lg"
            />
          </div>

          <div className="mt-5">
            <button className="btn btn-outline btn-primary mr-5">
              Watch All Products
            </button>
            <button className="btn btn-outline btn-primary">
              Post an Product
            </button>
          </div>
        </div>
        <div>
          <img src={ImgRgt} alt={ImgRgt} />
        </div>
      </div>
    </div>
  );
};

export default Banner;
