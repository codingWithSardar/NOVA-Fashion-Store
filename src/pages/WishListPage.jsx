import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Title from "../components/Title";
import Box from "../components/Box";

const WishListPage = () => {
  const { wishListProducts = [] } = useContext(UserContext);

  return (
    <div className="py-16 px-4 md:px-7 flex flex-col items-center justify-center">
      <Title text1={"WishList"} text2={"Products"} />

      {wishListProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-2 mt-10">
          {wishListProducts.map((item) => (
            <div
              key={item._id}
              className="w-80 sm:w-56 xl:w-72"
            >
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
      ) : (
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-lg">
            Your wishlist is empty.
          </p>

          <button
            onClick={() => (window.location.href = "/collection")}
            className="mt-5 px-6 py-3 rounded-xl bg-black text-white text-sm font-semibold hover:bg-gray-900 transition"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default WishListPage;