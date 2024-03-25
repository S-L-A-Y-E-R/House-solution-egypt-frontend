// Import necessary libraries
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaLink } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { API_BASE_URL } from '@/config';
import axios from 'axios';
import { useTranslation } from "react-i18next";
import Image from 'next/legacy/image';


function PrimeLocations() {
  const [areas, setAreas] = useState([]);
  const [areaCount, setAreaCount] = useState({});
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch areas data
        const areaResponse = await axios.get(API_BASE_URL + '/area');
        const areaData = await areaResponse.data.areas;
        setAreas(areaData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAreaClick = (area) => {
    if (!isArabic) {
      if (area.type == 'area')
        router.push({
          pathname: '/rent/properties/' + area.name.toLowerCase().split(" ").join("-"),
        });
      else router.push({
        pathname: '/rent/properties/' + area.area.toLowerCase().split(" ").join("-") + "/" + area.name.toLowerCase().split(" ").join("-"),
      });
    }
    else {
      if (area.type == 'area')
        router.push({
          pathname: '/إيجار/عقارات/' + area.nameAr.toLowerCase().split(" ").join("-"),
        });
      else router.push({
        pathname: '/إيجار/عقارات/' + area.areaAr.toLowerCase().split(" ").join("-") + "/" + area.nameAr.toLowerCase().split(" ").join("-"),
      });
    }

  };
  return (
    <div className="flex flex-col items-center p-4 mx-2 my-3 border rounded border-secondary-color">
      <h3 className="text-xl font-medium font-openSans text-custom-blue">Prime Locations</h3>
      <ul className="w-full">
        {areas.map((area) => {
          return <div key={area._id}>
            <li
              key={area._id}
              className="flex items-center justify-between py-1 font-semibold border-b-2 cursor-pointer fw-bold border-bottom border-slate-200 hover:underline"
              title={isArabic ? area.nameAr : area.name}
              onClick={() => handleAreaClick({ name: area.name, nameAr: area.nameAr, type: "area" })}
            >
              <span className="flex items-center">
                <Image src="/assets/pin.png" width="20" height="20" alt="pin"
                  title='pin'
                />
                <span className='text-custom-blue'>{isArabic ? area.nameAr : area.name}</span>
              </span>
              <span className="flex justify-end px-2 border rounded-md badge bg-brand rounded-pill bg-secondary-color">
                {area.count || 0}
              </span>
            </li>
            {
              area.subareas.map(subArea => {
                return <li
                  key={subArea.subarea._id}
                  title={isArabic ? subArea.subarea.nameAr : subArea.subarea.name}

                  className="flex items-center justify-between py-1 ml-4 font-semibold border-b-2 cursor-pointer fw-bold border-bottom border-slate-200 hover:underline"
                  onClick={() => handleAreaClick({ name: subArea.subarea.name, area: area.name, nameAr: subArea.subarea.nameAr, areaAr: area.nameAr, type: "subarea" })}
                >
                  <span className="flex items-center">
                    <Image src="/assets/pin.png" width="20" height="20" alt="pin"
                      title='pin'
                    />
                    <span className='text-custom-blue'>{isArabic ? subArea.subarea.nameAr : subArea.subarea.name}</span>
                  </span>
                  <span className="flex justify-end px-2 border rounded-md badge bg-brand rounded-pill bg-secondary-color">
                    {subArea.count || 0}
                  </span>
                </li>;
              })
            }
          </div>;
        })}
      </ul>
    </div>
  );
}

export default PrimeLocations;
