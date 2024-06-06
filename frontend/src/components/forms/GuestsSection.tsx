import { useFormContext } from "react-hook-form";
import { HotelFormData } from "../ManageHotelForm";

export default function GuestsSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="font-bold text-2xl mb-3">Guests</h2>
      <div className="flex flex-col md:flex-row gap-5 p-6 bg-gray-300">
        <label className="text-gray-700 font-bold text-sm flex-1">
          Adult
          <input
            type="number"
            min={1}
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("adultCount", {
              required: "This field is required",
            })}
          />
          {errors.adultCount && (
            <span className="text-red-500">{errors.adultCount.message}</span>
          )}
        </label>

        <label className="text-gray-700 font-bold text-sm flex-1">
          Children
          <input
            type="number"
            min={1}
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("childCount", {
              required: "This field is required",
            })}
          />
          {errors.childCount && (
            <span className="text-red-500">{errors.childCount.message}</span>
          )}
        </label>
      </div>
    </div>
  );
}
