import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import axios from 'axios';
import { API_BASE_URL, WEBSITE_BASE_URL } from '@/config';
import Head from 'next/head';
import i18n from '@/i18n';
import QR from '@/components/Home/QR';

export async function getServerSideProps(context) {
  const { locale } = context;
  i18n.changeLanguage(locale);

  let link = `/`;
  if (locale == 'ar') link += `ar/`;
  link += 'favorite';
  const response = await axios.post(`${API_BASE_URL}/utils/getmeta`, { link });

  const changeLangResponse = await axios.post(
    `${API_BASE_URL}/utils/changelang`,
    context.query,
    {
      headers: {
        'accept-language': locale === 'en' ? 'ar' : 'en',
      },
    }
  );

  return {
    props: {
      meta: response.data.meta,
      initialLocale: locale,
      changeLang: changeLangResponse.data.url,
      isArabic: locale == 'ar' ? true : false,
      link,
    },
  };
}

const Favorite = ({ meta, initialLocale, changeLang, isArabic, link }) => {
  const [titles, setTitles] = useState([]);
  const [favorites, setfavorites] = useState([]);
  const [token, setToken] = useState(null);
  const [liveCurrency, setLiveCurrency] = useState({ USD: 1, EUR: 1 });
  const router = useRouter();
  const { type, propertyType, location, subArea, tag } = router.query;
  const { t, i18n: ii18n } = useTranslation();

  const getFavorite = () => {
    if (token) {
      axios
        .get(`${API_BASE_URL}/favorite`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setfavorites(res.data.favorites);
        })
        .catch((err) => {
          localStorage.removeItem('user');
          localStorage.removeItem('email');
          localStorage.removeItem('token');
        });
    }
  };

  useEffect((e) => {
    async function fetchCurrency() {
      try {
        const response = await axios.get(API_BASE_URL + '/utils/getcurrency');
        setLiveCurrency(response.data.currency);
      } catch (err) {
        console.log(err);
      }
    }
    fetchCurrency();
  }, []);

  useEffect(() => {
    getFavorite();
  }, [token]);

  useEffect(() => {
    i18n.changeLanguage(initialLocale);
  }, []);

  useEffect(() => {
    setToken(localStorage.getItem('token'));
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

  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/social-media`);
        setSocialLinks(data);
      } catch (error) {
        console.error('Error fetching social links:', error);
      }
    };

    fetchSocialLinks();
  }, []);

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
    url: WEBSITE_BASE_URL,
    logo: WEBSITE_BASE_URL + '/_next/image?url=%2Fimages%2Flogo.png&w=256&q=75',
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
  return (
    <>
      {
        <>
          <Head>
            <title>
              {`${meta ? meta.title : isArabic ? titleAR : titleEN}`}
            </title>
            <meta
              name='description'
              content={`${
                meta
                  ? meta.description.slice(0, 160)
                  : isArabic
                  ? titleAR
                  : titleEN
              }`}
            />
            <meta name='keywords' content={meta ? meta.keywords : ''} />
            <link
              rel='canonical'
              href={WEBSITE_BASE_URL + `${isArabic ? '/ar/' : '/'}${type}`}
              key='canonical'
              title='House Point Egypt - Real Estate | Favorite'
            />
            <link
              rel='alternate'
              hreflang='en'
              href={WEBSITE_BASE_URL + `/${type}`}
              title='House Point Egypt - Real Estate | Favorite'
            />
            <link
              rel='sitemap'
              type='application/xml'
              href={WEBSITE_BASE_URL + '/sitemap.xml'}
            />
            <link
              rel='alternate'
              hreflang='ar'
              href={WEBSITE_BASE_URL + `/ar/${type}`}
              title='House Point Egypt - Real Estate | Favorite'
            />
            <link
              rel='alternate'
              hreflang='x-default'
              href={WEBSITE_BASE_URL + `/${type}`}
              title='House Point Egypt - Real Estate | Favorite'
            />
            <script
              type='application/ld+json'
              dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            <script
              type='application/ld+json'
              dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
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
              content='House Point Egypt - Real Estate | Logo'
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

      <h1>
        <Navbar url={changeLang} />
        <QR />

        <div>
          <p className='text-custom-blue text-2xl font-semibold text-center mt-6'>
            {t('pages.favorite.favorite')}
          </p>

          {!token && (
            <p className='text-custom-blue text-xl text-center mt-6'>
              {t('pages.favorite.unauth_user')}
            </p>
          )}

          {token && favorites.length === 0 ? (
            <p className='text-custom-blue text-xl text-center mt-6'>
              {t('pages.favorite.empty_favorite')}
            </p>
          ) : (
            <div className='grid grid-cols-1 gap-6 p-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
              {favorites.map((favorite) => {
                let propertyLink = `/`;
                if (favorite.propertyId.type === 'rent') {
                  propertyLink =
                    propertyLink + t('general.components.searchbar.rent');
                } else {
                  propertyLink =
                    propertyLink + t('general.components.searchbar.sale');
                }
                if (isArabic) {
                  propertyLink =
                    propertyLink +
                    '/' +
                    favorite.propertyId.propertyType.nameAr;
                  propertyLink =
                    propertyLink + '/' + favorite.propertyId.area.nameAr;
                  propertyLink =
                    propertyLink + '/' + favorite.propertyId.subarea.nameAr;
                  propertyLink =
                    propertyLink +
                    '/' +
                    favorite.propertyId.titleAr +
                    '-' +
                    favorite.propertyId.refNumber;
                } else {
                  propertyLink =
                    propertyLink +
                    '/' +
                    favorite.propertyId?.propertyType.name?.toLowerCase();
                  propertyLink =
                    propertyLink +
                    '/' +
                    favorite.propertyId.area.name.toLowerCase();
                  propertyLink =
                    propertyLink +
                    '/' +
                    favorite.propertyId.subarea.name.toLowerCase();
                  propertyLink =
                    propertyLink +
                    '/' +
                    favorite.propertyId.title.toLowerCase() +
                    '-' +
                    favorite.propertyId.refNumber;
                }

                return (
                  <PropertyCard
                    getFavorite={getFavorite}
                    key={favorite.propertyId._id}
                    id={favorite.propertyId._id}
                    propertyLink={propertyLink}
                    image={favorite.propertyId.mainimage}
                    title={
                      isArabic
                        ? favorite.propertyId.titleAr
                        : favorite.propertyId.title
                    }
                    location={
                      isArabic
                        ? favorite.propertyId.area.nameAr
                        : favorite.propertyId.area.name.toLowerCase()
                    }
                    refNumber={favorite.propertyId.refNumber}
                    price={favorite.propertyId.price}
                    beds={favorite.propertyId.beds}
                    bathrooms={favorite.propertyId.baths}
                    area={favorite.propertyId.propertyArea}
                    propertyType={
                      isArabic
                        ? favorite.propertyId.propertyType.nameAr
                        : favorite.propertyId.propertyType.name.toLowerCase()
                    }
                    furnitureStatus={
                      isArabic
                        ? favorite.propertyId.furnitureStatus.nameAr
                        : favorite.propertyId.furnitureStatus.name
                    }
                    type={
                      favorite.propertyId.type == 'rent'
                        ? t('general.components.searchbar.rent')
                        : t('general.components.searchbar.sale')
                    }
                    subArea={
                      isArabic
                        ? favorite.propertyId.subarea.nameAr
                        : favorite.propertyId.subarea.name.toLowerCase()
                    }
                    currency={favorite.propertyId.currency}
                    liveCurrency={liveCurrency}
                  />
                );
              })}
            </div>
          )}
        </div>

        <div
          className={
            favorites.length > 0
              ? 'mt-[30vh]'
              : 'absolute bottom-0 w-full mt-16'
          }
        >
          <Footer />
        </div>
      </h1>
    </>
  );
};

export default Favorite;
