import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<SignIn />} />
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
