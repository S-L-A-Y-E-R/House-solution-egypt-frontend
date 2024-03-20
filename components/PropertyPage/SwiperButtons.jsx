import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useSwiper } from "swiper/react";

export const SwiperNextButton = () => {
  const swiper = useSwiper();

  return (
    <button
      onClick={() => {
        swiper.slideNext();
      }}
      className={`rounded bg-slate-200 p-1 md:p-2 text-xs md:text-sm text-slate-600 md:w-8 ${
        swiper ? "hover:bg-slate-300" : "cursor-not-allowed opacity-60"
      }`}
    >
      <FaArrowRight className="rtl:rotate-180" />
    </button>
  );
};

export const SwiperPrevButton = () => {
  const swiper = useSwiper();

  return (
    <button
      onClick={() => {
        swiper.slidePrev();
      }}
      className={`rounded bg-slate-200 p-1 md:p-2 text-xs md:text-sm text-slate-600 md:w-8 ${
        swiper ? "hover:bg-slate-300" : "cursor-not-allowed opacity-60"
      }`}
    >
      <FaArrowLeft className="rtl:rotate-180" />
    </button>
  );
};
