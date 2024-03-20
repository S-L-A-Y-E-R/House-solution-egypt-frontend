import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { API_BASE_URL, WEBSITE_BASE_URL } from "@/config";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const [footerLinks, setFooterLinks] = useState([]);
  const [aboutUs, setAboutUs] = useState({
    description: "",
    descriptionAr: "",
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
    fetchAboutUs();
  }, []);

  useEffect(() => {
    const fetchFooterLinks = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/footerlink`);
        setFooterLinks(response.data);
      } catch (error) {
        console.error("Error fetching footer links:", error);
      }
    };

    fetchFooterLinks();
  }, []);

  return (
    <footer className="bg-[#095668] text-white p-8">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="md:w-2/5">
          <h4 className="mb-4 text-2xl">
            {t("general.components.footer.about_us")}
          </h4>
          <div
            className="text-sm whitespace-wrap"
            dangerouslySetInnerHTML={{
              __html: isArabic ? aboutUs.descriptionAr : aboutUs.description,
            }}
          />
          <div className="flex gap-2 mt-2">
            <a
              href="https://www.facebook.com/House-Point-Egypt-112529918222923"
              title="Facebook"
            >
              <Image
                src="/assets/face.png"
                alt="facebook icon"
                width="35"
                height="35"
              />
            </a>
            <a
              href="https://www.instagram.com/housepointegypt/"
              title="Instagram"
            >
              <Image
                src="/assets/instagram.png"
                alt="instagram icon"
                width="35"
                height="35"
              />
            </a>
            <a href="https://twitter.com/Housep0integypt" title="Twitter">
              <Image
                src="/assets/twitter.png"
                alt="twitter icon"
                width="35"
                height="35"
              />
            </a>
            <a href="https://www.linkedin.com/" title="Linkedin">
              <Image
                src="/assets/linkedin.png"
                alt="linkedin icon"
                width="35"
                height="35"
              />
            </a>
            <a
              href="https://youtube.com/@HousepointEgypt?si=_fbbBMQSCYotsucU"
              title="Youtube"
            >
              <Image
                src="/assets/youtube.png"
                alt="youtube icon"
                width="35"
                height="35"
              />
            </a>
            <a
              href="https://t.me/housepointegypt"
              target="_blank"
              title="Telegram"
              className="mt-1"
            >
              <Image
                src="/assets/telegram.png"
                alt="Telegram Icon"
                width="27"
                height="27"
              />
            </a>
            <a
              href="https://www.tiktok.com/@house.point.egypt?_t=8ipx657pyac&_r=1"
              title="Tiktok"
              target="_blank"
            >
              <Image
                src="/assets/tiktok.webp"
                className="rounded m-1"
                alt="Tiktok Icon"
                width="28"
                height="28"
              />
            </a>
          </div>
        </div>

        <div className="md:w-3/5">
          <h4 className="mb-4 text-2xl">
            {t("general.components.footer.new_links")}
          </h4>
          <ul className="grid grid-cols-2 gap-1 font-semibold lg:grid-cols-3">
            {footerLinks.map((link, index) => (
              <li key={index} className="flex items-center underline">
                <a
                  href={isArabic && link ? '/ar/'+link.linkAr : link.link}
                  className="flex items-center gap-2"
                >
                  <Image
                    src="/assets/search.png"
                    alt="search"
                    width="25"
                    height="25"
                  />
                  <span>{isArabic ? link.titleAr : link.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-4 md:mt-24 text-center">
        <span className="ltr:hidden">© 2023</span>{" "}
        <a className="underline" href="https://HousePointEgypt.com">
          HousePointEgypt.com
        </a>
        <span className="rtl:hidden">© 2023</span>
      </div>
    </footer>
  );
};

export default Footer;
