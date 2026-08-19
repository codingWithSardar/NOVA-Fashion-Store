import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { UserContext } from "../context/UserContext";

const Card = ({ image, text, category }) => {
  const { setCategory, navigate } = useContext(UserContext);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.4 }}
      onClick={() => {
        window.scrollTo(0, 0);
        setCategory(category);
        navigate("/collection");
      }}
      className="group relative h-80 overflow-hidden rounded-xl"
    >
      <Link className="absolute inset-0 z-10" />

      <img
        src={image}
        alt={text}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-5">
        <h3 className="text-xl font-semibold text-white">{text}</h3>

        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur text-white">
          <ArrowUpRight size={20} />
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
