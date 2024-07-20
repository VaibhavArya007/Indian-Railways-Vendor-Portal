import React from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

export default function ListingItem({ listing }) {
  return (
    <div className="bg-white shadow-md hover:shadow-xl transition duration-500 overflow-hidden rounded-lg w-full md:w-[400px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing.imageUrls[0] ||
            "https://bsmedia.business-standard.com/_media/bs/img/article/2022-08/11/full/1660191933-0502.jpg?im=FeatureCrop,size=(826,465)"
          }
          alt="cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition duration-300"
        />
        <div className="p-4 flex flex-col gap-4 w-full">
          <p className="text-lg font-semibold text-blue-900 truncate hover:text-indigo-700 hover:underline transition duration-500">
            {listing.name}
          </p>
          <div className="flex items-center gap-2 text-slate-800">
            <MdLocationOn className="text-indigo-800 h-5 w-5 hover:scale-105" />
            <p className="truncate text-sm">{listing.companyname}</p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {listing.description}
          </p>
          <div className="flex justify-between items-center text-md font-bold text-slate-500 ">
            <div className="hover:underline hover:shadow-md transition duration-300">
              {"Price: " + listing.regularPrice + "/-" }
              {listing.type === "rent" ? " Month" : ""}
            </div>
            <div className="hover:underline hover:shadow-lg transition duration-300">
              {listing.offer
                 ? listing.discountedPrice + "/- OFF"
                : "No Offer"}
            </div>
          </div>
          <div className="flex justify-between items-center gap-4">
            <div className="font-bold text-sm text-sky-800 hover:opacity-80 cursor-default">
              {listing.quantity > 1 ? (
                <p>{listing.quantity} Items Available (In Stock)</p>
              ) : (
                <p>{listing.quantity} Item Available</p>
              )}
            </div>
            <div className="font-bold text-sm hover:opacity-80 cursor-default ">
              {listing.rating >= 0 && listing.rating < 4 ? (
                <p className="text-red-600 font-bold">
                  Rating: {listing.rating}
                </p>
              ) : listing.rating >= 4 && listing.rating < 8 ? (
                <p className="text-yellow-600 font-bold">
                  Rating: {listing.rating}
                </p>
              ) : listing.rating >= 8 && listing.rating <= 10 ? (
                <p className="text-green-600 font-bold">
                  Rating: {listing.rating}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
