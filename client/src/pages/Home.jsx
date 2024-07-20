import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import {Swiper} from "swiper/react";
import { SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";


import 'swiper/css/bundle';
import ListingItem from "../components/ListingItem";

export default function Home() {
  const [offerListing, setOfferListing] = useState([]);
  const [saleListing, setSaleListing] = useState([]);
  const [rentListing, setRentListing] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferListing = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=3");
        const data = await res.json();
        setOfferListing(data);
        fetchRentListing();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListing = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=3");
        const data = await res.json();
        setRentListing(data);
        fetchSaleListing();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListing = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=3");
        const data = await res.json();
        setSaleListing(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListing();
  }, []);
  return (
    <div>
      {/* top */}
      <div className="flex flex-col gap-8 py-36 px-6 max-w-[1450px] mx-auto text-center mt-5 bg-sky-100 shadow-lg border rounded-lg hover:scale-105 transition duration-500 border-dashed ">
        <h1 className="text-blue-900 font-extrabold text-3xl md:text-4xl lg:text-5xl ">
          <span className="hover:text-blue-600 transition-colors duration-300">
            Welcome To Railways
          </span>{" "}
          <span className="text-sky-600 hover:text-blue-600 transition duration-300">
            Vendor Portal
          </span>
          <br />{" "}
          <span className="hover:text-blue-600 transition duration-300">
            List Your Products Here
          </span>
          
        </h1>

        <div className="text-slate-700 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          This website is made for the vendors of Indian Railways to list their
          products and services. <br />
          Your products will be reviewed & you'll be contacted soon.
        </div>

        <Link
          to={"/search"}
          className="mt-4 text-base md:text-lg text-blue-800 font-semibold hover:text-blue-600"
        >
          Let's Get Started...
        </Link>
        <span className="font-semibold text-blue-800 hover:text-blue-600"> Swipe Below & Take A Tour</span>
      </div>

      {/* swiper */}
      <div className="max-w-[1450px] mx-auto mt-8 shadow-xl border hover:scale-105 transition duration-500  ">
      <Swiper navigation>
      {
        offerListing && offerListing.length > 0 && offerListing.map((listing) => (
          <SwiperSlide>
            <div style={{background: `url(${listing.imageUrls[0]}) center no-repeat` , backgroundSize:"cover"}}className="h-[500px] rounded-xl" key={listing._id} ></div>
          </SwiperSlide>
        ))
      }
      </Swiper> 
      </div>
      {/* listing results */}

      <div className="max-w-[1400px] mx-auto p-3 flex flex-col gap-8 my-10">
        {
          offerListing && offerListing.length > 0 && (
            <div className="">
              <div className="my-3 mx-2">
                <h2 className="text-[24px] font-bold uppercase text-slate-800 hover:underline">Recent Offers</h2>
                <Link className='text-sm text-blue-900 hover:underline' to={'/search?offer=true'}>
                  Show more..
                </Link>
              </div>
              <div className="flex flex-wrap  justify-between gap-10 mx-auto">
                {
                  offerListing.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} />
                  ))
                }
              </div>
            </div>
          )
        }
        {
          rentListing && rentListing.length > 0 && (
            <div className="">
              <div className="my-3 mx-2">
                <h2 className="text-[24px] font-bold uppercase text-slate-800 hover:underline">Recent Products for Rent</h2>
                <Link className='text-sm text-blue-900 hover:underline' to={'/search?type=rent'}>
                  Show more products..
                </Link>
              </div>
              <div className="flex gap-8 flex-wrap  justify-between mx-auto">
                {
                  rentListing.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} />
                  ))
                }
              </div>
            </div>
          )
        }
        {
          saleListing && saleListing.length > 0 && (
            <div className="">
              <div className="my-3 mx-2">
                <h2 className="text-[24px] font-bold uppercase text-slate-800 hover:underline">Recent Products for Sale </h2>
                <Link className='text-sm text-blue-900 hover:underline' to={'/search?type=sale'}>
                  Show more products..
                </Link>
              </div>
              <div className="flex flex-wrap  justify-between mx-auto gap-8">
                {
                  saleListing.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} />
                  ))
                }
              </div>
            </div>
          )
        }

      </div>
    </div>
  );
}
