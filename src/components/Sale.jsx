import React from "react";
import { assets } from "../assets/assets";

const Sale = () => {
  return (
    <div
      className="relative h-[85vh] py-16 px-4 md:px-7 w-full bg-center bg-cover bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: `url(${assets.sale})` }}
    >
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-black/40 z-20" />

      <div className="flex  justify-center items-center flex-col space-y-5 absolute z-30 px-4">
        
        <span className="text-white secondary tracking-[0.3em] text-sm font-medium">
          LIMITED TIME
        </span>

        <h1 className="text-white primary text-5xl md:text-6xl text-center font-bold leading-tight">
          Summer 2026 <br /> Collection
        </h1>

        <p className="text-white/90 secondary tracking-widest text-sm md:text-base">
          ENJOY UP TO 50% OFF SELECTED ITEMS
        </p>

        <button className="mt-2 bg-black hover:bg-[#C9A227] text-white hover:text-black px-10 py-3.5 border-none secondary tracking-widest leading-tight text-sm transition-colors duration-500">
          DISCOVER THE SALE
        </button>
      </div>
    </div>
  );
};

export default Sale;