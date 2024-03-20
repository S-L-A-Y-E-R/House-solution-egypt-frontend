import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { FaWhatsapp, FaHeart, FaAngleDown } from "react-icons/fa";

import axios from "axios";
import Link from "next/link";

function PropertiesByArea() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();
  const { area } = router.query; // Access the selected area from the query parameter

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch properties for the selected area using Axios
        const response = await axios.get(
          `https://house-point-api.onrender.com/property?area=${area}`
        );

        // Axios automatically throws an error if the response status is not within the range of 2xx
        const data = response.data;

        if (!Array.isArray(data)) {
          throw new Error("API response data is not an array");
        }

        setProperties(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again later.");
        setLoading(false);
      }
    };

    if (area) {
      fetchData();
    }
  }, [area]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Properties in {area}</h1>
      {/* Render properties */}
      <ul>
        {properties.map((property) => (
          <li key={property._id}>{property.title}</li>
        ))}
      </ul>
      {/* <div className="mt-8">
          <h2
            className={`fw-normal text-center pt-3 ${
              isArabic ? "text-right" : ""
            }`}
          >
            <div className="flex items-center justify-center">
              {!isArabic && (
                <>
                  <span className="text-dark">
                    {t("Properties For Rent in Maadi, Katameya & New Cairo")}
                  </span>
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="bookmark"
                    className="svg-inline--fa fa-bookmark fa-xs text-dark mx-1 h-4 w-4 ml-1"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                  >
                    <path
                      fill="currentColor"
                      d="M384 48V512l-192-112L0 512V48C0 21.5 21.5 0 48 0h288C362.5 0 384 21.5 384 48z"
                    ></path>
                  </svg>
                </>
              )}
              {isArabic && (
                <>
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="bookmark"
                    className="svg-inline--fa fa-bookmark fa-xs text-dark mx-1 h-4 w-4 mr-1"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                  >
                    <path
                      fill="currentColor"
                      d="M384 48V512l-192-112L0 512V48C0 21.5 21.5 0 48 0h288C362.5 0 384 21.5 384 48z"
                    ></path>
                  </svg>
                  <span className="text-dark">
                    {t("Properties For Rent in Maadi, Katameya & New Cairo")}
                  </span>
                </>
              )}
            </div>
          </h2>
    
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {properties.length > 0 ? (
                properties.map((property) => (
              <div
                key={property._id}
                className="overflow-hidden transition-all duration-150 ease-out bg-white border rounded hover:shadow-xl hover:shadow-gray-200"
              > */}
      {/* Property Image */}
      {/* <div className="relative cursor-zoom-in">
                  <div className="aspect-[3/2] relative z-auto">
                    <div data-rmiz-wrap="visible" style={{ width: "100%", height: "100%" }}>
                      <Link href={`/rentProperties/${property._id}`}>
                        <img
                          src={property.images}
                          alt="Property Photo"
                          layout="fill"
                          style={{ width: "100%", height: "100%" }}
                          objectFit="cover"
                        />
                      </Link>
                      <button aria-label="Zoom image" data-rmiz-btn-open="true"></button>
                    </div>
                  </div>
    
                 
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="flex flex-col justify-between h-full px-5 py-5 bg-gradient-to-t from-transparent-5 to-transparent">
                      <div className="flex justify-between">
                        <span className="px-3 py-1 text-xs font-semibold tracking-wider text-white uppercase bg-red-500 rounded-full bg-opacity-90">
                          {property.propertyType}
                        </span>
                        <span className="px-3 py-1 text-xs font-semibold tracking-wider text-white uppercase bg-red-500 rounded-full bg-opacity-90">
                          refNumber: {property.refNumber}
                        </span>
                      </div>
                      <Link href={`/rentProperties/${property._id}`}>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, index) => (
                            <svg
                              key={index}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="text-yellow-400 w-6 h-6"
                            >
                              <path d="M0 0h24v24H0z" fill="none" />
                              <path d="M12 17.27l-5.47 3.27L7 14.41l-4-3.9h5.82L12 4l2.18 6.51H19l-4 3.9 1.47 3.14z" />
                            </svg>
                          ))}
                        </div>
                      </Link>
                    </div>
    
                    <div className="flex flex-col">
                      <Link 
                       href="https://api.whatsapp.com/send?phone=1234567890"
                       className="text-gray-600 hover:text-gray-800"
                       target="_blank"
                       rel="noopener noreferrer"
                       >
                        <button
                          type="button"
                          aria-label="share"
                          name="share"
                          className="absolute flex items-center justify-center shadow-lg focus:outline-none right-2 bottom-20 w-18 h-16"
                        >
                          <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fab"
                            data-icon="share"
                            className="svg-inline--fa fa-whatsapp fa-lg text-gray-800 w-7 h-7"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 576 512"
                          >
                            <path
                              d="M568.9 143.5l-150.9-138.2C404.8-6.773 384 3.039 384 21.84V96C241.2 97.63 128 126.1 128 260.6c0 54.3 35.2 108.1 74.08 136.2c12.14 8.781 29.42-2.238 24.94-16.46C186.7 252.2 256 224 384 223.1v74.2c0 18.82 20.84 28.59 34.02 16.51l150.9-138.2C578.4 167.8 578.4 152.2 568.9 143.5zM416 384c-17.67 0-32 14.33-32 32v31.1l-320-.0013V128h32c17.67 0 32-14.32 32-32S113.7 64 96 64H64C28.65 64 0 92.65 0 128v319.1c0 35.34 28.65 64 64 64l320-.0013c35.35 0 64-28.66 64-64V416C448 398.3 433.7 384 416 384z"
                              fill="#095668"
                            ></path>
                          </svg>
                        </button>
                      </Link>
    
                      <Link
                  href="https://api.whatsapp.com/send?phone=1234567890"
                  className="text-green-600 hover:text-green-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button
                          type="button"
                          aria-label="whatsapp"
                          name="call us"
                          className="absolute flex items-center justify-center shadow-lg focus:outline-none right-2 top-25 bottom-10  w-18 h-16"
                        >
                  <FaWhatsapp className="w-6 h-6" />
                  </button>
                </Link>
    
                      <Link href="#">
                       <button
                          type="button"
                          aria-label="Add To Favorite"
                          name="Add To Favorite"
                          className="absolute flex items-center justify-center shadow-lg focus:outline-none right-2 bottom-0 w-18 h-16"
                        >
                          
    <span
                  className={`text-red-500 transition-all duration-300 ease-in-out ${
                    heartFilled ? '' : 'fill-red'
                  }`}
                  onMouseEnter={() => setHeartFilled(true)}
                  onMouseLeave={() => setHeartFilled(false)}
                >
                  <FaHeart className="w-8 h-8" />
                </span>
                        </button> 
    
                      </Link>
                    </div>
                  </div>
                </div> */}

      {/* Property Details */}
      {/* <div className="relative">
                  <div className="px-5 py-5 flex items-center justify-between bg-[#095668]">
                    <div>
                      <Link href={`/rentProperties/${property._id}`}>
                        <h3 className="text-lg font-semibold w-30">{isArabic ? property.titleAr : property.title}</h3>
                      </Link>
                      <Link href={`/rentProperties/${property._id}`}>
                        <p className="truncate w-20 mt-1 text-sm text-gray-500">
                          {isArabic ? property.locationAr : property.location}
                        </p>
                      </Link>
                    </div>
                    <div>
                      <Link href={`/rentProperties/${property._id}`}>
                        <button className="bg-[#c5b59e] text-[#095668] mr-16 mb-4 flex flex-col items-center justify-center px-2 py-1.5 w-20 h-20 text-sm font-medium ml-3  transition-colors duration-200 transform border rounded-full border-[#c5b59e]">
                          <span>{property.price.toLocaleString()}</span>
                          <span className="text-xs">EGP</span>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div> */}

      {/* Property Features */}
      {/* <div className="flex text-sm border-t bg-[#095668] border-[#c5b59e] divide-x divide-gray-200">
                  <Link href={`/rentProperties/${property._id}`}>
                    <div className="flex font-semibold items-center justify-center flex-1 ml-2 mr-4 px-2 py-3 text-black">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 640 512"
                        className="text-black"
                      >
                        <path d="M32 32c17.7 0 32 14.3 32 32V320H288V160c0-17.7 14.3-32 32-32H544c53 0 96 43 96 96V448c0 17.7-14.3 32-32 32s-32-14.3-32-32V416H352 320 64v32c0 17.7-14.3 32-32 32s-32-14.3-32-32V64C0 46.3 14.3 32 32 32zm144 96a80 80 0 1 1 0 160 80 80 0 1 1 0-160z" />
                      </svg>
                      <span className="ml-2">{property.beds} {t('Beds')} </span>
                    </div>
                  </Link>
    
                  <Link href={`/rentProperties/${property._id}`}>
                    <div className="flex font-semibold items-center justify-center flex-1 mx-4 px-2 py-3 text-black">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M96 77.3c0-7.3 5.9-13.3 13.3-13.3c3.5 0 6.9 1.4 9.4 3.9l14.9 14.9C130 91.8 128 101.7 128 112c0 19.9 7.2 38 19.2 52c-5.3 9.2-4 21.1 3.8 29c9.4 9.4 24.6 9.4 33.9 0L289 89c9.4-9.4 9.4-24.6 0-33.9c-7.9-7.9-19.8-9.1-29-3.8C246 39.2 227.9 32 208 32c-10.3 0-20.2 2-29.2 5.5L163.9 22.6C149.4 8.1 129.7 0 109.3 0C66.6 0 32 34.6 32 77.3V256c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H96V77.3zM32 352v16c0 28.4 12.4 54 32 71.6V480c0 17.7 14.3 32 32 32s32-14.3 32-32V464H384v16c0 17.7 14.3 32 32 32s32-14.3 32-32V439.6c19.6-17.6 32-43.1 32-71.6V352H32z"/></svg>
    
                      <span className="ml-2">{property.baths} {t('Baths')}</span>
                    </div>
                  </Link>
    
                  <Link href={`/rentProperties/${property._id}`}>
                    <div className="flex font-semibold items-center justify-center flex-1 mx-4 px-2 py-3 text-black">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 576 512"
                      >
                        <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                      </svg>
                      <span className="ml-2">{property.propertyArea} sqm</span>
                    </div>
                  </Link>
                </div>
              </div>
             ))
             ) : (
               <p>No properties available.</p>
             )}
    
          </div>
    
          */}

      {/* </div> */}
    </div>
  );
}

export default PropertiesByArea;
