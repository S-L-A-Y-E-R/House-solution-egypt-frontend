import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { FaSadTear } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { API_BASE_URL } from '@/config';
import PropertyCard from '../PropertyCard';
import Skeleton from 'react-loading-skeleton';

const PropertySection = ({
  type,
  propertyType,
  location,
  subArea,
  data: properties,
  title,
}) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [liveCurrency, setLiveCurrency] = useState({ USD: 1, EUR: 1 });
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

  return (
    <div className='mt-8'>
      <div className='w-full '>
        {
          <div className='flex flex-col items-center'>
            <h2 className='px-6 text-2xl font-medium text-center md:px-0 md:text-start font-openSans'>
              {title}
            </h2>
            <div className='grid grid-cols-1 gap-6 p-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
              {properties.map((property) => {
                let propertyLink = `/`;
                if (property.type === 'rent') {
                  propertyLink =
                    propertyLink + t('general.components.searchbar.rent');
                } else {
                  propertyLink =
                    propertyLink + t('general.components.searchbar.sale');
                }
                if (isArabic) {
                  propertyLink =
                    propertyLink + '/' + property.propertyType.nameAr;
                  propertyLink = propertyLink + '/' + property.area.nameAr;
                  propertyLink = propertyLink + '/' + property.subarea.nameAr;
                  propertyLink =
                    propertyLink +
                    '/' +
                    property.titleAr +
                    '-' +
                    property.refNumber;
                } else {
                  propertyLink =
                    propertyLink +
                    '/' +
                    property.propertyType.name.toLowerCase();
                  propertyLink =
                    propertyLink + '/' + property.area.name.toLowerCase();
                  propertyLink =
                    propertyLink + '/' + property.subarea.name.toLowerCase();
                  propertyLink =
                    propertyLink +
                    '/' +
                    property.title.toLowerCase() +
                    '-' +
                    property.refNumber;
                }

                return (
                  <PropertyCard
                    key={property._id}
                    id={property._id}
                    propertyLink={propertyLink}
                    image={property.mainimage}
                    title={isArabic ? property.titleAr : property.title}
                    location={
                      isArabic
                        ? property.area.nameAr
                        : property.area.name.toLowerCase()
                    }
                    refNumber={property.refNumber}
                    price={property.price}
                    beds={property.beds}
                    bathrooms={property.baths}
                    area={property.propertyArea}
                    propertyType={
                      isArabic
                        ? property.propertyType.nameAr
                        : property.propertyType.name.toLowerCase()
                    }
                    furnitureStatus={
                      isArabic
                        ? property.furnitureStatus.nameAr
                        : property.furnitureStatus.name
                    }
                    type={
                      property.type == 'rent'
                        ? t('general.components.searchbar.rent')
                        : t('general.components.searchbar.sale')
                    }
                    subArea={
                      isArabic
                        ? property.subarea.nameAr
                        : property.subarea.name.toLowerCase()
                    }
                    currency={property.currency}
                    liveCurrency={liveCurrency}
                  />
                );
              })}
            </div>
            <Link
              className='px-4'
              href={type == 'rent' ? '/rent/properties' : 'sale/properties'}
            >
              <h4 className='rounded-lg m-auto bg-black text-white text-2xl p-2 text-center w-fit px-4 '>
                {type == 'rent'
                  ? t('general.components.searchbar.searchRent')
                  : t('general.components.searchbar.searchSale')}
              </h4>
            </Link>
          </div>
        }
      </div>
    </div>
  );
};

export default PropertySection;
