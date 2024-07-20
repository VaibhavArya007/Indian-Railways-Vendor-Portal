import React, { useState, useEffect } from 'react';

export const Text = () => {
  const [visibleParagraphs, setVisibleParagraphs] = useState([false, false, false, false]);

  useEffect(() => {
    const timeouts = visibleParagraphs.map((_, index) =>
      setTimeout(() => {
        setVisibleParagraphs(prev => {
          const newVisible = [...prev];
          newVisible[index] = true;
          return newVisible;
        });
      }, (index + 1) * 500)
    );

    return () => timeouts.forEach(timeout => clearTimeout(timeout));
  }, []);

  return (
    <div className="mt-5" >
       <h2 className={` text-lg text-sky-950 opacity-80 font-bold transition-opacity duration-1000 ${visibleParagraphs[0] ? 'opacity-100' : 'opacity-0'} hover:opacity-70`}>
        Welcome To The Railways Vendor Portal!
      </h2>

      <div className={` mt-5 font-medium text-sky-900 text-justify text-base transition-opacity duration-1000 ${visibleParagraphs[1] ? 'opacity-100' : 'opacity-0'} hover:opacity-70`}>
        <i>
        Indian Railways, established in 1853, has been the backbone of India's
          transportation network, connecting millions of people and facilitating the
          movement of goods across the country. With a rich history of over 170 years,
          Indian Railways has evolved into one of the largest and busiest rail networks
          in the world, serving as a lifeline for the nation's economy and a symbol of
          unity and progress.
        </i>
      </div>
      <br />

      <div className={`font-medium text-sky-900 text-justify text-base transition-opacity duration-1000 ${visibleParagraphs[2] ? 'opacity-100' : 'opacity-0'} hover:opacity-70`}>
        <i>
          This Vendor Portal is your gateway to becoming a vital part of this historic
          institution. Here, vendors can list their products and services, making them
          available for purchase by Indian Railways. Whether you provide raw materials,
          specialized equipment, or innovative solutions, your contributions are essential
          in maintaining and enhancing the efficiency and quality of our rail services.
        </i>
      </div>
      <br />
      <div className={`font-medium text-sky-900 text-justify text-base transition-opacity duration-1000 ${visibleParagraphs[3] ? 'opacity-100' : 'opacity-0'} hover:opacity-70`}>
        <i>
        Join us in our mission to deliver excellence to every corner of India. Register today to showcase your products, connect with procurement teams,
        and explore opportunities to collaborate with Indian Railways. Together, we can drive the future of railway innovation and continue to serve the nation with pride.
        </i>
      </div>
    </div>
  );
};
