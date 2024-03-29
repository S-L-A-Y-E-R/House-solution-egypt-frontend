import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

function SideSectionBlog() {
  const { t, i18n } = useTranslation();
  const uniqueKeywords = new Set();
  const uniqueTopics = new Map();
  const [blogsData, setBlogsData] = useState([]);
  const isArabic = i18n.language === 'ar';

  useEffect(() => {
    // Fetch topics data from API
    axios
      .get(`${API_BASE_URL}/blog`, {
        headers: {
          'accept-language': i18n.language === 'ar' ? 'ar' : 'en',
        },
      })
      .then((response) => {
        setBlogsData(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  blogsData.forEach((blog) => {
    if (!uniqueTopics.has(blog.topic)) {
      uniqueTopics.set(blog.topic, blog);
    }
  });

  return (
    <div className='mb-3 row' dir={isArabic ? 'rtl' : 'ltr'}>
      <h4 className='font-semibold text-2xl'>{t('pages.blog.topics')}</h4>
      <div className='mt-4 flex flex-col'>
        {Array.from(uniqueTopics.values()).map(
          (selectedBlog) =>
            selectedBlog.topic && (
              <a
                key={selectedBlog._id}
                className='col-12 p-2 mt-1 text-light badge bg-card text-decoration-none mb-1 text-white bg-[#095668] hover:opacity-70 rounded'
                href={
                  i18n.language === 'ar'
                    ? `/ar/reads/topics/${selectedBlog.topic.replaceAll(
                        ' ',
                        '-'
                      )}`
                    : `/reads/topics/${selectedBlog.topic.replaceAll(' ', '-')}`
                }
                data-ur1313m3t='true'
                title='Read more about this topic'
              >
                <span className='fs-6'>{selectedBlog.topic}</span>
              </a>
            )
        )}
      </div>

      <div className='mt-2 p-2'>
        <h4 className='font-semibold text-2xl'>{t('pages.blog.tags')}</h4>
        <div className='mt-4 flex flex-wrap'>
          {blogsData.map((blog) => {
            // Split keywords into an array
            const keywordsArray = blog.tag.split(',');

            // Filter and keep track of unique keywords
            const uniqueKeywordsArray = keywordsArray.filter(
              (keyword) => !uniqueKeywords.has(keyword.trim().toLowerCase())
            );

            // Add unique keywords to the set
            uniqueKeywordsArray.forEach((keyword) =>
              uniqueKeywords.add(keyword.trim().toLowerCase())
            );

            return (
              uniqueKeywordsArray.join(', ') && (
                <a
                  key={blog._id}
                  className='bg-[#095668] text-white hover:opacity-70 rounded col text-light badge bg-card me-1 mb-1 text-start text-decoration-none py-2 px-3 border border-[#yourbordercolor]'
                  //   href={`/reads/${blog._id.toLowerCase().replace(/ /g, "-")}`}
                  href={`/reads/${blog.title
                    .replaceAll(' ', '-')
                    .replaceAll('?', '_qm_')}`}
                  data-ur1313m3t='true'
                  title='Read more about this topic'
                >
                  <span>{uniqueKeywordsArray.join(', ')}</span>
                </a>
              )
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SideSectionBlog;
