import { Link, useNavigate } from "react-router-dom";
import * as apiClient from "../api-client";
import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

export type signInFormData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate } = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      toast.success("You have successfully signed in");
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signInFormData>();

  function onSubmit(data: signInFormData) {
    mutate(data);
  }
  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-3xl font-bold">Sign In to your account</h2>

      <label className="text-gray-700 font-bold text-sm flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "This field is required" })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label className="text-gray-700 font-bold text-sm flex-1">
        Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password must be greater than 8 characters",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <span className="flex items-center justify-between">
        <span className="text-sm">
          Don't have an account?
          <Link className="underline" to="/register">
            Register
          </Link>
        </span>

        <button
          type="submit"
          className="bg-blue-600 p-2 text-white font-bold hover:bg-blue-500 text-xl"
        >
          Login
        </button>
      </span>
    </form>
  );
}
