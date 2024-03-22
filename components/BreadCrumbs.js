import { useState, useEffect } from "react";
import "rc-slider/assets/index.css";
import { FaChevronLeft, FaChevronRight, FaHome } from "react-icons/fa";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import Head from "next/head";
import { WEBSITE_BASE_URL } from "@/config";

const FilterSearch = ({ type, propertyType, location, title, subArea, unTitle, home }) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const orgSchema = {
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: WEBSITE_BASE_URL,
      },
    ],
    sameAs: [
      "https://www.facebook.com/House-Point-Egypt-112529918222923",
      "https://www.instagram.com/housepointegypt/",
      "https://www.linkedin.com/in/housepointegyptrealestate",
      "https://twitter.com/Housep0integypt",
      "https://youtube.com/@HousepointEgypt?si=_fbbBMQSCYotsucU",
      "https://t.me/housepointegypt",
      "https://www.tiktok.com/@house.point.egypt?_t=8ipx657pyac&_r=1"
    ],
  };
  if (type) {
    orgSchema.itemListElement.push({
      "@type": "ListItem",
      position: 2,
      name: type,
      item: WEBSITE_BASE_URL + "/" + type,
    });
  }
  if (propertyType) {
    orgSchema.itemListElement.push({
      "@type": "ListItem",
      position: 3,
      name: propertyType,
      item: WEBSITE_BASE_URL + "/" + type + "/" + propertyType,
    });
  }
  if (location) {
    orgSchema.itemListElement.push({
      "@type": "ListItem",
      position: 4,
      name: location,
      item: WEBSITE_BASE_URL + "/" + type + "/" + propertyType + "/" + location,
    });
  }
  if (subArea) {
    orgSchema.itemListElement.push({
      "@type": "ListItem",
      position: 5,
      name: subArea,
      item: WEBSITE_BASE_URL + "/" + type + "/" + propertyType + "/" + subArea,
    });
  }
  if (title) {
    orgSchema.itemListElement.push({
      "@type": "ListItem",
      position: 6,
      name: title,
      item:
        WEBSITE_BASE_URL +
        "/" +
        type +
        "/" +
        propertyType +
        "/" +
        subArea +
        "/" +
        title,
    });
  }
  return (
    <div className="flex flex-col flex-wrap md:flex-row text-xs md:text-base w-full  px-0 lg:px-20" dir={isArabic ? "rtl" : "ltr"}>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </Head>
      <div className="flex items-center my-1 text-xs md:text-base text-slate-800" >
        <Link className="underline" href={`/`}
          rel="home"
        >
          <FaHome />
        </Link>

        {type && (
          <div className="flex items-center">
            {isArabic && <FaChevronLeft className="w-2 mx-1" />}
            {!isArabic && <FaChevronRight className="w-2 mx-1" />}

            <Link className="underline" href={`/${type.toLowerCase()}`}
              rel="home"
            >
              {type.toLowerCase().replace(/\w\S*/g, function (txt) {
                return (
                  txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
                );
              })}
            </Link>
          </div>
        )}

        {home && (
          <div className="flex items-center">
            {isArabic && <FaChevronLeft className="w-2 mx-1" />}
            {!isArabic && <FaChevronRight className="w-2 mx-1" />}

            <Link href={`/`}
              rel="home"
            >
              {isArabic ? "الرئيسية" : "Home"}
            </Link>
          </div>
        )}
        {propertyType && (
          <div className="flex items-center">
            {isArabic && <FaChevronLeft className="w-2 mx-1" />}
            {!isArabic && <FaChevronRight className="w-2 mx-1" />}{" "}
            <Link
              className="underline"
              href={`/${type.toLowerCase()}/${propertyType
                .toLowerCase()
                .split("-")
                .join(" ")}`}
            >
              {propertyType.toLowerCase().replace(/\w\S*/g, function (txt) {
                return (
                  txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
                );
              })}
            </Link>
          </div>
        )}
        {location && (
          <div className="flex items-center">
            {isArabic && <FaChevronLeft className="w-2 mx-1" />}
            {!isArabic && <FaChevronRight className="w-2 mx-1" />}{" "}
            <Link
              className="underline"
              href={`/${type.toLowerCase()}/${propertyType
                .toLowerCase()
                .split("-")
                .join(" ")}/${location.toLowerCase()}`}
            >
              {location.toLowerCase().replace(/\w\S*/g, function (txt) {
                return (
                  txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
                );
              })}
            </Link>
          </div>
        )}
        {subArea && (
          <div className="flex items-center">
            {isArabic && <FaChevronLeft className="w-2 mx-1" />}
            {!isArabic && <FaChevronRight className="w-2 mx-1" />}{" "}
            <Link
              className="underline"
              href={`/${type.toLowerCase()}/${propertyType.toLowerCase()}/${location.toLowerCase()}/${subArea.toLowerCase()}`}
            >
              {subArea
                .toLowerCase()
                .split("-")
                .join(" ")
                .replace(/\w\S*/g, function (txt) {
                  return (
                    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
                  );
                })}
            </Link>
          </div>
        )}
      </div>
      {title && (
        <div className="flex items-center underline text-slate-600">
          {isArabic && <FaChevronLeft className="w-2 mx-1" />}
          {!isArabic && <FaChevronRight className="w-2 mx-1" />}{" "}
          {title.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          })}
        </div>
      )}
      {unTitle && (
        <div className="flex items-center">
          {isArabic && <FaChevronLeft className="w-2 mx-1" />}
          {!isArabic && <FaChevronRight className="w-2 mx-1" />}

          <p>Properties</p>
        </div>
      )}
    </div>
  );
};

export default FilterSearch;
