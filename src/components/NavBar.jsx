import React, { useContext, useEffect, useState } from "react";
import {
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const {
    logout,
    wishListProducts = [],
    cartCount = 0,
    navigate,
  } = useContext(UserContext);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "SHOP", path: "/collection" },
    { name: "SALE", path: "/sale" },
    { name: "ABOUT", path: "/about" },
    { name: "CONTACT", path: "/contact" },
  ];

  const handleNavigate = (path) => {
    window.scrollTo(0, 0);
    navigate(path);
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/register");
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl border-gray-200 shadow-[0_1px_20px_rgba(0,0,0,0.06)]"
            : "bg-white border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 sm:h-20 flex items-center justify-between">
            <h1
              onClick={() => handleNavigate("/")}
              className="text-2xl sm:text-3xl font-black tracking-[0.25em] cursor-pointer select-none"
            >
              NOVA
            </h1>

            <nav className="hidden lg:block">
              <ul className="flex items-center gap-10 font-semibold text-[13px] tracking-[0.15em] text-gray-800">
                {navLinks.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      onClick={() => window.scrollTo(0, 0)}
                      to={item.path}
                      className={({ isActive }) =>
                        `relative py-2 transition-colors duration-300 hover:text-[#C9A227] after:absolute after:left-0 after:-bottom-px after:h-0.5 after:bg-[#C9A227] after:transition-all after:duration-300 ${
                          isActive
                            ? "text-black after:w-full"
                            : "after:w-0 hover:after:w-full"
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="hidden lg:flex items-center gap-5">
              <button
                onClick={() => navigate("/wishlist")}
                className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-700 hover:text-black transition-colors cursor-pointer"
              >
                <Heart size={19} strokeWidth={1.75} />

                {wishListProducts.length > 0 && (
                  <span className="absolute top-2 right-2 h-7 w-7 rounded-full bg-red-500 ring-2 ring-white" />
                )}
              </button>

              <button
                onClick={() => navigate("/cart")}
                className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-700 hover:text-black transition-colors cursor-pointer"
              >
                <ShoppingBag size={19} strokeWidth={1.75} />

                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              </button>

              <div className="relative group">
                <button className="ml-2 flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 hover:border-[#C9A227] hover:bg-black hover:text-white transition-all duration-300 cursor-pointer">
                  <User size={18} strokeWidth={1.8} />
                </button>

                <div className="absolute right-0 top-14 w-52 rounded-2xl border border-gray-200 bg-white/95 backdrop-blur-md shadow-2xl opacity-0 invisible translate-y-3 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-50 overflow-hidden">
                  <div className="py-2">
                    <button
                      onClick={() => navigate("/orders")}
                      className="w-full px-5 py-3 text-left text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all cursor-pointer"
                    >
                      My Orders
                    </button>

                    <button
                      onClick={() => navigate("/about")}
                      className="w-full px-5 py-3 text-left text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all cursor-pointer"
                    >
                      About Us
                    </button>

                    <div className="mx-4 my-1 border-t border-gray-200" />

                    <button
                      onClick={handleLogout}
                      className="w-full px-5 py-3 text-left text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-600 transition-all cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 md:gap-8 lg:hidden">
              <button
                onClick={() => navigate("/wishlist")}
                className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-700"
              >
                <Heart size={20} strokeWidth={1.75} />

                {wishListProducts.length > 0 && (
                  <span className="absolute top-2 right-2 h-7 w-7 rounded-full bg-[#C9A227] ring-2 ring-white" />
                )}
              </button>

              <button
                onClick={() => navigate("/cart")}
                className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-700"
              >
                <ShoppingBag size={20} strokeWidth={1.75} />

                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              </button>

              <button
                onClick={() => setOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-gray-800"
              >
                <Menu size={26} strokeWidth={1.75} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        onClick={() => setOpen(false)}
        className={`lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute right-0 top-0 h-screen w-[85%] max-w-85 bg-white shadow-2xl transition-transform duration-500 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-6">
            <h2
              onClick={() => handleNavigate("/")}
              className="text-2xl font-black tracking-[0.2em] cursor-pointer"
            >
              NOVA
            </h2>

            <button
              onClick={() => setOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 transition"
            >
              <X size={22} strokeWidth={1.75} />
            </button>
          </div>

          <div className="px-6 py-8">
            <ul className="space-y-1">
              {navLinks.map((item, i) => (
                <li
                  key={item.path}
                  style={{
                    transitionDelay: open
                      ? `${i * 60}ms`
                      : "0ms",
                  }}
                  className={`transition-all duration-500 ${
                    open
                      ? "translate-x-0 opacity-100"
                      : "translate-x-6 opacity-0"
                  }`}
                >
                  <NavLink
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between rounded-xl px-4 py-3.5 text-[15px] font-semibold tracking-wide transition ${
                        isActive
                          ? "bg-black text-white"
                          : "text-gray-800 hover:bg-gray-50"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="mt-10 grid grid-cols-2 items-center gap-6 border-t border-gray-100 pt-8">
              <button
                onClick={() =>
                  handleNavigate("/wishlist")
                }
                className="relative flex h-12 items-center justify-center gap-2 rounded-xl bg-gray-50 text-sm font-semibold text-gray-800 hover:bg-[#C9A227] hover:text-white transition-colors"
              >
                <Heart size={18} />
                Wishlist

                {wishListProducts.length > 0 && (
                  <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
                )}
              </button>

              <button
                onClick={() => handleNavigate("/cart")}
                className="relative flex h-12 items-center justify-center gap-2 rounded-xl bg-gray-50 text-sm font-semibold text-gray-800 hover:bg-[#C9A227] hover:text-white transition-colors"
              >
                <ShoppingBag size={18} />
                Cart

                {cartCount > 0 && (
                  <span className="absolute top-2 right-2 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-black text-[9px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() =>
                  handleNavigate("/orders")
                }
                className="col-span-2 flex items-center gap-3 justify-center rounded-xl bg-gray-100 font-semibold text-gray-800 hover:bg-[#C9A227] hover:text-white transition-colors px-6 py-3 text-sm"
              >
                <ShoppingBag size={18} />
                My Orders
              </button>

              <button
                onClick={handleLogout}
                className="col-span-2 flex items-center gap-3 justify-center rounded-xl bg-red-500 font-semibold text-white hover:bg-[#C9A227] transition-colors px-6 py-3 text-sm"
              >
                <User size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;