import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import SideSectionBlog from '@/components/SideSectionBlog';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { API_BASE_URL, BLOG_IMAGE_BASE_URL } from '@/config';
import QR from '@/components/Home/QR';
import Head from 'next/head';
import { WEBSITE_BASE_URL } from '@/config';
import i18n from '@/i18n';
import Article from '@/components/Blog/Article';
import blogStyle from '@/styles/BlogIndex.module.css';
import PaginationSlide from '@/components/Pagination';

export async function getServerSideProps(context) {
  let link = `/reads`;
  const { locale } = context;
  if (locale == 'ar') link = '/ar' + link;
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

  const fetchTitles = await axios.get(
    `${API_BASE_URL}/title/single?link=${link}`,
    {
      headers: {
        'accept-language': locale === 'en' ? 'en' : 'ar',
      },
    }
  );
  const fetchSocialLinks = await axios.get(`${API_BASE_URL}/social-media`);

  const countPosts = await fetch(`${API_BASE_URL}/blog/count`, {
    headers: {
      'accept-langunage': locale === 'ar' ? 'ar' : 'en',
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
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
      isArabic: locale == 'ar' ? true : false,
      pages: countPosts,
      socialLinks: fetchSocialLinks.data,
    },
  };
}

function Index(props) {
  const router = useRouter();
  let page =
    router.query.page && router.query.page > 0 ? Number(router.query.page) : 1;
  const { t, i18n } = useTranslation();
  const [blogPosts, setBlogPosts] = useState([]);
  const [findingApartmentTopics, setFindingApartmentTopics] = useState([]);
  const [rentingApartmentTopics, setRentingApartmentTopics] = useState([]);
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(page);
  const { meta, initialLocale, socialLinks, isArabic, titles, pages } = props;
  const locale = initialLocale || router.locale;

  useEffect(() => {
    // Fetch blog post data from the API
    fetch(`${API_BASE_URL}/blog/?page=7&limit=3`, {
      headers: {
        'accept-language': locale,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        setBlogPosts(data);
      });

    //Fetch finding apartment topics
    fetch(`${API_BASE_URL}/blog/topics/finding-an-apartment?page=1&limit=3`, {
      headers: {
        'accept-language': locale,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setFindingApartmentTopics(data);
      });

    //Fetch renting apartment topics
    fetch(`${API_BASE_URL}/blog/topics/renting-an-apartment?page=1&limit=3`, {
      headers: {
        'accept-language': locale,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setRentingApartmentTopics(data);
      });

    //Fetch featured properties
    fetch(
      `${API_BASE_URL}/property/getproperties?isFeatured=true&limit=4&page=4`,
      {
        headers: {
          'accept-language': locale,
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setFeaturedProperties(data.properties);
      });
  }, [currentPage]);

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

  const allBlogs = blogPosts.concat(
    findingApartmentTopics,
    blogPosts,
    rentingApartmentTopics
  );

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
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': 'mainEntity',
    url: WEBSITE_BASE_URL + '/reads',
    itemListElement: allBlogs.map((post, index) => {
      return {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: `${post.title}`,
        image: BLOG_IMAGE_BASE_URL + post.image,
        datePublished: `${post.createdAt}`,
        dateModified: `${post.updatedAt}` || `${post.createdAt}`,
        mainEntityOfPage:
          WEBSITE_BASE_URL + `/reads/${post.title.replaceAll(' ', '-')}`,
        description: `${post.blogText.slice(0, 160)}`,
        author: `${post.writter}`,
        publisher: 'HousePointEgyptOrganization',
      };
    }),
  };

  return (
    <>
      <Head>
        <title>{`${meta?.title}`} </title>
        <meta name='robots' content='noindex, nofollow' />
        <link
          rel='canonical'
          href={WEBSITE_BASE_URL + isArabic ? '/reads' : '/reads'}
          key='canonical'
          title='House Point Egypt - Real Estate | Reads'
        />
        <meta name='keywords' content={meta?.keywords} />
        <meta
          name='description'
          content={meta && meta.description.slice(0, 160)}
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
        <meta property='og:title' content={meta && meta.title} />
        <meta
          property='og:description'
          content={meta && meta.description.slice(0, 160)}
        />
        <meta
          property='og:image'
          content={WEBSITE_BASE_URL + '/images/HPlogo.png'}
        />
        <meta
          property='og:image:alt'
          content='House Point Egypt - Real Estate | Logo'
        />
        <meta
          property='og:image:secure_url'
          content={WEBSITE_BASE_URL + '/images/HPlogo.png'}
        />
        <meta property='og:type' content='website' />
        <meta
          property='og:url'
          content={WEBSITE_BASE_URL + isArabic ? '/ar/reads' : '/reads'}
        />
        <link
          rel='alternate'
          hrefLang='ar'
          href={WEBSITE_BASE_URL + `/ar/reads`}
          title='House Point Egypt - Real Estate | Reads'
        />
        <link
          rel='alternate'
          hrefLang='x-default'
          href={WEBSITE_BASE_URL + '/reads'}
          title='House Point Egypt - Real Estate | Reads'
        />
        <link
          rel='sitemap'
          type='application/xml'
          href={WEBSITE_BASE_URL + '/sitemap.xml'}
        />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:site' content='@HousePointE' />
        <meta name='twitter:title' content={meta && meta.title} />
        <meta name='twitter:creator' content='@HousePointE' />
        <meta name='twitter:domain' content={WEBSITE_BASE_URL} />
        <meta name='twitter:description' content={meta && meta.description} />
        <meta
          name='twitter:image'
          content={WEBSITE_BASE_URL + '/images/HPlogo.png'}
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />

        <meta name='robots' content='index, follow' />
      </Head>
      <div
        className='flex flex-col min-h-screen'
        dir={isArabic ? 'rtl' : 'ltr'}
      >
        <Navbar />
        <QR />
        <div className='w-full h-full bg-cover bg-center py-4 text-black flex flex-col items-center font-sans flex-1'>
          <div className='w-full px-6 flex flex-col lg:flex-row flex-1'>
            <div className='flex-1'>
              {titles?.length > 0 && (
                <>
                  <h1 className='ltr:text-left rtl:text-right order-1 mb-4 font-sans text-lg font-semibold sm:text-xl md:text-2xl lg:text-4xl border-b border-gray-300 pb-4'>
                    {isArabic ? titles[0]?.titleAr : titles[0]?.title}
                  </h1>
                  <p className='ltr:text-left rtl:text-right order-1 mb-8 font-sans text-lg'>
                    {isArabic ? titles[1]?.titleAr : titles[1]?.title}
                  </p>
                </>
              )}

              <h2 className='font-bold text-2xl'>
                {!isArabic ? 'Finding an Apartment' : 'البحث عن شقة'}
              </h2>
              <hr className='my-2' />
              <div className={blogStyle.container}>
                {findingApartmentTopics &&
                  findingApartmentTopics.map((post, index) => (
                    <Article key={index} post={post} isArabic={isArabic} />
                  ))}
              </div>
              <Link
                href={`${WEBSITE_BASE_URL}/reads/topics/Finding-An-Apartment`}
                className={`mt-6 block text-blue-500 font-semibold  ${
                  isArabic ? 'text-left ml-20' : 'text-right mr-20'
                }`}
              >
                {!isArabic ? 'View More' : 'مشاهدة المزيد'} +
              </Link>

              <h2 className='font-bold text-2xl mt-8'>
                {!isArabic ? 'Topics' : 'مقالات'}
              </h2>
              <hr className='my-2' />
              <div className={blogStyle.container}>
                {blogPosts &&
                  blogPosts.map((post, index) => (
                    <Article key={index} post={post} isArabic={isArabic} />
                  ))}
              </div>

              <h2 className='font-bold text-2xl mt-8'>
                {!isArabic ? 'Renting an Apartment' : 'تأجير شقة'}
              </h2>
              <hr className='my-2' />
              <div className={blogStyle.container}>
                {rentingApartmentTopics &&
                  rentingApartmentTopics.map((post, index) => (
                    <Article key={index} post={post} isArabic={isArabic} />
                  ))}
              </div>
              <Link
                href={`${WEBSITE_BASE_URL}/reads/topics/Renting-An-Apartment`}
                className={`mt-6 block text-blue-500 font-semibold  ${
                  isArabic ? 'text-left ml-20' : 'text-right mr-20'
                }`}
              >
                {!isArabic ? 'View More' : 'مشاهدة المزيد'} +
              </Link>
            </div>

            {blogPosts.length > 0 && (
              <div className='w-full lg:w-1/4 p-4 mt-10 lg:mt-0 bg-gray-200'>
                {/* Left-side section */}
                {/* Add your content here */}
                <SideSectionBlog featuredProperties={featuredProperties} />
              </div>
            )}
          </div>
        </div>
        {/* {pages && page && (
          <PaginationSlide
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pages={pages}
            page={page}
          />
        )} */}
        <Link
          className='px-4 mb-4 mt-8'
          href={'/'}
          title='House Point Egypt - Real Estate | Home Page'
        >
          <h4 className='rounded-lg m-auto bg-black text-white text-2xl p-2 text-center w-fit px-4 '>
            {t('general.components.searchbar.searchReads')}
          </h4>
        </Link>
        <div className='mt-auto'>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Index;
