import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { MdProductionQuantityLimits } from "react-icons/md";
import { MdHealthAndSafety } from "react-icons/md";
import { GrInProgress } from "react-icons/gr";
import { TiStarFullOutline } from "react-icons/ti";

import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import Contact from "../components/Contact";

export default function Listing() {
  const { currentUser } = useSelector((state) => state.user);
  SwiperCore.use([Navigation]);
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await response.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main>
      {loading && <h1 className="text-center my-7 text-2xl">Loading...</h1>}
      {error && (
        <h1 className="text-center my-7 text-2xl">
          Oops, something went wrong...
        </h1>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px] mt-5 shadow-2xl border rounded-xl"
                  style={{
                    background: `url(${url}) center no-repeat `,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-white cursor-pointer">
            <FaShare
              className="text-indigo-800"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}
          <div className="flex flex-col max-w-5xl mx-auto p-6 my-7 gap-6 bg-white rounded-lg shadow-lg">
            <p className="text-2xl font-bold mx-auto hover:scale-105 transition duration-300">
              "{listing.name} - Rs{" "}
              {listing.regularPrice.toLocaleString("en-US")}"
              {listing.type === "rent" && " / month"}
            </p>
            <p className="flex items-center font-semibold justify-center gap-2 mt-2 text-md">
              <FaMapMarkerAlt className="text-indigo-900 hover:scale-125 transition duration-300" />
              <span className="text-sky-800 hover:scale-105 transition duration-300">
                {listing.companyname}
              </span>
            </p>
            <div className="flex justify-center gap-10 mt-4">
              <p className="bg-slate-800 text-white text-center p-2 rounded-lg hover:opacity-90 transition duration-200">
                {listing.type === "rent" ? "Item for Rent " : " Item for Sale "}
              </p>
              {listing.offer && listing.discountedPrice !== 0 && (
                <p className="bg-green-800 text-white text-center p-2 rounded-lg hover:opacity-90 transition duration-200">
                  Rs {listing.discountedPrice.toLocaleString("en-US")} OFF
                </p>
              )}
            </div>
            <p className="text-slate-800">
              <span className="font-semibold text-black text-justify ">
                Description -{" "}
              </span>
              {listing.description}
            </p>
            <ul className="text-indigo-900 font-semibold text-sm flex flex-wrap justify-between sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap hover:scale-110 transition duration-300">
                <TiStarFullOutline className="text-lg" />
                {listing.rating > 1
                  ? `${listing.rating}/10 Ratings`
                  : `${listing.rating}/10 Rating`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap hover:scale-110 transition duration-300">
                <MdProductionQuantityLimits className="text-lg" />
                {listing.quantity > 1
                  ? `${listing.quantity} Samples`
                  : `${listing.quantity} Sample`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap hover:scale-110 transition duration-300">
                <MdHealthAndSafety className="text-lg" />
                {listing.checked
                  ? "Checked For Safety"
                  : "Not Checked For Safety"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap hover:scale-110 transition duration-300">
                <GrInProgress className="text-lg" />
                {listing.ready ? "Ready to Use" : "In Progress"}
              </li>
            </ul>
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3 transition duration-200"
              >
                Contact Vendor
              </button>
            )}
            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}
    </main>
  );
}
