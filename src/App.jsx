import React, { useContext } from "react";
import NavBar from "./components/NavBar";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SalePage from "./pages/SalePage";
import ProductDetail from "./pages/ProductDetail";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import { UserContext } from "./context/UserContext";
import { Loader2 } from "lucide-react";
import WishListPage from "./pages/WishListPage";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Order from "./pages/Order";

const App = () => {
  const location = useLocation();
  const { user } = useContext(UserContext);

  if (!user && location.pathname !== "/register") {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loader2 className="animate-spin" size={50} />
      </div>
    );
  }

  return (
    <div>
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        draggable
        theme="colored"
        style={{ width: "fit-content" }}
        toastStyle={{
          width: "fit-content",
          minWidth: "unset",
          maxWidth: "max-content",
          padding: "12px 18px",
          borderRadius: "16px",
        }}
      />

      {location.pathname !== "/register" && <NavBar />}

      <Routes>
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/register" />}
        />

        <Route
          path="/collection"
          element={user ? <Collection /> : <Navigate to="/register" />}
        />

        <Route
          path="/about"
          element={user ? <About /> : <Navigate to="/register" />}
        />

        <Route
          path="/contact"
          element={user ? <Contact /> : <Navigate to="/register" />}
        />

        <Route
          path="/cart"
          element={user ? <Cart /> : <Navigate to="/register" />}
        />

        <Route
          path="/wishList"
          element={user ? <WishListPage /> : <Navigate to="/register" />}
        />

        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />

        <Route
          path="/sale"
          element={user ? <SalePage /> : <Navigate to="/register" />}
        />

        <Route
          path="/orders"
          element={user ? <Order /> : <Navigate to="/register" />}
        />

        <Route
          path="/order"
          element={user ? <Order /> : <Navigate to="/register" />}
        />

        <Route
          path="/place-order"
          element={user ? <PlaceOrder /> : <Navigate to="/register" />}
        />

        <Route
          path="/product/:id"
          element={user ? <ProductDetail /> : <Navigate to="/register" />}
        />
      </Routes>

      {location.pathname !== "/register" && <Footer />}
    </div>
  );
};

export default App;