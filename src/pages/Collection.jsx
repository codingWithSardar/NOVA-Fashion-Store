import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  SlidersHorizontal,
  X,
  ArrowUpDown,
  Sparkles,
  BadgeDollarSign,
  Palette,
  Ruler,
} from "lucide-react";
import { UserContext } from "../context/UserContext";
import Box from "../components/Box";
import { colorsData } from "../colors/colorData";
import { dummyProducts } from "../dummy/dummydata";

const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];

const categories = [
  "Dresses",
  "Tops & Shirts",
  "Bottoms",
  "Ethnic Wear",
  "Outerwear",
  "Accessories",
];

const Collection = () => {
  const {
    sort,
    setSort,
    maxPrice,
    setMaxPrice,
    category,
    setCategory,
    colors,
    setColors,
    sizes,
    setSizes,
  } = useContext(UserContext);

  const [filtersOpen, setFiltersOpen] = useState(false);

  const products = useMemo(() => {
    let result = [...dummyProducts];

    if (category) {
      result = result.filter((product) => product.category === category);
    }

    if (colors.length > 0) {
      result = result.filter((product) =>
        product.colors?.some((color) => colors.includes(color))
      );
    }

    if (sizes.length > 0) {
      result = result.filter((product) =>
        product.sizes?.some((size) => sizes.includes(size))
      );
    }

    result = result.filter(
      (product) => Number(product.finalPrice || product.price || 0) <= maxPrice
    );

    if (sort === "low-high") {
      result.sort(
        (a, b) =>
          Number(a.finalPrice || a.price || 0) -
          Number(b.finalPrice || b.price || 0)
      );
    }

    if (sort === "high-low") {
      result.sort(
        (a, b) =>
          Number(b.finalPrice || b.price || 0) -
          Number(a.finalPrice || a.price || 0)
      );
    }

    return result;
  }, [category, colors, sizes, maxPrice, sort]);

  useEffect(() => {
    document.body.style.overflow = filtersOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [filtersOpen]);

  const clearFilters = () => {
    setCategory("");
    setColors([]);
    setSizes([]);
    setMaxPrice(30000);
    setSort("");
  };

  const activeFilterCount =
    (category ? 1 : 0) +
    colors.length +
    sizes.length +
    (maxPrice < 30000 ? 1 : 0);

  const getImageUrl = (image) => {
    if (!image) return "/placeholder.png";

    if (typeof image === "string") {
      const match = image.match(/\((https?:\/\/[^)]+)\)/);
      return match ? match[1] : image;
    }

    if (typeof image === "object") {
      return image.image_URL || image.url || image.image || "/placeholder.png";
    }

    return "/placeholder.png";
  };

  const FilterPanel = () => (
    <div className="bg-white border border-neutral-200/60 rounded-2xl shadow-sm overflow-hidden">
      <div className="border-b border-neutral-100 px-6 py-5 flex justify-between items-center bg-neutral-50/50">
        <div className="flex items-center gap-2.5 text-neutral-800">
          <SlidersHorizontal size={16} className="text-[#C9A227]" />
          <h2 className="font-semibold text-sm tracking-wider uppercase">
            Filter Collection
          </h2>
        </div>

        <div className="flex items-center gap-4">
          {activeFilterCount > 0 && (
            <button
              onClick={clearFilters}
              className="text-xs font-medium text-neutral-400 hover:text-neutral-900 transition-colors flex items-center gap-1"
            >
              <X size={12} />
              Reset
            </button>
          )}

          <button
            onClick={() => setFiltersOpen(false)}
            className="lg:hidden text-neutral-500 hover:text-neutral-900"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-8 divide-y divide-neutral-100">
        <div className="pt-0">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={15} className="text-[#C9A227]" />
            <h3 className="font-semibold text-sm tracking-wide text-neutral-800">
              Category
            </h3>
          </div>

          <div className="space-y-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() =>
                  setCategory((prev) => (prev === cat ? "" : cat))
                }
                className={`w-full rounded-xl border text-left px-4 py-3 flex justify-between items-center transition-all duration-300 ${
                  category === cat
                    ? "bg-neutral-900 text-white border-neutral-900 shadow-md shadow-neutral-900/10"
                    : "border-neutral-200/80 bg-white text-neutral-600 hover:border-neutral-400 hover:text-neutral-900"
                }`}
              >
                <span className="capitalize text-xs font-semibold tracking-wide">
                  {cat}
                </span>

                <div
                  className={`h-3 w-3 rounded-full transition-all duration-300 border ${
                    category === cat
                      ? "border-[#C9A227] bg-[#C9A227] scale-110"
                      : "border-neutral-300 bg-transparent"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <BadgeDollarSign size={15} className="text-[#C9A227]" />
              <h3 className="font-semibold text-sm tracking-wide text-neutral-800">
                Price Limit
              </h3>
            </div>

            <span className="bg-neutral-100 text-neutral-800 px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider">
              Rs. {maxPrice.toLocaleString()}
            </span>
          </div>

          <input
            type="range"
            min={0}
            max={30000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-[#C9A227] h-1 bg-neutral-100 rounded-lg cursor-pointer appearance-none"
          />

          <div className="flex justify-between mt-2.5 text-[11px] font-semibold text-neutral-400">
            <span>Rs. 0</span>
            <span>Rs. 30,000</span>
          </div>
        </div>

        <div className="pt-6 h-40 overflow-y-scroll">
          <div className="flex items-center gap-2 mb-4">
            <Palette size={15} className="text-[#C9A227]" />
            <h3 className="font-semibold text-sm tracking-wide text-neutral-800">
              Colors
            </h3>
          </div>

          <div className="grid grid-cols-5 gap-3">
            {colorsData.map((color) => (
              <button
                key={color.name}
                title={color.name}
                onClick={() =>
                  setColors((prev) =>
                    prev.includes(color.name)
                      ? prev.filter((item) => item !== color.name)
                      : [...prev, color.name]
                  )
                }
                style={{ backgroundColor: color.hex }}
                className={`relative w-8 h-8 rounded-full transition-all duration-300 hover:scale-110 shadow-sm ${
                  colors.includes(color.name)
                    ? "ring-2 ring-offset-2 ring-neutral-900 scale-105"
                    : "border border-neutral-200/50"
                }`}
              >
                {colors.includes(color.name) && (
                  <span className="absolute inset-0 flex items-center justify-center text-white text-[10px]">
                    ✓
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Ruler size={15} className="text-[#C9A227]" />
            <h3 className="font-semibold text-sm tracking-wide text-neutral-800">
              Select Sizes
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {sizeOptions.map((size) => (
              <button
                key={size}
                onClick={() =>
                  setSizes((prev) =>
                    prev.includes(size)
                      ? prev.filter((item) => item !== size)
                      : [...prev, size]
                  )
                }
                className={`rounded-lg py-2.5 text-xs font-semibold tracking-wide transition-all duration-300 border ${
                  sizes.includes(size)
                    ? "bg-neutral-900 text-white border-neutral-900 shadow-md"
                    : "bg-white border-neutral-200 text-neutral-600 hover:border-neutral-400 hover:text-neutral-900"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#faf9f6] text-neutral-900 antialiased selection:bg-[#C9A227]/20 selection:text-[#C9A227]">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12">
        <aside className="hidden lg:block lg:w-80 shrink-0">
          <div className="sticky top-8">
            <FilterPanel />
          </div>
        </aside>

        <div
          onClick={() => setFiltersOpen(false)}
          className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
            filtersOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`absolute left-0 top-0 h-full w-[85%] max-w-90 overflow-y-auto bg-[#faf9f6] p-4 transition-transform duration-500 ease-out ${
              filtersOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <FilterPanel />
          </div>
        </div>

        <main className="flex-1">
          <div className="bg-white rounded-2xl border border-neutral-200/60 shadow-sm px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-neutral-900 font-serif">
                All Products
              </h2>

              <p className="text-xs text-neutral-400 mt-1 font-medium tracking-wide uppercase">
                Showing{" "}
                <span className="text-[#C9A227] font-semibold">
                  {products.length}
                </span>{" "}
                luxury pieces
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => setFiltersOpen(true)}
                className="lg:hidden relative flex items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-2.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition"
              >
                <SlidersHorizontal size={14} />
                Filters

                {activeFilterCount > 0 && (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#C9A227] text-[10px] font-bold text-white">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              <div className="relative flex items-center flex-1 sm:w-48">
                <ArrowUpDown
                  className="absolute left-3 text-neutral-400 pointer-events-none"
                  size={14}
                />

                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 py-2.5 pl-9 pr-4 text-xs font-medium text-neutral-700 outline-none hover:bg-neutral-50 transition focus:border-neutral-900 appearance-none"
                >
                  <option value="">Relevant</option>
                  <option value="low-high">Price: Low to High</option>
                  <option value="high-low">Price: High to Low</option>
                </select>

                <div className="absolute right-3 pointer-events-none text-neutral-400 text-[10px]">
                  ▼
                </div>
              </div>
            </div>
          </div>

          {activeFilterCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-8">
              {category && (
                <span className="flex items-center gap-1.5 rounded-full bg-white border border-neutral-200 pl-3 pr-2 py-1.5 text-xs font-semibold text-neutral-700">
                  {category.toUpperCase()}

                  <button
                    onClick={() => setCategory("")}
                    className="text-neutral-400 hover:text-neutral-900"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}

              {colors.map((color) => (
                <span
                  key={color}
                  className="flex items-center gap-1.5 rounded-full bg-white border border-neutral-200 pl-3 pr-2 py-1.5 text-xs font-semibold capitalize text-neutral-700"
                >
                  {color}

                  <button
                    onClick={() =>
                      setColors((prev) =>
                        prev.filter((item) => item !== color)
                      )
                    }
                    className="text-neutral-400 hover:text-neutral-900"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}

              {sizes.map((size) => (
                <span
                  key={size}
                  className="flex items-center gap-1.5 rounded-full bg-white border border-neutral-200 pl-3 pr-2 py-1.5 text-xs font-semibold text-neutral-700"
                >
                  {size}

                  <button
                    onClick={() =>
                      setSizes((prev) =>
                        prev.filter((item) => item !== size)
                      )
                    }
                    className="text-neutral-400 hover:text-neutral-900"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}

              {maxPrice < 30000 && (
                <span className="flex items-center gap-1.5 rounded-full bg-white border border-neutral-200 pl-3 pr-2 py-1.5 text-xs font-semibold text-neutral-700">
                  Under Rs. {maxPrice.toLocaleString()}

                  <button
                    onClick={() => setMaxPrice(30000)}
                    className="text-neutral-400 hover:text-neutral-900"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}

              <button
                onClick={clearFilters}
                className="text-xs font-semibold text-[#C9A227] hover:text-neutral-900 transition-colors ml-1"
              >
                Clear all
              </button>
            </div>
          )}

          {products.length === 0 ? (
            <div className="bg-white rounded-3xl border border-neutral-200/60 p-20 text-center shadow-sm">
              <div className="mx-auto w-12 h-12 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-400 mb-4">
                <SlidersHorizontal size={20} />
              </div>

              <h2 className="text-xl font-semibold text-neutral-800 mb-2 font-serif">
                No Products Match Your Criteria
              </h2>

              <p className="text-sm text-neutral-400 max-w-sm mx-auto">
                Adjust your filters, range parameters, or sizing parameters to
                discover other tailored selections.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="transition-transform duration-300 hover:-translate-y-1"
                >
                  <Box
                    id={product._id}
                    name={product.name}
                    price={product.price}
                    images={(product.images || product.image || []).map(
                      (image) => getImageUrl(image)
                    )}
                    finalPrice={product.finalPrice}
                    discount={product.discount}
                  />
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Collection;