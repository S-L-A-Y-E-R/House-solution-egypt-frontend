import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { FaAngleDown, FaCheckCircle } from "react-icons/fa";
import { Fragment } from "react";
import { Combobox, Transition, Listbox, Popover } from "@headlessui/react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CiFilter } from "react-icons/ci";
import { API_BASE_URL } from "@/config";
import { PulseLoader } from "react-spinners";
import { IoFilter } from "react-icons/io5";
import { FaBuilding } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa";
import { IoBed } from "react-icons/io5";

import Image from "next/legacy/image";

function Searchbar({ showModal, setShowModal }) {
  const [query, setQuery] = useState("");
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const router = useRouter();
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [selectedPropertyLocation, setSelectedPropertyLocation] = useState("");
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const [selectedMinPropertyArea, setSelectedMinPropertyArea] = useState("");
  const [selectedMaxPropertyArea, setSelectedMaxPropertyArea] = useState("");
  const [selectedFinishingLevel, setSelectedFinishingLevel] = useState("");
  const [selectedBedroom, setSelectedBedroom] = useState(null);
  const [selectedBathroom, setSelectedBathroom] = useState(null);
  const [selectedSubArea, setSelectedSubArea] = useState(null);
  const [type, setType] = useState(t("general.components.searchbar.rent"));
  const [loading, setLoading] = useState(false);
  const [propertyLocation, setPropertyLocation] = useState([]);
  const filteredLocations =
    query === ""
      ? propertyLocation
      : propertyLocation.filter((location) =>
          !isArabic
            ? location.name
                .toLowerCase()
                .replace(/\s+/g, "")
                .includes(query.toLowerCase().replace(/\s+/g, ""))
            : location.nameAr
                .toLowerCase()
                .replace(/\s+/g, "")
                .includes(query.toLowerCase().replace(/\s+/g, ""))
        );
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [properties, setProperties] = useState([]);
  const [finishingLevel, setFinishingLevel] = useState([]);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const pricesRent = [
    10000, 20000, 30000, 40000, 50000, 60000, 70000, 90000, 100000, 120000,
    140000, 170000, 200000, 250000, 300000, 400000, 500000,
  ];
  const pricesSale = [
    1000000, 2000000, 3000000, 4000000, 5000000, 6000000, 7000000, 8000000,
    9000000, 10000000, 15000000, 20000000, 30000000, 40000000, 50000000,
    60000000, 70000000, 100000000,
  ];
  const [countProperties, setCountProperties] = useState(0);
  const [countState, setCountState] = useState(null);
  const [countLoading, setCountLoading] = useState(false);
  useEffect(() => {
    const fetchCount = async () => {
      try {
        setCountLoading(true);
        let queryParams = [];
        if (type) {
          queryParams.push(`type=${encodeURIComponent(type)}`);
        }
        if (selectedPropertyLocation)
          queryParams.push(
            `area=${encodeURIComponent(selectedPropertyLocation)}`
          );
        if (selectedPropertyType)
          queryParams.push(
            `propertyType=${encodeURIComponent(selectedPropertyType)}`
          );
        if (selectedSubArea)
          queryParams.push(`subArea=${encodeURIComponent(selectedSubArea)}`);
        if (selectedBedroom)
          queryParams.push(`beds=${encodeURIComponent(selectedBedroom)}`);
        if (selectedBathroom)
          queryParams.push(`baths=${encodeURIComponent(selectedBathroom)}`);
        if (minPrice)
          queryParams.push(`minPrice=${encodeURIComponent(minPrice)}`);
        if (maxPrice)
          queryParams.push(`maxPrice=${encodeURIComponent(maxPrice)}`);
        if (selectedFinishingLevel)
          queryParams.push(
            `furnitureSetting=${encodeURIComponent(selectedFinishingLevel)}`
          );
        if (selectedMinPropertyArea)
          queryParams.push(
            `minPropertyArea=${encodeURIComponent(selectedMinPropertyArea)}`
          );
        if (selectedMaxPropertyArea)
          queryParams.push(
            `maxPropertyArea=${encodeURIComponent(selectedMaxPropertyArea)}`
          );
        const response = await axios.get(
          API_BASE_URL + `/property/count?${queryParams.join("&")}`
        );
        setCountProperties(response.data.count);
        setCountLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    if (countState != null) fetchCount();
  }, [countState]);

  useEffect(() => {
    const fetchInput = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/utils/allinput`);
        setPropertyLocation(response.data.areas);
        setPropertyTypes(response.data.propertyTypes);
        setFinishingLevel(response.data.furnitureSetting);
        const {
          query: {
            beds,
            baths,
            minPrice,
            maxPrice,
            furnitureSetting,
            minPropertyArea,
            maxPropertyArea,
            type,
            propertyType,
            location,
            subArea,
          },
        } = router;
        if (type && type !== "for-rent-or-sale")
          setType(
            type == t("general.components.searchbar.rent").toLowerCase()
              ? t("general.components.searchbar.rent")
              : t("general.components.searchbar.sale")
          );
        if (propertyType && propertyType !== "properties")
          setSelectedPropertyType(propertyType);
        if (location && location !== "location")
          setSelectedPropertyLocation(location.split("-").join(" "));
        if (subArea) setSelectedSubArea(subArea.split("-").join(" "));
        if (beds) setSelectedBedroom(beds);
        if (baths) setSelectedBathroom(baths);
        if (minPropertyArea) setSelectedMinPropertyArea(minPropertyArea);
        if (maxPropertyArea) setSelectedMaxPropertyArea(maxPropertyArea);
        if (minPrice) setMinPrice(minPrice);
        if (maxPrice) setMaxPrice(maxPrice);
        if (furnitureSetting) setSelectedFinishingLevel(furnitureSetting);
        setCountState(!countState);
      } catch (err) {
        console.log(err);
      }
    };
    fetchInput();
  }, [router]);
  const toggleAdvancedSearch = () => {
    setShowAdvancedSearch(!showAdvancedSearch);
  };
  const handleSearchSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const trimmedPropertyType = selectedPropertyType.trim();
      // if (tag) queryParams.push(`tag=${encodeURIComponent(tag)}`);
      const queryStr = {};
      if (selectedBedroom) queryStr.beds = selectedBedroom;
      if (selectedBathroom) queryStr.baths = selectedBathroom;
      if (minPrice) queryStr.minPrice = minPrice;
      if (maxPrice) queryStr.maxPrice = maxPrice;
      if (selectedFinishingLevel)
        queryStr.furnitureSetting = selectedFinishingLevel;
      if (selectedMinPropertyArea)
        queryStr.minPropertyArea = selectedMinPropertyArea;
      if (selectedMaxPropertyArea)
        queryStr.maxPropertyArea = selectedMaxPropertyArea;
      // if (tag) queryStr.tag = tag
      let pathName = `/${
        type ? type : isArabic ? "إيجار-أو-بيع" : "for-rent-or-sale"
      }/${
        trimmedPropertyType?.split(" ").join("-")
          ? trimmedPropertyType?.split(" ").join("-")
          : isArabic
          ? "عقارات"
          : "properties"
      }`;

      if (selectedSubArea) {
        filteredLocations.map((location) => {
          location.subareas.map((subArea) => {
            if (
              subArea.name.toLowerCase() == selectedSubArea.toLowerCase() ||
              subArea.nameAr == selectedSubArea
            )
              pathName =
                pathName +
                `/${isArabic ? location.nameAr : location.name}`
                  .split(" ")
                  .join("-") +
                `/${selectedSubArea}`.split(" ").join("-");
          });
        });
      } else if (selectedPropertyLocation) {
        pathName =
          pathName + `/${selectedPropertyLocation}`.split(" ").join("-");
      } else {
        // if (isArabic) {
        //   pathName = pathName + "/منطقة"
        // } else {
        //   pathName = pathName + "/location"
        // }
      }
      router
        .push(
          {
            pathname: pathName.toLowerCase(),
            query: queryStr,
          },
          undefined,
          { shallow: true }
        )
        .then((e) => router.reload());
    } catch (error) {
      console.error("Error searching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClickSale = (e) => {
    setType(e.target.value);
    setCountState(!countState);
  };
  const handleClickRent = (e) => {
    setType(e.target.value);
    setCountState(!countState);
  };
  const handleAreaAndSubAreaChange = (e) => {
    let flag = true;
    propertyLocation.map((f) => {
      if (f.name === e || f.nameAr === e) flag = false;
    });
    if (flag) {
      setSelectedPropertyLocation(null);
      setSelectedSubArea(e);
    } else {
      setSelectedPropertyLocation(e);
      setSelectedSubArea(null);
    }
    setCountState(!countState);
  };
  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
    setMaxPrice("");
    setCountState(!countState);
  };
  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
    setCountState(!countState);
  };
  const handleBedroomSelection = (number) => {
    setSelectedBedroom(number);
    setCountState(!countState);
  };
  const handleBathroomSelection = (number) => {
    setSelectedBathroom(number);
    setCountState(!countState);
  };

  if (!showModal)
    return (
      <div className="flex flex-col items-center justify-center w-full lg:w-[90%] mx-auto  py-1 rounded-lg shadow-lg text-custom-blue lg:h-fit bg-custom-blue">
        <div className="w-full py-1">
          <div className="flex flex-col justify-between gap-2 mx-6 md:items-end md:flex-row rtl:my-8">
            {/* <div className="md:flex gap-2 hidden">
              <button
                onClick={handleClickRent}
                className={`text ${
                  type == t("general.components.searchbar.rent")
                    ? "bg-custom-blue-darker  border-2 border-custom-blue text-white"
                    : "bg-white text-custom-blue"
                } hover:shadow-lg shadow text-lg border-white border font-semibold px-5 py-1 rounded-lg`}
                value={t("general.components.searchbar.rent")}
              >
                {t("general.components.searchbar.rent")}
              </button>
              <button
                className={`text  text-lg capitalize ${
                  type == t("general.components.searchbar.sale")
                    ? "bg-custom-blue-darker  border-2 border-custom-blue text-white"
                    : "bg-white text-custom-blue"
                } hover:shadow-lg shadow border-white border rounded-lg font-semibold px-5 py-1`}
                value={t("general.components.searchbar.sale")}
                onClick={handleClickSale}
              >
                {t("general.components.searchbar.sale")}
              </button>
            </div> */}
            <div className="md:flex hidden items-center justify-end gap-1 text-white">
              {t("general.components.searchbar.show")} (
              {countLoading ? (
                <PulseLoader size={2} color="white" />
              ) : (
                countProperties
              )}
              ) {t("general.components.searchbar.result")}
            </div>
          </div>

          <div className="px-4 mx-auto sm:items-center sm:px-6 lg:px-8">
            <form onSubmit={handleSearchSubmit}>
              <div className="mt-5 md:row md:flex">
                <div className="relative mx-1">
                  <Combobox onChange={handleAreaAndSubAreaChange}>
                    <div className="relative !h-full mt-1 ">
                      <div className="relative flex w-full !h-full px-2 py-2 overflow-hidden text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                        <Combobox.Input
                          className={`w-full py-2 text-sm leading-5 text-gray-900 border-none focus:ring-0 ${
                            selectedPropertyLocation || selectedSubArea
                              ? "placeholder:text-gray-900"
                              : ""
                          }`}
                          onChange={(event) => setQuery(event.target.value)}
                          placeholder={
                            selectedSubArea
                              ? selectedSubArea
                              : selectedPropertyLocation
                              ? selectedPropertyLocation
                              : t(
                                  "general.components.searchbar.location_searchbar_placeholder"
                                )
                          }
                        />
                        <Combobox.Button
                          className="inset-y-0 right-0 z-10 flex items-center px-2 py-2 ml-2 ltr:border-l rtl:border-r border-gray-300"
                          aria-label="DropDownPropertyArea"
                          name="DropDownPropertyArea"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <FaAngleDown />
                        </Combobox.Button>
                      </div>

                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery("")}
                      >
                        <Combobox.Options className="absolute z-20 w-full mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {filteredLocations.length === 0 && query !== "" ? (
                            <div className="relative px-4 py-2 text-gray-700 cursor-default select-none">
                              {t("general.components.searchbar.no_options")}
                            </div>
                          ) : (
                            filteredLocations.map((location, i) => {
                              return (
                                <div key={i}>
                                  <Combobox.Option
                                    key={location._id}
                                    className={({ active }) =>
                                      `relative cursor-default select-none py-2 pl-5  pr-4 ${
                                        active
                                          ? "bg-teal-800 text-white"
                                          : "bg-gray-700 text-white"
                                      }`
                                    }
                                    value={
                                      i18n.language === "en"
                                        ? location.name
                                        : location.nameAr
                                    }
                                    defaultChecked={
                                      location == selectedPropertyLocation
                                    }
                                  >
                                    {({ selected, active }) => (
                                      <>
                                        <span
                                          className={`truncate flex gap-1 items-center ${
                                            selected
                                              ? "font-medium"
                                              : "font-normal"
                                          }`}
                                        >
                                          <Image
                                            src="/assets/pin-location.png"
                                            width="20"
                                            height="20"
                                            alt="Pin"
                                            title="Pin"
                                          />
                                          {i18n.language === "en"
                                            ? location.name
                                            : location.nameAr}
                                        </span>
                                        {selected ? (
                                          <span
                                            className={`absolute inset-y-0 left-0 flex items-center ${
                                              active
                                                ? "text-white"
                                                : "text-teal-700"
                                            }`}
                                          >
                                            <FaCheckCircle
                                              className={`ml-1 ${
                                                active
                                                  ? "text-white"
                                                  : "text-teal-600"
                                              }`}
                                            />
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </Combobox.Option>
                                  {location.subareas.map((subArea) => {
                                    return (
                                      <Combobox.Option
                                        key={subArea._id}
                                        className={({ active }) =>
                                          `relative cursor-default select-none py-2 pl-9 pr-4 ${
                                            active
                                              ? "bg-teal-600 text-white"
                                              : "bg-gray-700 text-white mb-[1px]"
                                          }`
                                        }
                                        value={
                                          i18n.language === "en"
                                            ? subArea.name
                                            : subArea.nameAr
                                        }
                                        defaultChecked={
                                          subArea == selectedSubArea
                                        }
                                      >
                                        {({ selected, active }) => (
                                          <>
                                            <span
                                              className={`truncate flex gap-1 items-center ${
                                                selected
                                                  ? "font-medium"
                                                  : "font-normal"
                                              }`}
                                            >
                                              <Image
                                                src="/assets/pin-location.png"
                                                width="20"
                                                height="20"
                                                alt="pin"
                                                title="pin"
                                              />
                                              {i18n.language === "en"
                                                ? subArea.name
                                                : subArea.nameAr}
                                            </span>
                                            {selected ? (
                                              <span
                                                className={`absolute inset-y-0 left-0 flex items-center ${
                                                  active
                                                    ? "text-white"
                                                    : "text-teal-600"
                                                }`}
                                              >
                                                <FaCheckCircle
                                                  className={`ml-1 ${
                                                    active
                                                      ? "text-white"
                                                      : "text-teal-600"
                                                  }`}
                                                />
                                              </span>
                                            ) : null}
                                          </>
                                        )}
                                      </Combobox.Option>
                                    );
                                  })}
                                </div>
                              );
                            })
                          )}
                        </Combobox.Options>
                      </Transition>
                    </div>
                  </Combobox>
                </div>
                <div className="relative mx-1 hidden md:block">
                  <div className="relative w-full !h-full font-heading ">
                    <Listbox
                      onChange={(e) => {
                        setSelectedPropertyType(e);
                        setCountState(!countState);
                      }}
                    >
                      <div className="relative !h-full mt-1 hover:cursor-pointer">
                        <Listbox.Button
                          className="relative flex justify-between items-center w-full !h-full px-2 py-4 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm lg:w-44"
                          aria-label="DropDownPropertyType"
                          name="DropDownPropertyType"
                        >
                          <span className="block font-semibold truncate">
                            {selectedPropertyType ||
                              t(
                                "general.components.searchbar.all_property_type"
                              )}
                          </span>
                          <span className="flex pr-2 pointer-events-none ">
                            <FaAngleDown name="DropDownPropertyType" />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute z-20 w-full mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {propertyTypes.map((propertyType, personIdx) => (
                              <Listbox.Option
                                key={personIdx}
                                className={({ active }) =>
                                  `relative  mb-[1px] cursor-default pl-8 select-none py-2  pr-4 ${
                                    active
                                      ? "bg-teal-700 text-white"
                                      : "bg-gray-700 text-white"
                                  }`
                                }
                                value={
                                  isArabic
                                    ? propertyType.nameAr
                                    : propertyType.name
                                }
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate text-sm ${
                                        selected
                                          ? "font-medium"
                                          : "font-semibold"
                                      }`}
                                    >
                                      {isArabic
                                        ? propertyType.nameAr
                                        : propertyType.name}
                                    </span>
                                    {selected ? (
                                      <span className="absolute inset-y-0 left-0 flex items-center text-teal-600">
                                        <FaCheckCircle className="text-teal-700" />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>
                </div>

                <div className="relative flex-grow mx-1 hidden md:block">
                  <div className="relative flex items-center w-full !h-full mt-1 font-heading">
                    <Popover className="relative w-full !h-full">
                      {({ open }) => (
                        <>
                          <Popover.Button
                            aria-label="DropDownPropertyBedBath"
                            name="DropDownPropertyBedBath"
                            className={`
                ${open ? "" : "text-opacity-90"}
                !w-full !h-full flex justify-between items-center rounded-md bg-white px-2 py-4 sm:text-sm hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 shadow-md lg:w-32`}
                          >
                            <span className="font-semibold">
                              {selectedBedroom}{" "}
                              {t("general.components.searchbar.bed")}
                              {" & "}
                              {selectedBathroom}{" "}
                              {t("general.components.searchbar.bath")}
                            </span>
                            <FaAngleDown
                              className={`${
                                open ? "text-opacity-70" : "text-opacity-100"
                              }
                    transition duration-150 ease-in-out group-hover:text-opacity-100`}
                              aria-hidden="true"
                            />
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
                            <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl">
                              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                <div className="relative bg-white p-7 ">
                                  <div className="grid gap-8 lg:grid-cols-2">
                                    <div className="py-1" role="none">
                                      <h6 className="px-4 py-2 text-lg font-semibold text-gray-700">
                                        {t("general.components.searchbar.beds")}
                                      </h6>
                                      <div className="flex flex-wrap px-4 py-1">
                                        {[1, 2, 3, 4, 5, 6].map((number) => (
                                          <button
                                            key={number}
                                            type="button"
                                            value={number}
                                            className={`btn-sm mx-1 rounded px-3 py-2 transition-all ${
                                              selectedBedroom === number
                                                ? "bg-custom-blue text-white"
                                                : "bg-white text-slate-800"
                                            }`}
                                            onClick={() =>
                                              handleBedroomSelection(number)
                                            }
                                          >
                                            {number}
                                          </button>
                                        ))}
                                      </div>
                                    </div>
                                    <div className="py-1" role="none">
                                      <h6 className="px-4 py-2 text-lg font-semibold text-gray-700">
                                        {t(
                                          "general.components.searchbar.baths"
                                        )}
                                      </h6>
                                      <div className="flex flex-wrap px-4 py-1">
                                        {[1, 2, 3, 4, 5, 6].map((number) => (
                                          <button
                                            key={number}
                                            type="button"
                                            value={number}
                                            className={`btn-sm mx-1 rounded px-3 py-2 transition-all ${
                                              selectedBathroom === number
                                                ? "bg-custom-blue text-white"
                                                : "bg-white text-slate-800"
                                            }`}
                                            onClick={() =>
                                              handleBathroomSelection(number)
                                            }
                                          >
                                            {number}
                                          </button>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      setSelectedBathroom("");
                                      setSelectedBedroom("");
                                    }}
                                    className="px-4 text-right underline text-custom-blue hover:text-blue-800"
                                  >
                                    {t("general.components.searchbar.reset")}
                                  </button>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  </div>
                </div>

                <div className="relative flex-grow mx-1 hidden md:block">
                  <div className="relative flex items-center w-full !h-full mt-1">
                    <Popover className="relative w-full !h-full ">
                      {({ open, close }) => (
                        <>
                          <Popover.Button
                            className={`
                ${open ? "" : "text-opacity-90"}
                !w-full !h-full flex justify-between items-center rounded-md bg-white py-4 px-2 sm:text-sm hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 shadow-md lg:w-32`}
                          >
                            {minPrice === "" || maxPrice === "" ? (
                              <span className="font-semibold">
                                {t("general.components.searchbar.prices")}
                              </span>
                            ) : (
                              <span className="font-semibold">{`[${minPrice} - ${maxPrice}] EGP`}</span>
                            )}
                            <FaAngleDown
                              className={`${
                                open ? "text-opacity-70" : "text-opacity-100"
                              }
                    transition duration-150 ease-in-out group-hover:text-opacity-100`}
                              aria-hidden="true"
                              aria-label="DropDownPropertyArea"
                              name="DropDownPropertyArea"
                            />
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
                            <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 transform -translate-x-1/2 rounded left-1/2 sm:px-0 lg:max-w-fit ">
                              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                <div className="relative flex bg-white p-7 ">
                                  <div className="px-2 py-4" role="none">
                                    <h6 className="text-lg font-semibold text-gray-700">
                                      {t("general.components.searchbar.prices")}
                                    </h6>
                                    <div className="mt-2">
                                      <div className="flex gap-2">
                                        <div className="">
                                          <div className="form-floating">
                                            <select
                                              placeholder="Min. Price EGP"
                                              type="number"
                                              style={{ width: "160px" }}
                                              id="min_price"
                                              name="min_price"
                                              className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm form-select focus:outline-none sm:text-sm"
                                              value={minPrice}
                                              onChange={handleMinPriceChange}
                                            >
                                              <option value="">
                                                {t(
                                                  "general.components.searchbar.minprice"
                                                )}
                                              </option>
                                              {type ===
                                                t(
                                                  "general.components.searchbar.sale"
                                                ) &&
                                                pricesSale.map((e, index) => {
                                                  return (
                                                    <option
                                                      value={e}
                                                      key={index}
                                                    >
                                                      {e}
                                                    </option>
                                                  );
                                                })}
                                              {type ===
                                                t(
                                                  "general.components.searchbar.rent"
                                                ) &&
                                                pricesRent.map((e, index) => {
                                                  return (
                                                    <option
                                                      value={e}
                                                      key={index}
                                                    >
                                                      {e}
                                                    </option>
                                                  );
                                                })}
                                            </select>
                                          </div>
                                        </div>
                                        <div className="">
                                          <div className="form-floating">
                                            <select
                                              placeholder="Max. Price EGP"
                                              type="number"
                                              style={{ width: "160px" }}
                                              id="max_price"
                                              name="max_price"
                                              className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm form-select focus:outline-none sm:text-sm"
                                              value={maxPrice}
                                              onChange={(e) => {
                                                handleMaxPriceChange(e);
                                                if (minPrice !== "") {
                                                  close();
                                                }
                                              }}
                                            >
                                              <option value="">
                                                {t(
                                                  "general.components.searchbar.maxprice"
                                                )}
                                              </option>
                                              {type ===
                                                t(
                                                  "general.components.searchbar.sale"
                                                ) &&
                                                pricesSale
                                                  .filter((e) => {
                                                    return minPrice
                                                      ? e > minPrice
                                                      : e;
                                                  })
                                                  .map((e, i) => {
                                                    return (
                                                      <option value={e} key={i}>
                                                        {e}
                                                      </option>
                                                    );
                                                  })}
                                              {type ===
                                                t(
                                                  "general.components.searchbar.rent"
                                                ) &&
                                                pricesRent
                                                  .filter((e) => {
                                                    return minPrice
                                                      ? e > minPrice
                                                      : e;
                                                  })
                                                  .map((e, i) => {
                                                    return (
                                                      <option value={e} key={i}>
                                                        {e}
                                                      </option>
                                                    );
                                                  })}
                                              {properties
                                                .filter(
                                                  (property) =>
                                                    property.price > minPrice ||
                                                    minPrice === ""
                                                )
                                                .map((property) => (
                                                  <option
                                                    key={property._id}
                                                    value={property.price}
                                                  >
                                                    {property.price}
                                                  </option>
                                                ))}
                                            </select>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  </div>
                </div>
                <div className="relative flex-grow mx-1 hidden md:block">
                  <div className="relative flex items-center w-full !h-full">
                    <Listbox
                      value={selectedFinishingLevel}
                      onChange={(e) => {
                        setSelectedFinishingLevel(e);
                        setCountState(!countState);
                      }}
                    >
                      <div className="relative w-full !h-full mt-1 hover:cursor-pointer">
                        <Listbox.Button
                          className="relative flex items-center !h-full justify-between w-full px-1 py-4 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
                          aria-label="DropDownPropertyFinish"
                          name="DropDownPropertyFinish"
                        >
                          <span className="block font-semibold truncate">
                            {selectedFinishingLevel ||
                              t(
                                "general.components.searchbar.all_finish_level"
                              )}
                          </span>
                          <span className="inset-y-0 right-0 flex items-center pointer-events-none">
                            <FaAngleDown />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute z-20 w-full mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {finishingLevel.map((property) => (
                              <Listbox.Option
                                key={property._id}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-8 pr-4 ${
                                    active
                                      ? "bg-teal-700 text-white"
                                      : "bg-gray-700 text-white mb-[1px]"
                                  }`
                                }
                                value={
                                  isArabic ? property.nameAr : property.name
                                }
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      {isArabic
                                        ? property.nameAr
                                        : property.name}
                                    </span>
                                    {selected ? (
                                      <span className="absolute inset-y-0 left-0 flex items-center text-teal-600">
                                        <FaCheckCircle className="text-teal-700" />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>
                </div>

                <button
                  type="submit"
                  onClick={handleSearchSubmit}
                  disabled={loading}
                  className="hidden w-full md:w-16 py-1 mt-1 font-medium text-white bg-[#095668] border-white border rounded-lg hover:bg-white hover:text-custom-blue focus:ring-4 focus:outline-none lg:flex items-center justify-center disabled:bg-custom-slate-800 text-sm"
                >
                  {loading && (
                    <div className="mx-1">
                      <AiOutlineLoading3Quarters className="w-3 h-3 animate-spin" />
                    </div>
                  )}{" "}
                  {t("general.components.searchbar.search")}
                </button>
              </div>
            </form>
          </div>

          {/* Advanced Search */}
          <div className="hidden md:block">
            <div className="flex justify-end px-4 mt-3 sm:px-6 lg:px-8">
              <button
                className="text-sm font-medium text-white border-b border-white"
                onClick={toggleAdvancedSearch}
              >
                {t("general.components.searchbar.advanced_search")}
              </button>
            </div>

            {showAdvancedSearch && (
              <div className="flex flex-wrap justify-center mt-3">
                {/* Area Dropdown */}
                <div className="flex flex-col gap-2 md:flex-row md:justify-center">
                  <input
                    type="number"
                    placeholder="Min Area (sqm)"
                    onChange={(e) => setSelectedMinPropertyArea(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Max Area (sqm)"
                    onChange={(e) => setSelectedMaxPropertyArea(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
          {/* more Filter */}
          <div className="hidden max-md:flex justify-between my-2 px-5 ">
            
            <div className="flex gap-2">
              <button
                onClick={handleClickRent}
                className={`text-sm  ${
                  type == t("general.components.searchbar.rent")
                    ? "bg-custom-blue-darker  border-2 border-custom-blue text-white"
                    : "bg-white text-custom-blue"
                } hover:shadow-lg shadow text-lg border-white border font-semibold px-3 py-1 rounded-lg`}
                value={t("general.components.searchbar.rent")}
              >
                {t("general.components.searchbar.rent")}
              </button>
              <button
                className={`text  text-sm capitalize ${
                  type == t("general.components.searchbar.sale")
                    ? "bg-custom-blue-darker  border-2 border-custom-blue text-white"
                    : "bg-white text-custom-blue"
                } hover:shadow-lg shadow border-white border rounded-lg font-semibold px-3 py-1`}
                value={t("general.components.searchbar.sale")}
                onClick={handleClickSale}
              >
                {t("general.components.searchbar.sale")}
              </button>
            </div>
            <div>
              <button
                className=" max-md:flex border-1 hidden text-white font-bold text-sm p-1 text-center py-1 bg-gray-500 rounded shadow hover:shadow-lg"
                type="button"
                onClick={() => setShowModal(true)}
              >
                <CiFilter size={"25"} />
                {isArabic ? "تصفيةاكتر" : "More Filter"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  else {
    return (
      <div className="flex flex-col w-full z-50 overflow-auto">
        <div className="flex justify-between px-2 fixed top-0 bg-white z-10 w-full p-2">
          <div className="flex gap-2 ">
            <IoFilter className="mt-2" />
            <div className="text-xl font-semibold">
              {isArabic ? "تصفية اكتر" : "More Filter"}{" "}
            </div>
          </div>
          <div
            className="text-gray-400 hover:text-black text-2xl"
            onClick={() => setShowModal(false)}
          >
            X
          </div>
        </div>
        <hr className="font-bold my-2" />
        <div className="flex gap-2 justify-between px-2 my-2 mt-14">
          <button
            onClick={handleClickRent}
            className={`text w-[50%] ${
              type == t("general.components.searchbar.rent")
                ? "bg-custom-blue-darker border-custom-blue text-white"
                : "bg-slate-300 text-custom-blue"
            } hover:shadow-lg shadow text-lg border-white border font-semibold px-5 py-1 rounded-lg`}
            value={t("general.components.searchbar.rent")}
          >
            {t("general.components.searchbar.rent")}
          </button>
          <button
            className={`text w-[50%] text-lg capitalize ${
              type == t("general.components.searchbar.sale")
                ? "bg-custom-blue-darker border-custom-blue text-white"
                : "bg-slate-300 text-custom-blue"
            } hover:shadow-lg shadow border-white border rounded-lg font-semibold px-5 py-1`}
            value={t("general.components.searchbar.sale")}
            onClick={handleClickSale}
          >
            {t("general.components.searchbar.sale")}
          </button>
        </div>
        <hr className="font-bold my-2" />
        <div className="flex px-4">
          <FaBuilding className="my-auto mr-2" />
          <h1 className="font-semibold">
            {t("general.components.searchbar.all_property_type")}
          </h1>
        </div>
        <div className="flex gap-1 overflow-auto px-2 my-2">
          {propertyTypes?.map((propertyType, personIdx) => {
            return (
              <div
                key={personIdx}
                onClick={() => {
                  setSelectedPropertyType(propertyType);
                  setCountState(!countState);
                }}
                className={`border-2 border-b-4 w-fit whitespace-nowrap text-center text-base rounded-lg border-gray-200 ${selectedPropertyType ==propertyType ? "bg-custom-blue-dark text-white":"bg-[#cccccc]"} px-3 py-2`}
              >
                {isArabic ? propertyType.nameAr : propertyType.name}
              </div>
            );
          })}
        </div>
        <hr className="font-bold my-2" />
        <div className="flex px-4">
          <FaBed className="my-auto mr-2" />
          <h1 className="font-semibold">
            {t("general.components.searchbar.bed")}
          </h1>
        </div>
        <div className="flex gap-1 overflow-auto px-2 my-2">
          {[1, 2, 3, 4, 5, 6]?.map((propertyType, personIdx) => {
            return (
              <div
                onClick={() => handleBedroomSelection(propertyType)}
                key={personIdx}
                className={`border-2 border-b-4 w-fit whitespace-nowrap text-center text-base rounded-lg border-gray-200 ${selectedBedroom ==propertyType ? "bg-custom-blue-dark text-white":"bg-[#cccccc]"} px-3 py-2`}
              >
                {propertyType}
              </div>
            );
          })}
        </div>
        <hr className="font-bold my-2" />
        <div className="flex px-4">
          <FaBath className="my-auto mr-2" />
          <h1 className="font-semibold">
            {t("general.components.searchbar.bath")}
          </h1>
        </div>
        <div className="flex gap-1 overflow-auto px-2 my-2">
          {[1, 2, 3, 4, 5, 6]?.map((propertyType, personIdx) => {
            return (
              <div
                key={personIdx}
                onClick={() => handleBathroomSelection(propertyType)}
                className={`border-2 border-b-4 w-fit whitespace-nowrap text-center text-base rounded-lg border-gray-200 ${selectedBathroom ==propertyType ? "bg-custom-blue-dark text-white":"bg-[#cccccc]"} px-3 py-2`}
              >
                {propertyType}
              </div>
            );
          })}
        </div>
        <hr className="font-bold my-2" />
        <div className="flex px-4">
          <FaMoneyBillWave className="my-auto mr-2" />
          <h1 className="font-semibold">
            {t("general.components.searchbar.prices")}
          </h1>
        </div>
        <div className="flex gap-1 px-2 my-1">
          <div class=" relative mt-2 rounded-md shadow-sm">
            <input
              type="number"
              class="w-[98%] rounded-md border-0  py-2 px-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              placeholder="Min.Price EGP"
              onChange={handleMinPriceChange}
            />
          </div>
          <div class="relative mt-2 rounded-md shadow-sm">
            <input
              type="number"
              class="w-[98%] rounded-md border-0 py-2 px-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              placeholder="Max.Price EGP"
              onChange={handleMaxPriceChange}
            />
          </div>
        </div>
        <hr className="my-2" />
        <div className="flex px-4">
          <IoBed className="my-auto mr-2" />
          <h1 className="font-semibold">
            {t("general.components.searchbar.all_finish_level")}
          </h1>
        </div>
        <div className="flex gap-1 overflow-auto px-2 my-2">
          {finishingLevel?.map((propertyType, personIdx) => {
            return (
              <div
                onClick={(e) => {
                  setSelectedFinishingLevel(propertyType);
                  setCountState(!countState);
                }}
                key={personIdx}
                className={`border-2 border-b-4 w-fit whitespace-nowrap text-center text-base rounded-lg border-gray-200 ${selectedFinishingLevel ==propertyType ? "bg-custom-blue-dark text-white":"bg-[#cccccc]"} px-3 py-2`}
              >
                {!isArabic ? propertyType.name : propertyType.nameAr}
              </div>
            );
          })}
        </div>
        <hr className="my-2" />
        <div className="flex px-4">
          <IoBed className="my-auto mr-2" />
          <h1 className="font-semibold">Property Area</h1>
        </div>
        <div className="flex gap-1 px-2 my-2 mb-14">
          <input
            type="text"
            class="w-[50%] rounded-md border-0 py-2 px-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            placeholder="Min. Area (sqm)"
            onChange={(e) => setSelectedMinPropertyArea(e.target.value)}
          />
          <input
            type="text"
            class="w-[50%] rounded-md border-0 py-2 px-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            placeholder="Max. Area (sqm)"
            onChange={(e) => setSelectedMaxPropertyArea(e.target.value)}
          />
        </div>
        <div className="flex justify-between px-4 py-2 gap-3 bg-white fixed bottom-0 w-full">
          <button
            type="button"
            onClick={(e) => {
              setSelectedBathroom("");
              setSelectedBedroom("");
              setSelectedFinishingLevel("");
              setSelectedPropertyType("");
            }}
            className="w-[45%] py-2 text-center rounded-lg bg-[#cccc] "
          >
            {t("general.components.searchbar.reset")}
          </button>
          
          <button
            type="button"
            onClick={handleSearchSubmit}
            className="w-[45%] py-2 text-white text-center rounded-lg bg-custom-blue-dark "
          >
            show ({countProperties})
          </button>
        </div>
      </div>
    );
  }
}

export default Searchbar;
