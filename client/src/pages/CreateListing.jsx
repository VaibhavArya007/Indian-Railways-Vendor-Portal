import React from "react";
import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    companyname: "",
    type: "rent",
    rating: 1,
    quantity: 1,
    regularPrice: 0,
    discountedPrice: 0,
    offer: false,
    checked: false,
    ready: false,
  });
  const [error, setError] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);
  console.log(formData);
  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = files.map((file) => storeImage(file));

      Promise.all(promises)
        .then((urls) => {
          setFormData((prevFormData) => ({
            ...prevFormData,
            imageUrls: prevFormData.imageUrls.concat(urls),
          }));
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((error) => {
          setImageUploadError("image upload failed (max size 2MB/img)");
          setUploading(false);
        });
    } else {
      setImageUploadError("The no of images should be between 1 and 6");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleFilesChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleMouseOver = () => {
    const lineElement = document.getElementById("line");
    if (lineElement) {
      lineElement.style.transform = "scale(1.10)";
      lineElement.style.transform = "shadow-2xl";
    }
  };

  const handleMouseOut = () => {
    const lineElement = document.getElementById("line");
    if (lineElement) {
      lineElement.style.transform = "scale(1)";
    }
  };

  const handleImageDelete = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }
    if (
      e.target.id === "checked" ||
      e.target.id === "ready" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1) {
        return setError("Please upload atleast one image");
      }
      if (+formData.regularPrice < +formData.discountedPrice) {
        return setError("Discount Price should be less than Regular Price");
      }

      setDataLoading(true);
      setError(false);
      const response = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await response.json();
      setDataLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate("/listing/" + data._id);
    } catch (error) {
      setError("Something went wrong");
      setDataLoading(false);
    }
  };
  return (
    <main className="p-5 max-w-5xl mx-auto">
      <h1
        className="text-3xl font-semibold text-center my-7"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        Create Your Listings Here
        <div
          className="border border-slate-800 mx-auto w-96 my-1 transition-transform duration-500"
          id="line"
        ></div>
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="flex flex-col gap-4 flex-1">
            <input
              type="text"
              placeholder="Product Name Here"
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              id="name"
              maxLength="62"
              minLength="10"
              required
              onChange={handleChange}
              value={formData.name}
            />
            <textarea
              type="text"
              placeholder="Product Description Here"
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              id="description"
              required
              onChange={handleChange}
              value={formData.description}
            />
            <input
              type="text"
              placeholder="Company Name Here"
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              id="companyname"
              required
              onChange={handleChange}
              value={formData.companyname}
            />
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="sale"
                  className="w-5 h-5"
                  onChange={handleChange}
                  checked={formData.type === "sale"}
                />
                <span>Sale</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="rent"
                  className="w-5 h-5"
                  onChange={handleChange}
                  checked={formData.type === "rent"}
                />
                <span>Rent</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="checked"
                  className="w-5 h-5"
                  onChange={handleChange}
                  checked={formData.checked}
                />
                <span>Checked For Use</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="ready"
                  onChange={handleChange}
                  checked={formData.ready}
                  className="w-5 h-5"
                />
                <span>Ready To Use</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="offer"
                  className="w-5 h-5"
                  onChange={handleChange}
                  checked={formData.offer}
                />
                <span>Offer</span>
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-4 flex-1">
            <div className="flex flex-col sm:flex-row gap-4">
              <label className="flex flex-1 flex-col">
                <span className="mb-1">Ratings (out of 10)</span>
                <input
                  type="number"
                  min="0"
                  max="10"
                  id="rating"
                  className="p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onChange={handleChange}
                  value={formData.rating}
                />
              </label>
              <label className="flex flex-1 flex-col">
                <span className="mb-1">Quantity</span>
                <input
                  type="number"
                  min="1"
                  id="quantity"
                  className="p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onChange={handleChange}
                  value={formData.quantity}
                />
              </label>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <label className="flex flex-1 flex-col">
                <span className="mb-1">
                  Regular Price
                  <span
                    className={
                      formData.type === "rent"
                        ? "text-sm flex display-inline"
                        : "hidden"
                    }
                  >
                    (Rs/ month)
                  </span>
                </span>
                <input
                  type="number"
                  min="0"
                  id="regularPrice"
                  className="p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onChange={handleChange}
                  value={formData.regularPrice}
                />
              </label>
              {formData.offer && (
                <label className="flex flex-1 flex-col">
                  <span className="mb-1">
                    Discounted Price
                    <span
                      className={
                        formData.type === "rent"
                          ? "text-sm flex display-inline"
                          : "hidden"
                      }
                    >
                      (Rs/ month)
                    </span>
                  </span>
                  <input
                    type="number"
                    min="0"
                    id="discountedPrice"
                    className="p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    onChange={handleChange}
                    value={formData.discountedPrice}
                  />
                </label>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <label className="font-semibold">
            Images:
            <span className="font-normal text-indigo-800 ml-2 uppercase text-xs">
              The first image will be the cover (max 6)
            </span>
          </label>
          <div className="flex gap-4">
            <input
              type="file"
              onChange={handleFilesChange}
              className="p-3  border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 w-full"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              className="p-3 text-slate-800 border hover:scale-105  duration-200 font-semibold rounded-lg uppercase hover:shadow-lg transition-shadow cursor-pointer"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <p className={imageUploadError ? "text-red-700 text-sm" : "hidden"}>
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex justify-between p-3 border items-center border-indigo-500 rounded-lg border-dashed hover:shadow-lg transition duration-300"
              >
                <img
                  src={url}
                  alt="listing image"
                  className="w-20 h-20 object-contain rounded-2xl"
                />
                <button
                  type="button"
                  onClick={() => handleImageDelete(index)}
                  className="p-3 text-red-700 font-semibold rounded-xl uppercase hover:opacity-75 hover:underline hover:scale-105 transition duration-200"
                >
                  Delete
                </button>
              </div>
            ))}
          <button
            disabled={dataLoading || uploading}
            className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-90 transition-opacity cursor-pointer"
          >
            {dataLoading ? "Creating..." : "Create Listing"}
          </button>
          <p className={error ? "text-red-700 text-sm" : "hidden"}>
            {error && error}
          </p>
        </div>
      </form>
    </main>
  );
}
