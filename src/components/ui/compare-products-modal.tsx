"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { X, ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { CompareCard } from "@/components/ui/compare-card";
import { BrandFilterBar } from "@/components/ui/brand-filter-bar";
import { ProductFilterPanel } from "@/components/ui/product-filter-panel";

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

interface CompareProductsModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  brands: Brand[];
  favorites: string[];
  onToggleFavorite: (productId: string) => void;
  onRemoveProduct: (productId: string) => void;
  onClearAll: () => void;
}

export function CompareProductsModal({
  isOpen,
  onClose,
  products,
  brands,
  favorites,
  onToggleFavorite,
  onRemoveProduct,
  onClearAll,
}: CompareProductsModalProps) {
  const [highlightedSpec, setHighlightedSpec] = useState<string | null>(null);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [scrollPosition, setScrollPosition] = useState(0);

  // Filter products based on selected brands and other filters
  const filteredProducts = products.filter((product) => {
    const matchesBrand =
      selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    let matchesPrice = true;
    if (selectedPriceRange !== "all") {
      const [min, max] = selectedPriceRange
        .split("-")
        .map((p) =>
          p === "+" ? Number.POSITIVE_INFINITY : Number.parseInt(p)
        );
      matchesPrice =
        product.price >= min && (max === undefined || product.price <= max);
    }

    return matchesBrand && matchesCategory && matchesPrice;
  });

  // Get all unique specifications from products
  const allSpecs = Array.from(
    new Set(
      filteredProducts.flatMap((product) =>
        Object.keys(product.specifications || {})
      )
    )
  );

  const handleBrandToggle = (brandId: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brandId)
        ? prev.filter((id) => id !== brandId)
        : [...prev, brandId]
    );
  };

  const handleClearBrands = () => {
    setSelectedBrands([]);
  };

  const handleClearFilters = () => {
    setSelectedCategory("all");
    setSelectedPriceRange("all");
    setSelectedBrands([]);
  };

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "paper", label: "Paper Products" },
    { value: "printers", label: "Laser Printers" },
    { value: "electronics", label: "Electronic Goods" },
  ];

  const priceRanges = [
    { value: "all", label: "All Prices" },
    { value: "0-25", label: "$0 - $25" },
    { value: "25-50", label: "$25 - $50" },
    { value: "50-100", label: "$50 - $100" },
    { value: "100-250", label: "$100 - $250" },
    { value: "250+", label: "$250+" },
  ];

  // Handle horizontal scroll with memoized callback
  const handleScroll = useCallback(
    (direction: "left" | "right") => {
      const container = document.getElementById("compare-scroll-container");
      if (container) {
        const scrollAmount = 320; // Width of one card
        const newPosition =
          direction === "left"
            ? Math.max(0, scrollPosition - scrollAmount)
            : Math.min(
                container.scrollWidth - container.clientWidth,
                scrollPosition + scrollAmount
              );

        container.scrollTo({ left: newPosition, behavior: "smooth" });
        setScrollPosition(newPosition);
      }
    },
    [scrollPosition]
  );

  useEffect(() => {
    // Wait for DOM to be ready
    const timeout = setTimeout(() => {
      const container = document.getElementById("compare-scroll-container");
      if (container) {
        const handleScrollUpdate = () => {
          setScrollPosition(container.scrollLeft);
        };

        // Initial position
        setScrollPosition(container.scrollLeft);

        container.addEventListener("scroll", handleScrollUpdate);
        return () => {
          container.removeEventListener("scroll", handleScrollUpdate);
        };
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95%] xl:max-w-[80%] max-h-[95vh] p-0 overflow-hidden rounded-3xl backdrop-filter backdrop-blur-xl bg-white/90 border border-white/60 shadow-2xl">
        <div className="relative h-full flex flex-col">
          {/* Enhanced Header */}
          <DialogHeader className="p-6 border-b border-white/30 backdrop-filter backdrop-blur-md bg-white/30 sticky top-0 z-20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <DialogTitle className="text-3xl font-bold text-gray-900 font-display">
                  Compare Products
                </DialogTitle>
                <span className="backdrop-filter backdrop-blur-md bg-white/40 px-4 py-2 rounded-full text-sm text-gray-600 border border-white/40">
                  {filteredProducts.length} of {products.length} products
                </span>
              </div>

              <div className="flex items-center space-x-3">
                {products.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onClearAll}
                    className="backdrop-filter backdrop-blur-md bg-white/40 border-white/50 hover:bg-rose-500/80 hover:text-white hover:border-rose-400/60"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Clear All
                  </Button>
                )}
                <DialogClose className="rounded-full p-3 backdrop-filter backdrop-blur-md bg-white/50 hover:bg-white/70 border border-white/50 transition-all duration-300">
                  <X className="h-6 w-6" />
                </DialogClose>
              </div>
            </div>
          </DialogHeader>

          {/* Content */}
          <div className="flex-1 overflow-hidden flex flex-col">
            {products.length === 0 ? (
              // Empty State
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                style={{ willChange: "transform" }}
                className="flex items-center justify-center h-full p-12"
              >
                <div className="text-center backdrop-filter backdrop-blur-xl bg-white/25 border border-white/40 rounded-3xl p-12 max-w-md shadow-2xl">
                  <div className="w-24 h-24 mx-auto mb-6 backdrop-filter backdrop-blur-md bg-white/40 rounded-full flex items-center justify-center border border-white/50">
                    <svg
                      className="w-12 h-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <title>Compare products icon</title>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 font-display">
                    No Products to Compare
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Add products to your comparison list to see them here. You
                    can compare features, prices, and specifications side by
                    side.
                  </p>
                  <Button
                    onClick={onClose}
                    className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 border-0 shadow-lg"
                  >
                    Browse Products
                  </Button>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col">
                {/* Filters Section */}
                <div className="p-6 space-y-6 border-b border-white/30 backdrop-filter backdrop-blur-md bg-white/20">
                  {/* Brand Filter */}
                  <BrandFilterBar
                    brands={brands}
                    selectedBrands={selectedBrands}
                    onBrandToggle={handleBrandToggle}
                    onClearAll={handleClearBrands}
                  />

                  {/* Additional Filters */}
                  <ProductFilterPanel
                    categories={categories}
                    priceRanges={priceRanges}
                    selectedCategory={selectedCategory}
                    selectedPriceRange={selectedPriceRange}
                    onCategoryChange={setSelectedCategory}
                    onPriceRangeChange={setSelectedPriceRange}
                    onClearFilters={handleClearFilters}
                    isOpen={showFilters}
                    onToggle={() => setShowFilters(!showFilters)}
                  />
                </div>

                {/* Products Comparison */}
                <div className="flex-1 relative overflow-y-scroll">
                  {filteredProducts.length === 0 ? (
                    <div className="flex items-center justify-center h-full overflow-y-scroll p-12">
                      <div className="text-center backdrop-filter backdrop-blur-xl bg-white/25 border border-white/40 rounded-3xl p-8 max-w-md shadow-2xl">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 font-display">
                          No Products Match Filters
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Try adjusting your filter criteria to see more
                          products.
                        </p>
                        <Button
                          onClick={handleClearFilters}
                          variant="outline"
                          className="backdrop-filter backdrop-blur-md bg-white/40 border-white/50 hover:bg-white/60"
                        >
                          Clear Filters
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Scroll Navigation */}
                      {filteredProducts.length > 2 && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleScroll("left")}
                            disabled={scrollPosition <= 0}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full backdrop-filter backdrop-blur-md bg-white/40 border border-white/50 hover:bg-white/60 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                            aria-label="Scroll left"
                          >
                            <ArrowLeft className="h-5 w-5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleScroll("right")}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full backdrop-filter backdrop-blur-md bg-white/40 border border-white/50 hover:bg-white/60 shadow-lg"
                            aria-label="Scroll right"
                          >
                            <ArrowRight className="h-5 w-5" />
                          </Button>
                        </>
                      )}

                      {/* Products Grid */}
                      <div
                        id="compare-scroll-container"
                        className="h-full w-full overflow-x-auto overflow-y-scroll p-6"
                        style={{
                          scrollbarWidth: "thin",
                          scrollbarColor:
                            "rgba(255, 255, 255, 0.3) transparent",
                          overscrollBehaviorX: "contain",
                        }}
                      >
                        <div className="flex space-x-6 min-h-full min-w-max">
                          {filteredProducts.map((product) => {
                            const brand = brands.find(
                              (b) => b.id === product.brand
                            );
                            if (!brand) return null;

                            return (
                              <CompareCard
                                key={product.id}
                                product={product}
                                brand={brand}
                                onRemove={onRemoveProduct}
                                onToggleFavorite={onToggleFavorite}
                                isFavorite={favorites.includes(product.id)}
                                highlightedSpec={highlightedSpec}
                                onSpecHover={setHighlightedSpec}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Specifications Table (for larger screens) */}
                {filteredProducts.length > 1 && allSpecs.length > 0 && (
                  <div className="hidden lg:block border-t border-white/30 backdrop-filter backdrop-blur-md bg-white/20 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Detailed Specifications Comparison
                    </h3>
                    <div className="backdrop-filter backdrop-blur-xl bg-white/25 border border-white/40 rounded-2xl overflow-hidden">
                      <div
                        className="overflow-x-auto"
                        style={{ transform: "translateZ(0)" }}
                      >
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-white/30">
                              <th className="sticky left-0 backdrop-filter backdrop-blur-md bg-white/40 p-4 text-left text-sm font-semibold text-gray-900 border-r border-white/30">
                                Specification
                              </th>
                              {filteredProducts.map((product) => (
                                <th
                                  key={product.id}
                                  className="p-4 text-left text-sm font-semibold text-gray-900 min-w-[200px]"
                                >
                                  {product.name}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {allSpecs.map((spec) => (
                              <tr
                                key={spec}
                                onMouseEnter={() => setHighlightedSpec(spec)}
                                onMouseLeave={() => setHighlightedSpec(null)}
                                className={`border-b border-white/20 transition-colors duration-100 ${
                                  highlightedSpec === spec
                                    ? "bg-amber-100/40"
                                    : "hover:bg-white/30"
                                }`}
                              >
                                <td className="sticky left-0 backdrop-filter backdrop-blur-md bg-white/40 p-4 text-sm font-medium text-gray-700 border-r border-white/30">
                                  {spec}
                                </td>
                                {filteredProducts.map((product) => (
                                  <td
                                    key={product.id}
                                    className="p-4 text-sm text-gray-900"
                                  >
                                    {product.specifications?.[spec] || "—"}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
