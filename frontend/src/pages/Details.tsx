import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { AiFillStar } from "react-icons/ai";
import GuestsInfoForm from "../components/forms/GuestsInfoForm";

export default function Details() {
  const { hotelId } = useParams();

  const { data: hotelData } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById((hotelId as string) || ""),
    {
      enabled: !!hotelId,
    }
  );

  if (!hotelData) {
    return <></>;
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="flex">
          {Array.from({ length: hotelData.starRating }).map(() => (
            <AiFillStar className="fill-yellow-400" />
          ))}
        </span>
        <h1 className="text-3xl font-bold">{hotelData.name}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {hotelData.imageUrls.map((image) => (
          <div className="h-[300px]">
            <img
              src={image}
              alt={hotelData.name}
              className="rounded-md w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        {hotelData.facilities.map((facility) => (
          <div className="border border-slate-300 rounded-sm p-3">
            {facility}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
        <div className="whitespace-pre-line">{hotelData.description}</div>
        <div className="h-fit">
          <GuestsInfoForm
            pricePerNight={hotelData.pricePerNight}
            hotelId={hotelData._id}
          />
        </div>
      </div>
    </div>
  );
}
