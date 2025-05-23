"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Heart, ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  originalPrice?: number;
  category: string;
  categoryName: string;
  brand: string;
  rating: number;
  reviews: number;
  isNew: boolean;
  isFeatured: boolean;
  isSponsored: boolean;
  isTrending: boolean;
  tags: string[];
  specifications?: Record<string, string>;
}

interface Brand {
  id: string;
  name: string;
  logo: string;
  color: string;
}

interface CompareCardProps {
  product: Product;
  brand: Brand;
  onRemove: (productId: string) => void;
  onToggleFavorite: (productId: string) => void;
  isFavorite: boolean;
  highlightedSpec?: string;
  onSpecHover?: (spec: string | null) => void;
}

export function CompareCard({
  product,
  brand,
  onRemove,
  onToggleFavorite,
  isFavorite,
  highlightedSpec,
  onSpecHover,
}: CompareCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const specifications = product.specifications || {
    Display: "15.6 inch Full HD",
    Processor: "Intel Core i7",
    Memory: "16GB DDR4",
    Storage: "512GB SSD",
    "Battery Life": "8 hours",
    Weight: "2.1 kg",
    Warranty: "2 years",
    Connectivity: "Wi-Fi 6, Bluetooth 5.0",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative backdrop-filter backdrop-blur-xl bg-white/20 border border-white/40 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] min-w-[320px] max-w-[380px]"
      style={{
        boxShadow: isHovered
          ? "0 25px 50px rgba(0, 0, 0, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.9), 0 0 30px rgba(255, 255, 255, 0.3)"
          : "0 20px 40px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.9)",
      }}
    >
      {/* Remove Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onRemove(product.id)}
        className="absolute top-4 right-4 z-10 w-8 h-8 p-0 rounded-full backdrop-filter backdrop-blur-md bg-white/40 border border-white/50 text-gray-600 hover:bg-rose-500/80 hover:text-white hover:border-rose-400/60 shadow-lg transition-all duration-300"
      >
        <X className="h-4 w-4" />
      </Button>

      {/* Product Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col space-y-1">
        {product.isSponsored && (
          <span className="px-2 py-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-medium rounded-full shadow-lg">
            Sponsored
          </span>
        )}
        {product.isNew && (
          <span className="px-2 py-1 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-medium rounded-full shadow-lg">
            New
          </span>
        )}
        {product.isTrending && (
          <span className="px-2 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-medium rounded-full shadow-lg">
            Trending
          </span>
        )}
      </div>

      <div className="p-6">
        {/* Product Image */}
        <div className="relative w-full h-48 mb-6 rounded-2xl overflow-hidden backdrop-filter backdrop-blur-md bg-white/20 border border-white/30">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={300}
              className="object-contain w-full h-full p-4"
            />
          </motion.div>
        </div>

        {/* Brand Info */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 rounded-full backdrop-filter backdrop-blur-md bg-white/40 border border-white/50 flex items-center justify-center">
            <Image
              src={brand.logo}
              alt={brand.name}
              width={20}
              height={20}
              className="object-contain"
            />
          </div>
          <span className="text-sm font-semibold text-gray-800">
            {brand.name}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="text-lg font-bold text-gray-900 font-display mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={`star-${product.id}-${i}`}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? "text-amber-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2 mb-6">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-lg text-gray-500 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="mb-6">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100/80 text-green-800 backdrop-filter backdrop-blur-md border border-green-200/50">
            In Stock
          </span>
        </div>

        {/* Specifications */}
        <div className="space-y-3 mb-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">
            Specifications
          </h4>
          {Object.entries(specifications).map(([key, value]) => (
            <motion.div
              key={key}
              onHoverStart={() => onSpecHover?.(key)}
              onHoverEnd={() => onSpecHover?.(null)}
              className={`p-3 rounded-xl backdrop-filter backdrop-blur-md border transition-all duration-300 ${
                highlightedSpec === key
                  ? "bg-amber-100/60 border-amber-300/60 shadow-lg shadow-amber-400/20"
                  : "bg-white/30 border-white/40 hover:bg-white/50"
              }`}
            >
              <div className="text-xs font-medium text-gray-600 mb-1">
                {key}
              </div>
              <div className="text-sm text-gray-900 font-medium">{value}</div>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 border-0 shadow-lg text-white font-medium py-3 rounded-2xl">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>

          <Button
            onClick={() => onToggleFavorite(product.id)}
            variant="outline"
            className={`w-full backdrop-filter backdrop-blur-md border-white/50 hover:bg-white/60 py-3 rounded-2xl transition-all duration-300 ${
              isFavorite
                ? "bg-rose-500/20 border-rose-400/60 text-rose-600"
                : "bg-white/40"
            }`}
          >
            <Heart
              className={`h-4 w-4 mr-2 ${isFavorite ? "fill-current" : ""}`}
            />
            {isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
