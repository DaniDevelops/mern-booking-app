import { useMutation, useQuery } from "react-query";
import ManageHotelForm from "../components/ManageHotelForm";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import toast from "react-hot-toast";
export default function EditHotel() {
  const { mutate, isLoading } = useMutation(apiClient.updateMyHotelbyId, {
    onSuccess: () => {
      toast.success("Hotel changes added!");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
  const { hotelId } = useParams();
  const { data: hotel } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchMyHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
    }
  );
  function handleSave(hotelFormData: FormData) {
    mutate(hotelFormData);
  }

  return (
    <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isLoading} />
  );
}
