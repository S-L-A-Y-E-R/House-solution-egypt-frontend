import React from "react";
import { useTranslation } from "react-i18next";
import PropertiesByArea from "@/components/PropertiesByArea";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Searchbar from "@/components/Search/Searchbar";

function propertyByArea() {
  const { t } = useTranslation();
  return (
    <div>
      <Navbar />
      <div
        className="bg-[#ECF3FB] w-full h-full bg-cover bg-center p-4 text-black flex flex-col items-center font-sans mb-16"
        style={{
          backgroundImage: "url('/images/back_ground.jpg')",
        }}
      >
        <div className="mt-16 "></div>
        <div>
          <h3 className="text-lg font-semibold sm:text-xl md:text-2xl lg:text-3xl order-1 font-sans mb-16">
            {t("Buy Proprities")}
          </h3>
        </div>
        <Searchbar />
      </div>

      <PropertiesByArea />

      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
}

export default propertyByArea;
