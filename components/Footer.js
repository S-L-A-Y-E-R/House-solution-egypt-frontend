import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { API_BASE_URL } from '@/config';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [footerLinks, setFooterLinks] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);
  const [aboutUs, setAboutUs] = useState({
    description: '',
    descriptionAr: '',
  });

  useEffect(() => {
    const fetchAboutUs = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/utils/getaboutus`);
        setAboutUs(response.data.aboutus);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchFooterLinks = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/footerlink`);
        setFooterLinks(response.data);
      } catch (error) {
        console.error('Error fetching footer links:', error);
      }
    };

    const fetchSocialLinks = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/social-media`);
        setSocialLinks(response.data);
      } catch (error) {
        console.error('Error fetching social links:', error);
      }
    };

    fetchAboutUs();
    fetchFooterLinks();
    fetchSocialLinks();
  }, []);

  return (
    <footer className='bg-[#095668] text-white p-8'>
      <div className='flex flex-col gap-4 md:flex-row'>
        <div className='md:w-2/5'>
          <div className='mb-4 text-2xl'>
            {t('general.components.footer.about_us')}
          </div>
          <div
            className='text-sm whitespace-wrap'
            dangerouslySetInnerHTML={{
              __html: isArabic ? aboutUs.descriptionAr : aboutUs.description,
            }}
          />
          <div className='flex gap-2 mt-2'>
            <a href={socialLinks.facebook} title='Facebook' rel='noreferrer'>
              <Image
                src='/assets/face.png'
                alt='facebook icon'
                width='35'
                height='35'
                quality={30}
                title='House Point Egypt Facebook'
              />
            </a>
            <a href={socialLinks.instagram} title='Instagram' rel='noreferrer'>
              <Image
                src='/assets/instagram.png'
                alt='instagram icon'
                width='35'
                height='35'
                quality={30}
                title='House Point Egypt Instagram'
              />
            </a>
            <a href={socialLinks.twitter} title='Twitter' rel='noreferrer'>
              <Image
                src='/assets/twitter.png'
                alt='twitter icon'
                width='35'
                height='35'
                quality={30}
                title='House Point Egypt Twitter'
                s
              />
            </a>
            <a href={socialLinks.linkedin} title='Linkedin' rel='noreferrer'>
              <Image
                src='/assets/linkedin.png'
                alt='linkedin icon'
                width='35'
                height='35'
                quality={30}
                title='House Point Egypt Linkedin'
              />
            </a>
            <a href={socialLinks.pinterest} title='Pinterest' rel='noreferrer'>
              <Image
                src='/assets/pinterest.svg'
                alt='Pinterest icon'
                width='35'
                height='35'
                quality={30}
                title='House Point Egypt Pinterest'
              />
            </a>
            <a href={socialLinks.youtube} title='Youtube' rel='noreferrer'>
              <Image
                src='/assets/youtube.png'
                alt='youtube icon'
                width='35'
                height='35'
                quality={30}
                title='House Point Egypt Youtube'
              />
            </a>
            <a
              href={socialLinks.telegram}
              target='_blank'
              title='Telegram'
              className='mt-1'
              rel='noreferrer'
            >
              <Image
                src='/assets/telegram.png'
                alt='Telegram Icon'
                width='27'
                height='27'
                quality={30}
                title='House Point Egypt Telegram'
              />
            </a>
            <a
              href={socialLinks.tiktok}
              title='Tiktok'
              target='_blank'
              rel='noreferrer'
            >
              <Image
                src='/assets/tiktok.webp'
                className='rounded m-1'
                alt='Tiktok Icon'
                width='28'
                height='28'
                quality={30}
                title='House Point Egypt Tiktok'
              />
            </a>
          </div>
        </div>

        <div className='md:w-3/5'>
          <div className='mb-4 text-2xl'>
            {t('general.components.footer.new_links')}
          </div>
          <ul className='grid grid-cols-2 gap-1 font-semibold lg:grid-cols-3'>
            {footerLinks.map((link, index) => (
              <li key={index} className='flex items-center underline'>
                <a
                  href={isArabic && link ? '/ar/' + link.linkAr : link.link}
                  className='flex items-center gap-2'
                  title={isArabic ? link.titleAr : link.title}
                >
                  <Image
                    src='/assets/search.png'
                    alt='search'
                    width='25'
                    height='25'
                    quality={30}
                    title='House Point Egypt Search Icon'
                  />
                  <span>{isArabic ? link.titleAr : link.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='mt-4 md:mt-24 text-center'>
        <span className='ltr:hidden'>© 2023</span>{' '}
        <a
          className='underline'
          href='https://HousePointEgypt.com'
          title='House Point Egypt Home Page'
        >
          HousePointEgypt.com
        </a>
        <span className='rtl:hidden'>© 2023</span>
      </div>
    </footer>
  );
};

export default Footer;
