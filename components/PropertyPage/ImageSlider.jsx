import { PROPERTY_BASE_URL } from "@/config";
import React, { useState } from "react";
import { Transition, Popover } from "@headlessui/react";
import { Fragment } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { SwiperNextButton, SwiperPrevButton } from "./SwiperButtons";
import Image from "next/legacy/image";
import { Autoplay, Thumbs } from "swiper/modules";
import { useTranslation } from "react-i18next";

export default function ImageSlider({ setShowTitle, mainimage, images, title }) {
  const { t, i18n } = useTranslation();
  const [imageError, setImageError] = useState(false);
  const [select, setSelect] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <div className="hidden">
        <Swiper
          className="relative"
          pagination={true}
          navigation
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
        >
          <span slot="container-start">
            <div className="absolute z-50 top-1/2 left-2">
              <SwiperNextButton />
            </div>
            <div className="absolute z-50 top-1/2 right-2">
              <SwiperPrevButton />
            </div>
          </span>
          {images.map((image, index) => {
            //style={{ aspectRatio: 729 / 328 }}
            return (
              <SwiperSlide key={index} className="!flex !h-auto items-center">
                <Image
                  priority={true}
                  src={PROPERTY_BASE_URL + image.image}
                  alt="Image_Of_Property"
                  className="mx-auto md:max-h-[500px] object-contain"
                  style={{ objectFit: "contain" }}
                  width={1600}
                  height={1200}
                  title="Image_Of_Property"
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <Popover className="relative w-full h-full">
        {({ open, close }) => (
          <>
          {setShowTitle(open)}
            <Popover.Button
              style={{
                "--image-url": `url(${PROPERTY_BASE_URL + images[0].image})`,
              }}
              className={`
${open ? "" : "text-opacity-90"}
w-full flex justify-between items-center rounded-md text-sm hover:text-opacity-100 focus:outline-none focus-visible:ring-2 h-full focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <div className="w-full bg-gray-800 p-1 pb-0 rounded">
                <div className="flex gap-1">
                  <div
                    className={`${
                      images.length < 2
                        ? "flex w-full"
                        : "w-1/2 space-y-0.5 lg:space-y-0"
                    }`}
                  >
                    {!imageError ? (
                      <Image
                        src={PROPERTY_BASE_URL + mainimage.image}
                        objectFit=""
                        width={1600}
                        height={1220}
                        placeholder="blur"
                        className="rounded"
                        blurDataURL={mainimage.placeholder}
                        onError={() => setImageError(true)}
                        alt="Image_Of_Property"
                        title="Image_Of_Property"
                      />
                    ) : (
                      <Image
                        src={PROPERTY_BASE_URL + "original/" + mainimage.image}
                        objectFit=""
                        width={1600}
                        height={1220}
                        placeholder="blur"
                        className="rounded"
                        blurDataURL={mainimage.placeholder}
                        title="Image_Of_Property"
                      />
                    )}
                    {images[0] && (
                      <div>
                        <Image
                          src={PROPERTY_BASE_URL + images[0].image}
                          objectFit=""
                          width={1600}
                          height={1220}
                          placeholder="blur"
                          className="rounded"
                          blurDataURL={images[0].placeholder}
                          alt="Image_Of_Property"
                          title="Image_Of_Property"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col w-1/2 gap-1">
                    {images[1] && (
                      <Image
                        src={PROPERTY_BASE_URL + images[1].image}
                        alt="Image_Of_Property"
                        title="Image_Of_Property"
                        placeholder="blur"
                        // objectFit="cover"
                        className="rounded"
                        s
                        width={1600}
                        height={
                          images.length < 3
                            ? 2400
                            : images.length < 4
                            ? 1220
                            : 810
                        }
                        blurDataURL={images[1].placeholder}
                      />
                    )}

                    {images[2] && (
                      <Image
                        src={PROPERTY_BASE_URL + images[2].image}
                        placeholder="blur"
                        // objectFit="cover"
                        className="rounded"
                        width={1600}
                        height={images.length < 4 ? 1220 : 810}
                        blurDataURL={images[2].placeholder}
                        alt="Image_Of_Property"
                        title="Image_Of_Property"
                      />
                    )}

                    {images[3] && (
                      <div className="relative">
                        {images.length > 4 && (
                          <div>
                            <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-3xl md:text-5xl">
                              {"+" + (images.length - 5)}
                            </div>
                            <div class="absolute rounded top-0 left-0 bg-black opacity-50 z-10 w-full h-[97%] md:h-[99%]"></div>
                          </div>
                        )}

                        <Image
                          src={PROPERTY_BASE_URL + images[3].image}
                          placeholder="blur"
                          className="rounded"
                          width={1600}
                          height={810}
                          blurDataURL={images[3].placeholder}
                          alt="Image_Of_Property"
                          s
                          title="Image_Of_Property"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="bg-[#212529] overflow-y-auto h-full top-0 left-0 overflow-hidden fixed z-50 w-full shadow-[1px_1px_1px_9555px_rgba(0,0,0,0.7)]">
                <div className="hidden md:block sticky top-0 z-10">
                  {select && (
                    <button
                      className="bg-custom-blue text-white rounded px-4 py-1 absolute top-1/2 left-2 -translate-y-1/2 z-50"
                      onClick={() => {
                        setSelectedImageIndex(null);
                        setSelect(false);
                      }}
                    >
                      Back
                    </button>
                  )}
                  <div className="bg-white w-full h-14 pl-20 pr-12 flex justify-center items-center">
                    {title} - Gallery -
                  </div>
                  <button
                    className="absolute pt-1 top-1/2 right-2 -translate-y-1/2 z-50"
                    onClick={(e) => { setShowTitle(false); close();}}
                  >
                    <Image
                      src="/assets/close.png"
                      width={40}
                      height={40}
                      alt="close"
                      title="close Sign"
                    />
                  </button>
                </div>
                {!select ? (
                  <div className="hidden md:block">
                    <div className="w-full p-4 grid gap-4 lg:grid-cols-3 md:grid-cols-2">
                      {images?.map((image, index) => (
                        <div
                          key={index}
                          onClick={(e) => {
                            setSelectedImageIndex(index);
                            setSelect(true);
                            setShowTitle(true)
                          }}
                        >
                          <Image
                            src={PROPERTY_BASE_URL + image?.image}
                            alt="Image_Of_Property"
                            className="object-contain rounded"
                            width={1600}
                            height={1200}
                            title="Image_Of_Property"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="hidden md:flex relative w-full h-full flex-col justify-center items-center px-8">
                    <Swiper
                      className="relative w-full !hidden md:!block"
                      pagination={true}
                      navigation
                      loop={true}
                      modules={[Thumbs, Autoplay]}
                      initialSlide={selectedImageIndex}
                      onSwiper={setThumbsSwiper}
                      thumbs={{
                        swiper:
                          thumbsSwiper && !thumbsSwiper.destroyed
                            ? thumbsSwiper
                            : null,
                      }}
                      dir={i18n.language === "ar" ? "rtl" : "ltr"}
                    >
                      <span slot="container-start">
                        <div
                          className="absolute z-50 top-1/2 ltr:right-2 rtl:left-2"
                          onClick={() => {
                            setSelectedImageIndex(
                              selectedImageIndex === images.length - 1
                                ? 0
                                : selectedImageIndex + 1
                            );
                          }}
                        >
                          <SwiperNextButton />
                        </div>
                        <div
                          className="absolute z-50 top-1/2 ltr:left-2 rtl:right-2"
                          onClick={() => {
                            setSelectedImageIndex(
                              selectedImageIndex <= 0
                                ? images.length - 1
                                : selectedImageIndex - 1
                            );
                          }}
                        >
                          <SwiperPrevButton />
                        </div>
                      </span>
                      {images.map((image, index) => {
                        //style={{ aspectRatio: 729 / 328 }}
                        return (
                          <SwiperSlide
                            key={index}
                            className="!flex !h-auto justify-center items-center mt-10 "
                          >
                            <Image
                              src={PROPERTY_BASE_URL + image.image}
                              alt="Image_Of_Property"
                              className="absolute top-0 md:max-h-[500px] object-contain"
                              style={{ objectFit: "contain" }}
                              width={1000}
                              height={600}
                              title="Image_Of_Property"
                            />
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                    <Swiper
                      modules={[Thumbs]}
                      watchSlidesProgress={true}
                      centeredSlides={true}
                      slideToClickedSlide={true}
                      watchSlidesVisibility={true}
                      slidesPerView={7}
                      slidesPerGroup={1}
                      spaceBetween={10}
                      freeMode={true}
                      loop={true}
                      onSwiper={setThumbsSwiper}
                      className="mt-10 flex gap-4 w-full md:h-28 lg:h-32"
                      dir={i18n.language === "ar" ? "rtl" : "ltr"}
                    >
                      {images?.map((image, index) => (
                        <SwiperSlide
                          key={index}
                          onClick={() => {
                            setSelectedImageIndex(index);
                          }}
                          className={`rounded overflow-hidden ${
                            selectedImageIndex === index
                              ? "border-4 border-custom-blue"
                              : "m-1 opacity-[50%] contrast-[100%] grayscale-[100%]"
                          }`}
                        >
                          <Image
                            src={PROPERTY_BASE_URL + image?.image}
                            alt={`Thumbnail_${index}`}
                            className="object-cover !w-full !h-full"
                            layout="fill"
                            onClick={() => thumbsSwiper.slideTo(index)}
                            title="Thumbnail_Image_Of_Property"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                )}

                <div className="bg-gray-800 flex flex-col h-full gap-1 overflow-y-scroll md:hidden pb-1 px-1">
                  <div className="bg-white sticky md:hidden top-0 z-10 text-sm w-full h-fit pl-4 pr-10 py-2 flex justify-center items-center">
                    <div>{title} - Gallery -</div>
                    <button
                      className="absolute pt-1 top-1/2 right-2 -translate-y-1/2 z-50"
                      onClick={(e) => close()}
                    >
                      <Image
                        src="/assets/close.png"
                        width={30}
                        height={30}
                        alt="close"
                        title="close"
                      />
                    </button>
                  </div>
                  {images.map((image, index) => {
                    //style={{ aspectRatio: 729 / 328 }}
                    return (
                      <div key={index} className="w-full">
                        <Image
                          src={PROPERTY_BASE_URL + image.image}
                          alt="Image_Of_Property"
                          className="mx-auto md:max-h-[500px] object-contain rounded"
                          style={{ objectFit: "contain", maxWidth: "100%" }}
                          width={1600}
                          height={1200}
                          title="Image_Of_Property"
                        />
                      </div>
                    );
                  })}
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </>
  );
}
