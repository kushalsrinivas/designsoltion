"use client";

import { motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterOption {
  value: string;
  label: string;
}

interface ProductFilterPanelProps {
  categories: FilterOption[];
  priceRanges: FilterOption[];
  selectedCategory: string;
  selectedPriceRange: string;
  onCategoryChange: (category: string) => void;
  onPriceRangeChange: (priceRange: string) => void;
  onClearFilters: () => void;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

export function ProductFilterPanel({
  categories,
  priceRanges,
  selectedCategory,
  selectedPriceRange,
  onCategoryChange,
  onPriceRangeChange,
  onClearFilters,
  isOpen,
  onToggle,
  className = "",
}: ProductFilterPanelProps) {
  const hasActiveFilters =
    selectedCategory !== "all" || selectedPriceRange !== "all";

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Filter Toggle Button */}
      <div className="flex items-center justify-between">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onToggle}
          className="flex items-center space-x-2 backdrop-filter backdrop-blur-md bg-white/30 border border-white/40 rounded-2xl px-4 py-3 hover:bg-white/50 transition-all duration-300 shadow-lg"
        >
          <SlidersHorizontal className="h-5 w-5 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">
            Advanced Filters
          </span>
          {hasActiveFilters && (
            <span className="bg-amber-500 text-white text-xs px-2 py-1 rounded-full">
              {
                [
                  selectedCategory !== "all",
                  selectedPriceRange !== "all",
                ].filter(Boolean).length
              }
            </span>
          )}
        </motion.button>

        {hasActiveFilters && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClearFilters}
            className="text-sm text-gray-600 hover:text-gray-900 backdrop-filter backdrop-blur-md bg-white/30 px-3 py-2 rounded-xl border border-white/40 hover:bg-white/50 transition-all duration-300"
          >
            Clear All
          </motion.button>
        )}
      </div>

      {/* Filter Panel */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="backdrop-filter backdrop-blur-xl bg-white/25 border border-white/40 rounded-3xl p-6 shadow-2xl"
          style={{
            boxShadow:
              "0 25px 50px rgba(0, 0, 0, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.9)",
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Filter Products
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="w-8 h-8 p-0 rounded-full backdrop-filter backdrop-blur-md bg-white/40 border border-white/50 hover:bg-white/60"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Category Filter */}
            <div className="space-y-3">
              <label
                htmlFor="category-filter"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <div className="relative">
                <Select
                  value={selectedCategory}
                  onValueChange={onCategoryChange}
                >
                  <SelectTrigger
                    id="category-filter"
                    className="backdrop-filter backdrop-blur-md bg-white/40 border-white/50 hover:bg-white/60 transition-all duration-300"
                  >
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="backdrop-filter backdrop-blur-xl bg-white/90 border border-white/60">
                    {categories.map((category) => (
                      <SelectItem
                        key={category.value}
                        value={category.value}
                        className="hover:bg-white/50"
                      >
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedCategory !== "all" && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full"
                  />
                )}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="space-y-3">
              <label
                htmlFor="price-filter"
                className="block text-sm font-medium text-gray-700"
              >
                Price Range
              </label>
              <div className="relative">
                <Select
                  value={selectedPriceRange}
                  onValueChange={onPriceRangeChange}
                >
                  <SelectTrigger
                    id="price-filter"
                    className="backdrop-filter backdrop-blur-md bg-white/40 border-white/50 hover:bg-white/60 transition-all duration-300"
                  >
                    <SelectValue placeholder="Select price range" />
                  </SelectTrigger>
                  <SelectContent className="backdrop-filter backdrop-blur-xl bg-white/90 border border-white/60">
                    {priceRanges.map((range) => (
                      <SelectItem
                        key={range.value}
                        value={range.value}
                        className="hover:bg-white/50"
                      >
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedPriceRange !== "all" && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full"
                  />
                )}
              </div>
            </div>

            {/* Availability Filter */}
            <div className="space-y-3">
              <span className="block text-sm font-medium text-gray-700">
                Availability
              </span>
              <div className="space-y-2">
                <label
                  htmlFor="in-stock"
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <input
                    id="in-stock"
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 text-amber-500 bg-white/40 border-white/50 rounded focus:ring-amber-500 focus:ring-2 backdrop-filter backdrop-blur-md"
                  />
                  <span className="text-sm text-gray-700">In Stock</span>
                </label>
                <label
                  htmlFor="pre-order"
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <input
                    id="pre-order"
                    type="checkbox"
                    className="w-4 h-4 text-amber-500 bg-white/40 border-white/50 rounded focus:ring-amber-500 focus:ring-2 backdrop-filter backdrop-blur-md"
                  />
                  <span className="text-sm text-gray-700">Pre-order</span>
                </label>
                <label
                  htmlFor="coming-soon"
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <input
                    id="coming-soon"
                    type="checkbox"
                    className="w-4 h-4 text-amber-500 bg-white/40 border-white/50 rounded focus:ring-amber-500 focus:ring-2 backdrop-filter backdrop-blur-md"
                  />
                  <span className="text-sm text-gray-700">Coming Soon</span>
                </label>
              </div>
            </div>
          </div>

          {/* Quick Filter Tags */}
          <div className="mt-6 pt-6 border-t border-white/30">
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Quick Filters
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                "New Arrivals",
                "Best Sellers",
                "On Sale",
                "Premium",
                "Trending",
                "Featured",
              ].map((tag) => (
                <motion.button
                  key={tag}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-2 text-xs font-medium backdrop-filter backdrop-blur-md bg-white/30 border border-white/40 rounded-full hover:bg-white/50 text-gray-700 transition-all duration-300"
                >
                  {tag}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Filter Summary */}
          {hasActiveFilters && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 pt-6 border-t border-white/30"
            >
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                Active Filters
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedCategory !== "all" && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100/80 text-amber-800 backdrop-filter backdrop-blur-md border border-amber-200/50">
                    Category:{" "}
                    {
                      categories.find((c) => c.value === selectedCategory)
                        ?.label
                    }
                    <button
                      type="button"
                      onClick={() => onCategoryChange("all")}
                      className="ml-2 hover:text-amber-900"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {selectedPriceRange !== "all" && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100/80 text-blue-800 backdrop-filter backdrop-blur-md border border-blue-200/50">
                    Price:{" "}
                    {
                      priceRanges.find((p) => p.value === selectedPriceRange)
                        ?.label
                    }
                    <button
                      type="button"
                      onClick={() => onPriceRangeChange("all")}
                      className="ml-2 hover:text-blue-900"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}
