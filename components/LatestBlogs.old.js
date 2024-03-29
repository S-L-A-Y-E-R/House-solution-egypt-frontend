import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import { API_BASE_URL, BLOG_IMAGE_BASE_URL } from '@/config';
import Link from 'next/link';
import Image from 'next/legacy/image';

function LatestBlogs() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Fetch latest blogs
    const fetchLatestBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/blog/latest`, {
          headers: {
            'accept-language': isArabic ? 'ar' : 'en',
          },
        });
        const data = response.data;

        // Check if data is an array
        if (Array.isArray(data)) {
          setLatestBlogs(data);
        } else {
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestBlogs();
  }, []);

  return (
    <div>
      <div className='px-6 pt-20 pb-40 bg-emerland-50'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-2xl font-semibold leading-10 text-center uppercase font-heading'>
            {t('LATEST BLOGS')}
          </h2>
          <div className='grid max-w-6xl gap-10 mx-auto mt-10 md:grid-cols-2 lg:grid-cols-3'>
            {loading && (
              <>
                {[1, 2, 3].map((e) => {
                  return (
                    <div>
                      <Skeleton className='block p-4 h-96' />
                      <Skeleton count={3} />
                    </div>
                  );
                })}
              </>
            )}
            {!loading &&
              latestBlogs.length > 0 &&
              latestBlogs.map((post) => (
                <div className='bg-gray-200 p-2 rounded' key={post._id}>
                  <Link
                    href={`/reads/${post._id}`}
                    data-ur1313m3t='true'
                    title='Read More'
                  >
                    <div className='relative transition-all aspect-square hover:-translate-y-2 hover:shadow-2xl'>
                      <Link
                        href={`/reads/${post._id}`}
                        data-ur1313m3t='true'
                        title='Read More'
                      >
                        <div className='relative transition-all aspect-square hover:-translate-y-2 hover:shadow-2xl'>
                          <span
                            style={{
                              boxSizing: 'border-box',
                              display: 'block',
                              overflow: 'hidden',
                              width: 'initial',
                              height: 'initial',
                              background: 'none',
                              opacity: 1,
                              border: '0px',
                              margin: '0px',
                              padding: '0px',
                              position: 'absolute',
                              inset: '0px',
                            }}
                          >
                            <img
                              // sizes="500vw"
                              alt='image'
                              title='image'
                              className='rounded'
                              src={BLOG_IMAGE_BASE_URL + post.image}
                              decoding='async'
                              data-nimg='fill'
                              height={0}
                              width={0}
                              style={{
                                position: 'absolute',
                                inset: '0px',
                                boxSizing: 'border-box',
                                padding: '0px',
                                border: 'none',
                                margin: 'auto',
                                display: 'block',
                                minWidth: '100%',
                                maxWidth: '100%',
                                minHeight: '100%',
                                maxHeight: '100%',
                                objectFit: 'fill',
                              }}
                            />
                            <noscript></noscript>
                          </span>
                        </div>
                      </Link>
                    </div>
                  </Link>
                  <div className='p-2'>
                    <h2 className='mt-2 font-semibold'>{post.title}</h2>

                    <div className='mt-1 flex justify-between text-xs font-semibold text-gray-600'>
                      <a
                        href={`/reads/topics/${post.topic}`}
                        className='text-blue-600 underline text-sm font-semibold'
                        title='Read More'
                      >
                        {post.topic}
                      </a>
                      <p>
                        {new Intl.DateTimeFormat('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        }).format(new Date(post?.createdAt))}
                      </p>
                    </div>

                    <div className='mt-1 flex justify-between text-xs font-semibold text-gray-600'>
                      <div className='mt-1 flex gap-1 text-xs font-semibold text-gray-600'>
                        <p>{t('pages.blog.writter')}</p>
                        <p>{post.writter}</p>
                      </div>

                      <div className='flex items-center gap-1'>
                        <p>{post.readTime}</p>
                        <p>{t('pages.blog.min')}</p>
                      </div>
                    </div>

                    <Link href={`/reads/${post._id}`} title='Read More'>
                      <button className='mt-3 font-medium text-white rounded-full bg-[#095668] px-5 py-1'>
                        <h3 className='inline-block text-sm font-medium text-white'>
                          {t('pages.blog.read_more')}
                        </h3>
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LatestBlogs;
