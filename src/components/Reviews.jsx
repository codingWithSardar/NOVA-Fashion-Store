import React from "react";
import { Star, Quote } from "lucide-react";
import Title from "./Title";

const reviews = [
  {
    name: "Ayesha Khan",
    role: "Verified Buyer",
    rating: 5,
    text: "The fabric quality is unmatched. Ordered a blazer and it fits like it was tailored for me. Packaging alone felt like unboxing a gift.",
    initials: "AK",
  },
  {
    name: "Hamza Raza",
    role: "Verified Buyer",
    rating: 5,
    text: "Fast delivery and the leather jacket exceeded expectations. This is now my go-to store for anything premium.",
    initials: "HR",
  },
  {
    name: "Sana Malik",
    role: "Verified Buyer",
    rating: 4,
    text: "Beautiful stitching and attention to detail. Sizing ran slightly large but their return process was effortless.",
    initials: "SM",
  },
];

const StarRating = ({ rating }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-[#C9A227] text-[#C9A227]" : "text-gray-300"
        }`}
      />
    ))}
  </div>
);

const Reviews = () => {
  return (
    <section className="bg-white  py-20 px-4 md:px-7">
      <div className="max-w-6xl mx-auto">
     
        <div className="text-center mb-14">
          <span className="text-[#C9A227] text-xs font-semibold tracking-[0.3em]">
            TESTIMONIALS
          </span>
          <Title text1={'What Our'} text2={'Customers Say'}/>
         
        </div>

   
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="relative bg-[#faf9f7] border border-gray-100 rounded-sm p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
            >
              <Quote className="w-8 h-8 text-[#C9A227]/20 absolute top-6 right-6" />

              <StarRating rating={review.rating} />

              <p className="text-sm text-gray-600 leading-relaxed mt-5 mb-8">
                “{review.text}”
              </p>

              <div className="flex items-center gap-3 border-t border-gray-200 pt-5">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-xs font-semibold tracking-wide">
                  {review.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-black">
                    {review.name}
                  </p>
                  <p className="text-xs text-gray-400">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;