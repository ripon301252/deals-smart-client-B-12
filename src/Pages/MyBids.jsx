import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const MyBids = () => {
  const { user } = use(AuthContext);
  console.log('token', user.accessToken)
  const [bids, setBids] = useState([]);
  const axiosInstanceSecure = useAxiosSecure()

  useEffect(()=>{
    axiosInstanceSecure.get(`/bids?email=${user.email}`)
      .then(data =>{
        setBids(data.data)
      })
  }, [user, axiosInstanceSecure])

  // useEffect(() => {
  //   if (user?.email) {
  //     fetch(`http://localhost:3000/bids?email=${user.email}`, {
  //       headers: {
  //           authorization: `Bearer ${localStorage.getItem('token')}`
  //       }
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //         setBids(data);
  //       });
  //   }
  // }, [user]);


//   useEffect(() => {
//     if (user?.email) {
//       fetch(`http://localhost:3000/bids?email=${user.email}`, {
//         headers: {
//             authorization: `Bearer ${user.accessToken}`
//         }
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           console.log(data);
//           setBids(data);
//         });
//     }
//   }, [user]);

  const handleRemoveBid = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/bids/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("after delete", data);
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Bid has been deleted.",
                icon: "success",
              });
              const remainingBids = bids.filter(bid => bid._id !== _id)
              setBids(remainingBids)
            }
          });
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center my-7">
        My Bids : <span className="text-[#5633e4]">{bids.length}</span>{" "}
      </h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>SL No.</th>
              <th>Buyer Name</th>
              <th>Buyer Email</th>
              <th>Bid Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {bids.map((bid, index) => (
              <tr>
                <th>{index + 1}</th>
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
                <td>{bid.buyer_email}</td>
                <td>{bid.bid_price}</td>

                <td>
                  {bid.status === "pending" ? (
                    <div className="badge badge-warning">{bid.status}</div>
                  ) : (
                    <div className="badge badge-success">{bid.status}</div>
                  )}
                </td>
                <th>
                  <button
                    onClick={() => handleRemoveBid(bid._id)}
                    className="btn btn-outline btn-xs"
                  >
                    Remove Bid
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBids;
