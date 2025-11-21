"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { showToast } from "@/lib/utils/toast";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCartItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      const quantityToAdd = product.quantity || 1;

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Math.min(
                  item.quantity + quantityToAdd,
                  product.countInStock || Infinity
                ),
              }
            : item
        );
      }

      const newItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image || "/default.jpg",
        quantity: quantityToAdd,
        countInStock: product.countInStock || 0,
      };

      setTimeout(() => showToast("Added to cart"), 0);
      return [...prev, newItem];
    });
  };

  const removeFromCart = (id) => {
    showToast("Removed from cart");
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
    showToast("Quantity updated");
  };

  const clearCart = () => {
    setCartItems([]);
    showToast("Cart cleared");
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
