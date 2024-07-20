
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";


export default function Search() {

    const navigate = useNavigate();
    const [showMore, setShowMore] = useState(false);
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    checked: false,
    ready: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm") ;
    const typeFromUrl = urlParams.get("type") ;
    const checkedFromUrl = urlParams.get("checked") ;
    const readyFromUrl = urlParams.get("ready") ;
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort") ;
    const orderFromUrl = urlParams.get("order") ;

    if(
        searchTermFromUrl ||
        typeFromUrl ||
        checkedFromUrl ||
        readyFromUrl ||
        offerFromUrl ||
        sortFromUrl ||
        orderFromUrl

    ){
        setSidebardata({
            searchTerm: searchTermFromUrl || '',
            type: typeFromUrl || 'all',
            checked: checkedFromUrl==='true'? true : false,
            ready: readyFromUrl === 'true' ? true : false,
            offer: offerFromUrl === 'true'? true : false,
            sort: sortFromUrl || 'created_at',
            order: orderFromUrl || 'desc',
        });
    }

    const fetchListings = async () => {

        setLoading(true);
        setShowMore(false);
        const searchQuery = urlParams.toString();
        const res= await fetch (`/api/listing/get?${searchQuery}`);
        const data= await res.json();
        if(data.length >8){
            setShowMore(true);
        } else{
            setShowMore(false);
        }
        setListings(data);
        setLoading(false);
    };

    fetchListings();

}, [location.search]);   
const handleChange = (e) => {
   if(e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale'){
     setSidebardata({
       ...sidebardata,
       type: e.target.id,
     });
    }

    if(e.target.id==='searchTerm'){
      setSidebardata({
        ...sidebardata,
        searchTerm: e.target.value,
      });
    }

    if(e.target.id === 'checked' || e.target.id === 'ready' || e.target.id === 'offer'){
      setSidebardata({
        ...sidebardata,
        [e.target.id]: e.target.checked || e.target.checked==='true' ? true : false});

    }

    if(e.target.id === 'sort_order'){
      const sort=e.target.value.split('_')[0] || 'created_at';
        const order=e.target.value.split('_')[1] || 'desc';

      setSidebardata({
        ...sidebardata,
        sort,
        order,
      });
    }


  };

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams=   new URLSearchParams();
        urlParams.set('searchTerm', sidebardata.searchTerm);
        urlParams.set('type', sidebardata.type);
        urlParams.set('checked', sidebardata.checked);
        urlParams.set('ready', sidebardata.ready);
        urlParams.set('offer', sidebardata.offer);
        urlParams.set('sort', sidebardata.sort);
        urlParams.set('order', sidebardata.order);
        const searchQuery=urlParams.toString();
        navigate(`/search?${searchQuery}`);
    
        }

        const onShowMoreClick = async () => {
          const numberOfListings=listings.length;
          const startIndex= numberOfListings;
          const urlParams=new URLSearchParams(location.search);
          urlParams.set ('startIndex', startIndex);
          const searchQuery=urlParams.toString();
          const res= await fetch(`/api/listing/get?${searchQuery}`);
          const data= await res.json();
          if(data.length < 9){
            setShowMore(false);
          }
          setListings([...listings, ...data]);
        };

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen bg-white md:w-1/3 shadow-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <label className="whitespace-nowrap font-semibold text-lg pl-2 hover:underline uppercase">
              Search Item
            </label>
            <input
            value={sidebardata.searchTerm}
            onChange={handleChange}
              type="text"
              id="searchTerm"
              placeholder="Enter Search Item"
              className="border rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-lg">Type:</label>
            <div className="flex gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="all"
                  className="w-5 h-5 text-blue-800 focus:ring-2 focus:ring-indigo-300"
                  onChange={handleChange}
                  checked={sidebardata.type === "all"}
                />
                <span className="text-md">Rent & Sell</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="rent"
                  className="w-5 h-5 text-blue-800 focus:ring-2 focus:ring-indigo-300"
                  onChange={handleChange}
                  checked={sidebardata.type === "rent"}
                />
                <span className="text-md">Rent</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="sale"
                  className="w-5 h-5 text-blue-800 focus:ring-2 focus:ring-indigo-300"
                    onChange={handleChange}
                    checked={sidebardata.type === "sale"}
                />
                <span className="text-md">Sell</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="offer"
                  className="w-5 h-5 text-blue-800 focus:ring-2 focus:ring-indigo-300"
                    onChange={handleChange}
                    checked={sidebardata.offer === true}
                />
                <span className="text-md">Offer</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-lg">Amenities:</label>
            <div className="flex gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="checked"
                  className="w-5 h-5 text-blue-800 focus:ring-2 focus:ring-indigo-300"
                  onChange={handleChange}
                    checked={sidebardata.checked === true}

                />
                <span className="text-md">Tested</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="ready"
                  className="w-5 h-5 text-blue-800 focus:ring-2 focus:ring-indigo-300"
                    onChange={handleChange}
                    checked={sidebardata.ready === true}
                />
                <span className="text-md">Ready To Use</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-lg">Sort:</label>
            <select
                onChange={handleChange}
                defaultValue={'created_at_desc'}


              id="sort_order"
              className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2  focus:ring-indigo-300"
            >
              <option value={'regularPrice_desc'}>Price High to Low</option>
              <option value={'regularPrice_asc'}>Price Low to High</option>
              <option value={'createdAt_desc'}>Latest</option>
              <option value={'createdAt_asc'}>Oldest</option>
            
            </select>
          </div>

          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 transition duration-200">
            Search
          </button>
        </form>
      </div>
      <div className="flex-1 bg-white p-6 shadow-lg md:mt-0 mt-5">
        <h1 className="text-2xl font-semibold border-b p-3 text-slate-700 uppercase">
          Item Results:
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && listings.length === 0 && (
            <p className="text-xl text-slate-700 ">No Lisitng Found</p>
          )}
          {loading && <p className="text-xl text-slate-700 text-center  w-full ">Loading...</p>}

          {!loading && listings && listings.map((listing) => 
            <ListingItem key={listing._id} listing={listing}/>
          )}


          {showMore && (
            <button
              onClick={onShowMoreClick}
              className="text-blue-700 text-lg hover:underline p-7 text-center w-full">
                Show More!
              </button>
          )}
        </div>
      </div>
    </div>
  );
}

 
