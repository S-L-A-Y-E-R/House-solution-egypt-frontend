import React from "react";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/config";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { SwiperNextButton, SwiperPrevButton } from "./SwiperButtons";
import PropertyCard from "../PropertyCard";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { Autoplay } from "swiper/modules";

export default function RelatedProperties({
  type,
  propertyType,
  location,
  subArea,
  isArabic,
}) {
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const { t, i18n } = useTranslation();

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
  useEffect(() => {
    const fetchFilteredProperties = async () => {
      let queryParams = [];
      if (propertyType)
        queryParams.push(`propertyType=${encodeURIComponent(propertyType)}`);
      setLoading(true);
      const url = `${API_BASE_URL}/property/getproperties?${queryParams.join(
        "&"
      )}`;
      try {
        const response = await axios.get(url);
        const filteredProperties = response.data.properties;
        setLoading(false);
        setProperties(filteredProperties);
      } catch (error) {
        console.error("Error fetching filtered properties:", error);
      }
    };
    fetchFilteredProperties();
  }, []);
  return (
    <div className="flex flex-col items-center w-full gap-2 mb-2">
      <Swiper
        spaceBetween={20}
        slidesPerView={4}
        slidesPerGroup={1}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay]}
        navigation
        dir={isArabic ? "rtl" : "ltr"}
        className="w-full pt-10"
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          700: {
            slidesPerView: 2,
          },
          900: {
            slidesPerView: 4,
          },
        }}
      >
        <span slot="container-start">
          <div className="flex items-center justify-center gap-2">
            <div className="flex items-center gap-2">
              <SwiperPrevButton />
              <h2 className="text-2xl font-semibold leading-10 text-center uppercase font-heading">
                {t("pages.property.components.related.related_properties")}
              </h2>
              <SwiperNextButton />
            </div>
          </div>
        </span>
        {properties?.map((property, index) => {
          let propertyLink = `/`;
          if (property.type === "rent") {
            propertyLink =
              propertyLink + t("general.components.searchbar.rent");
          } else {
            propertyLink =
              propertyLink + t("general.components.searchbar.sale");
          }
          if (isArabic) {
            propertyLink = propertyLink + "/" + property.propertyType.nameAr;
            propertyLink = propertyLink + "/" + property.area.nameAr;
            propertyLink = propertyLink + "/" + property.subarea.nameAr;
            propertyLink =
              propertyLink + "/" + property.titleAr + "-" + property.refNumber;
          } else {
            propertyLink =
              propertyLink + "/" + property.propertyType.name.toLowerCase();
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
            <SwiperSlide key={index}>
              <PropertyCard
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
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Link href={`/${type}/${propertyType}/${location}`} className="mt-4"
        rel="noopener noreferrer"
      >
        <button className="px-3 py-2 text-xl font-semibold text-white rounded bg-custom-blue">
          {isArabic && (
            <>
              لمزيد من ال{propertyType} لل{type} في {location}, أضغط هنا
            </>
          )}
          {!isArabic && (
            <>
              For more available {propertyType} For {type} in {location}, Check
              Here
            </>
          )}
        </button>
      </Link>
    </div>
  );
}
