import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import toast from "react-hot-toast";

export default function SignOutButton() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      toast.success("User successfully logged out");
      await queryClient.invalidateQueries("validateToken");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  function handleClick() {
    mutate();
  }

  return (
    <button
      className="flex items-center bg-white text-blue-600 px-3 font-bold hover:bg-gray-100 "
      onClick={handleClick}
    >
      Sign Out
    </button>
  );
}
