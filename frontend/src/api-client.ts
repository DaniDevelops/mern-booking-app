import { registerFormData } from "./pages/Register";
import { signInFormData } from "./pages/SignIn";
import {
  HotelSearchResponse,
  HotelType,
  UserType,
  paymentIntentType,
} from "../../backend/src/shared/type";
import { BookingFormData } from "./components/forms/BookingForm";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
  facilities?: string[];
  stars?: string[];
  types?: string[];
  maxPrice?: string;
  sortOptions?: string;
};
export async function fetchCurrentUser(): Promise<UserType> {
  const response = await fetch(`${API_BASE_URL}/api/users/me`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error getting user");
  }

  return response.json();
}

export async function searchHotels(
  searchParams: SearchParams
): Promise<HotelSearchResponse> {
  const queryParams = new URLSearchParams();
  queryParams.append("destination", searchParams.destination || "");
  queryParams.append("checkIn", searchParams.checkIn || "");
  queryParams.append("checkOut", searchParams.checkOut || "");
  queryParams.append("adultCount", searchParams.adultCount || "");
  queryParams.append("childCount", searchParams.childCount || "");
  queryParams.append("page", searchParams.page || "");
  queryParams.append("maxPrice", searchParams.maxPrice || "");
  queryParams.append("sortOptions", searchParams.sortOptions || "");

  searchParams.types?.forEach((type) => queryParams.append("types", type));
  searchParams.stars?.forEach((star) => queryParams.append("stars", star));
  searchParams.facilities?.forEach((facility) =>
    queryParams.append("facilities", facility)
  );
  const response = await fetch(
    `${API_BASE_URL}/api/hotels/search?${queryParams}`
  );

  if (!response.ok) {
    throw new Error("Error fetching Search Query");
  }

  return response.json();
}
export async function fetchHotelById(hotelId: string): Promise<HotelType> {
  const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`);
  if (!response.ok) {
    throw new Error("Error Fetching this hotel");
  }

  return response.json();
}
export async function register(formData: registerFormData) {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
}

export async function signIn(formData: signInFormData) {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return responseBody;
}

export async function signOut() {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("User could not be signed out");
  }
}
export async function addMyHotel(hotelFormData: FormData) {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    method: "POST",
    credentials: "include",
    body: hotelFormData,
  });

  if (!response.ok) {
    throw new Error("Failed to register hotel");
  }

  return response.json();
}
export async function fetchMyHotels(): Promise<HotelType[]> {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching Hotels");
  }

  return response.json();
}
export async function fetchMyHotelById(hotelId: string): Promise<HotelType> {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching Hotel");
  }

  return response.json();
}

export async function updateMyHotelbyId(hotelFormData: FormData) {
  const response = await fetch(
    `${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`,
    {
      method: "PUT",
      body: hotelFormData,
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Error Updating Hotel");
  }

  return response.json();
}

export async function validateToken() {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Token Invalid");
  }

  return response.json();
}
export async function makePaymentIntent(
  hotelId: string,
  numberOfNights: string
): Promise<paymentIntentType> {
  const response = await fetch(
    `${API_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`,
    {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ numberOfNights }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error fetching payment intent");
  }

  return response.json();
}

export async function createRoomBooking(formData: BookingFormData) {
  const response = await fetch(
    `${API_BASE_URL}/api/hotels/${formData.hotelId}/bookings`,
    {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error Booking Room");
  }
}
export async function fetchMyBookings(): Promise<HotelType[]> {
  const response = await fetch(`${API_BASE_URL}/api/my-bookings`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error Fetching Bookings");
  }

  return response.json();
}
export async function fetchAllHotels(): Promise<HotelType[]> {
  const response = await fetch(`${API_BASE_URL}/api/hotels`);

  if (!response.ok) {
    throw new Error("Error Fetching Hotels");
  }

  return response.json();
}
