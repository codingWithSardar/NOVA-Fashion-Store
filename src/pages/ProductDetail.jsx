import React, { useContext, useEffect, useState } from "react";
import {
  Heart,
  Star,
  Truck,
  RotateCcw,
  ShieldCheck,
  Minus,
  Plus,
  Loader2,
} from "lucide-react";
import { UserContext } from "../context/UserContext";
import { useParams } from "react-router-dom";
import RelatedProducts from "../components/RelatedProducts";
import { dummyProducts } from "../dummy/dummydata";

const ProductDetail = () => {
  const {
    addToCart,
    selectedSize,
    setSelectedSize,
    selectedColor,
    setSelectedColor,
    loading,
    toggleWishList,
    quantity,
    setQuantity,
  } = useContext(UserContext);

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    const foundProduct = dummyProducts.find(
      (item) => item._id === id
    );

    setProduct(foundProduct || null);
    setSelectedImage(0);
  }, [id]);

  if (!product) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <p className="text-gray-500">Product not found</p>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="grid lg:grid-cols-2 gap-14">
        {/* Product Images */}
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="flex lg:flex-col gap-4">
            {product.images?.map((item, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`overflow-hidden rounded-xl border-2 transition-all ${
                  selectedImage === index
                    ? "border-black"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <img
                  src={item.image_URL}
                  alt={product.name}
                  className="w-24 h-24 sm:w-30 sm:h-30 object-cover"
                />
              </button>
            ))}
          </div>

          <div className="flex-1 rounded-3xl overflow-hidden">
            <img
              src={product.images?.[selectedImage]?.image_URL}
              alt={product.name}
              className="w-full h-[80vh] object-cover"
            />
          </div>
        </div>

        {/* Product Information */}
        <div className="flex flex-col">
          <div className="mb-5 flex items-center gap-2">
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  fill="currentColor"
                  strokeWidth={0}
                />
              ))}
            </div>

            <span className="text-gray-500 text-sm">
              (128 Reviews)
            </span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900">
            {product.name}
          </h1>

          <p className="text-gray-500 mt-5 leading-8">
            {product.description}
          </p>

          {/* Price */}
          <div className="flex items-center gap-4 mt-8">
            <h2 className="text-4xl font-bold">
              RS.{product.finalPrice}
            </h2>

            {product.discount > 0 && (
              <span className="text-2xl text-gray-400 line-through">
                RS.{product.price}
              </span>
            )}

            {product.discount > 0 && (
              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                {product.discount}% OFF
              </span>
            )}
          </div>

          {/* Sizes */}
          <div className="mt-10">
            <h3 className="font-semibold text-lg mb-4">
              Select Size
            </h3>

            <div className="flex flex-wrap gap-3">
              {product.sizes?.map((size) => (
                <button
                  onClick={() =>
                    setSelectedSize((prev) =>
                      prev === size ? "" : size
                    )
                  }
                  key={size}
                  className={`w-14 cursor-pointer h-14 secondary rounded-xl border border-gray-300 ${
                    selectedSize === size
                      ? "bg-black text-white"
                      : ""
                  } transition`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="mt-10">
            <h3 className="font-semibold text-lg mb-4">
              Select Color
            </h3>

            <div className="flex flex-wrap gap-4">
              {product.colors?.map((color) => (
                <button
                  onClick={() =>
                    setSelectedColor((prev) =>
                      prev === color ? "" : color
                    )
                  }
                  key={color}
                  className={`rounded-xl secondary cursor-pointer text-sm font-semibold px-4 py-2 border border-gray-300 ${
                    selectedColor === color
                      ? "bg-black text-white"
                      : ""
                  } transition`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity + Cart */}
          <div className="mt-10 flex items-center gap-5">
            <div className="flex items-center border rounded-xl overflow-hidden">
              <button
                onClick={() =>
                  setQuantity((prev) =>
                    prev === 1 ? 1 : prev - 1
                  )
                }
                className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 cursor-pointer"
              >
                <Minus size={18} />
              </button>

              <span className="w-12 text-center font-semibold">
                {quantity}
              </span>

              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 cursor-pointer"
              >
                <Plus size={18} />
              </button>
            </div>

            <button
              disabled={loading}
              onClick={() =>
                addToCart(
                  product._id,
                  selectedSize,
                  selectedColor,
                  quantity
                )
              }
              className="py-4 flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed md:flex-1 px-4 rounded-xl bg-black text-xs text-white font-semibold hover:bg-gray-900 transition"
            >
              {loading ? (
                <Loader2
                  size={30}
                  className="animate-spin"
                />
              ) : (
                "Add To Cart"
              )}
            </button>

            <button
              className="w-14 h-14 rounded-xl border cursor-pointer hover:bg-gray-100 transition flex items-center justify-center"
              onClick={() => toggleWishList(product._id)}
            >
              <Heart size={22} />
            </button>
          </div>

          {/* Features */}
          <div className="mt-12 border-t pt-8 space-y-5">
            <div className="flex items-center gap-4">
              <Truck className="text-gray-700" />

              <div>
                <h4 className="font-semibold">
                  Free Shipping
                </h4>

                <p className="text-sm text-gray-500">
                  Free delivery on orders above $99
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <RotateCcw className="text-gray-700" />

              <div>
                <h4 className="font-semibold">
                  30 Days Return
                </h4>

                <p className="text-sm text-gray-500">
                  Easy returns & exchanges
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <ShieldCheck className="text-gray-700" />

              <div>
                <h4 className="font-semibold">
                  Secure Payment
                </h4>

                <p className="text-sm text-gray-500">
                  100% secure encrypted checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RelatedProducts
        category={product.category}
        id={product._id}
      />
    </section>
  );
};

export default ProductDetail;