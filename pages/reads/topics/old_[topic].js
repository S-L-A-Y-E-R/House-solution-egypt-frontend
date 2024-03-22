import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import SideSectionBlog from "@/components/SideSectionBlog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { API_BASE_URL, BLOG_IMAGE_BASE_URL, WEBSITE_BASE_URL } from "@/config";
import QR from "@/components/Home/QR";
import Head from "next/head";
import i18n from "@/i18n";

export async function getServerSideProps(context) {
  const { locale, params } = context;
  let link = `/articles/topics/${params.topic}`;
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

  i18n.changeLanguage(locale);

  return {
    props: {
      meta: response.data.meta,
      initialLocale: locale,
      titles: fetchTitles.data.pageTitle,
      changeLang: changeLangResponse.data.url,
      isArabic: locale == "ar" ? true : false,
    },
  };
}

function Topic({ meta, initialLocale, changeLang, isArabic, titles }) {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { topic } = router.query;
  const [blogPosts, setBlogPosts] = useState([]);
  const locale = initialLocale || router.locale;

  useEffect(() => {
    // Fetch blog post data from the API
    axios
      .get(`${API_BASE_URL}/blog/topics/${topic.replaceAll('-', ' ')}`, {
        headers: {
          "accept-language": locale,
        },
      })
      .then((response) => {
        setBlogPosts(response.data);
      })
      .catch((error) => console.log(error));
  }, [topic]);

  if (!blogPosts) {
    return <div>Loading...</div>;
  }

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
    logo: WEBSITE_BASE_URL + "/_next/image?url=%2Fimages%2Flogo.png&w=256&q=75",
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

  return (
    <>
      <Head>
        <title>{topic && "Blogs | " + topic}</title>
        <meta name="robots" content="noindex, nofollow" />
        <link
          rel="canonical"
          href={WEBSITE_BASE_URL + "/contact"}
          key="canonical"
        />
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
            "/_next/image?url=%2Fimages%2Flogo.png&w=256&q=75"
          }
        />
        <meta
          property="og:image:alt"
          content="House Point Egypt - Real Estate | Logo
"
        />
        <meta
          property="og:image:secure_url"
          content={
            WEBSITE_BASE_URL +
            "/_next/image?url=%2Fimages%2Flogo.png&w=256&q=75"
          }
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={WEBSITE_BASE_URL} />
        <link rel="alternate" hreflang="en" href={WEBSITE_BASE_URL + `/`} />
        <link rel="alternate" hreflang="x-default" href={WEBSITE_BASE_URL} />
        <link rel="alternate" hreflang="ar" href={WEBSITE_BASE_URL + `/ar`} />

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
            "/_next/image?url=%2Fimages%2Flogo.png&w=256&q=75"
          }
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
              <div className="grid max-w-6xl gap-5 mx-auto md:grid-cols-2 lg:grid-cols-3">
                {blogPosts.map((post) => (
                  <div className="bg-gray-200 p-2 rounded" key={post._id}>
                    <Link href={`/articles/${post.title.replaceAll(' ', '-').replaceAll('?', '_qm')}`} data-ur1313m3t="true">
                      <div className="relative transition-all aspect-square hover:-translate-y-2 hover:shadow-2xl">
                        <Link href={`/articles/${post.title.replaceAll(' ', '-').replaceAll('?', '_qm')}`} data-ur1313m3t="true">
                          <div className="relative transition-all aspect-square hover:-translate-y-2 hover:shadow-2xl">
                            <span
                              style={{
                                boxSizing: "border-box",
                                display: "block",
                                overflow: "hidden",
                                width: "initial",
                                height: "initial",
                                background: "none",
                                opacity: 1,
                                border: "0px",
                                margin: "0px",
                                padding: "0px",
                                position: "absolute",
                                inset: "0px",
                              }}
                            >
                              <img
                                // sizes="500vw"
                                alt="image"
                                className="rounded"
                                src={BLOG_IMAGE_BASE_URL + post.image}
                                decoding="async"
                                data-nimg="fill"
                                height={0}
                                width={0}
                                style={{
                                  position: "absolute",
                                  inset: "0px",
                                  boxSizing: "border-box",
                                  padding: "0px",
                                  border: "none",
                                  margin: "auto",
                                  display: "block",
                                  minWidth: "100%",
                                  maxWidth: "100%",
                                  minHeight: "100%",
                                  maxHeight: "100%",
                                  objectFit: "fill",
                                }}
                              />
                              <noscript></noscript>
                            </span>
                          </div>
                        </Link>
                      </div>
                    </Link>
                    <div className="p-2">
                      <h2 className="mt-2 font-semibold">{post.title}</h2>

                      <div className="mt-1 flex justify-between text-xs font-semibold text-gray-600">
                        <a
                          href={`/articles/topics/${post.topic}`}
                          className="text-blue-600 underline text-sm font-semibold"
                        >
                          {post.topic}
                        </a>
                        <p>
                          {new Intl.DateTimeFormat("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }).format(new Date(post?.createdAt))}
                        </p>
                        {/* <p>{new Date(post?.createdAt).toDateString()}</p> */}
                      </div>

                      <div className="mt-1 flex justify-between text-xs font-semibold text-gray-600">
                        <div className="mt-1 flex gap-1 text-xs font-semibold text-gray-600">
                          <p>{t("pages.blog.writter")}</p>
                          <p>{post.writter}</p>
                        </div>

                        <div className="flex items-center gap-1">
                          <p>{post.readTime}</p>
                          <p>{t("pages.blog.min")}</p>
                        </div>
                      </div>

                      <Link href={`/articles/${post._id}`}>
                        <button className="mt-3 font-medium text-white rounded-full bg-[#095668] px-5 py-1">
                          <h3 className="inline-block text-sm font-medium text-white">
                            {t("pages.blog.read_more")}
                          </h3>
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-1/4 p-4 mt-10 lg:mt-0 bg-gray-200">
              {/* Left-side section */}
              {/* Add your content here */}
              <SideSectionBlog />
            </div>
          </div>
        </div>

        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Topic;
