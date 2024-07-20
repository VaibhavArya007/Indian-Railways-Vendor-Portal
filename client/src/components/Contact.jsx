import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const response = await fetch(`/api/user/${listing.userRef}`);
        const data = await response.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md">
          <p className="text-md">
            Contact <span className="font-semibold">{landlord.username}</span>{' '}
            for{' '}
            <span className="lowercase font-semibold">{listing.name}</span>
          </p>
          <textarea
            placeholder="Enter Your Queries"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
            name="message"
            id="message"
            rows="4"
            value={message}
            onChange={onChange}
          ></textarea>
          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name} on IndianRailwaysPortal&body=${message}`}
            className="bg-slate-700 text-white text-center p-3 uppercase hover:bg-slate-800 rounded-lg transition duration-200"
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
}