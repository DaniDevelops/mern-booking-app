import { useMutation } from "react-query";
import ManageHotelForm from "../components/ManageHotelForm";
import toast from "react-hot-toast";
import * as apiClient from "../api-client";

export default function AddHotel() {
  const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
    onSuccess: () => {
      toast.success("Hotel Saved!");
    },
    onError: () => {
      toast.error("Error saving Hotel");
    },
  });

  function handleSave(hotelFormData: FormData) {
    mutate(hotelFormData);
  }
  return <ManageHotelForm onSave={handleSave} isLoading={isLoading} />;
}
