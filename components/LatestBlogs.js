import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import { API_BASE_URL, BLOG_IMAGE_BASE_URL } from "@/config";
import Link from "next/link";
import Image from "next/legacy/image";
import Article from "./Blog/Article";
import blogStyle from '@/styles/BlogIndex.module.css'


function LatestBlogs() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Fetch latest blogs
    const fetchLatestBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/blog/latest`, {
          headers: {
            "accept-language": isArabic ? "ar" : "en",
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
      <div className="px-6 pt-20 pb-40 bg-emerland-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold leading-10 text-center uppercase font-heading">
            {t("LATEST BLOGS")}
          </h2>
          <div className={`grid max-w-6xl gap-2 mx-auto mt-10 ${blogStyle.container}`}>
            {loading && (
              <>
                {[1, 2, 3].map((e,i) => {
                  return (
                    <div key={i}>
                      <Skeleton className="block p-4 h-96" />
                      <Skeleton count={3} />
                    </div>
                  );
                })}
              </>
            )}
            {!loading &&
              latestBlogs.length > 0 &&
              latestBlogs.map((post) => (
                <Article post={post} isArabic={isArabic} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LatestBlogs;

