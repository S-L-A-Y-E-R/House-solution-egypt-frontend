import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { FaLink } from 'react-icons/fa';
import { API_BASE_URL } from '@/config';

function TopFooterLinks() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const [links, setLinks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${API_BASE_URL}/toplink`);
        if (response.ok) {
          const data = await response.json();
          setLinks(data);
        } else {
          console.error('Error fetching top links:', response.status);
        }
      } catch (error) {
        console.error('Error fetching top links:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className='flex flex-col items-center p-4 mx-2 border rounded border-secondary-color'>
      <h4 className='text-xl font-medium font-openSans text-custom-blue'>
        Most Popular Searches
      </h4>
      <div className='grid w-full grid-cols-2'>
        {links.map((link, index) => (
          <div
            key={index}
            className='w-full pl-2 pr-2 '
            title={isArabic ? link.titleAr : link.title}
          >
            <Link
              href={isArabic ? link.linkAr : link.link}
              className='flex items-center gap-2 hover:underline w-fit'
              rel='noreferer'
              title='Read More'
            >
              <FaLink />
              <span className='font-semibold text-custom-blue w-fit'>
                {isArabic ? link.titleAr : link.title}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopFooterLinks;
