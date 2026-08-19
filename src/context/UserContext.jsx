import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  dummyProducts,
  dummyUser,
  dummyCartItems,
  dummyOrders,
  DUMMY_SHIPPING_FEE,
} from "../dummy/dummydata";

export const UserContext = createContext();

const CART_STORAGE_KEY = "dummyCartItems";
const WISHLIST_STORAGE_KEY = "dummyWishlist";
const ORDERS_STORAGE_KEY = "dummyOrders";

export const UserContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const serverURL = "";

  const [products, setProducts] = useState(dummyProducts);
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState(30000);
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);

  const [user, setUser] = useState(dummyUser);
  const [saleProducts, setSaleProducts] = useState([]);

  const [wishListProducts, setWishListProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [loading, setLoading] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved !== null ? JSON.parse(saved) : dummyCartItems;
    } catch {
      return dummyCartItems;
    }
  });

  const [cartCount, setCartCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);

      if (saved !== null) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : [];
      }

      return Array.isArray(dummyOrders) ? dummyOrders : [];
    } catch {
      return Array.isArray(dummyOrders) ? dummyOrders : [];
    }
  });

  const fetchProducts = async () => {
    try {
      let result = [...dummyProducts];

      if (search) {
        result = result.filter((product) =>
          product.name.toLowerCase().includes(search.toLowerCase())
        );
      }

      if (category) {
        result = result.filter(
          (product) => product.category === category
        );
      }

      if (maxPrice) {
        result = result.filter(
          (product) => product.price <= maxPrice
        );
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

      if (sort === "asc") {
        result.sort((a, b) => a.price - b.price);
      }

      if (sort === "desc") {
        result.sort((a, b) => b.price - a.price);
      }

      setProducts(result);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while loading products");
    }
  };

  const getSaleProducts = async () => {
    try {
      setSaleProducts(
        dummyProducts.filter((product) => product.onSale)
      );
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const getCurrentUser = async () => {
    try {
      setUser(dummyUser);
    } catch (error) {
      console.error(error);
      toast.error("Please login");
    }
  };

  const logout = async () => {
    setUser(null);
    toast.success("Logged out successfully");
    navigate("/register");
  };

  const toggleWishList = async (id) => {
    try {
      const exists = wishListProducts.some(
        (product) => product._id === id
      );

      if (exists) {
        setWishListProducts((prev) =>
          prev.filter((product) => product._id !== id)
        );

        toast.success("Removed from wishlist");
        return;
      }

      const product = dummyProducts.find(
        (product) => product._id === id
      );

      if (product) {
        setWishListProducts((prev) => [...prev, product]);
        toast.success("Added to wishlist");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const wishList = async () => {
    return wishListProducts;
  };

  const addToCart = async (
    id,
    size,
    color,
    quantity = 1
  ) => {
    try {
      setLoading(true);

      const product = dummyProducts.find(
        (product) => product._id === id
      );

      if (!product) {
        toast.error("Product not found");
        setLoading(false);
        return false;
      }

      setCartItems((prev) => {
        const existingItem = prev.find(
          (item) =>
            item._id === id &&
            item.size === size &&
            item.color === color
        );

        if (existingItem) {
          return prev.map((item) =>
            item._id === id &&
            item.size === size &&
            item.color === color
              ? {
                  ...item,
                  quantity: item.quantity + quantity,
                }
              : item
          );
        }

        return [
          ...prev,
          {
            _id: product._id,
            name: product.name,
            price: product.finalPrice ?? product.price,
            image: [
              product.image?.[0] ||
                product.images?.[0]?.image_URL ||
                "/placeholder.png",
            ],
            size,
            color,
            quantity,
          },
        ];
      });

      setSelectedColor(null);
      setSelectedSize(null);
      setQuantity(1);

      toast.success("Added to cart");
      setLoading(false);

      return true;
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("Something went wrong");
      return false;
    }
  };

  const getCartData = async () => {
    return cartItems;
  };

  const getCartCount = async () => {
    const total = cartItems.reduce(
      (sum, item) => sum + Number(item.quantity || 0),
      0
    );

    setCartCount(total);

    return total;
  };

  const updateCart = async (
    id,
    size,
    color,
    newQuantity
  ) => {
    try {
      if (newQuantity < 1) return;

      setCartItems((prev) =>
        prev.map((item) =>
          item._id === id &&
          item.size === size &&
          item.color === color
            ? {
                ...item,
                quantity: newQuantity,
              }
            : item
        )
      );

      toast.success("Cart updated");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const removeItem = async (
    id,
    size,
    color
  ) => {
    try {
      setCartItems((prev) =>
        prev.filter(
          (item) =>
            !(
              item._id === id &&
              item.size === size &&
              item.color === color
            )
        )
      );

      toast.success("Item removed from cart");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  const getTotalAmount = async () => {
    try {
      const total = cartItems.reduce(
        (sum, item) =>
          sum +
          Number(item.price || 0) *
            Number(item.quantity || 0),
        0
      );

      setTotalAmount(total);
      setShippingFee(
        total > 0 ? DUMMY_SHIPPING_FEE : 0
      );

      return total;
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      return 0;
    }
  };

  const getUserOrders = async () => {
    return orders;
  };

  const placeOrder = async (orderData = {}) => {
    try {
      if (!cartItems || cartItems.length === 0) {
        toast.error("Your cart is empty");
        return false;
      }

      const currentCart = cartItems.map((item) => ({
        _id: item._id,
        name: item.name,
        price: Number(item.price || 0),
        finalPrice: Number(item.price || 0),
        image: Array.isArray(item.image)
          ? [...item.image]
          : [item.image || "/placeholder.png"],
        size: item.size || "",
        color: item.color || "",
        quantity: Number(item.quantity || 1),
      }));

      const subtotal = currentCart.reduce(
        (sum, item) =>
          sum + item.price * item.quantity,
        0
      );

      const shipping =
        subtotal > 0 ? DUMMY_SHIPPING_FEE : 0;

      const newOrder = {
        _id: `order_${Date.now()}`,
        items: currentCart,
        amount: subtotal + shipping,
        subtotal,
        shippingFee: shipping,
        status: "Processing",
        paymentMethod:
          orderData.paymentMethod || "COD",
        payment:
          orderData.paymentMethod === "Card",
        date: Date.now(),
        address: orderData.address || {
          name: user?.name || "Customer",
          street: "",
          city: "",
          state: "",
          zipcode: "",
          country: "Pakistan",
          phone: "",
          email: "",
        },
      };

      setOrders((prevOrders) => {
        const existingOrders = Array.isArray(prevOrders)
          ? prevOrders
          : [];

        const updatedOrders = [
          newOrder,
          ...existingOrders,
        ];

        localStorage.setItem(
          ORDERS_STORAGE_KEY,
          JSON.stringify(updatedOrders)
        );

        return updatedOrders;
      });

      setCartItems([]);
      setCartCount(0);
      setTotalAmount(0);
      setShippingFee(0);

      localStorage.removeItem(CART_STORAGE_KEY);

      toast.success("Order placed successfully");

      navigate("/orders");

      return true;
    } catch (error) {
      console.error("Place order error:", error);
      toast.error("Something went wrong while placing order");
      return false;
    }
  };

  useEffect(() => {
    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem(
      WISHLIST_STORAGE_KEY,
      JSON.stringify(wishListProducts)
    );
  }, [wishListProducts]);

  useEffect(() => {
    localStorage.setItem(
      ORDERS_STORAGE_KEY,
      JSON.stringify(orders)
    );
  }, [orders]);

  useEffect(() => {
    const count = cartItems.reduce(
      (sum, item) =>
        sum + Number(item.quantity || 0),
      0
    );

    const amount = cartItems.reduce(
      (sum, item) =>
        sum +
        Number(item.price || 0) *
          Number(item.quantity || 0),
      0
    );

    setCartCount(count);
    setTotalAmount(amount);
    setShippingFee(
      amount > 0 ? DUMMY_SHIPPING_FEE : 0
    );
  }, [cartItems]);

  useEffect(() => {
    getCurrentUser();
    getSaleProducts();
  }, []);

  const value = {
    serverURL,
    navigate,
    loading,

    products,
    fetchProducts,

    search,
    setSearch,

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

    saleProducts,
    getSaleProducts,

    user,
    setUser,
    getCurrentUser,
    logout,

    toggleWishList,
    wishList,
    wishListProducts,

    selectedSize,
    setSelectedSize,

    selectedColor,
    setSelectedColor,

    quantity,
    setQuantity,

    cartItems,
    cartCount,
    addToCart,
    getCartData,
    getCartCount,
    updateCart,
    removeItem,
    clearCart,

    totalAmount,
    getTotalAmount,
    shippingFee,

    orders,
    getUserOrders,
    placeOrder,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};