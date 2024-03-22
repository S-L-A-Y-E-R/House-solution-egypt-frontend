import QR from "@/components/Home/QR";
import Navbar from "@/components/Navbar";
import Searchbar from "@/components/Search/Searchbar";
import LatestBlogs from "@/components/LatestBlogs";
import TopFooterLinks from "@/components/TopFooterLinks";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";
import PrimeLocations from "@/components/PrimeLocations";
import PropertySection from "@/components/Home/PropertySection";
import axios from "axios";
import { API_BASE_URL, WEBSITE_BASE_URL } from "@/config";
import Head from "next/head";
import { useEffect } from "react";
import i18n from "@/i18n";
export async function getServerSideProps(context) {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  let link = `/`;
  const { locale } = context;

  if (locale == "ar") link += `ar`;
  const response = await axios.post(`${API_BASE_URL}/utils/getmeta`, { link });
  

  const fetchSale = await axios.get(
    `${API_BASE_URL}/property/getproperties?type=sale`
  );
  const fetchRent = await axios.get(
    `${API_BASE_URL}/property/getproperties?type=rent`
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
      saleProperties: fetchSale.data.properties,
      rentProperties: fetchRent.data.properties,
      titles: fetchTitles.data.pageTitle,
      initialLocale: locale,
    },
  };
}

export default function Home({
  meta,
  saleProperties,
  rentProperties,
  titles,
  initialLocale,
}) {
  const { t, i18n: ii18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(initialLocale);
    
  }, []);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": WEBSITE_BASE_URL,
    name: meta.title,
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
      {meta && (
        <>
          <Head>
            <title>{meta?.title.slice(0, 60)}</title>
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href={WEBSITE_BASE_URL} key="canonical" />
            <meta name="description" content={meta.description} />
            <meta name="keywords" content={meta ? meta.keywords : ""} />

            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
            />

            <meta property="og:title" content={meta.title} />
            <meta property="og:description" content={meta.description} />
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
            <meta property="og:site_name" content="house point egypt real estate" />

            <meta property="og:url" content={WEBSITE_BASE_URL} />
            <link rel="alternate" hrefLang="en" href={WEBSITE_BASE_URL + `/`} />
            <link
              rel="alternate"
              hrefLang="x-default"
              href={WEBSITE_BASE_URL}
            />
            <link
              rel="alternate"
              hrefLang="ar"
              href={WEBSITE_BASE_URL + `/ar`}
            />

            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="@HousePointE" />
            <meta name="twitter:title" content={meta.title} />
            <meta name="twitter:creator" content="@HousePointE" />
            <meta name="twitter:domain" content={WEBSITE_BASE_URL} />
            <meta name="twitter:description" content={meta.description} />
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
      )}
      <Navbar />
      <QR />
      <div
        className={
          "relative flex flex-col items-center justify-center h-fit p-2 md:py-8 text-black md:min-h-fit from-secondary-color to-custom-blue-light bg-gradient-to-r bg-custom-blue md:h-auto "
        }
      >
        {/* <Image src="/images/bghome.jpg" layout="fill" objectFit="cover" className="hidden opacity-60 md:block" alt="HomeBG" /> */}

        <div className="flex flex-col items-center justify-center w-full h-full">
          <h1 className="text-4xl font-bold leading-none tracking-tight text-center md:text-5xl lg:text-6xl text-white z-[1]">
            {/* {t("pages.home.title")} */}
            {i18n.language === "en" ? titles[0]?.title : titles[0]?.titleAr}
          </h1>
          <div className="relative w-full px-4 mt-4">
            <Searchbar />
          </div>
        </div>
      </div>
      <div className="w-full bg-white">
        {/* <PropertySection type="rent" />
        <PropertySection type="sale" /> */}
        <PropertySection
          data={rentProperties}
          title={i18n.language === "en" ? titles[1]?.title : titles[1]?.titleAr}
          type="rent"
        />
        <PropertySection
          data={saleProperties}
          title={i18n.language === "en" ? titles[2]?.title : titles[2]?.titleAr}
          type="sale"
        />
        <div className="hidden p-4 bg-slate-200 rounded-xl w-[96%] m-auto" dangerouslySetInnerHTML={{__html:meta.article }}/>
        <LatestBlogs />
        <TopFooterLinks />
        <PrimeLocations />
        
        <div className="mt-32">
          <Footer />
        </div>
      </div>
    </>
  );
}
