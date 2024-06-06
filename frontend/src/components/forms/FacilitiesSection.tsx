import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/hotelConfig";
import { HotelFormData } from "../ManageHotelForm";

export default function FacilitiesSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="font-bold text-2xl mb-3">Facilities</h2>
      <div className="grid grid-cols-5 gap-1">
        {hotelFacilities.map((facility) => (
          <label
            key={facility}
            className="text-sm font-normal text-gray-700 gap-1 flex"
          >
            <input
              type="checkbox"
              value={facility}
              {...register("facilities", {
                validate: (facilities) => {
                  if (facilities && facilities.length > 0) {
                    return true;
                  } else {
                    return "Select atleast one facility";
                  }
                },
              })}
            />
            {facility}
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-500 text-sm font-bold">
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
}
