import React, { useContext } from "react";
import { motion } from "framer-motion";
import {
  Package,
  ShoppingBag,
  MapPin,
  CreditCard,
} from "lucide-react";
import Title from "../components/Title";
import { UserContext } from "../context/UserContext";

const Orders = () => {
  const { orders = [] } = useContext(UserContext);

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-700";
      case "processing":
        return "bg-yellow-100 text-yellow-700";
      case "shipped":
        return "bg-blue-100 text-blue-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getImage = (item) => {
    if (Array.isArray(item?.image) && item.image.length > 0) {
      return item.image[0];
    }

    if (typeof item?.image === "string") {
      return item.image;
    }

    if (Array.isArray(item?.images) && item.images.length > 0) {
      return item.images[0]?.image_URL || item.images[0];
    }

    return "/placeholder.png";
  };

  return (
    <section className="max-w-5xl mx-auto px-4 md:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold text-black tracking-tight mb-2">
          <Title text1="My" text2="Orders" />
        </h1>

        <p className="text-gray-500 mt-4">
          Track and manage your orders
        </p>
      </motion.div>

      {orders.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-24"
        >
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-5">
            <ShoppingBag size={32} className="text-gray-400" />
          </div>

          <h2 className="text-xl font-semibold text-black">
            No Orders Yet
          </h2>

          <p className="text-gray-500 text-sm mt-2 text-center">
            Your orders will appear here after checkout.
          </p>
        </motion.div>
      ) : (
        <div className="flex flex-col gap-6">
          {orders.map((order, index) => {
            const items = Array.isArray(order?.items)
              ? order.items
              : [];

            return (
              <motion.div
                key={order?._id || `order-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                }}
                className="bg-white border border-gray-100 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#F8F5EB] flex items-center justify-center shrink-0">
                      <Package
                        size={20}
                        className="text-[#C9A227]"
                      />
                    </div>

                    <div>
                      <p className="font-semibold text-black">
                        Order #{order?._id?.slice(-6) || "000000"}
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        {order?.date
                          ? new Date(order.date).toLocaleDateString(
                              "en-PK",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )
                          : "Recently"}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`w-fit px-4 py-2 rounded-full text-xs sm:text-sm font-semibold ${getStatusStyle(
                      order?.status
                    )}`}
                  >
                    {order?.status || "Processing"}
                  </span>
                </div>

                <div className="py-5 space-y-4">
                  {items.length === 0 ? (
                    <div className="py-6 text-center text-sm text-gray-500">
                      No products found in this order.
                    </div>
                  ) : (
                    items.map((item, itemIndex) => {
                      const price =
                        Number(
                          item?.finalPrice ?? item?.price ?? 0
                        );

                      const quantity = Number(
                        item?.quantity ?? 1
                      );

                      return (
                        <div
                          key={`${order?._id}-${item?._id}-${itemIndex}`}
                          className="flex gap-4 items-center p-3 rounded-2xl bg-gray-50"
                        >
                          <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                            <img
                              src={getImage(item)}
                              alt={item?.name || "Product"}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src =
                                  "/placeholder.png";
                              }}
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-black truncate">
                              {item?.name || "Product"}
                            </h3>

                            <p className="text-sm text-gray-500 mt-1">
                              {item?.color || "Default"} •{" "}
                              {item?.size || "One Size"}
                            </p>

                            <p className="text-sm text-gray-500">
                              Quantity: {quantity}
                            </p>
                          </div>

                          <div className="text-right shrink-0">
                            <p className="font-bold text-black">
                              Rs{" "}
                              {(price * quantity).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                <div className="border-t border-gray-100 pt-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <CreditCard
                          size={15}
                          className="text-[#C9A227]"
                        />

                        <span>
                          Payment:{" "}
                          <strong className="text-black">
                            {order?.paymentMethod || "COD"}
                          </strong>
                        </span>
                      </div>

                      {order?.address && (
                        <div className="flex items-start gap-2 text-sm text-gray-500">
                          <MapPin
                            size={15}
                            className="text-[#C9A227] mt-0.5 shrink-0"
                          />

                          <span>
                            {order.address?.name && (
                              <>
                                {order.address.name}
                                <br />
                              </>
                            )}

                            {order.address?.street && (
                              <>
                                {order.address.street}
                                <br />
                              </>
                            )}

                            {order.address?.city},{" "}
                            {order.address?.country}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="sm:text-right">
                      <p className="text-sm text-gray-500">
                        Total Amount
                      </p>

                      <p className="text-2xl font-bold text-[#C9A227] mt-1">
                        Rs{" "}
                        {Number(
                          order?.amount || 0
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex justify-end">
                    <button
                      type="button"
                      className="px-6 py-3 rounded-xl bg-black text-white text-sm font-semibold hover:bg-[#C9A227] hover:text-black transition-all duration-300 cursor-pointer"
                    >
                      Track Order
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Orders;