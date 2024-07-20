import React from 'react';

export default function About() {
  return (
    <div className='py-20 px-4 max-w-[1250px] mx-auto text-justify'>
      <h1 className='text-3xl font-bold mb-6 text-slate-800 transition duration-500 ease-in-out hover:opacity-80 underline text-center uppercase'>
        About Vendor Website
      </h1>
      <p className='mb-6 mt-10 text-slate-700 text-lg hover:scale-105 transition duration-1000  font-normal text-md'>
        <span className='font-semibold'>Brief History of Indian Railways</span><br />
        Indian Railways, a vital lifeline of the country, boasts a rich history that dates back to the mid-19th century. The first train journey in India took place on April 16, 1853, from Bombay to Thane, covering a distance of 34 kilometers. Since then, Indian Railways has grown into one of the largest and busiest rail networks in the world, encompassing over 67,000 kilometers of track and connecting more than 7,000 stations. Serving millions of passengers and transporting vast amounts of freight daily, Indian Railways plays a crucial role in the nation's economic and social development.
      </p>
      <p className='mb-6 text-slate-700 text-lg hover:scale-105 transition duration-1000'>
        <span className='font-semibold'>What Does This Website Do?</span><br />
        The Indian Railway Vendor Items Listing Website is a comprehensive platform designed to streamline and enhance the interaction between railway vendors and the Indian Railways procurement departments. This website aims to digitize and simplify the entire vendor management process, from listing and managing vendor items to facilitating transactions and billing.
        <br />
        Our website provides an efficient, user-friendly interface for vendors to register their products and services, ensuring transparency and accessibility for all stakeholders involved. The platform is tailored to meet the unique needs of Indian Railways, fostering better communication and collaboration between vendors and the procurement team.
      </p>
      <p className='mb-6 text-slate-700 text-lg hover:scale-105 transition duration-1000'>
        <span className='font-semibold'>Available Options for Users</span><br />
        The Indian Railway Vendor Items Listing Website offers a wide range of features and options for users to explore:
        <ul className='list-disc list-inside mt-2 space-y-2'>
          <li><span className='font-semibold'>Vendor Registration:</span> Vendors can easily register on the platform, providing their company details, product information, and necessary documentation to become an approved vendor for Indian Railways.</li>
          <li><span className='font-semibold'>Product Listing:</span> Registered vendors can list their products and services on the website, detailing specifications, pricing, availability, and other relevant information. This helps procurement officers make informed decisions when selecting vendors.</li>
          <li><span className='font-semibold'>Search and Filter:</span> Users can search for specific products or services using various filters, such as category, price range, vendor location, and more. This makes it convenient for procurement officers to find the best match for their requirements.</li>
          <li><span className='font-semibold'>Notifications and Alerts:</span> Users receive real-time notifications and alerts for important updates, such as new orders, payment status, and upcoming deadlines. This keeps all parties informed and helps in timely decision-making.</li>
          <li><span className='font-semibold'>Support and Assistance:</span> The website provides dedicated support to assist vendors and procurement officers with any issues or queries they may have. Users can access FAQs, guides, and contact support representatives for personalized help.</li>
        </ul>
      </p>
      <p className='text-slate-700 text-lg hover:scale-105 transition duration-1000'>
        <span className='font-semibold'>Our Mission</span><br />
        The Indian Railway Vendor Items Listing Website is committed to modernizing and optimizing the vendor management process for Indian Railways. By leveraging technology and providing a robust platform, we aim to enhance transparency, efficiency, and collaboration, ultimately contributing to the growth and success of Indian Railways and its vendor partners.
      </p>

      <p className='mt-5 font-extralight text-sm opacity-75 hover:opacity-100 transition hover:scale-105 duration-1000 text-center'>For any quries regarding the website contact - vaibhavaryavns007@gmail.com</p>
    </div>
  );
}
