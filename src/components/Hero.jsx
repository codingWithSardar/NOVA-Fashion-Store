import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    window.scrollTo(0, 0);
    navigate(path);
  };

  return (
    <div
      className="relative w-full lg:h-[90vh] xl:h-[92vh] h-[94vh] bg-no-repeat bg-center bg-cover flex justify-start items-center"
      style={{
        backgroundImage: `url(${assets.hero})`,
      }}
    >
      <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/30 to-transparent" />

      <div className="relative z-30 left-0 px-6 sm:px-10 lg:px-20 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h3 className="text-white/90 text-xs sm:text-sm tracking-[0.3em] font-medium mb-4 uppercase">
            New Season 2026
          </h3>

          <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl primary font-medium leading-tight mb-6">
            Defining Modern <br /> Elegance
          </h1>

          <p className="text-white/80 secondary text-sm sm:text-base leading-relaxed max-w-md mb-8">
            Timeless silhouettes, refined fabrics, and craftsmanship built to
            last. Discover a collection designed for those who value quality
            over trend.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => handleNavigate("/collection")}
              className="px-8 py-3.5 text-sm font-semibold tracking-wide uppercase bg-black text-white transition-all duration-300 rounded-sm secondary hover:bg-[#C9A227] hover:text-black cursor-pointer"
            >
              Shop Now
            </button>

            <button
              onClick={() => handleNavigate("/collection")}
              className="border border-white/70 secondary text-white px-8 py-3.5 text-sm font-semibold tracking-wide uppercase hover:bg-white hover:text-black transition-all duration-300 rounded-sm cursor-pointer"
            >
              Explore Collections
            </button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 text-white/70">
        <span className="text-[10px] tracking-widest uppercase">
          Scroll
        </span>

        <div className="w-[1.5px] h-8 bg-white/50 animate-pulse" />
      </div>
    </div>
  );
};

export default Hero;