import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import SideSectionBlog from '@/components/SideSectionBlog';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { API_BASE_URL, BLOG_IMAGE_BASE_URL, WEBSITE_BASE_URL } from '@/config';
import QR from '@/components/Home/QR';
import Head from 'next/head';
import i18n from '@/i18n';
import Article from '@/components/Blog/Article';
import blogStyle from '@/styles/BlogIndex.module.css';
import PaginationSlide from '@/components/Pagination';

export async function getServerSideProps(context) {
  const { locale, params } = context;
  let link = `/reads/topics/${params.topic}`;
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
  const fetchSocialLinks = await axios.get(`${API_BASE_URL}/social-media`);

  const fetchTitles = await axios.get(
    `${API_BASE_URL}/title/single?link=${link}`,
    {
      headers: {
        'accept-language': locale === 'en' ? 'en' : 'ar',
      },
    }
  );

  i18n.changeLanguage(locale);

  const countPosts = await axios
    .get(`${API_BASE_URL}/blog/topics/${params.topic}`, {
      headers: {
        'accept-language': locale,
      },
    })
    .then((response) => {
      let arr = [];
      for (let i = 1; i <= Math.ceil(response.data.length / 9); i++) {
        arr.push(i);
      }
      return arr;
    })
    .catch((error) => console.log(error));

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

function Topic({ meta, initialLocale, socialLinks, isArabic, titles, pages }) {
  const router = useRouter();
  let page =
    router.query.page && router.query.page > 0 ? Number(router.query.page) : 1;
  const [currentPage, setCurrentPage] = useState(page);
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const { t, i18n } = useTranslation();
  const { topic } = router.query;
  const [blogPosts, setBlogPosts] = useState([]);
  const locale = initialLocale || router.locale;

  useEffect(() => {
    // Fetch blog post data from the API
    axios
      .get(`${API_BASE_URL}/blog/topics/${topic}?page=${currentPage}&limit=9`, {
        headers: {
          'accept-language': locale,
        },
      })
      .then((response) => {
        setBlogPosts(response.data);
      })
      .catch((error) => console.log(error));
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

  if (!blogPosts) {
    return <div>Loading...</div>;
  }
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
    '@id': 'HousePointEgyptOrganization',
    name: 'House Point Egypt - Real Estate',
    url: WEBSITE_BASE_URL + '/reads/topics/' + topic,
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
  function htmlToText(html) {
    var temp = document.createElement('div');
    console.log(html);
    temp.innerHTML = html;
    console.log(temp.textContent);
    return temp.textContent || temp.innerText || '';
  }
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': 'mainEntity',
    url: WEBSITE_BASE_URL + '/reads',
    itemListElement: blogPosts.map((post, index) => {
      return {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: `${post.title}`,
        image: BLOG_IMAGE_BASE_URL + post.image,
        datePublished: `${post.createdAt}`,
        dateModified: `${post.updatedAt}` || `${post.createdAt}`,
        mainEntityOfPage:
          WEBSITE_BASE_URL + `/reads/${post.title.replaceAll(' ', '-')}`,
        description: `${htmlToText(post?.blogText).split('.')[0]}.`,
        author: `${post.writter}`,
        publisher: 'HousePointEgyptOrganization',
      };
    }),
  };

  return (
    <>
      <Head>
        <title>{meta?.title}</title>
        <meta name='robots' content='noindex, nofollow' />
        <link
          rel='canonical'
          href={WEBSITE_BASE_URL + `/reads/topics/${topic}`}
          key='canonical'
          title='House Point Egypt - Real Estate | Reads'
        />
        <meta
          name='description'
          content={meta && meta.description.slice(0, 160)}
        />
        <meta name='keywords' content={meta && meta.keywords} />
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
          content='House Point Egypt - Real Estate | Logo
'
        />
        <meta
          property='og:url'
          content={WEBSITE_BASE_URL + isArabic ? '/ar/reads' : '/reads'}
        />
        <meta property='og:type' content='website' />
        <meta
          property='og:url'
          content={WEBSITE_BASE_URL + `/reads/topics/${topic}`}
        />
        <link
          rel='sitemap'
          type='application/xml'
          href={WEBSITE_BASE_URL + '/sitemap.xml'}
        />
        <link
          rel='alternate'
          hrefLang='ar'
          href={WEBSITE_BASE_URL + `/ar/reads/topics/${topic}`}
          title='House Point Egypt - Real Estate | Reads'
        />
        <link
          rel='alternate'
          hrefLang='x-default'
          href={WEBSITE_BASE_URL + `/reads/topics/${topic}`}
          title='House Point Egypt - Real Estate | Reads'
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
              <h1 className='ltr:text-left rtl:text-right order-1 mb-4 font-sans text-lg font-semibold sm:text-xl md:text-2xl lg:text-4xl border-b border-gray-300 pb-4'>
                {topic.replaceAll('-', ' ').replaceAll('_qm_', '?')} | House
                Point Egypt - Real Estate
              </h1>
              <p className='ltr:text-left rtl:text-right order-1 mb-2 font-sans text-lg'>
                {titles && titles.length > 0 ? titles[0] : null}
              </p>
              <div
                className='py-2'
                dangerouslySetInnerHTML={{ __html: meta?.article }}
              ></div>
              <hr className='my-1' />
              <div className={blogStyle.container}>
                {blogPosts.map((post, index) => (
                  <Article key={index} post={post} isArabic={isArabic} />
                ))}
              </div>
            </div>
            <div className='w-full lg:w-1/4 p-4 mt-10 lg:mt-0 bg-gray-200'>
              {/* Left-side section */}
              {/* Add your content here */}
              <SideSectionBlog featuredProperties={featuredProperties} />
            </div>
          </div>
        </div>
        {pages && page && (
          <PaginationSlide
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pages={pages}
            page={page}
            queryParam={topic}
          />
        )}
        <Link
          className='px-4 mb-4'
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

export default Topic;
