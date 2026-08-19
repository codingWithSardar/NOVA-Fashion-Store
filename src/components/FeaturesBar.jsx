import React from "react";
import { BadgeCheck, Truck, RotateCcw, Headset, Gift, Leaf } from "lucide-react";

const features = [
  {
    icon: BadgeCheck,
    title: "PREMIUM QUALITY",
    desc: "Italian leather & fine fabrics.",
  },
  {
    icon: Truck,
    title: "GLOBAL DELIVERY",
    desc: "Express shipping worldwide.",
  },
  {
    icon: RotateCcw,
    title: "EASY RETURNS",
    desc: "30-day effortless return policy.",
  },
  {
    icon: Headset,
    title: "24/7 SUPPORT",
    desc: "Dedicated concierge service.",
  },
  {
    icon: Gift,
    title: "GIFT WRAPPING",
    desc: "Complimentary luxury packaging.",
  },
  {
    icon: Leaf,
    title: "SUSTAINABLE",
    desc: "Ethically sourced materials.",
  },
];

const FeaturesBar = () => {
  return (
    <div className="w-full bg-[#f7f7f7] border-l-4 border-black py-16 px-4 md:px-7">
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="flex flex-col items-center text-center gap-2 secondary"
            >
              <Icon className="w-6 h-6 text-black" strokeWidth={1.5} />
              <h3 className="text-xs font-bold tracking-wide text-black">
                {feature.title}
              </h3>
              <p className="text-xs text-gray-500 leading-snug max-w-35">
                {feature.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturesBar;