import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import axios from 'axios';
import BreadCrumbs from '@/components/BreadCrumbs';
import ImageSlider from '@/components/PropertyPage/ImageSlider';
import PropertyDesc from '@/components/PropertyPage/PropertyDesc';
import { API_BASE_URL, PROPERTY_BASE_URL, WEBSITE_BASE_URL } from '@/config';
import moment from 'moment';
import ContactUs from '@/components/PropertyPage/ContactUs';
import Searchbar from '@/components/Search/Searchbar';
import RelatedProperties from '@/components/PropertyPage/RelatedProperties';
import i18n from '@/i18n';
import QR from '@/components/Home/QR';
import Head from 'next/head';

export async function getServerSideProps(context) {
  const { locale } = context;
  const { type, propertyType, location, title, subArea } = context.query;
  const titleSplit = title.split('-');
  const refNumber = titleSplit[titleSplit.length - 1];
  titleSplit.pop();
  const changeLangResponse = await axios.post(
    `${API_BASE_URL}/utils/changelang`,
    {
      type,
      propertyType,
      location,
      subArea,
      title: titleSplit.join('-'),
      refNumber,
    },
    {
      headers: {
        'accept-language': locale === 'en' ? 'ar' : 'en',
      },
    }
  );

  const response = await axios.get(
    `${API_BASE_URL}/property/${titleSplit.join(' ')}/${refNumber}`
  );
  const liveCurrency = await axios.get(API_BASE_URL + '/utils/getcurrency');
  let dateOfProp = moment(response.data.updatedAt.split('T')[0]);

  let dateOfPropAr = dateOfProp.clone().locale('ar-sa');
  dateOfProp = dateOfProp.format('DD MMMM YYYY');
  dateOfPropAr = dateOfPropAr.format('DD MMMM YYYY');

  i18n.changeLanguage(locale);

  return {
    props: {
      initialLocale: locale,
      changeLang: changeLangResponse.data.url,
      propertyDetails: response.data,
      liveCurrency: liveCurrency.data.currency,
      dateOfProp,
      dateOfPropAr,
      isArabic: locale == 'ar' ? true : false,
    },
  };
}

function PropertyDetails({
  initialLocale,
  changeLang,
  propertyDetails,
  liveCurrency,
  dateOfProp,
  dateOfPropAr,
  isArabic,
}) {
  // console.log(propertyDetails);
  // console.log(changeLang);
  const router = useRouter();
  const { asPath } = useRouter();
  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : '';
  const fullUrl = `${origin}${isArabic ? '/ar' : ''}${asPath}`;
  const { t, i18n: ii18n } = useTranslation();
  // const isArabic = i18n.language === 'ar';
  useEffect(() => {
    ii18n.changeLanguage(initialLocale);
  }, []);
  const { type, propertyType, location, title, subArea } = router.query;
  // console.log(propertyType);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': WEBSITE_BASE_URL,
    name: isArabic ? propertyDetails.titleAr : propertyDetails.titleEn,
    mainEntity: {
      '@id': 'mainEntity',
    },
  };
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'House Point Egypt - Real Estate',
    url: WEBSITE_BASE_URL,
    logo: WEBSITE_BASE_URL + '/_next/image?url=%2Fimages%2Flogo.png&w=256&q=75',
    sameAs: [
      'https://www.facebook.com/House-Point-Egypt-112529918222923',
      'https://www.instagram.com/housepointegypt/',
      'https://www.linkedin.com/in/housepointegyptrealestate',
      'https://twitter.com/Housep0integypt',
      'https://youtube.com/@HousepointEgypt?si=_fbbBMQSCYotsucU',
      'https://t.me/housepointegypt',
      'https://www.tiktok.com/@house.point.egypt?_t=8ipx657pyac&_r=1',
    ],
  };
  const realSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    '@id': 'HousePointEgyptOrganization',
  };
  const accSchema = {
    '@context': 'https://schema.org',
    '@type': 'Accommodation',
    '@id': 'mainEntity',
    name: isArabic ? propertyDetails.titleAr : propertyDetails.title,
    description:
      propertyDetails && propertyDetails.descriptionAr
        ? isArabic
          ? propertyDetails.descriptionAr
              .replaceAll('<p>', '')
              .replaceAll('</p>', '')
              .replaceAll('&nbsp;', ' ')
          : propertyDetails.description
              .replaceAll('<p>', '')
              .replaceAll('</p>', '')
              .replaceAll('&nbsp;', ' ')
        : isArabic
        ? propertyDetails.titleAr
        : propertyDetails.title,
    image:
      WEBSITE_BASE_URL +
      '/_next/image?url=' +
      PROPERTY_BASE_URL +
      propertyDetails.images[0].image +
      '&w=3840&q=30',
    url:
      WEBSITE_BASE_URL +
      `${
        isArabic ? '/ar' : ''
      }/${type}/${propertyType}/${location}/${subArea}/${
        isArabic ? propertyDetails.titleAr : propertyDetails.title
      }`,
    tourBookingPage:
      WEBSITE_BASE_URL +
      `${
        isArabic ? '/ar' : ''
      }/${type}/${propertyType}/${location}/${subArea}/${
        isArabic ? propertyDetails.titleAr : propertyDetails.title
      }`,
    numberOfBathroomsTotal: propertyDetails.baths,
    numberOfBedrooms: propertyDetails.beds,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '',
      addressLocality: '',
      postalCode: '',
      addressCountry: '',
    },
  };
  const tagsDefault = [
    {
      name: `${propertyType} for ${type}`,
      nameAr: `${propertyType} لل${type}`,
      link: `/${type}/${propertyType}/${location}`,
      linkAr: `/${type}/${propertyType}/${location}`,
      typeConstraint: false,
    },
    {
      name: `${type} in ${location}`,
      nameAr: `لل${type} في ${location}`,
      link: `/${type}/${propertyType}/${location}`,
      linkAr: `/${type}/${propertyType}/${location}`,
      typeConstraint: false,
    },
    {
      name: `${location} Real Estate`,
      nameAr: `عقارات ${location}`,
      link: `/${type}/${propertyType}/${location}`,
      linkAr: `/${type}/${propertyType}/${location}`,
      typeConstraint: false,
    },
    {
      name: `Egypt Rental Properties`,
      nameAr: `عقارات للإيجار في مصر`,
      link: `/${type}/${propertyType}/${location}/${subArea}`,
      linkAr: `/${type}/${propertyType}/${location}/${subArea}`,
      typeConstraint: {
        type: 'rent',
        typeAr: 'إيجار',
      },
    },
    {
      name: `Maadi Rentals`,
      nameAr: `إيجار في المعادي`,
      link: `/${type}/${propertyType}/${location}/${subArea}`,
      linkAr: `/${type}/${propertyType}/${location}/${subArea}`,
      typeConstraint: {
        type: 'rent',
        typeAr: 'إيجار',
        location: 'maadi',
        locationAr: 'المعادى',
      },
    },
    {
      name: `Maadi Apartments`,
      nameAr: `شقق المعادي`,
      link: `/${type}/${propertyType}/${location}/${subArea}`,
      linkAr: `/${type}/${propertyType}/${location}/${subArea}`,
      typeConstraint: {
        propertyType: 'apartments',
        propertyTypeAr: 'شقق',
        location: 'maadi',
        locationAr: 'المعادى',
      },
    },
    {
      name: `${location} properties`,
      nameAr: `عقارات في ${location}`,
      link: `/${type}/${propertyType}/${location}/${subArea}`,
      linkAr: `/${type}/${propertyType}/${location}/${subArea}`,
      typeConstraint: false,
    },

    {
      name: `apartments in egypt`,
      nameAr: `عقارات في مصر`,
      link: `/${type}/${propertyType}`,
      linkAr: `/${type}/${propertyType}`,
      typeConstraint: {
        propertyType: 'apartments',
        propertyTypeAr: 'شقق',
      },
    },
    {
      name: `ground floor`,
      nameAr: `عقارات في مصر`,
      link: `/${type}/${propertyType}`,
      linkAr: `/${type}/${propertyType}`,
      typeConstraint: {
        propertyType: 'ground-floors',
        propertyTypeAr: 'شقق-دور-ارضي',
      },
    },
    {
      name: `duplex`,
      nameAr: `دوبليكس`,
      link: `/${type}/${propertyType}`,
      linkAr: `/${type}/${propertyType}`,
      typeConstraint: {
        propertyType: 'ground-floors',
        propertyTypeAr: 'شقق-دور-ارضي',
      },
    },
    {
      name: `duplex for ${type}`,
      nameAr: `دوبليكس لل${type}`,
      link: `/${type}/${propertyType}`,
      linkAr: `/${type}/${propertyType}`,
      typeConstraint: {
        propertyType: 'ground-floors',
        propertyTypeAr: 'شقق-دور-ارضي',
      },
    },
    {
      name: `duplex`,
      nameAr: `دوبليكس`,
      link: `/${type}/${propertyType}`,
      linkAr: `/${type}/${propertyType}`,
      typeConstraint: {
        propertyType: 'duplexes',
        propertyTypeAr: 'دوبليكس',
      },
    },
    {
      name: `penthouse`,
      nameAr: `رووف`,
      link: `/${type}/${propertyType}`,
      linkAr: `/${type}/${propertyType}`,
      typeConstraint: {
        propertyType: 'penthouses',
        propertyTypeAr: 'رووف',
      },
    },
    {
      name: `garden`,
      nameAr: `حديقة`,
      link: `/${type}/${propertyType}/${location}/${subArea}`,
      linkAr: `/${type}/${propertyType}/${location}/${subArea}`,
      typeConstraint: {
        propertyType: 'ground-floors',
        propertyTypeAr: 'شقق-دور-ارضي',
      },
    },
    {
      name: `garden`,
      nameAr: `حديقة`,
      link: `/${type}/${propertyType}/${location}/${subArea}`,
      linkAr: `/${type}/${propertyType}/${location}/${subArea}`,
      typeConstraint: {
        propertyType: 'villas',
        propertyTypeAr: 'فيلات',
      },
    },
    {
      name: `Villas in egypt`,
      nameAr: `فيلات في مصر`,
      link: `/${type}/${propertyType}`,
      linkAr: `/${type}/${propertyType}`,
      typeConstraint: {
        propertyType: 'villas',
        propertyTypeAr: 'فيلات',
      },
    },
    {
      name: `Office Space`,
      nameAr: `مقر اداري`,
      link: `/${type}/${propertyType}`,
      linkAr: `/${type}/${propertyType}`,
      typeConstraint: {
        propertyType: 'office-spaces',
        propertyTypeAr: 'مقرات-اداريه',
      },
    },
    {
      name: `Office for ${type}`,
      nameAr: `مقر اداري لل${type}`,
      link: `/${type}/${propertyType}`,
      linkAr: `/${type}/${propertyType}`,
      typeConstraint: {
        propertyType: 'office-spaces',
        propertyTypeAr: 'مقرات-اداريه',
      },
    },
  ];
  const keywordsOfPropeties = tagsDefault
    .map((tag) => {
      if (
        !tag.typeConstraint ||
        tag.typeConstraint.type == type ||
        tag.typeConstraint.typeAr == type ||
        tag.typeConstraint.propertyType == propertyType ||
        tag.typeConstraint.propertyTypeAr == propertyType
      ) {
        if (isArabic) {
          const tagged = tag.nameAr
            .split('-')
            .join(' ')
            .replace(/\w\S*/g, function (txt) {
              return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
          return tagged;
        } else {
          const tagged = tag.name
            .split('-')
            .join(' ')
            .replace(/\w\S*/g, function (txt) {
              return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
          return tagged;
        }
      } else return '-';
    })
    .filter((e) => e != '-');
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {
        <>
          <Head>
            <meta property='og:url' content={fullUrl} />
            <meta name='robots' content='index, follow' />
            <meta
              property='og:image'
              content={
                WEBSITE_BASE_URL +
                '/_next/image?url=' +
                PROPERTY_BASE_URL +
                propertyDetails.images[0].image +
                '&w=3840&q=30'
              }
            />
            <meta
              property='og:image:alt'
              content='House Point Egypt - Real Estate | Logo'
            />
            <meta
              property='og:site_name'
              content='House Point Egypt - Real Estate'
            />

            <meta
              property='og:image:secure_url'
              content={
                WEBSITE_BASE_URL +
                '/_next/image?url=' +
                PROPERTY_BASE_URL +
                propertyDetails.images[0].image +
                '&w=3840&q=30'
              }
            />
            <meta name='keywords' content={keywordsOfPropeties} />

            <title>
              {isArabic
                ? propertyDetails.titleAr.slice(0, 60)
                : propertyDetails.title.slice(0, 60)}
            </title>
            <meta
              name='description'
              content={
                propertyDetails && propertyDetails.descriptionAr
                  ? isArabic
                    ? propertyDetails.descriptionAr
                        .replaceAll('<p>', '')
                        .replaceAll('</p>', '')
                        .replaceAll('&nbsp;', ' ')
                        .slice(0, 160)
                    : propertyDetails.description
                        .replaceAll('<p>', '')
                        .replaceAll('</p>', '')
                        .replaceAll('&nbsp;', ' ')
                        .slice(0, 160)
                  : isArabic
                  ? propertyDetails.titleAr
                  : propertyDetails.title
              }
            />
            <link rel='canonical' href={fullUrl} key='canonical' />
            <link
              rel='alternate'
              hrefLang='en'
              href={
                WEBSITE_BASE_URL +
                `/${type}/${propertyType}/${location}/${subArea}/${propertyDetails.title}`
              }
            />
            <link
              rel='alternate'
              hrefLang='x-default'
              href={
                WEBSITE_BASE_URL +
                `/${type}/${propertyType}/${location}/${subArea}/${propertyDetails.title}`
              }
            />
            <script
              type='application/ld+json'
              dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            <script
              type='application/ld+json'
              dangerouslySetInnerHTML={{ __html: JSON.stringify(realSchema) }}
            />
            <script
              type='application/ld+json'
              dangerouslySetInnerHTML={{ __html: JSON.stringify(accSchema) }}
            />
            <script
              type='application/ld+json'
              dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
            />

            <meta
              property='og:title'
              content={
                isArabic ? propertyDetails.titleAr : propertyDetails.title
              }
            />
            <meta
              property='og:description'
              content={
                propertyDetails && propertyDetails.descriptionAr
                  ? isArabic
                    ? propertyDetails.descriptionAr
                        .replaceAll('<p>', '')
                        .replaceAll('</p>', '')
                        .replaceAll('&nbsp;', ' ')
                    : propertyDetails.description
                        .replaceAll('<p>', '')
                        .replaceAll('</p>', '')
                        .replaceAll('&nbsp;', ' ')
                  : isArabic
                  ? propertyDetails.titleAr
                  : propertyDetails.title
              }
            />

            <meta property='og:type' content='website' />
            {/* <meta property="og:image:width" content="300" />
          <meta property="og:image:height" content="300" /> */}
            <meta name='twitter:card' content='summary' />
            <meta name='twitter:site' content='@HousePointE' />
            <meta
              name='twitter:title'
              content={
                isArabic ? propertyDetails.titleAr : propertyDetails.title
              }
            />
            <meta name='twitter:creator' content='@HousePointE' />
            <meta name='twitter:domain' content={WEBSITE_BASE_URL} />
            <meta
              name='twitter:description'
              content={
                propertyDetails && propertyDetails.descriptionAr
                  ? isArabic
                    ? propertyDetails.descriptionAr
                        .replaceAll('<p>', '')
                        .replaceAll('</p>', '')
                        .replaceAll('&nbsp;', ' ')
                    : propertyDetails.description
                        .replaceAll('<p>', '')
                        .replaceAll('</p>', '')
                        .replaceAll('&nbsp;', ' ')
                  : isArabic
                  ? propertyDetails.titleAr
                  : propertyDetails.title
              }
            />
            <meta
              name='twitter:image'
              content={
                WEBSITE_BASE_URL +
                '/_next/image?url=' +
                PROPERTY_BASE_URL +
                propertyDetails.images[0].image +
                '&w=3840&q=30'
              }
            />

            <meta name='robots' content='index, follow' />
          </Head>
        </>
      }
      {!showModal && (
        <div>
          <Navbar url={changeLang} />
          <QR />
          <div className='p-2 my-1'>
            <div className='p-2 md:hidden'>
              <BreadCrumbs
                type={type}
                propertyType={propertyType}
                location={location}
                subArea={subArea}
                title={
                  isArabic ? propertyDetails.titleAr : propertyDetails.title
                }
              />
            </div>
            <div className='px-2 py-4 mx-2 text-white rounded-md bg-custom-blue font-openSans'>
              <div className='flex flex-row flex-wrap justify-center lg:justify-between w-full mt-4'>
                <div className='w-full text-center md:w-3/4 md:text-start'>
                  <h1 className='text-2xl lg:text-4xl'>
                    {isArabic ? propertyDetails.titleAr : propertyDetails.title}
                  </h1>
                  <div className='hidden md:block'>
                    {!isArabic && (
                      <h2 className='text-xs text-center lg:text-base md:text-start'>
                        {`${propertyType} for ${type} in ${location} ${subArea} Area: ${propertyDetails.propertyArea}`.replace(
                          /\w\S*/g,
                          function (txt) {
                            return (
                              txt.charAt(0).toUpperCase() +
                              txt.substr(1).toLowerCase()
                            );
                          }
                        )}{' '}
                        m<sup>2</sup> consists of{' '}
                        {`${propertyDetails.beds} bedrooms ${propertyDetails.baths} bathrooms ${propertyDetails.furnitureStatus.name} 5 stars`.replace(
                          /\w\S*/g,
                          function (txt) {
                            return (
                              txt.charAt(0).toUpperCase() +
                              txt.substr(1).toLowerCase()
                            );
                          }
                        )}
                      </h2>
                    )}
                    {isArabic && (
                      <h2 className='text-xs text-center lg:text-base md:text-start'>
                        {`${propertyType} لل${type} في ${location} ${subArea} مساحة: ${propertyDetails.propertyArea}`.replace(
                          /\w\S*/g,
                          function (txt) {
                            return (
                              txt.charAt(0).toUpperCase() +
                              txt.substr(1).toLowerCase()
                            );
                          }
                        )}{' '}
                        متر مربع تتكون من{' '}
                        {`${propertyDetails.beds} غرف نوم ${propertyDetails.baths} حمام ${propertyDetails.furnitureStatus.nameAr} 5 نجوم`.replace(
                          /\w\S*/g,
                          function (txt) {
                            return (
                              txt.charAt(0).toUpperCase() +
                              txt.substr(1).toLowerCase()
                            );
                          }
                        )}
                      </h2>
                    )}
                  </div>
                </div>
                <hr className='w-full my-2 lg:hidden block' />
                <div className='w-full md:w-auto'>
                  <div className='text-center md:text-start'>
                    <span className='mr-4 text-xl'>
                      <span className='text-3xl font-semibold'>
                        {propertyDetails.currency == 'USD' &&
                          Number(
                            propertyDetails.price * liveCurrency.USD
                          ).toLocaleString()}
                        {propertyDetails.currency == 'EUR' &&
                          Number(
                            propertyDetails.price * liveCurrency.EUR
                          ).toLocaleString()}
                        {propertyDetails.currency == 'EGP' &&
                          Number(propertyDetails.price).toLocaleString()}
                      </span>
                      {isArabic && <>جنية</>}
                      {!isArabic && <>EGP</>}
                      {propertyDetails.type == 'rent' && (
                        <span>
                          {!isArabic && <span>/ Month</span>}
                          {isArabic && <span>/ شهريا</span>}
                        </span>
                      )}
                    </span>
                  </div>
                  <div className='block md:hidden'>
                    <hr className='w-full my-2 lg:hidden sm:block' />

                    {!isArabic && (
                      <h2 className='text-xs text-center lg:text-base md:text-start'>
                        {`${propertyType} for ${type} in ${location} ${subArea} Area: ${propertyDetails.propertyArea}`.replace(
                          /\w\S*/g,
                          function (txt) {
                            return (
                              txt.charAt(0).toUpperCase() +
                              txt.substr(1).toLowerCase()
                            );
                          }
                        )}{' '}
                        m<sup>2</sup> consists of{' '}
                        {`${propertyDetails.beds} bedrooms ${propertyDetails.baths} bathrooms ${propertyDetails.furnitureStatus.name} 5 stars`.replace(
                          /\w\S*/g,
                          function (txt) {
                            return (
                              txt.charAt(0).toUpperCase() +
                              txt.substr(1).toLowerCase()
                            );
                          }
                        )}
                      </h2>
                    )}
                    {isArabic && (
                      <h2 className='text-xs text-center lg:text-base md:text-start'>
                        {`${propertyType} لل${type} في ${location} ${subArea} مساحة: ${propertyDetails.propertyArea}`.replace(
                          /\w\S*/g,
                          function (txt) {
                            return (
                              txt.charAt(0).toUpperCase() +
                              txt.substr(1).toLowerCase()
                            );
                          }
                        )}{' '}
                        متر مربع تتكون من{' '}
                        {`${propertyDetails.beds} غرف نوم ${propertyDetails.baths} حمام ${propertyDetails.furnitureStatus.nameAr} 5 نجوم`.replace(
                          /\w\S*/g,
                          function (txt) {
                            return (
                              txt.charAt(0).toUpperCase() +
                              txt.substr(1).toLowerCase()
                            );
                          }
                        )}
                      </h2>
                    )}
                  </div>
                  <div className='w-full text-center md:w-auto md:text-start'>
                    {t('pages.property.components.title.last_updated')}:{' '}
                    {isArabic ? dateOfPropAr : dateOfProp}
                  </div>
                  <div className='w-full mt-2 text-2xl font-semibold text-center xs:w-full lg:text-right'>
                    <small>
                      {t('pages.property.components.title.ref_num')} :{' '}
                      {propertyDetails.refNumber}
                    </small>
                  </div>
                </div>
              </div>
            </div>
            <div className='hidden p-2 md:block'>
              <BreadCrumbs
                type={type}
                propertyType={propertyType}
                location={location}
                subArea={subArea}
                title={
                  isArabic ? propertyDetails.titleAr : propertyDetails.title
                }
              />
            </div>
            <div className='mx-2 my-4'>
              <ImageSlider
                mainimage={propertyDetails.mainimage}
                images={propertyDetails.images}
                title={
                  isArabic ? propertyDetails.titleAr : propertyDetails.title
                }
              />
            </div>
            <div className='flex flex-col w-full gap-2 mt-1 md:flex-row'>
              <div className='md:sticky z-40 transition-all fixed h-fit bg-white  bottom-0 md:w-1/3 w-full md:top-[20%]'>
                <ContactUs
                  propertyImage={propertyDetails.images[0]}
                  propertyTitle={propertyDetails.title}
                  propertyPrice={propertyDetails.price}
                  propertyRef={propertyDetails.refNumber}
                  isArabic={isArabic}
                  liveCurrency={liveCurrency}
                  currency={propertyDetails.currency}
                />
              </div>
              <div className='w-full px-2 md:w-2/3'>
                <PropertyDesc
                  tagsDefault={tagsDefault}
                  type={type}
                  propertyType={propertyType}
                  location={location}
                  subArea={subArea}
                  area={propertyDetails.propertyArea}
                  bedrooms={propertyDetails.beds}
                  bathrooms={propertyDetails.baths}
                  furnitureStatus={
                    isArabic
                      ? propertyDetails.furnitureStatus.nameAr
                      : propertyDetails.furnitureStatus.name
                  }
                  title={
                    isArabic ? propertyDetails.titleAr : propertyDetails.title
                  }
                  description={
                    isArabic
                      ? propertyDetails.descriptionAr
                      : propertyDetails.description
                  }
                  HDF={propertyDetails.HDF}
                  airConditioning={propertyDetails.airConditioning}
                  centralAirCondition={propertyDetails.centralAirCondition}
                  ceramics={propertyDetails.ceramics}
                  closetoCAC={propertyDetails.closetoCAC}
                  closetoFrenchSchool={propertyDetails.closetoFrenchSchool}
                  closetoGym={propertyDetails.closetoGym}
                  closetoMetroStation={propertyDetails.closetoMetroStation}
                  closetoRestaurant={propertyDetails.closetoRestaurants}
                  closetoSchools={propertyDetails.closetoSchools}
                  compound={propertyDetails.compound}
                  fourMasterBedroom={propertyDetails.fourMasterBedroom}
                  internet={propertyDetails.internet}
                  jacuzzi={propertyDetails.jacuzzi}
                  kitchenAppliances={propertyDetails.kitchenAppliances}
                  laundryRoom={propertyDetails.laundryRoom}
                  maidsRoom={propertyDetails.maidsRoom}
                  marble={propertyDetails.marble}
                  oneBalconyView={propertyDetails.oneBalconyView}
                  oneMasterBedroom={propertyDetails.oneMasterBedroom}
                  parquet={propertyDetails.parquet}
                  porcelain={propertyDetails.porcelain}
                  privateEntrance={propertyDetails.privateEntrance}
                  privateGarden={propertyDetails.privateGarden}
                  privateSwimmingPool={propertyDetails.privateSwimmingPool}
                  security={propertyDetails.security}
                  shoppingNerdy={propertyDetails.shoppingNerdy}
                  swimmingpoolUse={propertyDetails.swimmingpoolUse}
                  threeMasterBedroom={propertyDetails.threeMasterBedroom}
                  transportNerdy={propertyDetails.transportNerdy}
                  twoBalconyView={propertyDetails.twoBalconyView}
                  twoMasterBedroom={propertyDetails.twoMasterBedroom}
                  walkinCloset={propertyDetails.walkinCloset}
                  tags={propertyDetails.tags}
                  tagsAr={propertyDetails.tagsAr}
                  quietArea={propertyDetails.quietArea}
                  officeRoom={propertyDetails.officeRoom}
                  builtinWardrobe={propertyDetails.builtinWardrobe}
                  internetAccess={propertyDetails.internetAccess}
                  elevator={propertyDetails.elevator}
                  studyroom={propertyDetails.studyroom}
                  terrace={propertyDetails.terrace}
                  surveillance={propertyDetails.surveillance}
                  coveredParking={propertyDetails.coveredParking}
                  storage={propertyDetails.storage}
                  sharedSwimmingPool={propertyDetails.sharedSwimmingPool}
                  petsAllowed={propertyDetails.petsAllowed}
                />
              </div>
            </div>
            <div className='px-2 mx-auto my-4'>
              <RelatedProperties
                type={type}
                propertyType={propertyType}
                location={location}
                subArea={subArea}
                isArabic={isArabic}
              />
            </div>
            <div className='p-2'>
              <Searchbar setShowModal={setShowModal} showModal={showModal} />
            </div>
          </div>
          {/* <div className="hidden p-4 bg-slate-200 rounded-xl w-[96%] m-auto" dangerouslySetInnerHTML={{__html:meta?.article }}/> */}

          <Footer />
        </div>
      )}
      {showModal && (
        <Searchbar setShowModal={setShowModal} showModal={showModal} />
      )}
    </>
  );
}

export default PropertyDetails;
