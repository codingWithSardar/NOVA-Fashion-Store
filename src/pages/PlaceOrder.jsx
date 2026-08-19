import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, CreditCard, Truck } from "lucide-react";
import Title from "../components/Title";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const {
    cartItems = [],
    shippingFee = 0,
    placeOrder,
    navigate,
  } = useContext(UserContext);

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    postalCode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);

  const totalAmount = cartItems.reduce(
    (total, item) => total + Number(item.price || 0) * Number(item.quantity || 0),
    0
  );

  const totalWithShipping = totalAmount + (totalAmount > 0 ? shippingFee : 0);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      navigate("/cart");
      return;
    }

    const fullName = `${address.firstName} ${address.lastName}`.trim();

    const orderAddress = {
      name: fullName,
      street: address.street,
      city: address.city,
      state: "Punjab",
      zipcode: address.postalCode,
      country: "Pakistan",
      phone: address.phone,
      email: address.email,
    };

    try {
      setLoading(true);

      await placeOrder({
        paymentMethod,
        address: orderAddress,
      });

      setAddress({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        street: "",
        city: "",
        postalCode: "",
      });

      setPaymentMethod("COD");
    } catch (error) {
      console.error(error);
      toast.error("Unable to place order.");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <section className="max-w-5xl mx-auto px-4 md:px-8 py-20">
        <div className="flex flex-col items-center justify-center text-center py-20">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-6">
            <Truck size={32} className="text-gray-400" />
          </div>

          <h2 className="text-2xl font-bold text-black">
            Your cart is empty
          </h2>

          <p className="text-gray-500 mt-2">
            Add products to your cart before placing an order.
          </p>

          <button
            type="button"
            onClick={() => navigate("/collection")}
            className="mt-7 px-7 py-3 rounded-xl bg-black text-white text-sm font-semibold hover:bg-[#C9A227] hover:text-black transition-all duration-300"
          >
            Continue Shopping
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
      <motion.h1
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-black tracking-tight mb-2"
      >
        <Title text1="Place" text2="Order" />
      </motion.h1>

      <p className="text-gray-500 mb-12 text-center">
        Fill in your details to complete the purchase
      </p>

      <form
        onSubmit={handlePlaceOrder}
        className="grid lg:grid-cols-3 gap-12"
      >
        <div className="lg:col-span-2 flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="border border-gray-200 rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <MapPin size={18} className="text-[#C9A227]" />

              <h2 className="text-lg font-bold text-black">
                Delivery Address
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={address.firstName}
                required
                onChange={handleChange}
                className="border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#C9A227] transition-colors"
              />

              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={address.lastName}
                required
                onChange={handleChange}
                className="border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#C9A227] transition-colors"
              />

              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={address.email}
                required
                onChange={handleChange}
                className="border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#C9A227] transition-colors sm:col-span-2"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                name="phone"
                value={address.phone}
                required
                onChange={handleChange}
                className="border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#C9A227] transition-colors sm:col-span-2"
              />

              <input
                type="text"
                placeholder="Street Address"
                name="street"
                value={address.street}
                required
                onChange={handleChange}
                className="border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#C9A227] transition-colors sm:col-span-2"
              />

              <input
                type="text"
                placeholder="City"
                name="city"
                value={address.city}
                required
                onChange={handleChange}
                className="border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#C9A227] transition-colors"
              />

              <input
                type="text"
                placeholder="Postal Code"
                name="postalCode"
                value={address.postalCode}
                required
                onChange={handleChange}
                className="border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#C9A227] transition-colors"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="border border-gray-200 rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <CreditCard size={18} className="text-[#C9A227]" />

              <h2 className="text-lg font-bold text-black">
                Payment Method
              </h2>
            </div>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod("COD")}
                className={`flex items-center justify-between rounded-xl px-5 py-4 text-left transition-colors ${
                  paymentMethod === "COD"
                    ? "border-2 border-black"
                    : "border border-gray-300 hover:border-gray-400"
                }`}
              >
                <div>
                  <p className="font-semibold text-black text-sm">
                    Cash On Delivery
                  </p>

                  <p className="text-xs text-gray-500 mt-0.5">
                    Pay when your order arrives
                  </p>
                </div>

                <div className="w-4 h-4 rounded-full border-2 border-black flex items-center justify-center">
                  {paymentMethod === "COD" && (
                    <div className="w-2 h-2 rounded-full bg-black" />
                  )}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("Card")}
                className={`flex items-center justify-between rounded-xl px-5 py-4 text-left transition-colors ${
                  paymentMethod === "Card"
                    ? "border-2 border-black"
                    : "border border-gray-300 hover:border-gray-400"
                }`}
              >
                <div>
                  <p className="font-semibold text-black text-sm">
                    Credit / Debit Card
                  </p>

                  <p className="text-xs text-gray-500 mt-0.5">
                    Secure online payment
                  </p>
                </div>

                <div className="w-4 h-4 rounded-full border-2 border-black flex items-center justify-center">
                  {paymentMethod === "Card" && (
                    <div className="w-2 h-2 rounded-full bg-black" />
                  )}
                </div>
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-fit rounded-2xl border border-gray-200 p-6 sticky top-24"
        >
          <h2 className="text-lg font-bold text-black mb-6">
            Order Summary
          </h2>

          <div className="flex flex-col gap-4 mb-6">
            {cartItems.map((item) => (
              <div
                key={`${item._id}-${item.size}-${item.color}`}
                className="flex gap-3"
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                  <img
                    src={item?.image?.[0]}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <p className="text-sm font-semibold text-black">
                    {item.name}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    {item.color} | {item.size} | Qty {item.quantity}
                  </p>
                </div>

                <span className="text-sm font-bold text-black">
                  RS.{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-4 space-y-3 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>

              <span className="text-black font-medium">
                Rs.{totalAmount}
              </span>
            </div>

            <div className="flex justify-between text-gray-500">
              <span>Shipping</span>

              <span className="text-black font-medium">
                Rs.{shippingFee}
              </span>
            </div>
          </div>

          <div className="border-t border-gray-200 my-5" />

          <div className="flex justify-between items-center mb-8">
            <span className="font-semibold text-black">
              Total
            </span>

            <span className="text-2xl font-bold text-black">
              RS.{totalWithShipping}
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-black text-white text-sm uppercase tracking-widest font-semibold hover:bg-[#C9A227] hover:text-black transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Placing Order..." : "Confirm Order"}
          </button>

          <div className="flex items-center gap-2 justify-center mt-6 text-gray-400 text-xs">
            <Truck size={14} />
            Estimated delivery in 3-5 business days
          </div>
        </motion.div>
      </form>
    </section>
  );
};

export default PlaceOrder;