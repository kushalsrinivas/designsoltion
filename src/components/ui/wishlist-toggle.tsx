"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WishlistToggleProps {
  productId: string;
  isFavorited: boolean;
  onToggle: (productId: string) => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function WishlistToggle({
  productId,
  isFavorited,
  onToggle,
  size = "md",
  className = "",
}: WishlistToggleProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onToggle(productId)}
        className={`${
          sizeClasses[size]
        } p-0 rounded-xl w-full backdrop-filter backdrop-blur-md border shadow-lg transition-all duration-300 ${
          isFavorited
            ? "bg-rose-500/80 border-rose-400/60 text-white shadow-rose-500/25"
            : "bg-white/40 border-white/50 text-gray-600 hover:bg-white/60 hover:shadow-lg"
        }`}
      >
        <motion.div
          animate={{
            scale: isFavorited ? [1, 1.3, 1] : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <Heart
            className={`${iconSizes[size]} transition-all duration-300 ${
              isFavorited ? "fill-current" : ""
            }`}
          />
        </motion.div>
      </Button>
    </motion.div>
  );
}
