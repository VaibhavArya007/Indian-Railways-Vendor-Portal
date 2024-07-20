import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Text } from "../components/Text";
import { useNavigate } from "react-router-dom";
import Oauth from "../components/Oauth";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoEyeOffOutline } from "react-icons/io5";

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/signin");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className="flex">
      <div className="flex-1 flex items-center justify-center max-w-lg p-4 hidden lg:inline pl-20">
        <Text />
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="p-3 mt-20 md:mt-20 w-full max-w-md md:max-w-lg mx-auto border rounded-xl shadow-md hover:scale-105 transition ease-linear duration-150">
          <h1 className="text-3xl text-center font-semibold my-7 hover:underline">
            Sign Up
          </h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              className="border p-3 rounded-lg"
              id="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              className="border p-3 rounded-lg"
              id="email"
              onChange={handleChange}
            />
            <div className="relative">
              <input
                type={visible ? "text" : "password"}
                placeholder="Password"
                className="border p-3 rounded-lg w-full pr-10"
                id="password"
                onChange={handleChange}
              />
              <div
                className="absolute right-6 top-1/2 scale-105 transform -translate-y-1/2 text-gray-800 cursor-pointer"
                onClick={toggleVisibility}
              >
                {visible ? <MdOutlineRemoveRedEye /> : <IoEyeOffOutline />}
              </div>
            </div>
            <button
              disabled={loading}
              className="bg-sky-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80"
            >
              {loading ? "Loading..." : "Signup"}
            </button>
            <Oauth />
          </form>
          <div className="flex gap-2 mt-5">
            <p>Already Have An Account?</p>
            <Link to={"/signin"}>
              <span className="text-blue-700 hover:text-blue-800 hover:underline">
                Sign-in
              </span>
            </Link>
          </div>
          {error && (
            <p className="text-red-600 text-left mt-5 text-sm font-normal">
              {"Invalid Inputs or Already Registered" + " !"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
