import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import SideSectionBlog from "@/components/SideSectionBlog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { API_BASE_URL, BLOG_IMAGE_BASE_URL } from "@/config";
import QR from "@/components/Home/QR";
import Head from "next/head";
import { WEBSITE_BASE_URL } from "@/config";
import i18n from "@/i18n";
import Article from "@/components/Blog/Article";
import blogStyle from '@/styles/BlogIndex.module.css';
import PaginationSlide from "@/components/Pagination";


export async function getServerSideProps(context) {
  let link = `/articles`;
  const { locale } = context;
  if (locale == "ar") link = "/ar" + link;
  const response = await axios.post(`${API_BASE_URL}/utils/getmeta`, { link });
  const changeLangResponse = await axios.post(
    `${API_BASE_URL}/utils/changelang`,
    context.query,
    {
      headers: {
        "accept-language": locale === "en" ? "ar" : "en",
      },
    }
  );

  const fetchTitles = await axios.get(
    `${API_BASE_URL}/title/single?link=${link}`,
    {
      headers: {
        "accept-language": locale === "en" ? "en" : "ar",
      },
    }
  );

  const countPosts = await fetch(`${API_BASE_URL}/blog/count`, {
    headers: {
      "accept-langunage": locale === "ar" ? "ar" : "en"
    },
  }).then((res) => {
    return res.json();
  }).then((data) => {
    let arr = [];
    for (let i = 1; i <= Math.ceil(data.count / 9); i++) {
      arr.push(i);
    }
    return arr;
  });

  i18n.changeLanguage(locale);

  return {
    props: {
      meta: response.data.meta,
      initialLocale: locale,
      titles: fetchTitles.data.pageTitle,
      changeLang: changeLangResponse.data.url,
      isArabic: locale == "ar" ? true : false,
      pages: countPosts,
    },
  };
}

function Index(props) {
  const router = useRouter();
  let page = router.query.page && router.query.page > 0 ? Number(router.query.page) : 1;
  const { t, i18n } = useTranslation();
  const [blogPosts, setBlogPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(page);
  const { meta, initialLocale, changeLang, isArabic, titles, pages } = props;
  const locale = initialLocale || router.locale;




  useEffect(() => {
    // Fetch blog post data from the API
    fetch(`${API_BASE_URL}/blog/?page=${currentPage}&limit=9`, {
      headers: {
        "accept-language": locale,
      }
    }).then((res) => {
      return res.json();
    }).then((data) => {
      setBlogPosts(data);
    });
  }, [currentPage]);




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
        <title>{`${meta.title}`} </title>
        <meta name="robots" content="noindex, nofollow" />
        <link
          rel="canonical"
          href={WEBSITE_BASE_URL + isArabic ? '/ar/reads' : "/reads"}
          key="canonical"
        />
        <meta name='keywords' content={meta?.keywords} />
        <meta name="description" content={meta && meta.description} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <meta property="og:title" content={meta && meta.title} />
        <meta property="og:description" content={meta && meta.description} />
        <meta
          property="og:image"
          content={
            WEBSITE_BASE_URL +
            "/_next/image?url=%2Fimages%2FHPlogo.png&w=256&q=75"
          }
        />
        <meta
          property="og:image:alt"
          content="House Point Egypt - Real Estate | Logo"
        />
        <meta
          property="og:image:secure_url"
          content={
            WEBSITE_BASE_URL +
            "/_next/image?url=%2Fimages%2FHPlogo.png&w=256&q=75"
          }
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={WEBSITE_BASE_URL} />
        <link rel="alternate" hrefLang="en" href={WEBSITE_BASE_URL + `/`} />
        <link rel="alternate" hrefLang="x-default" href={WEBSITE_BASE_URL} />
        <link rel="alternate" hrefLang="ar" href={WEBSITE_BASE_URL + `/ar`} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@HousePointE" />
        <meta name="twitter:title" content={meta && meta.title} />
        <meta name="twitter:creator" content="@HousePointE" />
        <meta name="twitter:domain" content={WEBSITE_BASE_URL} />
        <meta name="twitter:description" content={meta && meta.description} />
        <meta
          name="twitter:image"
          content={
            WEBSITE_BASE_URL +
            "/_next/image?url=%2Fimages%2FHPlogo.png&w=256&q=75"
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

        <meta name="robots" content="index, follow" />
      </Head>
      <div
        className="flex flex-col min-h-screen"
        dir={isArabic ? "rtl" : "ltr"}
      >
        <Navbar />
        <QR />
        <div className="w-full h-full bg-cover bg-center py-4 text-black flex flex-col items-center font-sans flex-1">
          <div className="w-full px-6 flex flex-col lg:flex-row flex-1">
            <div className="flex-1">
              {titles?.length > 0 && (
                <>
                  <h1 className="ltr:text-left rtl:text-right order-1 mb-4 font-sans text-lg font-semibold sm:text-xl md:text-2xl lg:text-4xl border-b border-gray-300 pb-4">
                    {isArabic ? titles[0]?.titleAr : titles[0]?.title}
                  </h1>
                  <p className="ltr:text-left rtl:text-right order-1 mb-8 font-sans text-lg">
                    {isArabic ? titles[1]?.titleAr : titles[1]?.title}
                  </p>
                </>
              )}
              <div className={blogStyle.container}>
                {blogPosts && blogPosts.map((post, index) => (
                  <Article key={index} post={post} isArabic={isArabic} />
                ))}
              </div>
            </div>

            {blogPosts.length > 0 && (
              <div className="w-full lg:w-1/4 p-4 mt-10 lg:mt-0 bg-gray-200">
                {/* Left-side section */}
                {/* Add your content here */}
                <SideSectionBlog />
              </div>
            )}
          </div>
        </div>
        {
          pages && page && <PaginationSlide currentPage={currentPage} setCurrentPage={setCurrentPage} pages={pages} page={page} />
        }
        <div className="mt-auto">

          <Footer />
        </div>
      </div>
    </>
  );
}

export default Index;

