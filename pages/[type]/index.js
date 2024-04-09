import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Searchbar from '@/components/Search/Searchbar';
import FilteredProperties from '@/components/FilteredProperties';
import BreadCrumbs from '@/components/BreadCrumbs';
import axios from 'axios';
import { API_BASE_URL, WEBSITE_BASE_URL } from '@/config';
import Head from 'next/head';
import i18n from '@/i18n';
import QR from '@/components/Home/QR';

export async function getServerSideProps(context) {
  const { type, propertyType, location, subArea, page } = context.query;
  const { locale } = context;

  let link = `/`;
  if (locale == 'ar') link += `ar/`;
  if (type) link = link + type;
  const response = await axios.post(`${API_BASE_URL}/utils/getmeta`, { link });

  let queryParams = [`page=${page}`];
  if (type) {
    queryParams.push(`type=${encodeURIComponent(type)}`);
  }
  const countProperties = await axios.get(
    API_BASE_URL + `/property/count?${queryParams.join('&')}`
  );

  i18n.changeLanguage(locale);
  const fetchSocialLinks = await axios.get(`${API_BASE_URL}/social-media`);

  const changeLangResponse = await axios.post(
    `${API_BASE_URL}/utils/changelang`,
    context.query,
    {
      headers: {
        'accept-language': locale === 'en' ? 'ar' : 'en',
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
      tag,
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
  const url = `${API_BASE_URL}/property/getproperties?${queryParams.join('&')}`;

  const responseProperties = await axios.get(url);
  const filteredProperties = responseProperties.data.properties;

  return {
    props: {
      meta: response.data.meta,
      count: countProperties.data.count,
      initialLocale: locale,
      changeLang: changeLangResponse.data.url,
      isArabic: locale == 'ar' ? true : false,
      properties: filteredProperties,
      socialLinks: fetchSocialLinks.data,
      metaProperties: responseProperties.data.meta,
      link,
    },
  };
}

const TypePage = ({
  meta,
  count,
  initialLocale,
  changeLang,
  isArabic,
  properties,
  metaProperties,
  link,
  socialLinks,
}) => {
  const [titles, setTitles] = useState([]);
  const router = useRouter();
  const { type, propertyType, location, subArea, tag } = router.query;
  const { t, i18n: ii18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(initialLocale);
  }, []);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/title/single?link=${link}`, {
        headers: {
          'accept-language': isArabic ? 'ar' : 'en',
        },
      })
      .then((res) => {
        setTitles(res.data.pageTitle);
      });
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

  const titleEN = `${
    propertyType && propertyType !== 'properties'
      ? t(
          propertyType.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          })
        )
      : 'Property Types'
  } ${
    type && type !== 'for-rent-or-sale'
      ? ' For ' +
        type.replace(/\w\S*/g, function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        })
      : ''
  }
    ${
      location && location !== 'location'
        ? ' In ' +
          location.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          })
        : ''
    }
    ${
      subArea
        ? ' , ' +
          subArea.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          })
        : ''
    } In Cairo, Egypt`;
  const titleAR = `${t(
    propertyType && propertyType !== 'عقارات'
      ? propertyType.replace(/\w\S*/g, function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        })
      : 'عقارات'
  )}
    ${
      type && type !== 'للإيجار أو البيع'
        ? ' لل' +
          type.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          })
        : ''
    }
      ${
        location && location !== 'منطقة'
          ? ' في ' +
            location.replace(/\w\S*/g, function (txt) {
              return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            })
          : ''
      }
      ${
        subArea
          ? ' في ' +
            subArea.replace(/\w\S*/g, function (txt) {
              return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            })
          : ''
      } في القاهرة و مصر`;
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
    '@id': 'HousePointEgyptOrganization',
    name: 'House Point Egypt - Real Estate',
    url: WEBSITE_BASE_URL + `/${type}`,
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
      contactType: 'customer service',
      telephone: '+201221409530',
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
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': '@mainEntity',
    url: WEBSITE_BASE_URL + `/${type}`,
    itemListElement: properties.map((property, index) => {
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
  const propertySchema = properties.map((property, index) => {
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
      {
        <>
          <Head>
            <title>
              {count +
                ' ' +
                `${
                  meta
                    ? meta.title
                    : isArabic
                    ? titleAR.slice(0, 60)
                    : titleEN.slice(0, 60)
                }`}
            </title>
            <meta name='robots' content='index, follow' />
            <meta
              name='description'
              content={
                count +
                ' ' +
                `${
                  meta
                    ? meta.description.slice(0, 160)
                    : isArabic
                    ? titleAR
                    : titleEN
                }`
              }
            />
            <meta name='keywords' content={meta ? meta.keywords : ''} />
            <link
              rel='sitemap'
              type='application/xml'
              href={WEBSITE_BASE_URL + '/sitemap.xml'}
            />
            <link
              rel='canonical'
              href={WEBSITE_BASE_URL + `${isArabic ? '/ar/' : '/'}${type}`}
              key='canonical'
              title='House Point Egypt - Real Estate'
            />
            <link
              rel='alternate'
              hreflang='ar'
              href={WEBSITE_BASE_URL + `/ar/${type}`}
              title='House Point Egypt - Real Estate'
            />
            <link
              rel='alternate'
              hreflang='x-default'
              href={WEBSITE_BASE_URL + `/${type}`}
              title='House Point Egypt - Real Estate'
            />
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
            <meta property='og:title' content={isArabic ? titleAR : titleEN} />
            <meta
              property='og:description'
              content={isArabic ? titleAR : titleEN}
            />
            <meta
              property='og:image'
              content={WEBSITE_BASE_URL + '/images/logohouse.png'}
            />
            <meta
              property='og:site_name'
              content='House Point Egypt - Real Estate'
            />

            <meta
              property='og:image:alt'
              content='House Point Egypt - Real Estate | Logo
'
            />
            <meta
              property='og:image:secure_url'
              content={WEBSITE_BASE_URL + '/images/logohouse.png'}
            />
            <meta property='og:type' content='website' />
            <meta
              property='og:url'
              content={WEBSITE_BASE_URL + `${isArabic ? '/ar/' : '/'}${type}`}
            />
            <meta name='twitter:card' content='summary' />
            <meta name='twitter:site' content='@HousePointE' />
            <meta name='twitter:title' content={isArabic ? titleAR : titleEN} />
            <meta name='twitter:creator' content='@HousePointE' />
            <meta name='twitter:domain' content={WEBSITE_BASE_URL} />
            <meta
              name='twitter:description'
              content={isArabic ? titleAR : titleEN}
            />
            <meta
              name='twitter:image'
              content={
                WEBSITE_BASE_URL +
                '/_next/image?url=%2Fimages%2Flogo.png&w=256&q=75'
              }
            />

            <meta name='robots' content='index, follow' />
          </Head>
        </>
      }
      {showModal && (
        <div className='relative'>
          <Navbar url={changeLang} />
          <QR />
          <div className='flex flex-col items-center w-full h-full p-4 font-sans text-black bg-white bg-center bg-cover'>
            <BreadCrumbs type={type} home={'Home'} unTitle={'Properties'} />
            <Searchbar showModal={showModal} setShowModal={setShowModal} />
          </div>

          <FilteredProperties
            properties={properties}
            title={
              i18n.language === 'en' ? titles[0]?.title : titles[0]?.titleAr
            }
            meta={metaProperties}
          />
          <div
            className='hidden p-4 bg-slate-200 rounded-xl w-[96%] m-auto'
            dangerouslySetInnerHTML={{ __html: meta?.article }}
          />
          <div className='mt-16'>
            <Footer />
          </div>
        </div>
      )}
      {showModal && (
        <Searchbar showModal={showModal} setShowModal={setShowModal} />
      )}
    </>
  );
};

export default TypePage;
