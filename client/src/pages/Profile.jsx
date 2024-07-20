import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  SingOutStart,
  SingOutFailure,
  SingOutSuccess,
} from "../redux/user/userSlice";
import { Link } from "react-router-dom";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [formData, setFormData] = useState({});
  const [fileUploadError, setFileUploadError] = useState(false);
  const [filePrec, setFilePrec] = useState(0);
  const [showListingError, setShowListingError] = useState(false);
  const dispatch = useDispatch();
  const [userListings, setUserListings] = useState([]);
  const [showListings, setShowListings] = useState(false); // State to toggle listings

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = async (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePrec(Math.round(progress));
      },

      (error) => {
        setFileUploadError(true);
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, photo: downloadURL });
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleListingDelete = async (listingid) => {
    const confirmation = confirm("Do you want to delete this listing?");
    if (confirmation) {
      try {
        const res = await fetch(`/api/listing/delete/${listingid}`, {
          method: "DELETE",
        });

        const data = await res.json();
        if (data.success === false) {
          alert("User not authorized to delete this listing");
          return;
        }
        setUserListings((prev) =>
          prev.filter((listing) => listing._id !== listingid)
        );
        alert("Listing deleted successfully");
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const handleDeleteUser = async () => {
    try {
      confirm("Do you want to delete your account?");
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      confirm("Do you want to sign out?");
      dispatch(SingOutStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(SingOutFailure(data.message));
        return;
      }
      dispatch(SingOutSuccess());
      alert("Signed out successfully");
    } catch (error) {
      dispatch(SingOutFailure(data.message));
    }
  };

  const handleShowListings = async () => {
    setShowListings((prevShowListings) => !prevShowListings); // Toggle showListings state
    if (!showListings) {
      try {
        setShowListingError(false);
        const res = await fetch(`/api/user/listings/${currentUser._id}`);
        const data = await res.json();
        if (data.success === false) {
          setShowListingError(true);
          return;
        }
        setUserListings(data);
      } catch (error) {
        setShowListingError(true);
        showListingError && alert("Couldn't show listings");
      }
    }
  };

  return (
    <div className="p-3 max-w-xl lg:max-w-3xl  mx-auto border mt-12 mb-12 rounded-lg hover:scale-105 transition duration-500 shadow-2xl">
      <h1 className="text-3xl font-bold text-center my-2 ">PROFILE</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 border-none">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          className="hidden"
          accept="image/*"
        />

        <div className="flex justify-center items-center mt-2">
          <div className="p-1 border-2 border-black rounded-full">
            <img
              onClick={() => fileRef.current.click()}
              src={formData.photo || currentUser.photo}
              alt="profile"
              className="rounded-full cursor-pointer h-24 w-24 object-cover hover:opacity-90"
            />
          </div>
        </div>
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Couldn't upload image (size must be less than 2MB)
            </span>
          ) : filePrec > 0 && filePrec < 100 ? (
            <span className="text-slate-700 ">{`Uploading ${filePrec}% ...`}</span>
          ) : filePrec === 100 ? (
            <span className="text-green-600"> successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>

        <input
          id="username"
          type="text"
          defaultValue={currentUser.username}
          placeholder="username"
          className=" border p-2 rounded-lg"
          onChange={handleChange}
        />
        <input
          id="email"
          type="email"
          placeholder="email"
          defaultValue={currentUser.email}
          className="border p-2 rounded-lg"
          onChange={handleChange}
        />
        <input
          id="password"
          type="password"
          placeholder="password"
          className="border p-2 rounded-lg"
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg p-2 uppercase hover:opacity-90 disabled:opacity-80 "
        >
          {loading ? "Loading...." : "Update"}
        </button>
        <Link
          to={"/create-listing"}
          className="bg-emerald-700 text-white p-2 rounded-lg  uppercase text-center hover:opacity-90"
        >
          Create Your Listings
        </Link>
      </form>
      <div className="flex justify-between mt-3">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer hover:underline transition duration-100"
        >
          Delete Account
        </span>
        <span
          className="text-red-700 cursor-pointer hover:underline transition duration-100"
          onClick={handleSignOut}
        >
          Sign Out
        </span>
      </div>
      <p className={error ? "text-red-600 text-center mt-5" : "hidden"}>
        {error ? error : ""}
      </p>

      <p
        className={
          updateSuccess ? "text-green-700 text-center mt-2 text-sm" : "hidden"
        }
      >
        {updateSuccess ? "Profile Updated Successfully" : ""}
      </p>
      <button
        onClick={handleShowListings}
        className="text-indigo-800 w-full hover:scale-105 hover:underline transition duration-300 mt-2"
      >
        {showListings ? "Hide Your Listings" : "Show Your Listings"}
      </button>

      {showListings && userListings.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-center mt-7 text-2xl font-semibold">
            Your Listings
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="border rounded-lg p-3 flex border-dashed border-blue-700 mt-3 justify-between items-center gap-5"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="listing cover"
                  className="h-16 w-16 object-contain rounded-2xl"
                />
              </Link>
              <Link
                className="text-slate-700 font-semibold flex-1 hover:underline truncate"
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>
              <div className="flex flex-col items-center font-semibold">
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className="text-red-700 uppercase  hover:scale-105 hover:underline transition duration-300"
                >
                  Delete
                </button>

                <Link to={`/update-listing/${listing._id}`}>
                  <button className="text-green-600 uppercase  hover:scale-105 hover:underline transition duration-300">
                    Edit
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      {showListings && userListings.length === 0 && (
        <p className="text-center text-red-700 mt-5">No Listings Found!</p>
      )}
    </div>
  );
}
