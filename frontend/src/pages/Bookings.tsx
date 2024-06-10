import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { useParams } from "react-router-dom";
import { useSearchContext } from "../context/SearchContext";
import BookingDetailsSummary from "../components/BookingDetailsSummary";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Elements } from "@stripe/react-stripe-js";
import BookingForm from "../components/forms/BookingForm";

export default function Bookings() {
  const [numberOfNights, setNumberOfNights] = useState<number>(0);
  const { hotelId } = useParams();
  const search = useSearchContext();
  const { stripePromise } = useAppContext();

  const { data: hotelData } = useQuery("fetchHotelById", () =>
    apiClient.fetchHotelById(hotelId as string)
  );
  const { data: user } = useQuery(
    "fetchCurrentUser",
    apiClient.fetchCurrentUser
  );
  const { data: paymentIntentData } = useQuery(
    "fetchPaymentIntent",
    () =>
      apiClient.makePaymentIntent(hotelId as string, numberOfNights.toString()),
    {
      enabled: !!hotelId && numberOfNights > 0,
    }
  );

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);
      setNumberOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  if (!hotelData) {
    return <></>;
  }

  return (
    <div className="grid md:grid-cols-[1fr_2fr]">
      <BookingDetailsSummary
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        adultCount={search.adultCount}
        childCount={search.childCount}
        numberOfNights={numberOfNights}
        hotel={hotelData}
      />
      {user && paymentIntentData && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: paymentIntentData.clientSecret,
          }}
        >
          <BookingForm currentUser={user} paymentIntent={paymentIntentData} />
        </Elements>
      )}
    </div>
  );
}
