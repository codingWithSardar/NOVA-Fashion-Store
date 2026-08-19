import React, { useMemo } from "react";
import Box from "../components/Box";
import Title from "../components/Title";
import { dummyProducts } from "../dummy/dummydata";

const SalePage = () => {
  
  const saleProducts = useMemo(
    () => dummyProducts.filter((product) => product.onSale),
    [],
  );

  return (
    <div className="min-h-screen bg-[#faf9f6] px-6 py-12 max-w-7xl mx-auto">
      <Title text1={"Sale"} text2={"Products"} />

      <div className="mt-10">
        {saleProducts.length === 0 ? (
          <p className="text-neutral-500">No products on sale right now.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {saleProducts.map((product) => (
              <Box
                key={product._id}
                id={product._id}
                name={product.name}
                brand={product.brand}
                price={product.price}
                images={product.images}
                finalPrice={product.finalPrice}
                discount={product.discount}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SalePage;
