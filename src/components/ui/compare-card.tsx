"use client";

import { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Heart, ShoppingCart, X, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  inStock?: boolean;
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
  highlightedSpec?: string | null;
  onSpecHover?: (spec: string | null) => void;
  className?: string;
}

const DEFAULT_SPECIFICATIONS = {
  Display: "15.6 inch Full HD",
  Processor: "Intel Core i7",
  Memory: "16GB DDR4",
  Storage: "512GB SSD",
  "Battery Life": "8 hours",
  Weight: "2.1 kg",
  Warranty: "2 years",
  Connectivity: "Wi-Fi 6, Bluetooth 5.0",
} as const;

export function CompareCard({
  product,
  brand,
  onRemove,
  onToggleFavorite,
  isFavorite,
  highlightedSpec,
  onSpecHover,
  className,
}: CompareCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Memoize specifications to prevent unnecessary re-renders
  const specifications = useMemo(
    () => product.specifications || DEFAULT_SPECIFICATIONS,
    [product.specifications]
  );

  // Memoize discount percentage calculation
  const discountPercentage = useMemo(() => {
    if (!product.originalPrice || product.originalPrice <= product.price)
      return null;
    return Math.round(
      ((product.originalPrice - product.price) / product.originalPrice) * 100
    );
  }, [product.originalPrice, product.price]);

  // Memoize badge data
  const badges = useMemo(() => {
    const badgeList = [];
    if (product.isSponsored)
      badgeList.push({
        text: "Sponsored",
        color: "from-amber-500 to-amber-600",
      });
    if (product.isNew)
      badgeList.push({ text: "New", color: "from-emerald-500 to-emerald-600" });
    if (product.isTrending)
      badgeList.push({ text: "Trending", color: "from-blue-500 to-blue-600" });
    if (discountPercentage && discountPercentage > 0) {
      badgeList.push({
        text: `${discountPercentage}% OFF`,
        color: "from-red-500 to-red-600",
      });
    }
    return badgeList;
  }, [
    product.isSponsored,
    product.isNew,
    product.isTrending,
    discountPercentage,
  ]);

  // Optimize callbacks with useCallback
  const handleRemove = useCallback(() => {
    onRemove(product.id);
  }, [onRemove, product.id]);

  const handleToggleFavorite = useCallback(() => {
    onToggleFavorite(product.id);
  }, [onToggleFavorite, product.id]);

  const handleSpecHover = useCallback(
    (spec: string | null) => {
      onSpecHover?.(spec);
    },
    [onSpecHover]
  );

  const handleImageLoad = useCallback(() => {
    setIsImageLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  // Stock status
  const inStock = product.inStock ?? true;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
        layout: { duration: 0.2 },
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      className={cn(
        "group relative",
        "w-full max-w-sm mx-auto",
        "bg-gradient-to-br from-white/95 to-white/85",
        "backdrop-blur-xl border border-white/20",
        "rounded-3xl overflow-hidden",
        "shadow-lg hover:shadow-2xl",
        "transition-all duration-300 ease-out",
        "hover:border-white/40",
        className
      )}
      aria-labelledby={`product-${product.id}-title`}
    >
      {/* Remove Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleRemove}
        className={cn(
          "absolute top-3 right-3 z-20",
          "w-9 h-9 p-0 rounded-full",
          "bg-white/80 backdrop-blur-sm",
          "border border-gray-200/50",
          "text-gray-500 hover:text-white",
          "hover:bg-red-500 hover:border-red-400",
          "shadow-sm hover:shadow-md",
          "transition-all duration-200",
          "opacity-0 group-hover:opacity-100",
          "focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-500/50"
        )}
        aria-label={`Remove ${product.name} from comparison`}
      >
        <X className="h-4 w-4" />
      </Button>

      {/* Product Badges */}
      <AnimatePresence>
        {badges.length > 0 && (
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
            {badges.map((badge, index) => (
              <motion.span
                key={badge.text}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "px-2.5 py-1 text-xs font-semibold text-white",
                  "bg-gradient-to-r",
                  badge.color,
                  "rounded-full shadow-lg",
                  "backdrop-blur-sm border border-white/20"
                )}
              >
                {badge.text}
              </motion.span>
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="p-6 space-y-6">
        {/* Product Image */}
        <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100/50 border border-gray-200/50">
          {!imageError ? (
            <>
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={cn(
                  "object-contain p-4 transition-all duration-500",
                  "group-hover:scale-105",
                  isImageLoaded ? "opacity-100" : "opacity-0"
                )}
                onLoad={handleImageLoad}
                onError={handleImageError}
                priority={product.isFeatured}
              />
              {!isImageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
                </div>
              )}
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
              <AlertCircle className="h-8 w-8 mb-2" />
              <span className="text-sm">Image unavailable</span>
            </div>
          )}
        </div>

        {/* Brand & Product Info */}
        <div className="space-y-4">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/80 border border-gray-200/50 flex items-center justify-center overflow-hidden">
              <Image
                src={brand.logo}
                alt={`${brand.name} logo`}
                width={20}
                height={20}
                className="object-contain"
              />
            </div>
            <span className="text-sm font-medium text-gray-700">
              {brand.name}
            </span>
          </div>

          {/* Product Name */}
          <h3
            id={`product-${product.id}-title`}
            className="text-lg font-bold text-gray-900 leading-tight line-clamp-2"
          >
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div
              className="flex items-center"
              role="img"
              aria-label={`${product.rating} out of 5 stars`}
            >
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={`star-${product.id}-${i}`}
                  className={cn(
                    "h-4 w-4",
                    i < Math.floor(product.rating)
                      ? "text-amber-400 fill-amber-400"
                      : "text-gray-300"
                  )}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {product.rating} ({product.reviews.toLocaleString()})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-lg text-gray-500 line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium",
                inStock
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              )}
            >
              {inStock ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  In Stock
                </>
              ) : (
                <>
                  <X className="h-3.5 w-3.5" />
                  Out of Stock
                </>
              )}
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-900">
            Key Specifications
          </h4>
          <div className="grid gap-2">
            {Object.entries(specifications)
              .slice(0, 6)
              .map(([key, value]) => (
                <motion.div
                  key={key}
                  onMouseEnter={() => handleSpecHover(key)}
                  onMouseLeave={() => handleSpecHover(null)}
                  className={cn(
                    "p-3 rounded-xl border transition-all duration-200 cursor-pointer",
                    highlightedSpec === key
                      ? "bg-blue-50 border-blue-200 shadow-sm ring-1 ring-blue-200"
                      : "bg-white/60 border-gray-200/60 hover:bg-white/80 hover:border-gray-300"
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-gray-600">
                      {key}
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {value}
                    </span>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <Button
            className={cn(
              "w-full h-12 rounded-2xl font-semibold",
              "bg-gradient-to-r from-blue-600 to-blue-700",
              "hover:from-blue-700 hover:to-blue-800",
              "shadow-lg hover:shadow-xl",
              "transition-all duration-200",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
            disabled={!inStock}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {inStock ? "Add to Cart" : "Out of Stock"}
          </Button>

          <Button
            onClick={handleToggleFavorite}
            variant="outline"
            className={cn(
              "w-full h-12 rounded-2xl font-medium",
              "border-2 transition-all duration-200",
              isFavorite
                ? "bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
                : "bg-white/60 border-gray-200 text-gray-700 hover:bg-white/80 hover:border-gray-300"
            )}
          >
            <Heart
              className={cn("h-4 w-4 mr-2", isFavorite && "fill-current")}
            />
            {isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
