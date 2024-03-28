import React from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

function LanguageSwitcher({ url }) {
  const { i18n } = useTranslation();
  const router = useRouter();
  const isArabic = i18n.language === 'ar';
  const handleClick = (e) => {
    e.preventDefault();
    const newLanguage = isArabic ? 'en' : 'ar';
    // i18n.changeLanguage(newLanguage);
    if (newLanguage === 'en') {
      router
        .replace(url || router.pathname, url || router.asPath, {
          locale: false,
        })
        .then(() => router.reload());
    } else {
      router
        .replace(url || router.pathname, url || router.asPath, {
          locale: newLanguage,
        })
        .then(() => router.reload());
    }
  };

  return (
    <div>
      <button>
        <a
          className='text-custom-blue md:hover:bg-transparent md:border-0 flex items-center flex-nowrap ltr:pl-2 rtl:pr-2 py-2 hover:text-[#095668] focus:hover:text-[#095668] md:hover:text-[#095668]  md:p-0'
          onClick={handleClick}
          href={`${url || (isArabic ? '' : '/ar') + router.pathname}`}
          title='Change Language'
        >
          <FontAwesomeIcon icon={faGlobe} className='mt-1 ltr:mr-2 rtl:ml-2' />
          <span className='font-semibold'>{isArabic ? 'English' : 'عربي'}</span>
        </a>
      </button>
      {/* <Link href={{
        pathname: router.pathname,
      }} replace locale={isArabic ? 'en' : 'ar'}>
        {isArabic ? 'English' : 'عربي'}
      </Link> */}
    </div>
  );
}

export default LanguageSwitcher;
