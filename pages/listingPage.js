// listing.js
import Filter from "../components/Filter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";

import React from "react";

function listingPage() {
  const { t, i18n } = useTranslation();

  const properties = [
    {
      id: 1,
      image:
        "https://th.bing.com/th/id/R.9a8a1af01c2f2a93b9ec069254a7123d?rik=jf2CK4VBCb79rA&pid=ImgRaw&r=0",
      type: "Rent",
      price: 1660,
      title: "2 BHK Apartment",
      location: "New York",
      beds: 2,
      area: "2,000 SF",
      baths: 2,
    },
    {
      id: 1,
      image:
        "https://th.bing.com/th/id/R.9a8a1af01c2f2a93b9ec069254a7123d?rik=jf2CK4VBCb79rA&pid=ImgRaw&r=0",
      type: "Rent",
      price: 1660,
      title: "2 BHK Apartment",
      location: "New York",
      beds: 2,
      area: "2,000 SF",
      baths: 2,
    },
    {
      id: 1,
      image:
        "https://th.bing.com/th/id/R.9a8a1af01c2f2a93b9ec069254a7123d?rik=jf2CK4VBCb79rA&pid=ImgRaw&r=0",
      type: "Rent",
      price: 1660,
      title: "2 BHK Apartment",
      location: "New York",
      beds: 2,
      area: "2,000 SF",
      baths: 2,
    },
    {
      id: 1,
      image:
        "https://th.bing.com/th/id/R.9a8a1af01c2f2a93b9ec069254a7123d?rik=jf2CK4VBCb79rA&pid=ImgRaw&r=0",
      type: "Rent",
      price: 1660,
      title: "2 BHK Apartment",
      location: "New York",
      beds: 2,
      area: "2,000 SF",
      baths: 2,
    },
    // Add more property objects as needed
  ];

  return (
    <div>
      <Navbar />
      <div
        className="bg-[#ECF3FB] w-full h-full bg-cover bg-center p-4 text-black flex flex-col items-center font-sans mb-16"
        style={{
          backgroundImage: "url('/images/back_ground.jpg')",
        }}
      >
        <div className="mt-16 "></div>
        <div>
          <h3 className="text-lg font-semibold sm:text-xl md:text-2xl lg:text-3xl order-1 font-sans mb-16">
            {t("Property Listing")}
          </h3>
        </div>
      </div>
      <div class="flex">
        <div class="flex-1 hidden md:block"></div>
        <div class="flex-1">
          <h2 class="text-2xl leading-10 uppercase font-heading ml-8">
            Featured Listing
          </h2>
        </div>

        <div className="items-center justify-end flex-1 hidden space-x-4 md:flex">
          <div className="relative">
            <select
              id="type1"
              name="type"
              className="w-24 px-4 py-2 border-gray-200 rounded-full appearance-none focus:outline-none focus:border-gray-300 focus:shadow-none"
            >
              {/* <option disabled selected hidden>Location</option> */}
              <option defaultValue>Rent</option>
              <option>Sale</option>
            </select>
            <div className="px-4 pointer-events-none absolute inset-y-0 right-0 flex items-center  text-gray-400">
              <svg
                className="w-4 h-4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>

          <div className="relative">
            <select
              id="type2"
              name="type"
              className="flex mr-4 w-36 px-2 py-2 border-gray-200 rounded-full appearance-none focus:outline-none focus:border-gray-300 focus:shadow-none"
            >
              {/* <option disabled selected hidden>Location</option> */}
              <option defaultValue>Newest First</option>
              <option>Lowest Price</option>
              <option>Highest Price</option>
              <option>Highest Rooms</option>
              <option>Least Rooms</option>
              <option>Biggest Areas</option>
              <option>Smallest Areas</option>
            </select>
            <div className="px-8 py-4 pointer-events-none absolute inset-y-0 right-0 flex items-center  text-gray-400">
              <svg
                className="w-4 h-4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 lg:flex">
        <div className=" w-full lg:pr-8 lg:w-4/12">
          <Filter />
          {/* Add your filter sidebar component here */}
        </div>

        <div className="w-full grid gap-8 lg:w-8/12 lg:grid-cols-2">
          {properties.map((property) => (
            <div
              key={property.id}
              className="overflow-hidden transition-all duration-150 ease-out bg-white border rounded hover:shadow-xl hover:shadow-gray-200"
            >
              <div className="relative cursor-zoom-in">
                <div className="aspect-[3/2] relative z-auto">
                  <div
                    data-rmiz-wrap="visible"
                    style={{ width: "100%", height: "100%" }}
                  >
                    <img
                      src={property.image}
                      alt="Property Photo"
                      layout="fill"
                      objectFit="cover"
                      title="Property Photo"
                    />
                    <button
                      aria-label="Zoom image"
                      data-rmiz-btn-open="true"
                    ></button>
                  </div>
                </div>
                <div className="absolute inset-0 pointer-events-none">
                  <div className="flex flex-col justify-between h-full px-5 py-5 bg-gradient-to-t from-transparent-5 to-transparent">
                    <div>
                      <span className="px-3 py-1 text-xs font-semibold tracking-wider text-white uppercase bg-red-500 rounded-full bg-opacity-90">
                        {property.type}
                      </span>
                    </div>
                    <span className="text-2xl font-semibold text-white">
                      ${property.price}
                    </span>
                  </div>
                  <button className="absolute flex items-center justify-center bg-white border rounded-full shadow-lg focus:outline-none right-6 -bottom-7 w-14 h-14">
                    <svg
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="text-red-500 w-7 h-7"
                    >
                      <path
                        d="M12 21C-8 10 6-2 12 5.7 18-2 32 10 12 21z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <span className="sr-only">Mark as favorite</span>
                  </button>
                </div>
              </div>
              <div className="relative">
                <div className="px-5 py-5">
                  <h3 className="text-lg font-semibold">{property.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {property.location}
                  </p>
                </div>
                <div className="flex text-sm border-t border-gray-100 divide-x divide-gray-200">
                  <div className=" flex font-semibold items-center justify-center flex-1 px-2 py-3 text-black">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 640 512"
                      className="text-black"
                    >
                      <path d="M32 32c17.7 0 32 14.3 32 32V320H288V160c0-17.7 14.3-32 32-32H544c53 0 96 43 96 96V448c0 17.7-14.3 32-32 32s-32-14.3-32-32V416H352 320 64v32c0 17.7-14.3 32-32 32s-32-14.3-32-32V64C0 46.3 14.3 32 32 32zm144 96a80 80 0 1 1 0 160 80 80 0 1 1 0-160z" />
                    </svg>

                    <span className="ml-2">{property.beds} Beds</span>
                  </div>
                  <div className=" flex font-semibold items-center justify-center flex-1 px-2 py-3 text-black">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 576 512"
                    >
                      <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                    </svg>
                    <span className="ml-2">{property.area} Area</span>
                  </div>
                  <div className=" flex font-semibold items-center justify-center flex-1 px-2 py-3 text-black">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 512 512"
                    >
                      <path d="M96 77.3c0-7.3 5.9-13.3 13.3-13.3c3.5 0 6.9 1.4 9.4 3.9l14.9 14.9C130 91.8 128 101.7 128 112c0 19.9 7.2 38 19.2 52c-5.3 9.2-4 21.1 3.8 29c9.4 9.4 24.6 9.4 33.9 0L289 89c9.4-9.4 9.4-24.6 0-33.9c-7.9-7.9-19.8-9.1-29-3.8C246 39.2 227.9 32 208 32c-10.3 0-20.2 2-29.2 5.5L163.9 22.6C149.4 8.1 129.7 0 109.3 0C66.6 0 32 34.6 32 77.3V256c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H96V77.3zM32 352v16c0 28.4 12.4 54 32 71.6V480c0 17.7 14.3 32 32 32s32-14.3 32-32V464H384v16c0 17.7 14.3 32 32 32s32-14.3 32-32V439.6c19.6-17.6 32-43.1 32-71.6V352H32z" />
                    </svg>

                    <span className="ml-2">{property.baths} Baths</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-center space-x-2 md:space-x-5">
          <button className="flex items-center justify-center w-10 h-10 rounded-md bg-cyan-200 text-cyan-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </button>
          <div className="space-x-2 md:space-x-2.5 flex items-center">
            <button className="flex items-center justify-center w-10 h-10 text-white rounded-md bg-[#095668] focus:outline-none">
              1
            </button>
            <button className="flex items-center justify-center w-10 h-10 rounded-md text-[#095668] bg-gray-400 focus:outline-none">
              2
            </button>
            <button className="flex items-center justify-center w-10 h-10 rounded-md text-[#095668] bg-gray-400 focus:outline-none">
              3
            </button>
            <span className="flex items-center justify-center w-5 h-10 rounded-md">
              …
            </span>
            <button className="flex items-center justify-center w-10 h-10 rounded-md text-[#095668] bg-gray-400 focus:outline-none">
              18
            </button>
          </div>
          <button className="flex items-center justify-center w-10 h-10 rounded-md bg-cyan-200 text-cyan-500 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
}

export default listingPage;

// const listings = [
//     {
//       id: 1,
//       image: 'https://th.bing.com/th/id/R.9a8a1af01c2f2a93b9ec069254a7123d?rik=jf2CK4VBCb79rA&pid=ImgRaw&r=0',
//       type: 'Rent',
//       price: '$1660',
//       title: '2 BHK Apartment',
//       location: 'New York',
//       beds: '2 Beds',
//       area: '2,000 SF',
//       baths: '2 Bath',
//     },
//     {
//       id: 2,
//       image: 'https://th.bing.com/th/id/R.9a8a1af01c2f2a93b9ec069254a7123d?rik=jf2CK4VBCb79rA&pid=ImgRaw&r=0',
//       type: 'Buy',
//       price: '$140,650',
//       title: '2 BHK Villa',
//       location: 'Los Angeles',
//       beds: '2 Beds',
//       area: '2,000 SF',
//       baths: '2 Bath',
//     },
//     {
//       id: 3,
//       image: 'https://th.bing.com/th/id/R.9a8a1af01c2f2a93b9ec069254a7123d?rik=jf2CK4VBCb79rA&pid=ImgRaw&r=0',
//       type: 'Rent',
//       price: '$1499',
//       title: '1 BHK Independent House',
//       location: 'San Francisco',
//       beds: '1 Bed',
//       area: '1,000 SF',
//       baths: '1 Bath',
//     },
//     {
//         id: 4,
//         image: 'https://th.bing.com/th/id/R.9a8a1af01c2f2a93b9ec069254a7123d?rik=jf2CK4VBCb79rA&pid=ImgRaw&r=0',
//         type: 'Rent',
//         price: '$1499',
//         title: '1 BHK Independent House',
//         location: 'San Francisco',
//         beds: '1 Bed',
//         area: '1,000 SF',
//         baths: '1 Bath',
//       }

//     // Add more listings here
//   ];

// const ListingPage = () => {
//   return (
//     <div>
// <Navbar/>
// <div className="bg-[#ECF3FB] p-4 text-black flex flex-col items-center font-sans mb-16">
//         <div className="mt-16 "></div>
//         <div>
//           <h3 className="text-lg font-semibold sm:text-xl md:text-2xl lg:text-3xl order-1 font-sans mb-16">
//             Property Listing
//           </h3>
//           </div>
//           </div>

//           <div className="bg-gray-100 min-h-screen">
//       {/* Header */}
//       <header className="bg-white shadow">
//         <div className="container mx-auto px-4 py-6">
//           <h4 className="text-2xl  flex justify-center">Featured Listing</h4>
//         </div>
//       </header>
//       <div className="flex p-4">
//           <div className="ml-16 w-1/4 pr-4">
//             <Filter />
//           </div>
//           <div className="w-3/4">
// <div className="grid gap-8 mx-auto lg:grid-cols-2 p-4">
//       {listings.slice(0, 6).map((listing) => (
//         <div
//           key={listing.id}
//           className="overflow-hidden transition-all duration-150 ease-out bg-white border rounded hover:shadow-xl hover:shadow-gray-200"
//         >
//           <div className="relative cursor-zoom-in">
//             <div className="aspect-[3/2] relative z-auto">
//               <div
//                 data-rmiz-wrap="visible"
//                 style={{ width: '100%', height: '100%' }}
//               >
//                 <span
//                   style={{
//                     boxSizing: 'border-box',
//                     display: 'block',
//                     overflow: 'hidden',
//                     width: 'initial',
//                     height: 'initial',
//                     background: 'none',
//                     opacity: 1,
//                     border: '0px',
//                     margin: '0px',
//                     padding: '0px',
//                     position: 'absolute',
//                     inset: '0px',
//                   }}
//                 >
//                   <img

//                     alt="Property Photo"
//                     sizes="100vw"
//                     srcSet={listing.image}
//                     src={listing.image}
//                     decoding="async"
//                     data-nimg="fill"
//                     style={{
//                       width:'100%',
//                       height: '100%',
//                       position: 'absolute',
//                       inset: '0px',
//                       boxSizing: 'border-box',
//                       padding: '0',
//                       border: 'none',
//                       margin: 'auto',
//                       display: 'block',

//                       objectFit: 'cover',
//                       objectPosition: 'center center',
//                     }}
//                   />
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div className="p-4">
//             <div className="flex items-center justify-between">
//               <div className="text-sm font-medium text-gray-500">
//                 {listing.type}
//               </div>
//               <div className="text-sm font-medium text-gray-500">
//                 {listing.price}
//               </div>
//             </div>
//             <h2 className="mt-2 text-xl font-semibold text-gray-800">
//               {listing.title}
//             </h2>
//             <div className="mt-2 text-gray-500">{listing.location}</div>
//             <div className="mt-2 text-sm text-gray-500">
//             <div className="grid grid-cols-4  justify-center ">
//               <div className=" border-t border-r border-b border-l border-gray-300 px-2 py-2">
//                 <p className="font-bold text-gray-700">{listing.beds}</p>
//               </div>
//               <div className="border-t border-r border-b border-gray-300 px-2 py-2">
//                 <p className="font-bold text-gray-700">{listing.baths}</p>
//               </div>
//               <div className="border-t border-r border-b border-gray-300 px-2 py-2">
//                 <p className="font-bold text-gray-700">{listing.area}</p>
//               </div>

//             </div>

//             </div>
//           </div>

//         </div>
//       ))}
//     </div>
//     </div>
//     </div>
//     <div className="mt-8">
//   <div className="flex items-center justify-center space-x-2 md:space-x-5">
//     <button className="flex items-center justify-center w-10 h-10 rounded-md bg-cyan-200 text-cyan-500">
//       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"></path>
//       </svg>
//     </button>
//     <div className="space-x-2 md:space-x-2.5 flex items-center">
//       <button className="flex items-center justify-center w-10 h-10 text-white rounded-md bg-[#095668] focus:outline-none">1</button>
//       <button className="flex items-center justify-center w-10 h-10 rounded-md text-[#095668] bg-gray-400 focus:outline-none">2</button>
//       <button className="flex items-center justify-center w-10 h-10 rounded-md text-[#095668] bg-gray-400 focus:outline-none">3</button>
//       <span className="flex items-center justify-center w-5 h-10 rounded-md">…</span>
//       <button className="flex items-center justify-center w-10 h-10 rounded-md text-[#095668] bg-gray-400 focus:outline-none">18</button>
//     </div>
//     <button className="flex items-center justify-center w-10 h-10 rounded-md bg-cyan-200 text-cyan-500 focus:outline-none">
//       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"></path>
//       </svg>
//     </button>
//   </div>
// </div>
// <div className='mt-16'>
// <Footer />
// </div>

//     </div>
// </div>
//   );
// };

// export default ListingPage;
