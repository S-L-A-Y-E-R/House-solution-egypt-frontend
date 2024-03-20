// [PropertyType]Page.js

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Searchbar from "@/components/Search/Searchbar";
import FilteredProperties from "@/components/FilteredProperties";
import BreadCrumbs from "@/components/BreadCrumbs";
import axios from "axios";
import { API_BASE_URL, WEBSITE_BASE_URL } from "@/config";
import Head from "next/head";
import i18n from "@/i18n";
import QR from "@/components/Home/QR";

export async function getServerSideProps(context) {
  const { type, propertyType, subArea, location, tag, page } = context.query;
  const { locale } = context;

  let link = `/`;
  if (locale == "ar") link += `ar/`;

  if (type) link = link + type;
  if (propertyType) link = link + "/" + propertyType;
  if (location) link = link + "/" + location;
  const response = await axios.post(`${API_BASE_URL}/utils/getmeta`, { link });
  let queryParams = [`page=${page}`];
  if (type) {
    queryParams.push(`type=${encodeURIComponent(type)}`);
  }
  if (propertyType)
    queryParams.push(`propertyType=${encodeURIComponent(propertyType)}`);
  if (location) {
    queryParams.push(`area=${encodeURIComponent(location)}`);
  }
  const countProperties = await axios.get(
    API_BASE_URL + `/property/count?${queryParams.join("&")}`
  );
  i18n.changeLanguage(locale);

  const changeLangResponse = await axios.post(
    `${API_BASE_URL}/utils/changelang`,
    context.query,
    {
      headers: {
        "accept-language": locale === "en" ? "ar" : "en",
      },
    }
  );
  const {
    query: {
      beds,
      baths,
      minPrice,
      maxPrice,
      furnitureSetting,
      minPropertyArea,
      maxPropertyArea,
      ref,
    },
  } = context;
  queryParams = [`page=${page}`];
  if (type) {
    queryParams.push(`type=${encodeURIComponent(type)}`);
  }
  if (location) queryParams.push(`area=${encodeURIComponent(location)}`);
  if (propertyType)
    queryParams.push(`propertyType=${encodeURIComponent(propertyType)}`);
  if (subArea) queryParams.push(`subArea=${encodeURIComponent(subArea)}`);
  if (beds) queryParams.push(`beds=${encodeURIComponent(beds)}`);
  if (baths) queryParams.push(`baths=${encodeURIComponent(baths)}`);
  if (minPrice) queryParams.push(`minPrice=${encodeURIComponent(minPrice)}`);
  if (maxPrice) queryParams.push(`maxPrice=${encodeURIComponent(maxPrice)}`);
  if (furnitureSetting)
    queryParams.push(
      `furnitureSetting=${encodeURIComponent(furnitureSetting)}`
    );
  if (minPropertyArea)
    queryParams.push(`minPropertyArea=${encodeURIComponent(minPropertyArea)}`);
  if (maxPropertyArea)
    queryParams.push(`maxPropertyArea=${encodeURIComponent(maxPropertyArea)}`);
  if (tag) queryParams.push(`tag=${encodeURIComponent(tag)}`);
  if (ref) queryParams.push(`ref=${encodeURIComponent(ref)}`);
  const url = `${API_BASE_URL}/property/getproperties?${queryParams.join("&")}`;

  const responseProperties = await axios.get(url);
  const filteredProperties = responseProperties.data.properties;

  // const fetchTitles = await axios.get(
  //   `${API_BASE_URL}/title/single?link=${link}`,
  //   {
  //     headers: {
  //       "accept-language": locale === "en" ? "en" : "ar",
  //     },
  //   }
  // );

  return {
    props: {
      meta: response.data.meta,
      count: countProperties.data.count,
      initialLocale: locale,
      changeLang: changeLangResponse.data.url,
      isArabic: locale == "ar" ? true : false,
      properties: filteredProperties,
      metaProperties: responseProperties.data.meta,
      // titles: fetchTitles.data.pageTitle,
      link,
    },
  };
}

const LocationPage = ({
  meta,
  count,
  initialLocale,
  changeLang,
  isArabic,
  properties,
  metaProperties,
  // titles,
  link,
}) => {
  const [titles, setTitles] = useState([]);
  const router = useRouter();
  const { type, propertyType, location, subArea } = router.query;
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(initialLocale);
  }, []);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/title/single?link=${link}`, {
        headers: {
          "accept-language": isArabic ? "ar" : "en",
        },
      })
      .then((res) => {
        setTitles(res.data.pageTitle);
      });
  }, []);

  const titleEN = `${
    propertyType && propertyType !== "properties"
      ? t(
          propertyType.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          })
        )
      : "Property Types"
  } ${
    type && type !== "for-rent-or-sale"
      ? " For " +
        type.replace(/\w\S*/g, function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        })
      : ""
  }
    ${
      location && location !== "location"
        ? " In " +
          location.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          })
        : ""
    }
    ${
      subArea
        ? " , " +
          subArea.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          })
        : ""
    } In Cairo, Egypt`;
  const titleAR = `${t(
    propertyType && propertyType !== "عقارات"
      ? propertyType.replace(/\w\S*/g, function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        })
      : "عقارات"
  )}
    ${
      type && type !== "للإيجار أو البيع"
        ? " لل" +
          type.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          })
        : ""
    }
      ${
        location && location !== "منطقة"
          ? " في " +
            location.replace(/\w\S*/g, function (txt) {
              return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            })
          : ""
      }
      ${
        subArea
          ? " في " +
            subArea.replace(/\w\S*/g, function (txt) {
              return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            })
          : ""
      } في القاهرة و مصر`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": WEBSITE_BASE_URL,
    name: isArabic ? titleAR : titleEN,
    mainEntity: {
      "@id": "mainEntity",
    },
  };
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "House Point Egypt - Real Estate",
    url: WEBSITE_BASE_URL,
    logo: WEBSITE_BASE_URL + "/_next/image?url=%2Fimages%2Flogo.png&w=256&q=75",
  };

  return (
    <>
      {
        <>
          <Head>
            <title>
              {count +
                " " +
                `${meta ? meta.title : isArabic ? titleAR : titleEN}`}
            </title>
            <meta
              name="description"
              content={
                count +
                " " +
                `${meta ? meta.description : isArabic ? titleAR : titleEN}`
              }
            />
            <link
              rel="canonical"
              href={
                WEBSITE_BASE_URL +
                `${isArabic ? "/ar/" : "/"}${type}/${propertyType}/${location}`
              }
              key="canonical"
            />
            <meta name="keywords" content={meta ? meta.keywords : ""} />
            <meta property="og:site_name" content="House Point Egypt" />

            {isArabic && (
              <link
                rel="alternate"
                hreflang="en"
                href={WEBSITE_BASE_URL + `/${type}/${propertyType}/${location}`}
              />
            )}
            {!isArabic && (
              <link
                rel="alternate"
                hreflang="ar"
                href={
                  WEBSITE_BASE_URL + `/ar/${type}/${propertyType}/${location}`
                }
              />
            )}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
            />

            <meta property="og:title" content={isArabic ? titleAR : titleEN} />
            <meta
              property="og:description"
              content={isArabic ? titleAR : titleEN}
            />
            <meta
              property="og:image"
              content={WEBSITE_BASE_URL + "/images/logohouse.png"}
            />
            <meta
              property="og:image:alt"
              content="House Point Egypt - Real Estate | Logo
"
            />
            <meta
              property="og:image:secure_url"
              content={WEBSITE_BASE_URL + "/images/logohouse.png"}
            />

            <meta property="og:type" content="website" />
            <meta property="og:url" content={WEBSITE_BASE_URL} />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="@HousePointE" />
            <meta name="twitter:title" content={isArabic ? titleAR : titleEN} />
            <meta name="twitter:creator" content="@HousePointE" />
            <meta name="twitter:domain" content={WEBSITE_BASE_URL} />
            <meta
              name="twitter:description"
              content={isArabic ? titleAR : titleEN}
            />
            <meta
              name="twitter:image"
              content={
                WEBSITE_BASE_URL +
                "/_next/image?url=%2Fimages%2Flogo.png&w=256&q=75"
              }
            />

            <meta name="robots" content="index, follow" />
          </Head>
        </>
      }
      <div>
        <Navbar url={changeLang} />
        <QR />
        <div className="flex flex-col items-center w-full h-full p-4 mb-4 font-sans text-black bg-center bg-cover ">
          <BreadCrumbs
            type={type}
            propertyType={propertyType}
            location={location}
          />
          <Searchbar />
        </div>
        <FilteredProperties
          properties={properties}
          title={i18n.language === "en" ? titles[0]?.title : titles[0]?.titleAr}
          meta={metaProperties}
        />
        <div className="mt-16">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default LocationPage;
