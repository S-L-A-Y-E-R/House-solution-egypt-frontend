import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import axios from 'axios';
import ContactHeader from '@/components/ContactPage/ContactHeader';
import Head from 'next/head';
import { API_BASE_URL, WEBSITE_BASE_URL } from '@/config';
import i18n from '@/i18n';
import Link from 'next/link';

export async function getServerSideProps(context) {
  let link = `/contact`;
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
  i18n.changeLanguage(locale);
  const fetchSocialLinks = await axios.get(`${API_BASE_URL}/social-media`);

  return {
    props: {
      meta: response.data.meta,
      initialLocale: locale,
      changeLang: changeLangResponse.data.url,
      socialLinks: fetchSocialLinks.data,
      isArabic: locale == 'ar' ? true : false,
    },
  };
}
function contact({ meta, initialLocale, changeLang, isArabic, socialLinks }) {
  const { t, i18n } = useTranslation();
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
  return (
    <>
      <Head>
        <title>{meta && meta.title}</title>
        <link
          rel='canonical'
          href={WEBSITE_BASE_URL + isArabic ? '/ar/contact' : '/contact'}
          key='canonical'
          title='House Point Egypt - Real Estate | Contact Us'
        />
        <meta
          name='description'
          content={meta && meta.description.slice(0, 160)}
        />
        <meta name='keywords' content={meta?.keywords} />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
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
          property='og:image:secure_url'
          content={WEBSITE_BASE_URL + '/images/HPlogo.png'}
        />
        <meta property='og:type' content='website' />s
        <meta property='og:url' content={WEBSITE_BASE_URL + '/contact'} />
        <link
          rel='alternate'
          hreflang='ar'
          href={WEBSITE_BASE_URL + `/ar/contact`}
          title='House Point Egypt - Real Estate | اتصل بنا'
        />
        <link
          rel='alternate'
          hreflang='x-default'
          href={WEBSITE_BASE_URL + '/contact'}
          title='House Point Egypt - Real Estate | Contact Us'
        />
        <link
          rel='sitemap'
          type='application/xml'
          href={WEBSITE_BASE_URL + '/sitemap.xml'}
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
      <div>
        <Navbar />
        <ContactHeader />
        <Link
          className='px-4 mb-4'
          href={
            'https://www.google.com/maps/place/House+Point+Egypt/@29.951497,31.265416,16z/data=!4m6!3m5!1s0x14583807cabfbd7d:0x81e98f6ddff99809!8m2!3d29.951497!4d31.2654163!16s%2Fg%2F11scfpyfrp?hl=ar&entry=ttu'
          }
          title='House Point Egypt - Real Estate | Location'
        >
          <h4 className='rounded-lg m-auto bg-black text-white text-2xl p-2 text-center w-fit px-4 '>
            {t('general.components.searchbar.searchContact')}
          </h4>
        </Link>
        <Footer />
      </div>
    </>
  );
}

export default contact;
