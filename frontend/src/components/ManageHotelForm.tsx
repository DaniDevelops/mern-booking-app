import { FormProvider, useForm } from "react-hook-form";
import DetailsForm from "./forms/DetailsForm";
import TypeSection from "./forms/TypeSection";
import FacilitiesSection from "./forms/FacilitiesSection";
import GuestsSection from "./forms/GuestsSection";
import ImagesSection from "./forms/ImagesSection";
import { HotelType } from "../../../backend/src/shared/type";
import { useEffect } from "react";

export type HotelFormData = {
  _id: string;
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageFiles: FileList;
  imageUrls: string[];
  lastUpdated: Date;
};

type Props = {
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;
  hotel?: HotelType;
};

export default function ManageHotelForm({ onSave, isLoading, hotel }: Props) {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    reset(hotel);
  }, [reset, hotel]);

  function onSubmit(data: HotelFormData) {
    const formData = new FormData();

    if (hotel) {
      formData.append("hotelId", hotel._id);
    }
    formData.append("name", data.name);
    formData.append("city", data.city);
    formData.append("country", data.country);
    formData.append("description", data.description);
    formData.append("type", data.type);
    formData.append("pricePerNight", data.pricePerNight.toString());
    formData.append("starRating", data.starRating.toString());
    formData.append("adultCount", data.adultCount.toString());
    formData.append("childCount", data.childCount.toString());
    data.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    if (data.imageUrls) {
      data.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });
    }

    Array.from(data.imageFiles).forEach((imageFile) => {
      formData.append("imageFiles", imageFile);
    });

    onSave(formData);

    if (!hotel) reset();
  }
  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={handleSubmit(onSubmit)}>
        <DetailsForm />
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImagesSection />
        <span className="flex justify-end">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-blue-600 text-white p-2 disabled:bg-gray-500 font-bold hover:bg-blue-400 text-xl"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
}
