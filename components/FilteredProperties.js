import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { FaSadTear } from "react-icons/fa";
import { useRouter } from "next/router";
import { API_BASE_URL } from "@/config";
import PropertyCard from "./PropertyCard";
import Skeleton from "react-loading-skeleton";
import ReactPaginate from "react-paginate";
import Head from "next/head";
import { WEBSITE_BASE_URL } from "@/config";
const FilteredProperties = ({
  type,
  propertyType,
  location,
  subArea,
  properties,
  meta,
  title,
}) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [liveCurrency, setLiveCurrency] = useState({ USD: 1, EUR: 1 });
  useEffect((e) => {
    async function fetchCurrency() {
      try {
        const response = await axios.get(API_BASE_URL + "/utils/getcurrency");
        setLiveCurrency(response.data.currency);
      } catch (err) {
        console.log(err);
      }
    }
    fetchCurrency();
  }, []);

  const handlePageClick = async (e) => {
    if (e.selected + 1 < 1) return;
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: e.selected + 1 },
    });
  };
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": "ItemList",
    url: WEBSITE_BASE_URL + "/" + type,
    itemListElement: [],
  };
  properties.map((e, i) => {
    itemListSchema.itemListElement.push({ item: i });
  });
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      </Head>
      <div className="mt-2" id="smoothNavigation">
        <div className="w-full ">
          {loading && (
            <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((e) => {
                return (
                  <div key={e}>
                    <Skeleton className="block w-full p-4 h-96" />
                    <Skeleton count={3} />
                  </div>
                );
              })}
            </div>
          )}
          {!loading && properties.length == 0 && (
            <div className="flex flex-col items-center justify-center h-64 gap-2 text-xl font-medium font-openSans">
              <FaSadTear className="text-6xl text-custom-blue" />
              <h2>Sorry, no properties found For Your Search :(</h2>
              <h6 className="mt-4 text-base font-extralight">
                Please, try another filter option
              </h6>
            </div>
          )}
          {!loading && properties.length != 0 && (
            <div className="flex flex-col items-center">
              <h1 className="px-6 text-3xl font-medium text-center md:px-0 md:text-start font-openSans">
                {title ? title : ""}
              </h1>
              <h2 className='px-6 text-2xl font-medium text-center md:px-0 md:text-start font-openSans mt-2'>
                {!isArabic ? 'All Price, All Bedrooms, All Bathrooms, All Finishing Levels' : 'جميع الأسعار, جميع غرف نوم, جميع حمامات, جميع مستويات التشطيب'}
              </h2>

              <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {properties.map((property) => {
                  let propertyLink = `/`;
                  if (property.type === "rent") {
                    propertyLink =
                      propertyLink + t("general.components.searchbar.rent");
                  } else {
                    propertyLink =
                      propertyLink + t("general.components.searchbar.sale");
                  }
                  if (isArabic) {
                    propertyLink =
                      propertyLink + "/" + property.propertyType.nameAr;
                    propertyLink = propertyLink + "/" + property.area.nameAr;
                    propertyLink = propertyLink + "/" + property.subarea.nameAr;
                    propertyLink =
                      propertyLink +
                      "/" +
                      property.titleAr +
                      "-" +
                      property.refNumber;
                  } else {
                    propertyLink =
                      propertyLink +
                      "/" +
                      property.propertyType.name.toLowerCase();
                    propertyLink =
                      propertyLink + "/" + property.area.name.toLowerCase();
                    propertyLink =
                      propertyLink + "/" + property.subarea.name.toLowerCase();
                    propertyLink =
                      propertyLink +
                      "/" +
                      property.title.toLowerCase() +
                      "-" +
                      property.refNumber;
                  }

                  return (
                    <PropertyCard
                      key={property._id}
                      id={property._id}
                      propertyLink={propertyLink}
                      image={property.mainimage}
                      title={isArabic ? property.titleAr : property.title}
                      location={
                        isArabic
                          ? property.area.nameAr
                          : property.area.name.toLowerCase()
                      }
                      refNumber={property.refNumber}
                      price={property.price}
                      beds={property.beds}
                      bathrooms={property.baths}
                      area={property.propertyArea}
                      propertyType={
                        isArabic
                          ? property.propertyType.nameAr
                          : property.propertyType.name.toLowerCase()
                      }
                      furnitureStatus={
                        isArabic
                          ? property.furnitureStatus.nameAr
                          : property.furnitureStatus.name
                      }
                      type={
                        property.type == "rent"
                          ? t("general.components.searchbar.rent")
                          : t("general.components.searchbar.sale")
                      }
                      subArea={
                        isArabic
                          ? property.subarea.nameAr
                          : property.subarea.name.toLowerCase()
                      }
                      currency={property.currency}
                      liveCurrency={liveCurrency}
                    />
                  );
                })}
              </div>

              <ReactPaginate
                breakLabel="..."
                onPageChange={handlePageClick}
                disableInitialCallback
                forcePage={Number(router.query.page) - 1 || 0}
                pageCount={meta.totalPages}
                renderOnZeroPageCount={null}
                className="w-full hidden md:flex justify-center gap-1"
                pageClassName="border px-2 border-custom-blue text-custom-blue font-semibold"
                activeClassName="font-bold bg-custom-blue text-white"
                previousClassName="text-custom-blue font-semibold"
                nextClassName="text-custom-blue font-semibold"
              />

              <ReactPaginate
                breakLabel="..."
                onPageChange={handlePageClick}
                disableInitialCallback
                forcePage={Number(router.query.page) - 1 || 0}
                pageCount={meta.totalPages}
                renderOnZeroPageCount={null}
                className="w-full flex md:hidden justify-center gap-1"
                pageClassName="border px-2 border-custom-blue text-custom-blue font-semibold"
                activeClassName="font-bold bg-custom-blue text-white"
                previousClassName="text-custom-blue text-xl font-semibold"
                nextClassName="text-custom-blue text-xl font-semibold"
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
                nextLabel=" >"
                previousLabel="< "
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FilteredProperties;
