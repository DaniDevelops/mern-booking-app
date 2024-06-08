import { FormEvent, useState } from "react";
import { useSearchContext } from "../context/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const search = useSearchContext();
  const navigate = useNavigate();
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );

    navigate("/search");
  }

  return (
    <form className=" -mt-8 p-3 bg-orange-400 rounded shadow-md grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4">
      <div className="flex flex-row items-center flex-1 bg-white p-2">
        <MdTravelExplore size={25} className="mr-2" />
        <input
          placeholder="Where are you going?"
          className="text-md w-full focus:outline-none"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>
      <div className="flex bg-white py-2 px-1 gap-2">
        <label className="items-center flex">
          Adults:
          <input
            type="number"
            className="w-full p-1 focus:outline-none font-bold"
            min={1}
            max={20}
            value={adultCount}
            onChange={(event) => {
              setAdultCount(parseInt(event.target.value));
            }}
          />
        </label>
        <label className="items-center flex">
          Children:
          <input
            type="number"
            className="w-full p-1 focus:outline-none font-bold"
            min={0}
            max={20}
            value={childCount}
            onChange={(event) => {
              setChildCount(parseInt(event.target.value));
            }}
          />
        </label>
      </div>
      <div>
        <DatePicker
          className="min-w-full focus:outline-none bg-white p-2"
          selected={checkIn}
          selectsStart
          onChange={(date) => setCheckIn(date as Date)}
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check In Date"
          wrapperClassName="min-w-full"
        />
      </div>
      <div>
        <DatePicker
          className="min-w-full focus:outline-none bg-white p-2"
          selected={checkOut}
          onChange={(date) => setCheckOut(date as Date)}
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check In Date"
          wrapperClassName="min-w-full"
        />
      </div>
      <div className="flex gap-1">
        <button
          onClick={handleSubmit}
          className="w-2/3 text-white bg-blue-600 h-full p-2 font-bold text-xl hover:bg-blue-500"
        >
          Search
        </button>
        <button className="w-1/3 text-white bg-red-600 h-full p-2 font-bold text-xl hover:bg-red-500">
          Clear
        </button>
      </div>
    </form>
  );
}
