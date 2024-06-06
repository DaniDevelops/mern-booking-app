import { useFormContext } from "react-hook-form";
import { HotelFormData } from "../ManageHotelForm";

export default function ImagesSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Image</h2>
      <div className="border rounded flex flex-col gap-4 p-4">
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full text-gray-700 font-normal"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength = imageFiles.length;
              if (totalLength === 0) {
                return "Add atleast one image file";
              }
              if (totalLength > 6) {
                return "Cannot add more than 6 image files";
              }
              return true;
            },
          })}
        />
        {errors.imageFiles && (
          <span className="text-red-500 text-sm font-bold">
            {errors.imageFiles.message}
          </span>
        )}
      </div>
    </div>
  );
}
