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

  return {
    props: {
      meta: response.data.meta,
      initialLocale: locale,
      changeLang: changeLangResponse.data.url,
      isArabic: locale == 'ar' ? true : false,
    },
  };
}
function contact({ meta, initialLocale, changeLang, isArabic }) {
  const { t, i18n } = useTranslation();
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': WEBSITE_BASE_URL,
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
  return (
    <>
      <Head>
        <title>{meta && meta.title}</title>
        <link
          rel='canonical'
          href={WEBSITE_BASE_URL + isArabic ? '/ar/contact': '/contact'}
          key='canonical'
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
          content={
            WEBSITE_BASE_URL +
            '/_next/image?url=%2Fimages%2Flogo.png&w=256&q=75'
          }
        />
        <meta
          property='og:image:alt'
          content='House Point Egypt - Real Estate | Logo
'
        />
        <meta
          property='og:image:secure_url'
          content={
            WEBSITE_BASE_URL +
            '/_next/image?url=%2Fimages%2Flogo.png&w=256&q=75'
          }
        />
        <meta property='og:type' content='website' />s
        <meta property='og:url' content={WEBSITE_BASE_URL + '/contact'} />
        <link
          rel='alternate'
          hreflang='ar'
          href={WEBSITE_BASE_URL + `/ar/contact`}
        />
        <link
          rel='alternate'
          hreflang='x-default'
          href={WEBSITE_BASE_URL + '/contact'}
        />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:site' content='@HousePointE' />
        <meta name='twitter:title' content={meta.title} />
        <meta name='twitter:creator' content='@HousePointE' />
        <meta name='twitter:domain' content={WEBSITE_BASE_URL} />
        <meta name='twitter:description' content={meta.description} />
        <meta
          name='twitter:image'
          content={
            WEBSITE_BASE_URL +
            '/_next/image?url=%2Fimages%2Flogo.png&w=256&q=75'
          }
        />
        <meta name='robots' content='index, follow' />
      </Head>
      <div>
        <Navbar />
        <ContactHeader />
        <Link className="px-4 mb-4" href={"https://www.google.com/maps/place/House+Point+Egypt/@29.951497,31.265416,16z/data=!4m6!3m5!1s0x14583807cabfbd7d:0x81e98f6ddff99809!8m2!3d29.951497!4d31.2654163!16s%2Fg%2F11scfpyfrp?hl=ar&entry=ttu"}>
          <h4 className="rounded-lg m-auto bg-black text-white text-2xl p-2 text-center w-fit px-4 ">
              { t("general.components.searchbar.searchContact")}
          </h4>
        </Link>
        <Footer />
      </div>
    </>
  );
}

export default contact;
