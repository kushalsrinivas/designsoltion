"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart, Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddToCartButton } from "@/components/ui/add-to-cart-button";
import Image from "next/image";

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
}

interface WishlistPageProps {
  products: Product[];
  brands: Array<{ id: string; name: string; logo: string; color: string }>;
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: {
    id: string;
    name: string;
    price: number;
    image: string;
  }) => void;
  onBack?: () => void;
}

export function WishlistPage({
  products,
  brands,
  onRemoveFromWishlist,
  onAddToCart,
  onBack,
}: WishlistPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-rose-50 to-amber-50 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-rose-200 to-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute bottom-20 -left-20 w-96 h-96 bg-gradient-to-br from-green-200 to-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-4000" />
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 backdrop-filter backdrop-blur-xl bg-white/20 border-b border-white/30 sticky top-0 shadow-lg"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {onBack && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onBack}
                  className="backdrop-filter backdrop-blur-md bg-white/30 hover:bg-white/50 border border-white/40 shadow-lg transition-all duration-300"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              )}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-rose-400/80 to-rose-500/80 flex items-center justify-center">
                  <Heart className="h-5 w-5 text-white fill-current" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 font-display">
                    Your Favorites
                  </h1>
                  <p className="text-sm text-gray-600">
                    {products.length} saved items
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 py-8"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {products.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="backdrop-filter backdrop-blur-xl bg-white/25 border border-white/40 rounded-3xl p-12 max-w-md mx-auto shadow-2xl">
                <div className="w-20 h-20 rounded-full bg-rose-100/50 flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-10 w-10 text-rose-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  No favorites yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Start adding products to your wishlist to see them here
                </p>
                {onBack && (
                  <Button
                    onClick={onBack}
                    className="bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 border-0 shadow-lg text-white"
                  >
                    Browse Products
                  </Button>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {products.map((product, index) => (
                  <WishlistProductCard
                    key={product.id}
                    product={product}
                    index={index}
                    brands={brands}
                    onRemoveFromWishlist={onRemoveFromWishlist}
                    onAddToCart={onAddToCart}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </motion.main>
    </div>
  );
}

interface WishlistProductCardProps {
  product: Product;
  index: number;
  brands: Array<{ id: string; name: string; logo: string; color: string }>;
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: {
    id: string;
    name: string;
    price: number;
    image: string;
  }) => void;
}

function WishlistProductCard({
  product,
  index,
  brands,
  onRemoveFromWishlist,
  onAddToCart,
}: WishlistProductCardProps) {
  const brand = brands.find((b) => b.id === product.brand);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ delay: index * 0.05 }}
      className="group relative backdrop-filter backdrop-blur-xl bg-white/25 border border-white/40 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 p-6"
      style={{
        boxShadow:
          "0 20px 40px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.9)",
      }}
    >
      {/* Remove Button */}
      <div className="absolute top-4 right-4 z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemoveFromWishlist(product.id)}
          className="w-10 h-10 p-0 rounded-full backdrop-filter backdrop-blur-md bg-red-500/20 hover:bg-red-500/40 border border-red-400/50 text-red-600 shadow-lg"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Product Image */}
      <div className="relative w-full h-48 mb-4 overflow-hidden rounded-2xl backdrop-filter backdrop-blur-md bg-white/20 border border-white/30">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full"
        >
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            className="object-contain w-full h-full"
          />
        </motion.div>
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        {/* Brand */}
        {brand && (
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={16}
                height={16}
                className="object-contain"
              />
            </div>
            <span className="text-sm text-gray-600 font-medium">
              {brand.name}
            </span>
          </div>
        )}

        {/* Product Name */}
        <h3 className="text-lg font-semibold text-gray-900 font-display line-clamp-2">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold text-gray-900">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Category */}
        <span className="inline-block text-xs text-gray-500 backdrop-filter backdrop-blur-md bg-white/30 px-2 py-1 rounded-full border border-white/40">
          {product.categoryName}
        </span>

        {/* Actions */}
        <div className="flex space-x-2 pt-2">
          <AddToCartButton
            productId={product.id}
            productName={product.name}
            price={product.price}
            image={product.image}
            onAddToCart={onAddToCart}
            className="flex-1"
            size="sm"
          />
        </div>
      </div>
    </motion.div>
  );
}
