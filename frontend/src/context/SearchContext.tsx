import React, { useContext } from "react";
import { useState } from "react";

type SearchContext = {
  destination: string;
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  hotelId: string;
  saveSearchValues: (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number
  ) => void;
};

const SearchContext = React.createContext<SearchContext | undefined>(undefined);

type SearchContextProps = {
  children: React.ReactNode;
};

function SearchContextProvider({ children }: SearchContextProps) {
  const [destination, setDestination] = useState<string>(
    () => sessionStorage.getItem("destination") || ""
  );
  const [checkIn, setCheckIn] = useState<Date>(
    () => new Date(sessionStorage.getItem("checkIn") || new Date())
  );
  const [checkOut, setcheckOut] = useState<Date>(
    () => new Date(sessionStorage.getItem("checkOut") || new Date())
  );
  const [adultCount, setAdultCount] = useState<number>(() =>
    parseInt(sessionStorage.getItem("adultCount") || "1")
  );
  const [childCount, setChildCount] = useState<number>(
    parseInt(sessionStorage.getItem("childCount") || "0")
  );
  const [hotelId, setHotelId] = useState<string>(
    () => sessionStorage.getItem("destination") || ""
  );

  function saveSearchValues(
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number,
    hotelId?: string
  ) {
    setDestination(destination);
    setCheckIn(checkIn);
    setcheckOut(checkOut);
    setAdultCount(adultCount);
    setChildCount(childCount);

    if (hotelId) setHotelId(hotelId);

    sessionStorage.setItem("destination", destination);
    sessionStorage.setItem("checkIn", checkIn.toISOString());
    sessionStorage.setItem("checkOut", checkOut.toISOString());
    sessionStorage.setItem("adultCount", adultCount.toString());
    sessionStorage.setItem("childCount", childCount.toString());

    if (hotelId) sessionStorage.setItem("hotelId", hotelId);
  }
  return (
    <SearchContext.Provider
      value={{
        destination,
        checkIn,
        checkOut,
        adultCount,
        childCount,
        hotelId,
        saveSearchValues,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  return context as SearchContext;
};

export default SearchContextProvider;
