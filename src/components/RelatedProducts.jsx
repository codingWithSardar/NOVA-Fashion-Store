import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import Title from "./Title";
import Box from "./Box";

const RelatedProducts = ({ category, id }) => {
  const { products , fetchProducts} = useContext(UserContext);

  const relatedProducts = products.filter(
    (item) => item.category === category && item._id !== id,
  );

  useEffect(() => {
   fetchProducts()
  }, [])
  
  return (
    <div className="py-16 mt-10 px-4 md:px-7 flex flex-col items-center justify-center ">
      <Title text1={"Related"} text2={"Products"} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6 pb-2 mt-10">
        {relatedProducts.slice(0, 4).map((item) => (
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
    </div>
  );
};

export default RelatedProducts;
