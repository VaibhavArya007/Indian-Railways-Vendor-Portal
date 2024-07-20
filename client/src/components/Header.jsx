import React, { useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/indian_railway_logo.png";
import emblem from "../assets/indian_emblem.png";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
   const urlParams= new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery= urlParams.toString();
    navigate(`/search?${searchQuery}`);
  } ;

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="bg-indigo-900 shadow-md">
      <div className="flex justify-between items-center max-w-8xl mx-auto p-3">
        <h1 className="font-bold text-md md:text-2xl flex flex-wrap items-center">
          <img
            src={logo}
            alt="Indian Railways Logo"
            className=" hidden lg:inline h-12 mr-5 ml-5"
          />
          <Link to="/">
           <span className="text-blue-100 font-bold  ml-10 hover:scale-105 hover:text-blue-200 transform transition duration-200 ease-linear hidden sm:inline">
              Indian
            </span>
            <span className="text-blue-200 font-bold hidden sm:inline"> | </span>
            <span className="text-blue-100 font-bold hover:scale-105 hover:text-blue-200 transform transition duration-200 ease-linear">
              Railways
            </span>
          </Link>
        </h1>

        <form onSubmit={handleSubmit} className="bg-sky-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 xl:w-72"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}

          />
          <button>
          <FaSearch className="text-indigo-700 hover:scale-105 hover:text-blue-900  transform transition duration-100 ease-linear" />
          </button>
        </form>
        <ul className="flex gap-8 items-center text:sm md:text-lg ">
          <li className="hidden sm:inline text-blue-100 hover:underline hover:scale-105 hover:text-blue-50  transform transition duration-100 ease-linear">
            <Link to="/">Home</Link>
          </li>
          <li className="hidden sm:inline text-blue-100 hover:underline hover:scale-105 hover:text-blue-50  transform transition duration-100 ease-linear">
            <Link to="/about">About</Link>
          </li>
          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.photo}
                alt="User"
                className="h-10 w-10 rounded-full object-cover hover:scale-105  border-white shadow-lg"
              />
            ) : (
              <li className="text-blue-100 hover:underline hover:scale-105 hover:text-blue-50 transform transition duration-100 ease-linear">
                Sign In
              </li>
            )}
          </Link>
          <li>
            <img
              src={emblem}
              alt="Indian Emblem"
              className="hidden lg:inline h-12 mr-5"
            />
          </li>
        </ul>
      </div>
    </header>
  );
}
