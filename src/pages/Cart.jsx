import React, { useContext } from "react";
import { motion } from "framer-motion";
import {
  Trash2,
  Minus,
  Plus,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import Title from "../components/Title";
import { UserContext } from "../context/UserContext";

const Cart = () => {
  const {
    cartItems = [],
    updateCart,
    removeItem,
    shippingFee = 200,
    navigate,
  } = useContext(UserContext);

  // Calculate subtotal directly from static/local cart data
  const totalAmount = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const totalWithShipping = totalAmount + shippingFee;

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
      <motion.h1
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-black tracking-tight mb-2"
      >
        <Title text1={"Shopping"} text2={"Cart"} />
      </motion.h1>

      <p className="text-gray-500 mb-12">
        {cartItems.length}{" "}
        {cartItems.length === 1 ? "item" : "items"} in your cart
      </p>

      {cartItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-24"
        >
          <ShoppingBag size={50} className="text-gray-300 mb-5" />

          <h2 className="text-2xl font-bold text-black">
            Your cart is empty
          </h2>

          <p className="text-gray-500 mt-2">
            Add some products to your cart to continue.
          </p>

          <button
            onClick={() => navigate("/collection")}
            className="mt-7 px-7 py-3 rounded-xl bg-black text-white text-sm font-semibold hover:bg-[#C9A227] hover:text-black transition-all duration-300"
          >
            Continue Shopping
          </button>
        </motion.div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {cartItems.map((item, index) => (
              <motion.div
                key={`${item._id}-${item.size}-${item.color}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                }}
                className="flex gap-5 border border-gray-200 rounded-2xl p-4 hover:border-[#C9A227] transition-colors duration-300"
              >
                {/* Product Image */}
                <div className="w-28 h-28 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                  <img
                    src={item.image?.[0]}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-black text-lg">
                        {item.name}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        Color: {item.color} | Size: {item.size}
                      </p>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() =>
                        removeItem(
                          item._id,
                          item.size,
                          item.color
                        )
                      }
                      className="text-gray-400 hover:text-red-500 transition-colors duration-300 cursor-pointer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity */}
                    <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
                      <button
                        onClick={() =>
                          updateCart(
                            item._id,
                            item.size,
                            item.color,
                            item.quantity - 1
                          )
                        }
                        disabled={item.quantity <= 1}
                        className="w-9 h-9 cursor-pointer flex items-center justify-center hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <Minus size={14} />
                      </button>

                      <span className="w-9 text-center text-sm font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateCart(
                            item._id,
                            item.size,
                            item.color,
                            item.quantity + 1
                          )
                        }
                        className="w-9 h-9 cursor-pointer flex items-center justify-center hover:bg-gray-100 transition"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Price */}
                    <span className="font-bold text-sm ml-3 text-black">
                      RS.{item.price * item.quantity}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="h-fit rounded-2xl border border-gray-200 p-6 sticky top-24"
          >
            <h2 className="text-xl font-bold text-black mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>

                <span className="text-black font-medium">
                  RS.{totalAmount}
                </span>
              </div>

              <div className="flex justify-between text-gray-500">
                <span>Shipping</span>

                <span className="text-black font-medium">
                  RS.{shippingFee}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-200 my-6" />

            <div className="flex justify-between items-center mb-8">
              <span className="font-semibold text-black">
                Total
              </span>

              <span className="text-2xl font-bold text-black">
                RS.{totalWithShipping}
              </span>
            </div>

            <button
              onClick={() => navigate("/place-order")}
              className="w-full py-4 rounded-xl bg-black text-white text-sm uppercase tracking-widest font-semibold hover:bg-[#C9A227] hover:text-black transition-all duration-300 flex items-center justify-center gap-2"
            >
              Checkout
              <ArrowRight size={16} />
            </button>

            <div className="flex items-center gap-2 justify-center mt-6 text-gray-400 text-xs">
              <ShoppingBag size={14} />
              Free shipping on orders above RS.5000
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Cart;
