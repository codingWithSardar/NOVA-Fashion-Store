import React from "react";
import { motion } from "framer-motion";
import Title from "./Title";
import Card from "./Card";
import { assets } from "../assets/assets";

const categories = [
  {
    image: assets.dress,
    text: "Dresses",
    category: "Dresses",
   
  },
  {
    image: assets.shirt,
    text: "Tops & Shirts",
    category: "Tops & Shirts",
  },
  {
    image: assets.bottom,
    text: "Bottoms",
    category: "Bottoms",
  
  },
  {
    image: assets.ethnic,
    text: "Ethnic Wear",
    category: "Ethnic Wear",
  
  },
  {
    image: assets.outerwear,
    text: "Outerwear",
    category: "Outerwear",
    
  },
  {
    image: assets.accessories,
    text: "Accessories",
    category: "Accessories",
  },
];

const Category = () => {
  return (
    <section className="py-20 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <Title text1="Shop By" text2="Category" />

        <p className="mt-4 max-w-2xl mx-auto text-gray-500">
          Discover timeless fashion crafted for every occasion.
        </p>
      </motion.div>

      <div className="mt-12 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card
            key={category.text}
            image={category.image}
            text={category.text}
            category={category.category}
           
          />
        ))}
      </div>
    </section>
  );
};

export default Category;