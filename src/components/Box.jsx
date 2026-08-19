import React, { useContext, useEffect, useRef, useState } from "react";
import { Heart } from "lucide-react";
import { FaHeart } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { UserContext } from "../context/UserContext";

const GOLD = "#C9A227";

const Box = ({
  id,
  images = [],
  brand,
  name,
  price,
  discount,
  finalPrice,
}) => {
  const [currentImage, setCurrentImage] = useState(0);
  const imageRef = useRef(null);

  const { navigate, toggleWishList, wishListProducts = [] } =
    useContext(UserContext);

  const handleMouseEnter = () => {
    if (images.length <= 1) return;

    clearInterval(imageRef.current);

    imageRef.current = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 1200);
  };

  const handleMouseLeave = () => {
    clearInterval(imageRef.current);
    setCurrentImage(0);
  };

  useEffect(() => {
    return () => clearInterval(imageRef.current);
  }, []);

  const getImageUrl = (image) => {
    if (!image) return "/placeholder.png";

    if (typeof image === "string") {
      return image;
    }

    if (typeof image === "object") {
      return (
        image.image_URL ||
        image.imageUrl ||
        image.url ||
        image.src ||
        "/placeholder.png"
      );
    }

    return "/placeholder.png";
  };

  const imageUrl = getImageUrl(images[currentImage]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-[26px] border border-neutral-200 overflow-hidden hover:border-[#C9A227]/40 hover:shadow-[0_22px_55px_-22px_rgba(0,0,0,.28)] transition-all duration-500"
    >
      <div
        className="relative aspect-4/5 overflow-hidden bg-neutral-100"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={imageUrl}
            src={imageUrl}
            alt={name || "Product"}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.6 }}
            onError={(e) => {
              e.currentTarget.src = "/placeholder.png";
            }}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1800"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate(`/product/${id}`)}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full bg-black text-white p-4 cursor-pointer text-xs uppercase tracking-[0.25em] opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"
        >
          Quick View
        </motion.button>

        {discount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-semibold text-white"
            style={{ background: GOLD }}
          >
            -{discount}%
          </motion.span>
        )}

        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => toggleWishList(id)}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center shadow-lg"
        >
          {wishListProducts.some((product) => product._id === id) ? (
            <FaHeart className="text-red-600 text-lg" />
          ) : (
            <Heart
              className="w-5 h-5 text-neutral-700"
              strokeWidth={1.8}
            />
          )}
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="p-5"
      >
        <p className="uppercase tracking-[0.28em] text-[10px] text-neutral-400">
          {brand || "NOVA"}
        </p>

        <h3
          title={name}
          className="mt-2 text-[16px] font-medium text-neutral-900 truncate"
        >
          {name}
        </h3>

        <div className="flex items-center gap-3 mt-3">
          <span className="text-lg font-semibold">
            Rs. {Number(finalPrice ?? price ?? 0).toLocaleString()}
          </span>

          {discount > 0 && (
            <span className="text-sm text-neutral-400 line-through">
              Rs. {Number(price ?? 0).toLocaleString()}
            </span>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Box;