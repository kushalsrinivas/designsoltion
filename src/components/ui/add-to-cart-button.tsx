"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface AddToCartButtonProps {
  productId: string;
  productName: string;
  price: number;
  image: string;
  onAddToCart: (product: {
    id: string;
    name: string;
    price: number;
    image: string;
  }) => void;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  showText?: boolean;
}

export function AddToCartButton({
  productId,
  productName,
  price,
  image,
  onAddToCart,
  variant = "default",
  size = "md",
  className = "",
  showText = true,
}: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);

    // Simulate adding to cart
    await new Promise((resolve) => setTimeout(resolve, 300));

    onAddToCart({
      id: productId,
      name: productName,
      price,
      image,
    });

    setIsAdding(false);
  };

  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const getVariantClasses = () => {
    switch (variant) {
      case "outline":
        return "backdrop-filter backdrop-blur-md bg-white/40 border-white/50 hover:bg-white/60 text-gray-700";
      case "ghost":
        return "backdrop-filter backdrop-blur-md bg-white/20 hover:bg-white/40 text-gray-700 border-0";
      default:
        return "bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 border-0 shadow-lg text-white";
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={className}
    >
      <Button
        onClick={handleAddToCart}
        disabled={isAdding}
        className={`${
          sizeClasses[size]
        } ${getVariantClasses()} transition-all duration-300 rounded-xl`}
      >
        <motion.div
          animate={isAdding ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center"
        >
          {isAdding ? (
            <Plus
              className={`${iconSizes[size]} ${
                showText ? "mr-2" : ""
              } animate-spin`}
            />
          ) : (
            <ShoppingCart
              className={`${iconSizes[size]} ${showText ? "mr-2" : ""}`}
            />
          )}
        </motion.div>
        {showText && <span>{isAdding ? "Adding..." : "Add to Cart"}</span>}
      </Button>
    </motion.div>
  );
}
