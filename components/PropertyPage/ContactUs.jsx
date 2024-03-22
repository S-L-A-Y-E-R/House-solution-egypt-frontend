import React, { useEffect, useState } from "react";
import Link from "next/link";
import Router from "next/router";
import { useRouter } from "next/router";

import { Transition, Popover } from "@headlessui/react";
import { Fragment } from "react";

import { API_BASE_URL, PROPERTY_BASE_URL, WEBSITE_BASE_URL } from "@/config";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import axios from "axios";
import Swal from "sweetalert2";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function ContactUs({
  propertyImage,
  propertyTitle,
  propertyPrice,
  propertyRef,
  isArabic,
  currency,
  liveCurrency,
}) {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const { asPath } = useRouter();

  const fullUrl = `${WEBSITE_BASE_URL}${asPath}`;

  const [message, setMessage] = useState(
    isArabic
      ? `مرحبًا ، لقد وجدت العقار الخاص بك مع المرجع:${propertyRef}على House point Egypt. الرجاء الاتصال بي ، شكرا\n`
      : `Hi, I found your property with ref: ${propertyRef} on House Point. Please contact me. Thank you.\n
    `
  );
  const [name, setName] = useState(``);
  const [email, setEmail] = useState(``);
  const [mobile, setMobile] = useState(``);
  const [loading, setLoading] = useState(false);
  console.log(API_BASE_URL);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(API_BASE_URL + "/contact/submit", {
        name,
        email,
        mobile,
        message,
        propertyRef,
      });
      Swal.fire("Good job!", res.data.message, "success").then((e) => {
        Router.reload();
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("email")) setEmail(localStorage.getItem("email"));
    if (localStorage.getItem("user")) setName(localStorage.getItem("user"));
  }, []);
  return (
    <div className="border shadow ">
      <h6 className="px-2 py-1 font-bold text-center text-white rounded-sm bg-custom-blue">
        {t("pages.property.components.contact_us.request_property")}
      </h6>
      {/* <h5 className="my-3 text-xl font-bold text-slate-800">Inquiry Property</h5> */}
      <div className="flex justify-between gap-1 px-2 py-4 my-1">
        <button className="flex items-center w-1/3 gap-1 px-1 py-1 font-semibold text-white rounded bg-custom-blue">
          {" "}
          <Image src="/assets/phone.png" alt="phone" width="25" height="25" />
          <Link href={"tel:+201221409530"}
            rel="noreferrer noopener"
          >
            {t("pages.property.components.contact_us.call")}
          </Link>
        </button>
        <Popover className="relative w-1/3 h-full">
          {({ open }) => (
            <>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="fixed z-50 md:w-2/6 w-5/6 p-4 transform -translate-x-1/2 bg-white rounded shadow-[1px_1px_1px_9555px_rgba(0,0,0,0.7)] top-[20%] left-1/2 text-slate-800">
                  <h5 className="text-lg text-start">EMAIL US</h5>
                  <div className="flex w-full gap-2">
                    <img
                      src={PROPERTY_BASE_URL + propertyImage.image}
                      className="w-1/3"
                      alt="property"
                    />
                    <div className="flex flex-col items-start gap-2">
                      <h5 className="text-start">{propertyTitle}</h5>
                      <p className="text-lg font-semibold">
                        { }
                        {currency == "USD" &&
                          Number(
                            propertyPrice * liveCurrency.USD
                          ).toLocaleString()}
                        {currency == "EUR" &&
                          Number(
                            propertyPrice * liveCurrency.EUR
                          ).toLocaleString()}
                        {currency == "EGP" &&
                          Number(propertyPrice).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <form className="w-full my-2" onSubmit={handleSubmit}>
                    <textarea
                      className="w-full p-1 border"
                      placeholder="Your Message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                    <div className="flex flex-wrap gap-2">
                      <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full p-1 border"
                        onChange={(e) => setName(e.target.value)}
                        required
                        value={name}
                      />
                      <input
                        type="email"
                        placeholder="Your Email"
                        className="w-full p-1 border"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        value={email}
                      />
                      <PhoneInput
                        placeholder="Enter phone number"
                        defaultCountry="EG"
                        className="w-full p-1 border"
                        onChange={setMobile}
                        required
                      />
                    </div>
                    <button
                      className="flex items-center gap-1 px-4 py-1 my-1 font-semibold text-white rounded md:text-xl bg-custom-blue disabled:bg-slate-800"
                      disabled={loading}
                    >
                      Send
                    </button>
                  </form>
                </Popover.Panel>
              </Transition>
              <Popover.Button
                className={`${open ? "" : "text-opacity-90"
                  } flex gap-1 items-center hover:text-opacity-100 focus:outline-none focus-visible:ring-2 h-full focus-visible:ring-white focus-visible:ring-opacity-75 px-1 py-1 font-semibold text-white rounded w-full bg-custom-blue`}
                key="Email Button"
              >
                <Image
                  src="/assets/email.png"
                  alt="email"
                  width="25"
                  height="25"
                />
                <span>{t("pages.property.components.contact_us.email")}</span>
              </Popover.Button>
            </>
          )}
        </Popover>
        <a
          href={`https://api.whatsapp.com/send?phone=+201221409530&text=${encodeURI(
            message
          )} ${isArabic ? WEBSITE_BASE_URL + "/ar" + asPath : fullUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-1/3"
        >
          <button className="flex justify-center w-full gap-1 px-1 py-1 font-semibold text-white bg-green-500 rounded">
            <Image
              src="/assets/whatsapp.png"
              alt="whatsapp"
              width="25"
              height="25"
            />
          </button>
        </a>
      </div>
    </div>
  );
}
