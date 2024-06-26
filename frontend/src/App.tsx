import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import SignIn from "./pages/SignIn";
import AddHotel from "./pages/AddHotel";
import { useAppContext } from "./context/AppContext";
import MyHotels from "./pages/MyHotels";
import EditHotel from "./pages/EditHotel";
import Search from "./pages/Search";
import Details from "./pages/Details";
import Bookings from "./pages/Bookings";
import MyBookings from "./pages/MyBookings";

function App() {
  const { isLoggedIn } = useAppContext();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/search" element={<Search />} />
            <Route path="/details/:hotelId" element={<Details />} />

            {isLoggedIn && (
              <>
                <Route path="/hotel/:hotelId/booking" element={<Bookings />} />
                <Route path="/add-hotel" element={<AddHotel />} />
                <Route path="/my-hotels" element={<MyHotels />} />
                <Route path="/edit-hotel/:hotelId" element={<EditHotel />} />
                <Route path="/my-bookings" element={<MyBookings />} />
              </>
            )}
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
            style: {
              backgroundColor: "#1bc44b",
              color: "#eef1ed",
            },
          },
          error: {
            duration: 5000,
            style: {
              backgroundColor: "#b80600",
              color: "#fffbfe",
            },
          },
          style: {
            maxWidth: "500px",
            fontSize: "16px",
            padding: "16px 24px",
          },
        }}
      />
    </>
  );
}

export default App;
