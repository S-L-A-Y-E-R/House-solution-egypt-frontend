import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import axios from "axios";
import { API_BASE_URL, BLOG_IMAGE_BASE_URL, WEBSITE_BASE_URL } from "@/config";
import QR from "@/components/Home/QR";
import Head from "next/head";
import PropertyCard from "@/components/PropertyCard";
import styles from '@/styles/Blog.module.css'

export async function getServerSideProps(context) {
  const { locale } = context;
  const { title } = context.query;
  const getData = await fetch((`${API_BASE_URL}/blog/title/${title}`), {
    headers: {
      'Content-Type': 'application/json',
      'accept-language': locale === "en" ? "ar" : "en",
    }
  }).then((res) => {
    return res.json()

  }).then((data) => {
    return data
  })

  return {
    props: {
      locale: getData.lang,
      metaTitle: getData.title,
      metaDesc: getData.topic,
      metaImage: getData.image,
      metaKeywords: getData.keywords,
      metaTags: getData.tag,
      metaTopic: getData.topic,
      metaAuthor: getData.writter,
      metaUri: title,
      getData: getData

    }
  }

}
function BlogDetails({
  metaAuthor,
  metaDesc,
  metaImage,
  metaKeywords,
  metaTags,
  metaTitle,
  metaTopic,
  metaUri
  ,getData
}) {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const {title} = router.query
  const [blogData, setBlogData] = useState(getData);
  const [relatedProperties, setRelatedProperties] = useState([]);
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
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/blog/title/${title}`);
        setBlogData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (title) {
      fetchBlogDetails();
    }
  }, [title]);
  useEffect(() => {
    const fetchRelatedProperties = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/blog/relatedProperties/${blogData._id}`
        );
        const relatedProperties = response.data;
        setRelatedProperties(relatedProperties);
      } catch (error) {
        console.error("Error fetching related properties:", error);
      }
    };
    if(blogData) fetchRelatedProperties()

  },[blogData])

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": WEBSITE_BASE_URL,
    mainEntity: {
      "@id": "mainEntity",
    },
  };
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "House Point Egypt - Real Estate",
    url: WEBSITE_BASE_URL,
    logo: WEBSITE_BASE_URL + "/_next/image?url=%2Fimages%2FHPlogo.png&w=256&q=75",
  };
  
  return (
    <>
      <Head>
        <title>{`${metaTitle && "articles | " + metaTitle.slice(0,10)}`}</title>
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href={WEBSITE_BASE_URL + "/articles"}
          key="canonical"
        />
        <meta name="description" content={metaDesc + ' | ' + metaTitle} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDesc + ' | ' + metaTitle} />
        <meta
          property="og:image"
          content={
            BLOG_IMAGE_BASE_URL+metaImage
          }
        />
        <meta
          property="og:image:alt"
          content="House Point Egypt - Real Estate | Logo"
        />
        <meta
          property="og:image:secure_url"
          content={
            BLOG_IMAGE_BASE_URL+metaImage
          }
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={WEBSITE_BASE_URL + '/articles'} />
        <link rel="alternate" hrefLang="en" href={WEBSITE_BASE_URL + `/`} />
        <link rel="alternate" hrefLang="x-default" href={WEBSITE_BASE_URL} />
        <link rel="alternate" hrefLang="ar" href={WEBSITE_BASE_URL + `/ar`} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@HousePointE" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:creator" content="@HousePointE" />
        <meta name="twitter:domain" content={WEBSITE_BASE_URL} />
        <meta name="twitter:description" content={metaTopic} />
        <meta name='author' content={metaAuthor} />
        <meta name='keywords' content={metaKeywords} />
        <meta
          name="twitter:image"
          content={
            BLOG_IMAGE_BASE_URL+metaImage
          }
        />
        <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
            />
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous"></link>

        <meta name="robots" content="index, follow" />
      </Head>
      { blogData &&
      <div dir={isArabic ? "rtl" : "ltr"}>
        <Navbar />
        <QR />
        <div className="w-full px-6">
          <div>
            <div className="my-2 text-xl uppercase lg:text-3xl font-heading" style={{fontWeight:'bolder',letterSpacing:'1px'}}>
              {blogData.title}
            </div>
          </div>
          <hr />

          <div className="mt-8">
            <div className="flex flex-col lg:flex-row gap-4 mt-12 lg:px-0">
              {relatedProperties.length > 0 ? (
                <div className="w-full lg:w-4/5 lg:ltr:border-r lg:rtl:border-l border-gray-300 px-0 ltr:lg:pr-6 rtl:lg:pl-6">
                  <div
                    className={`${styles.blogText} mb-4 text-justify text-gray-500 `}
                    dangerouslySetInnerHTML={{
                      __html: blogData.blogText,
                    }}
                  />
                  <div className="pb-8">
                    <h4 className="text-xl uppercase font-heading">
                      {t("pages.blog.share") + " :"}
                    </h4>
                    <div className="mt-5">
                      <div className="flex space-x-6 md:order-2">
                        <a
                          href="#"
                          className="text-gray-400 hover:text-gray-300 rtl:pl-6"
                          data-ur1313m3t="true"
                        >
                          <span className="sr-only">Facebook</span>
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </a>
                        <a
                          href="#"
                          className="text-gray-400 hover:text-gray-300"
                          data-ur1313m3t="true"
                        >
                          <span className="sr-only">Instagram</span>
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.023.06 1.377.06 3.808s-.013 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.903 4.903 0 01-1.153 1.772 4.903 4.903 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.023.048-1.377.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.904 4.904 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427C2.013 14.1 2 13.746 2 11.316s.013-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.904 4.904 0 011.153-1.772A4.904 4.904 0 015.11 2.72C5.747 2.472 6.474 2.303 7.537 2.255 8.561 2.208 8.915 2.195 12.315 2zm0 2c-3.33 0-3.536.01-4.822.059-1.074.048-1.615.203-2.01.358-.463.184-.864.485-1.347 1.048a3.9 3.9 0 01-.906 1.39c-.568.482-.868.883-1.052 1.346-.154.396-.31.937-.358 2.011-.049 1.286-.059 1.492-.059 4.822s.01 3.536.059 4.822c.048 1.074.203 1.615.358 2.01.184.463.485.864 1.048 1.347a3.898 3.898 0 011.39.906c.482.568.883.868 1.346 1.052.396.154.937.31 2.011.358 1.286.049 1.492.059 4.822.059s3.536-.01 4.822-.059c1.074-.048 1.615-.203 2.01-.358.463-.184.864-.485 1.347-1.048a3.898 3.898 0 01.906-1.39c.568-.482.868-.883 1.052-1.346.154-.396.31-.937.358-2.011.049-1.286.059-1.492.059-4.822s-.01-3.536-.059-4.822c-.048-1.074-.203-1.615-.358-2.01a3.898 3.898 0 01-1.347-1.347 3.898 3.898 0 01-.906-1.39c-.184-.463-.485-.864-1.048-1.347a3.9 3.9 0 01-1.39-.906c-.482-.568-.883-.868-1.346-1.052-.396-.154-.937-.31-2.011-.358C15.851 4.01 15.645 4 12.315 4zm0 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z"
                              clipRule="evenodd"
                            ></path>
                            <circle
                              cx="12"
                              cy="12"
                              r="3"
                              stroke="currentColor"
                              strokeWidth="2"
                            ></circle>
                          </svg>
                        </a>
                        <a
                          href="#"
                          className="text-gray-400 hover:text-gray-300 pt-1"
                          data-ur1313m3t="true"
                        >
                          <span className="sr-only">Twitter</span>
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M24 4.553c-.885.39-1.835.653-2.831.772 1.016-.609 1.795-1.574 2.162-2.722-.951.564-2.005.974-3.128 1.194-.896-.957-2.174-1.555-3.588-1.555-2.715 0-4.92 2.205-4.92 4.92 0 .386.044.76.128 1.122C7.453 7.333 4.067 5.871 1.66 3.292.312 5.63.94 8.29 3.01 9.576c-.557-.018-1.08-.17-1.538-.425v.043c0 1.847 1.316 3.391 3.062 3.742-.32.087-.657.134-1.002.134-.245 0-.483-.023-.715-.068.483 1.516 1.879 2.62 3.536 2.652-1.296 1.014-2.925 1.62-4.696 1.62-.305 0-.605-.018-.903-.053C1.68 18.113 3.74 19 6.045 19c7.254 0 11.236-6.242 11.236-11.647 0-.18-.004-.36-.012-.54.767-.555 1.44-1.25 1.969-2.04l.001-.001z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full">
                  <div
                    className={`${styles.blogText} mb-4 text-gray-500 `}
                    dangerouslySetInnerHTML={{
                      __html: blogData.blogText,
                    }}
                  />
                  <div className="pb-8">
                    <h4 className="text-xl uppercase font-heading">
                      {t("pages.blog.share") + " :"}
                    </h4>
                    <div className="mt-5">
                      <div className="flex space-x-6 md:order-2">
                        <a
                          href="#"
                          className="text-gray-400 hover:text-gray-300 rtl:pl-6"
                          data-ur1313m3t="true"
                        >
                          <span className="sr-only">Facebook</span>
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </a>
                        <a
                          href="#"
                          className="text-gray-400 hover:text-gray-300"
                          data-ur1313m3t="true"
                        >
                          <span className="sr-only">Instagram</span>
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.023.06 1.377.06 3.808s-.013 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.903 4.903 0 01-1.153 1.772 4.903 4.903 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.023.048-1.377.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.904 4.904 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427C2.013 14.1 2 13.746 2 11.316s.013-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.904 4.904 0 011.153-1.772A4.904 4.904 0 015.11 2.72C5.747 2.472 6.474 2.303 7.537 2.255 8.561 2.208 8.915 2.195 12.315 2zm0 2c-3.33 0-3.536.01-4.822.059-1.074.048-1.615.203-2.01.358-.463.184-.864.485-1.347 1.048a3.9 3.9 0 01-.906 1.39c-.568.482-.868.883-1.052 1.346-.154.396-.31.937-.358 2.011-.049 1.286-.059 1.492-.059 4.822s.01 3.536.059 4.822c.048 1.074.203 1.615.358 2.01.184.463.485.864 1.048 1.347a3.898 3.898 0 011.39.906c.482.568.883.868 1.346 1.052.396.154.937.31 2.011.358 1.286.049 1.492.059 4.822.059s3.536-.01 4.822-.059c1.074-.048 1.615-.203 2.01-.358.463-.184.864-.485 1.347-1.048a3.898 3.898 0 01.906-1.39c.568-.482.868-.883 1.052-1.346.154-.396.31-.937.358-2.011.049-1.286.059-1.492.059-4.822s-.01-3.536-.059-4.822c-.048-1.074-.203-1.615-.358-2.01a3.898 3.898 0 01-1.347-1.347 3.898 3.898 0 01-.906-1.39c-.184-.463-.485-.864-1.048-1.347a3.9 3.9 0 01-1.39-.906c-.482-.568-.883-.868-1.346-1.052-.396-.154-.937-.31-2.011-.358C15.851 4.01 15.645 4 12.315 4zm0 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z"
                              clipRule="evenodd"
                            ></path>
                            <circle
                              cx="12"
                              cy="12"
                              r="3"
                              stroke="currentColor"
                              strokeWidth="2"
                            ></circle>
                          </svg>
                        </a>
                        <a
                          href="#"
                          className="text-gray-400 hover:text-gray-300 pt-1"
                          data-ur1313m3t="true"
                        >
                          <span className="sr-only">Twitter</span>
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M24 4.553c-.885.39-1.835.653-2.831.772 1.016-.609 1.795-1.574 2.162-2.722-.951.564-2.005.974-3.128 1.194-.896-.957-2.174-1.555-3.588-1.555-2.715 0-4.92 2.205-4.92 4.92 0 .386.044.76.128 1.122C7.453 7.333 4.067 5.871 1.66 3.292.312 5.63.94 8.29 3.01 9.576c-.557-.018-1.08-.17-1.538-.425v.043c0 1.847 1.316 3.391 3.062 3.742-.32.087-.657.134-1.002.134-.245 0-.483-.023-.715-.068.483 1.516 1.879 2.62 3.536 2.652-1.296 1.014-2.925 1.62-4.696 1.62-.305 0-.605-.018-.903-.053C1.68 18.113 3.74 19 6.045 19c7.254 0 11.236-6.242 11.236-11.647 0-.18-.004-.36-.012-.54.767-.555 1.44-1.25 1.969-2.04l.001-.001z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {relatedProperties.length > 0 && (
                <div className="w-full lg:w-2/5 px-2 mx-auto mb-10">
                  <h2 className="w-full text-2xl mb-6 font-semibold leading-10 text-center uppercase font-heading">
                    {t("pages.blog.related_properties")}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
                    {relatedProperties.map((property) => {
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
                        propertyLink =
                          propertyLink + "/" + property.area.nameAr;
                        propertyLink =
                          propertyLink + "/" + property.subarea.nameAr;
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
                          propertyLink +
                          "/" +
                          property.subarea.name.toLowerCase();
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
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
      }
    </>
  );
}

export default BlogDetails;
