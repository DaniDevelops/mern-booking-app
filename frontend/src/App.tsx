import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import SignIn from "./pages/SignIn";
import AddHotel from "./pages/AddHotel";
import { useAppContext } from "./context/AppContext";
import MyHotels from "./pages/MyHotels";

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
            {isLoggedIn && (
              <>
                <Route path="/add-hotel" element={<AddHotel />} />
                <Route path="/my-hotels" element={<MyHotels />} />
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
