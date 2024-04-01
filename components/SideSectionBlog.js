import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import PropertyCard from "./PropertyCard";
import axios from "axios";
import { API_BASE_URL } from "@/config";

function SideSectionBlog({ featuredProperties }) {
  const { t, i18n } = useTranslation();
  const uniqueKeywords = new Set();
  const uniqueTopics = new Map();
  const [blogsData, setBlogsData] = useState([]);
  const isArabic = i18n.language === "ar";
  const [liveCurrency, setLiveCurrency] = useState({ USD: 1, EUR: 1 });

  useEffect(() => {
    // Fetch topics data from API
    axios
      .get(`${API_BASE_URL}/blog`, {
        headers: {
          "accept-language": i18n.language === "ar" ? "ar" : "en",
        },
      })
      .then((response) => {
        setBlogsData(response.data);
      })
      .catch((error) => console.log(error));

    async function fetchCurrency() {
      try {
        const response = await axios.get(API_BASE_URL + "/utils/getcurrency");
        setLiveCurrency(response.data.currency);
      } catch (err) {
        console.log(err);
      }
    }
    fetchCurrency();
  }, []);

  blogsData.forEach((blog) => {
    if (!uniqueTopics.has(blog.topic)) {
      uniqueTopics.set(blog.topic, blog);
    }
  });
  return (
    <div className="mb-3 row" dir={isArabic ? "rtl" : "ltr"}>
      {!window.location.href.includes("topics") && (
        <>
          <h2 className="font-semibold text-2xl">{t("pages.blog.topics")}</h2>
          <div className="mt-4 flex flex-col">
            {Array.from(uniqueTopics.values()).map(
              (selectedBlog) =>
                selectedBlog.topic && (
                  <a
                    key={selectedBlog._id}
                    title={selectedBlog.topic}
                    className="col-12 p-[.25rem] mt-1 text-light badge bg-card text-decoration-none mb-1 text-white bg-[#095668] hover:opacity-70 rounded"
                    href={
                      i18n.language === "ar"
                        ? `/ar/reads/topics/${selectedBlog.topic.replaceAll(
                            " ",
                            "-"
                          )}`
                        : `/reads/topics/${selectedBlog.topic.replaceAll(
                            " ",
                            "-"
                          )}`
                    }
                    data-ur1313m3t="true"
                    style={{ textAlign: "center" }}
                  >
                    <h3 className="fs-6">{selectedBlog.topic}</h3>
                  </a>
                )
            )}
          </div>
        </>
      )}

      <div className="mt-2 p-2">
        <h2 className="font-semibold text-2xl">
          {t("pages.blog.feature_properties")}
        </h2>
        <div className="mt-4 flex flex-wrap">
          {featuredProperties.map((property) => {
            let propertyLink = `/`;
            if (property.type === "rent") {
              propertyLink =
                propertyLink + t("general.components.searchbar.rent");
            } else {
              propertyLink =
                propertyLink + t("general.components.searchbar.sale");
            }
            if (isArabic) {
              propertyLink = propertyLink + "/" + property.propertyType.nameAr;
              propertyLink = propertyLink + "/" + property.area.nameAr;
              propertyLink = propertyLink + "/" + property.subarea.nameAr;
              propertyLink =
                propertyLink +
                "/" +
                property.titleAr +
                "-" +
                property.refNumber;
            } else {
              propertyLink =
                propertyLink + "/" + property.propertyType.name.toLowerCase();
              propertyLink =
                propertyLink + "/" + property.area.name.toLowerCase();
              propertyLink =
                propertyLink + "/" + property.subarea.name.toLowerCase();
              propertyLink =
                propertyLink +
                "/" +
                property.title.toLowerCase() +
                "-" +
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
                  property.type == "rent"
                    ? t("general.components.searchbar.rent")
                    : t("general.components.searchbar.sale")
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
      </div>

      <div className="mt-2 p-2">
        {!window.location.href.includes("tags") && (
          <>
            <h2 className="font-semibold text-2xl">{t("pages.blog.tags")}</h2>
            <div className="mt-4 flex flex-wrap">
              {blogsData.map((blog) => {
                // Split keywords into an array
                const keywordsArray = blog.tag.split(",");

                // Filter and keep track of unique keywords
                const uniqueKeywordsArray = keywordsArray.filter(
                  (keyword) => !uniqueKeywords.has(keyword.trim().toLowerCase())
                );

                // Add unique keywords to the set
                uniqueKeywordsArray.forEach((keyword) =>
                  uniqueKeywords.add(keyword.trim().toLowerCase())
                );

                return (
                  uniqueKeywordsArray.join(", ") && (
                    <a
                      key={blog._id}
                      title={uniqueKeywordsArray.join(", ")}
                      className="bg-[#095668] text-white hover:opacity-70 rounded col text-light badge bg-card me-1 mb-1 text-start text-decoration-none border border-[#yourbordercolor]"
                      //   href={`/reads/${blog._id.toLowerCase().replace(/ /g, "-")}`}
                      href={`/reads/tags/${uniqueKeywordsArray
                        .join(", ")
                        .replaceAll(" ", "-")
                        .replaceAll("?", "_qm_")}`}
                      data-ur1313m3t="true"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <h3 style={{ fontSize: "12px", padding: ".1rem .5rem" }}>
                        # {uniqueKeywordsArray.join(", ")}{" "}
                        <span className={"text-thin"}>
                          [
                          <b>
                            {
                              blogsData.filter(
                                (blog) =>
                                  blog.tag.toLowerCase() ===
                                  uniqueKeywordsArray.join(", ").toLowerCase()
                              ).length
                            }
                          </b>
                          ]
                        </span>
                      </h3>
                    </a>
                  )
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SideSectionBlog;
