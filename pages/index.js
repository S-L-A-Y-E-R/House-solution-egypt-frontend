import QR from '@/components/Home/QR';
import Navbar from '@/components/Navbar';
import Searchbar from '@/components/Search/Searchbar';
import LatestBlogs from '@/components/LatestBlogs';
import TopFooterLinks from '@/components/TopFooterLinks';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import PrimeLocations from '@/components/PrimeLocations';
import PropertySection from '@/components/Home/PropertySection';
import axios, { all } from 'axios';
import { API_BASE_URL, WEBSITE_BASE_URL, PROPERTY_BASE_URL } from '@/config';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import i18n from '@/i18n';

export async function getServerSideProps(context) {
  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );
  let link = `/`;
  const { locale } = context;

  if (locale == 'ar') link += `ar`;
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
        'accept-language': locale === 'en' ? 'en' : 'ar',
      },
    }
  );
  const fetchSocialLinks = await axios.get(`${API_BASE_URL}/social-media`);
  i18n.changeLanguage(locale);

  return {
    props: {
      meta: response.data.meta,
      saleProperties: fetchSale.data.properties,
      rentProperties: fetchRent.data.properties,
      titles: fetchTitles.data.pageTitle,
      initialLocale: locale,
      socialLinks: fetchSocialLinks.data,
    },
  };
}

export default function Home({
  meta,
  saleProperties,
  rentProperties,
  titles,
  initialLocale,
  socialLinks,
}) {
  const { t, i18n: ii18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(initialLocale);
  }, []);

  // const [socialLinks, setSocialLinks] = useState([]);

  // useEffect(() => {
  //   const fetchSocialLinks = async () => {
  //     try {
  //       const { data } = await axios.get(`${API_BASE_URL}/social-media`);
  //       setSocialLinks(data);
  //     } catch (error) {
  //       console.error('Error fetching social links:', error);
  //     }
  //   };

  //   fetchSocialLinks();
  // }, []);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'housepointegypt.com',
    name: 'House Point Egypt - Real Estate',
    mainEntity: {
      '@id': 'mainEntity',
    },
  };
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'House Point Egypt - Real Estate',
    '@id': 'HousePointEgyptOrganization',
    url: WEBSITE_BASE_URL,
    logo: WEBSITE_BASE_URL + '/images/HPlogo.png',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Maadi',
      addressRegion: 'Cairo',
      postalCode: '11728',
      streetAddress:
        ' 22 Road 9 , Maadi AI Khabiri Ash sharqeyah , Maadi , Egypt',
      addressCountry: 'Egypt',
    },
    email: '	mailto:info@housepointegypt.com',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+201221409530',
      contactType: 'customer service',
    },
    sameAs: [
      socialLinks.facebook,
      socialLinks.instagram,
      socialLinks.linkedin,
      socialLinks.twitter,
      socialLinks.youtube,
      socialLinks.telegram,
      socialLinks.tiktok,
    ],
  };
  const allProperties = [...saleProperties, ...rentProperties];
  // console.log(allProperties);
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': '@mainEntity',
    url: WEBSITE_BASE_URL,
    itemListElement: allProperties.map((property, index) => {
      return {
        '@context': 'https://schema.org',
        '@type': `${property.propertyType.name.slice(0, -1)}`,
        '@id': `ReferenceNumber:${property.refNumber}`,
        name: `${property.title}`,
        image: PROPERTY_BASE_URL + 'original/' + property.mainimage.image,
        url:
          WEBSITE_BASE_URL +
          `/${property.propertyType.name.toLowerCase()}/${property.area.name.toLowerCase()}/${property.subarea.name.toLowerCase()}/${property.title.toLowerCase()}-${
            property.refNumber
          }`,
        tourBookingPage:
          WEBSITE_BASE_URL +
          `/${property.propertyType.name.toLowerCase()}/${property.area.name.toLowerCase()}/${property.subarea.name.toLowerCase()}/${property.title.toLowerCase()}-${
            property.refNumber
          }`,
        address: `${property.subarea.name}, ${property.area.name}, EG`,
        telephone: '+201221409530',
        floorSize: 'QuantitativeValue',
        floorSize: 'sqm',
      };
    }),
  };
  const propertySchema = allProperties.map((property, index) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      '@id': `ReferenceNumber:#${property.refNumber}`,
      sku: `${property.refNumber}`,
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        price: `${property.price}`,
        priceCurrency: 'EGP',
        '@id': 'HousePointEgyptOrganization',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5',
      },
    };
  });
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {meta && (
        <>
          <Head>
            <title>{meta?.title.slice(0, 60)}</title>
            <meta name='robots' content='index, follow' />
            <link
              rel='canonical'
              href={WEBSITE_BASE_URL}
              key='canonical'
              title='House Point Egypt - Real Estate | Home'
            />
            <meta name='description' content={meta.description.slice(0, 160)} />
            <meta name='keywords' content={meta ? meta.keywords : ''} />
            <script
              type='application/ld+json'
              dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            <script
              type='application/ld+json'
              dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
            />
            <script
              type='application/ld+json'
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(propertySchema),
              }}
            />
            <script
              type='application/ld+json'
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(itemListSchema),
              }}
            />
            <meta property='og:title' content={meta.title} />
            <meta
              property='og:description'
              content={meta.description.slice(0, 160)}
            />
            <meta
              property='og:image'
              content={WEBSITE_BASE_URL + '/images/HPlogo.png'}
            />
            <meta
              property='og:image:alt'
              content='House Point Egypt - Real Estate | Logo
'
            />
            <meta
              property='og:image:secure_url'
              content={WEBSITE_BASE_URL + '/images/HPlogo.png'}
            />
            <meta property='og:type' content='website' />
            <meta
              property='og:site_name'
              content='House Point Egypt - Real Estate'
            />
            <meta property='og:url' content={WEBSITE_BASE_URL} />
            <link
              rel='sitemap'
              type='application/xml'
              href={WEBSITE_BASE_URL + '/sitemap.xml'}
            />
            <link
              rel='alternate'
              hrefLang='x-default'
              href={WEBSITE_BASE_URL + `/`}
              title='House Point Egypt - Real Estate | Home'
            />
            <link
              rel='alternate'
              hrefLang='ar'
              href={WEBSITE_BASE_URL + `/ar/`}
              title='House Point Egypt - Real Estate | الصفحة الرئيسية'
            />
            <meta name='twitter:card' content='summary' />
            <meta name='twitter:site' content='@HousePointE' />
            <meta name='twitter:title' content={meta.title} />
            <meta name='twitter:creator' content='@HousePointE' />
            <meta name='twitter:domain' content={WEBSITE_BASE_URL} />
            <meta name='twitter:description' content={meta.description} />
            <meta
              name='twitter:image'
              content={WEBSITE_BASE_URL + '/images/HPlogo.png'}
            />
            <meta name='robots' content='index, follow' />
          </Head>
        </>
      )}
      {!showModal && (
        <>
          <Navbar />
          <QR />
          <div
            className={
              'relative flex flex-col items-center justify-center h-fit p-2 md:py-8 text-black md:min-h-fit from-secondary-color to-custom-blue-light bg-gradient-to-r bg-custom-blue md:h-auto '
            }
          >
            {/* <Image src="/images/bghome.jpg" layout="fill" objectFit="cover" className="hidden opacity-60 md:block" alt="HomeBG" /> */}

            <div className='flex flex-col items-center justify-center w-full h-full'>
              <h1 className='text-4xl font-bold leading-none tracking-tight text-center md:text-5xl lg:text-6xl text-white z-[1]'>
                {/* {t("pages.home.title")} */}
                {i18n.language === 'en' ? titles[0]?.title : titles[0]?.titleAr}
              </h1>
              <div className='relative w-full px-4 mt-4'>
                <Searchbar showModal={showModal} setShowModal={setShowModal} />
              </div>
            </div>
          </div>
          <div className='w-full bg-white'>
            {/* <PropertySection type="rent" />
        <PropertySection type="sale" /> */}
            <PropertySection
              data={rentProperties}
              title={
                i18n.language === 'en' ? titles[1]?.title : titles[1]?.titleAr
              }
              type='rent'
            />

            <PropertySection
              data={saleProperties}
              title={
                i18n.language === 'en' ? titles[2]?.title : titles[2]?.titleAr
              }
              type='sale'
            />
            <div
              className='hidden p-4 bg-slate-200 rounded-xl w-[96%] m-auto'
              dangerouslySetInnerHTML={{ __html: meta?.article }}
            />
            <LatestBlogs />
            <TopFooterLinks />
            <PrimeLocations />

            <div className='mt-32'>
              <Footer />
            </div>
          </div>
        </>
      )}
      {showModal && (
        <Searchbar showModal={showModal} setShowModal={setShowModal} />
      )}
    </>
  );
}
