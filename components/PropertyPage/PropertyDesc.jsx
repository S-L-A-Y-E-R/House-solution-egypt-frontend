import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function PropertyDesc({
  type,
  propertyType,
  location,
  subArea,
  area,
  bedrooms,
  bathrooms,
  furnitureStatus,
  title,
  description,
  tags,
  tagsAr,
  HDF,
  airConditioning,
  centralAirCondition,
  ceramics,
  closetoCAC,
  closetoFrenchSchool,
  closetoGym,
  closetoMetroStation,
  closetoRestaurant,
  closetoSchools,
  compound,
  fourMasterBedroom,
  internet,
  jacuzzi,
  kitchenAppliances,
  laundryRoom,
  maidsRoom,
  marble,
  oneBalconyView,
  oneMasterBedroom,
  parquet,
  porcelain,
  privateEntrance,
  privateGarden,
  privateSwimmingPool,
  security,
  shoppingNerdy,
  swimmingpoolUse,
  threeMasterBedroom,
  transportNerdy,
  twoBalconyView,
  twoMasterBedroom,
  walkinCloset,
  quietArea,
  officeRoom,
  builtinWardrobe,
  internetAccess,
  elevator,
  studyroom,
  terrace,
  surveillance,
  coveredParking,
  storage,
  sharedSwimmingPool,
  petsAllowed,
  tagsDefault,
}) {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <div className="w-full border-b border-l border-r text-slate-500">
      <h6 className="w-full px-2 py-1 font-bold text-center text-white rounded-sm bg-custom-blue">
        {t("pages.property.components.property_desc.description")}
      </h6>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 px-2 py-3">
        <div className="flex items-center gap-2">
          <Image
            src="/assets/surface.png"
            alt="surface"
            width="25"
            height="25"
            title="surface icon"
          />
          <p>
            <span className="text-lg font-semibold">{area}</span>{" "}
            <span>{t("pages.property.components.property_desc.sqm")}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Image src="/assets/bed.png" alt="bed" width="25" height="25"
            title="bed icon"
          />
          <p>
            <span className="text-lg font-semibold">{bedrooms}</span>{" "}
            {t("pages.property.components.property_desc.bedroom")}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Image src="/assets/bath.png" alt="bath" width="25" height="25"
            title="bath icon"
          />
          <p>
            <span className="text-lg font-semibold">{bathrooms}</span>{" "}
            {t("pages.property.components.property_desc.bathroom")}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Image src="/assets/couch.png" alt="couch" width="25" height="25"
            title="couch icon"
          />
          <p>
            <span>{furnitureStatus}</span>
          </p>
        </div>
      </div>
      <hr />
      <div className="p-2 my-2">
        <div
          className="text-lg"
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        />
      </div>
      <hr />
      <h3 className="px-2 text-xl font-bold">
        {t("pages.property.components.property_desc.amentias")}
      </h3>
      <div className="grid grid-cols-1 gap-4 p-2 my-2 sm:grid-cols-2 lg:grid-cols-3 sm:flex-row">
        {HDF && (
          <div className="flex items-center gap-2">
            <Image src="/assets/hdf.png" alt="hdf" width="25" height="25"
              title="hdf icon"
            />
            {t("pages.property.components.property_desc.hdf")}
          </div>
        )}
        {airConditioning && (
          <div className="flex items-center gap-2">
            <Image src="/assets/air.png" alt="air" width="25" height="25"
              title="air icon"
            />
            {t("pages.property.components.property_desc.air_condition")}
          </div>
        )}
        {centralAirCondition && (
          <div className="flex items-center gap-2">
            <Image src="/assets/air.png" alt="air" width="25" height="25"
              title="air icon"
            />
            {t("pages.property.components.property_desc.central_air_condition")}
          </div>
        )}
        {ceramics && (
          <div className="flex items-center gap-2">
            <Image src="/assets/tile.png" alt="tile" width="25" height="25"
              title="tile icon"
            />
            {t("pages.property.components.property_desc.ceramic")}
          </div>
        )}
        {closetoCAC && (
          <div className="flex items-center gap-2">
            <Image
              src="/assets/school.png"
              alt="cac school"
              width="25"
              height="25"
              title="cac school icon"
            />
            {t("pages.property.components.property_desc.cac")}
          </div>
        )}
        {closetoFrenchSchool && (
          <div className="flex items-center gap-2">
            <Image
              src="/assets/school.png"
              alt="french school" s
              width="25"
              height="25"
              title="french school icon"
            />
            {t("pages.property.components.property_desc.french")}
          </div>
        )}
        {closetoGym && (
          <div className="flex items-center gap-2">
            <Image src="/assets/gym.png" alt="gym" width="25" height="25"
              title="gym icon"
            />
            {t("pages.property.components.property_desc.gym")}
          </div>
        )}
        {closetoMetroStation && (
          <div className="flex items-center gap-2">
            <Image src="/assets/metro.png" alt="metro" width="25" height="25"
              title="metro icon"
            />
            {t("pages.property.components.property_desc.metro")}
          </div>
        )}
        {closetoRestaurant && (
          <div className="flex items-center gap-2">
            <Image
              src="/assets/restaurant.png"
              alt="restaurant"
              width="25"
              height="25"
              title="restaurant icon" s
            />
            {t("pages.property.components.property_desc.restaurant")}
          </div>
        )}
        {closetoSchools && (
          <div className="flex items-center gap-2">
            <Image
              src="/assets/school.png"
              alt="school"
              width="25"
              height="25"
              title="school icon"
            />
            {t("pages.property.components.property_desc.school")}
          </div>
        )}
        {compound && (
          <div className="flex items-center gap-2">
            <Image
              src="/assets/compound.png"
              alt="compound"
              width="25"
              height="25"
              title="compound icon"
            />
            {t("pages.property.components.property_desc.compound")}
          </div>
        )}
        {fourMasterBedroom && (
          <div className="flex items-center gap-2">
            <Image src="/assets/bed.png" alt="bed" width="25" height="25"
              title="bed icon"
            />4{" "}
            {t("pages.property.components.property_desc.master_bedroom")}
          </div>
        )}
        {internet && (
          <div className="flex items-center gap-2">
            <Image
              src="/assets/internet.png"
              alt="internet"
              width="25"
              height="25"
              title="internet icon"
            />
            {t("pages.property.components.property_desc.internet")}
          </div>
        )}
        {jacuzzi && (
          <div className="flex items-center gap-2">
            <Image
              src="/assets/jacuzzi.png"
              alt="jacuzzi"
              width="25"
              height="25"
            />
            {t("pages.property.components.property_desc.jacuzzi")}
          </div>
        )}
        {kitchenAppliances && (
          <div className="flex items-center gap-2">
            {" "}
            <Image
              src="/assets/kitchen.png"
              alt="kitchen"
              width="25"
              height="25"
              title="kitchen icon"
            />{" "}
            {t("pages.property.components.property_desc.kitchen")}
          </div>
        )}
        {laundryRoom && (
          <div className="flex items-center gap-2">
            <Image
              src="/assets/laundry.png"
              alt="laundry"
              width="25"
              height="25"
              title="laundry icons"
            />
            {t("pages.property.components.property_desc.laundry")}
          </div>
        )}
        {maidsRoom && (
          <div className="flex items-center gap-2">
            <Image src="/assets/maid.png" alt="maid" width="25" height="25"
              title="maid icon"
            />
            {t("pages.property.components.property_desc.maid")}
          </div>
        )}
        {marble && (
          <div className="flex items-center gap-2">
            <Image src="/assets/tile.png" alt="marble" width="25" height="25"
              title="marble icon"
            />
            {t("pages.property.components.property_desc.marble")}s
          </div>
        )}
        {oneBalconyView && (
          <div className="flex items-center gap-2">
            <Image
              src="/assets/balcony.png"
              alt="balcony"
              width="25"
              height="25"
              title="balcony icon"
            />
            1 {t("pages.property.components.property_desc.balcony")}
          </div>
        )}
        {oneMasterBedroom && (
          <div className="flex items-center gap-2">
            <Image src="/assets/bed.png" alt="bed" width="25" height="25"
              title="bed icon"
            />1{" "}
            {t("pages.property.components.property_desc.master_bedroom")}
          </div>
        )}
        {parquet && (
          <div className="flex items-center gap-2">
            <Image
              src="/assets/tile.png"
              alt="parquet"
              width="25"
              height="25"
              title="parquet icon"
            />
            {t("pages.property.components.property_desc.parquet")}
          </div>
        )}
        {porcelain && (
          <div className="flex items-center gap-2">
            <Image
              src="/assets/tile.png"
              alt="porcelain"
              width="25"
              height="25"
              title="porcelain icons"
            />
            {t("pages.property.components.property_desc.porcelain")}
          </div>
        )}
        {privateEntrance && (
          <div className="flex items-center gap-2">
            <Image
              src="/assets/entrance.png"
              alt="entrance"
              width="25"
              height="25"
              title="entrance icon"
            />
            {t("pages.property.components.property_desc.private_entrance")}
          </div>
        )}
        {privateGarden && (
          <div className="flex items-center gap-2">
            <Image
              src="/assets/garden.png"
              alt="garden"
              width="25"
              height="25"
              title="garden icon"
            />
            {t("pages.property.components.property_desc.private_garden")}
          </div>
        )}
        {privateSwimmingPool && (
          <div className="flex items-center gap-2">
            <Image src="/assets/pool.png" alt="pool" width="25" height="25"
              title="pool icon"
            />
            {t("pages.property.components.property_desc.private_swimmingpool")}
          </div>
        )}
        {security && (
          <div className="flex items-center gap-2">
            <Image
              src="/assets/security.png"
              alt="security"
              width="25"
              height="25"
              title="security icon"
            />
            {t("pages.property.components.property_desc.security")}
          </div>
        )}
        {shoppingNerdy && (
          <div className="flex items-center gap-2">
            <Image
              src="/assets/shopping.png"
              alt="shopping"
              width="25"
              height="25"
              title="shopping icon"
            />
            {t("pages.property.components.property_desc.shopping")}
          </div>
        )}
        {swimmingpoolUse && (
          <div className="flex items-center gap-2">
            <Image src="/assets/pool.png" alt="pool" width="25" height="25"
              title="pool icon"
            />
            {t("pages.property.components.property_desc.use_swimmingpool")}
          </div>
        )}
        {threeMasterBedroom && (
          <div className="flex items-center gap-2">
            <Image src="/assets/bed.png" alt="bed" width="25" height="25"
              title="bed icon"
            />3{" "}
            {t("pages.property.components.property_desc.master_bedroom")}
          </div>
        )}
        {transportNerdy && (
          <div className="flex items-center gap-2">
            <Image
              src="/assets/transportation.png"
              alt="transportation"
              width="25"
              height="25"
              title="transportation icon"
            />
            {t("pages.property.components.property_desc.transportation")}
          </div>
        )}
        {twoBalconyView && (
          <div className="flex items-center gap-2">
            <Image
              src="/assets/balcony.png"
              alt="balcony"
              width="25"
              height="25"
              title="balcony icon"
            />
            2 {t("pages.property.components.property_desc.balcony")}
          </div>
        )}
        {twoMasterBedroom && (
          <div className="flex items-center gap-2">
            <Image src="/assets/bed.png" alt="bed" width="25" height="25"
              title="bed icon"
            />2{" "}
            {t("pages.property.components.property_desc.master_bedroom")}
          </div>
        )}
        {quietArea && (
          <div className="flex items-center gap-2">
            <Image
              src="/assets/quiet.png"
              alt="quiet icon"
              width="25"
              height="25"
              title="quiet icon"
            />
            {t("pages.property.components.property_desc.quiet_area")}
          </div>
        )}
        {officeRoom && (
          <div className="flex items-center gap-2">
            <Image
              src="/assets/office.png"
              alt="office icon"
              width="25"
              height="25"
              title="office icon"
            />
            {t("pages.property.components.property_desc.office_room")}
          </div>
        )}
        {builtinWardrobe && (
          <div className="flex items-center gap-2">
            <Image
              src="/assets/wardrobe.png"
              alt="wardrobe icon"
              width="25"
              height="25"
              title="wardrobe icon"
            />
            {t("pages.property.components.property_desc.wardrobe")}
          </div>
        )}
        {internetAccess && (
          <div className="flex items-center gap-2">
            <Image
              src="/assets/internet.png"
              alt="internet icon"
              width="25"
              height="25"
              title="internet icon"
            />
            {t("pages.property.components.property_desc.internet")}
          </div>
        )}
        {elevator && (
          <div className="flex items-center gap-2">
            <Image
              src="/assets/elevator.png"
              alt="elevator icon"
              width="25"
              height="25"
              title="elevator icon"
            />
            {t("pages.property.components.property_desc.elevator")}
          </div>
        )}
        {studyroom && (
          <div className="flex items-center gap-2">
            <Image
              src="/assets/study.png"
              alt="study room icon"
              width="25"
              height="25"
              title="study room icon"
            />
            {t("pages.property.components.property_desc.studyroom")}
          </div>
        )}
        {terrace && (
          <div className="flex items-center gap-2">
            <Image
              src="/assets/terrace.png"
              alt="terrace icon"
              width="25"
              height="25"
              title="terrace icon"
            />
            {t("pages.property.components.property_desc.terrace")}
          </div>
        )}
        {surveillance && (
          <div className="flex items-center gap-2">
            <Image
              src="/assets/surveillance.png"
              alt="surveillance icon"
              width="25"
              height="25"
              title="surveillance icon"
            />
            {t("pages.property.components.property_desc.surveillance")}
          </div>
        )}
        {coveredParking && (
          <div className="flex items-center gap-2">
            <Image
              src="/assets/coveredparking.png"
              alt="covered parking icon"
              width="25"
              height="25"
              title="covered parking icon"
            />
            {t("pages.property.components.property_desc.covered_parking")}
          </div>
        )}
        {storage && (
          <div className="flex items-center gap-2">
            <Image
              src="/assets/storage.png"
              alt="storage icon"
              width="25"
              height="25"
              title="storage icon"
            />
            {t("pages.property.components.property_desc.storage")}
          </div>
        )}
        {sharedSwimmingPool && (
          <div className="flex items-center gap-2">
            <Image
              src="/assets/pool.png"
              alt="pool icon"
              width="25"
              height="25"
              title="pool icon"
            />
            {t("pages.property.components.property_desc.shared_swimming")}
          </div>
        )}
        {petsAllowed && (
          <div className="flex items-center gap-2">
            <Image src="/assets/pets.png" alt="pets" width="25" height="25"
              title="pets icon"
            />
            {t("pages.property.components.property_desc.pets_allowed")}
          </div>
        )}
      </div>
      <hr />
      <h3 className="px-2 text-xl font-bold">
        {t("pages.property.components.property_desc.tags")}
      </h3>
      <div className="flex flex-wrap gap-1 p-1 my-1">
        {!isArabic && (
          <>
            {tagsDefault.map((tag) => {
              if (
                !tag.typeConstraint ||
                ((!tag.typeConstraint.type ||
                  tag.typeConstraint.type == type ||
                  tag.typeConstraint.typeAr == type) &&
                  (!tag.typeConstraint.propertyType ||
                    tag.typeConstraint.propertyType == propertyType ||
                    tag.typeConstraint.propertyTypeAr == propertyType) &&
                  (!tag.typeConstraint.location ||
                    tag.typeConstraint.location == location ||
                    tag.typeConstraint.locationAr == location))
              )
                return (
                  <div className="px-2 text-white rounded hover:underline bg-custom-blue">
                    {
                      <Link href={tag.link} className="hover:underline"
                        rel="noopener noreferrer"
                      >
                        #
                        {tag.name
                          .split("-")
                          .join(" ")
                          .replace(/\w\S*/g, function (txt) {
                            return (
                              txt.charAt(0).toUpperCase() +
                              txt.substr(1).toLowerCase()
                            );
                          })}
                      </Link>
                    }
                  </div>
                );
            })}
          </>
        )}
        {isArabic && (
          <>
            {tagsDefault.map((tag) => {
              if (
                !tag.typeConstraint ||
                tag.typeConstraint.type == type ||
                tag.typeConstraint.typeAr == type ||
                tag.typeConstraint.propertyType == propertyType ||
                tag.typeConstraint.propertyTypeAr == propertyType ||
                tag.typeConstraint.location == location ||
                tag.typeConstraint.locationAr == location
              )
                return (
                  <div className="px-2 text-white rounded bg-custom-blue">
                    {
                      <Link href={tag.linkAr} className="hover:underline"
                        rel="noopener noreferrer"
                      >
                        #
                        {tag.nameAr
                          .split("-")
                          .join(" ")
                          .replace(/\w\S*/g, function (txt) {
                            return (
                              txt.charAt(0).toUpperCase() +
                              txt.substr(1).toLowerCase()
                            );
                          })}
                      </Link>
                    }
                  </div>
                );
            })}
          </>
        )}
      </div>
    </div>
  );
}
