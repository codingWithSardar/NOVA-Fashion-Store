import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Box from "./Box";
import Title from "./Title";

const BestSellers = () => {
  const { products = [] } = useContext(UserContext);

  const isBestSellers = products.filter((product) => product.bestseller);

  return (
    <section className="py-16 px-4 md:px-7 flex flex-col items-center justify-center ">
      <Title text1="Best" text2="Sellers" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6 pb-2 mt-10">
        {isBestSellers.slice(0, 8).map((item) => (
          <div key={item._id} className="w-80 sm:w-56 xl:w-72 ">
            <Box
              id={item._id}
              images={item.images}
              brand={item.brand}
              name={item.name}
              price={item.price}
              discount={item.discount}
              finalPrice={item.finalPrice}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestSellers;
