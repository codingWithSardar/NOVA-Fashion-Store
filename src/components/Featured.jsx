import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Box from "./Box";
import Title from "./Title";

const Featured = () => {
  const { products = [] } = useContext(UserContext);

  const featuredProducts = products.filter((product) => product.isFeatured);

  return (
    <section className="py-16 px-4 md:px-7 flex flex-col items-center">
      <Title text1="Featured" text2="Products" />

      <div className="w-full max-w-7xl mt-10 overflow-x-scroll">
        <div className="flex gap-6 pb-2">
          {featuredProducts.slice(0 , 8).map((item) => (
            <div key={item._id} className="shrink-0 w-56 sm:w-72">
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
      </div>
    </section>
  );
};

export default Featured;
