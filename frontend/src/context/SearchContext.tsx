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
  const [destination, setDestination] = useState<string>("");
  const [checkIn, setCheckIn] = useState<Date>(new Date());
  const [checkOut, setcheckOut] = useState<Date>(new Date());
  const [adultCount, setAdultCount] = useState<number>(1);
  const [childCount, setChildCount] = useState<number>(1);
  const [hotelId, setHotelId] = useState<string>("");

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
