import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import SignOutButton from "./SignOutButton";

export default function Header() {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">Wander Inn</Link>
        </span>
        <span className="flex space-x-2">
          {!isLoggedIn ? (
            <Link
              to="/login"
              className="flex items-center bg-white text-blue-600 px-3 font-bold hover:bg-gray-100 "
            >
              Sign In
            </Link>
          ) : (
            <>
              <Link
                to="/my-bookings"
                className="flex items-center text-white px-3 font-bold hover:bg-gray-100 "
              >
                My Bookings
              </Link>
              <Link
                to="/my-hotels"
                className="flex items-center  text-white px-3 font-bold hover:bg-gray-100 "
              >
                My Hotels
              </Link>
              <SignOutButton />
            </>
          )}
        </span>
      </div>
    </div>
  );
}
