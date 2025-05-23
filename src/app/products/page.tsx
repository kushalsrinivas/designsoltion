"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Grid,
  List,
  Star,
  Heart,
  ShoppingCart,
  ArrowLeft,
  SlidersHorizontal,
  X,
  Plus,
  Eye,
  TrendingUp,
  Award,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

// Brand data
const brands = [
  {
    id: "designit",
    name: "DesignIt Solutions",
    logo: "/placeholder.svg?height=40&width=120",
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "papercraft",
    name: "PaperCraft Pro",
    logo: "/placeholder.svg?height=40&width=120",
    color: "from-green-500 to-green-600",
  },
  {
    id: "lasertech",
    name: "LaserTech",
    logo: "/placeholder.svg?height=40&width=120",
    color: "from-purple-500 to-purple-600",
  },
  {
    id: "smartoffice",
    name: "SmartOffice",
    logo: "/placeholder.svg?height=40&width=120",
    color: "from-orange-500 to-orange-600",
  },
  {
    id: "premium",
    name: "Premium Plus",
    logo: "/placeholder.svg?height=40&width=120",
    color: "from-rose-500 to-rose-600",
  },
];

// Extended product data with brands and sections
const allProducts = [
  // Sponsored Products
  {
    id: "notebook-premium",
    name: "Premium Notebook Collection",
    description:
      "Luxury hardcover notebooks with premium paper for executive note-taking",
    image: "/placeholder.svg?height=300&width=300",
    price: 12.99,
    originalPrice: 15.99,
    category: "paper",
    categoryName: "Paper Products",
    brand: "papercraft",
    rating: 4.8,
    reviews: 124,
    isNew: false,
    isFeatured: true,
    isSponsored: true,
    isTrending: false,
    tags: ["premium", "hardcover", "professional"],
    quickActions: ["wishlist", "compare", "quickView"],
  },
  {
    id: "laser-color",
    name: "ColorJet X5000 Pro",
    description:
      "Professional color laser printer with duplex printing and wireless connectivity",
    image: "/placeholder.svg?height=300&width=300",
    price: 499.99,
    originalPrice: 599.99,
    category: "printers",
    categoryName: "Laser Printers",
    brand: "lasertech",
    rating: 4.7,
    reviews: 198,
    isNew: true,
    isFeatured: true,
    isSponsored: true,
    isTrending: true,
    tags: ["color", "duplex", "professional", "wireless"],
    quickActions: ["wishlist", "compare", "quickView"],
  },

  // Trending Products
  {
    id: "smart-scanner",
    name: "SmartScan Pro 2024",
    description:
      "AI-powered document scanner with cloud integration and OCR technology",
    image: "/placeholder.svg?height=300&width=300",
    price: 179.99,
    originalPrice: 199.99,
    category: "electronics",
    categoryName: "Electronic Goods",
    brand: "smartoffice",
    rating: 4.6,
    reviews: 167,
    isNew: true,
    isFeatured: true,
    isSponsored: false,
    isTrending: true,
    tags: ["AI", "cloud", "OCR", "wireless"],
    quickActions: ["wishlist", "compare", "quickView"],
  },
  {
    id: "business-cards",
    name: "Executive Business Cards",
    description:
      "Premium business cards with metallic finishes and custom embossing",
    image: "/placeholder.svg?height=300&width=300",
    price: 19.99,
    originalPrice: null,
    category: "paper",
    categoryName: "Paper Products",
    brand: "premium",
    rating: 4.9,
    reviews: 256,
    isNew: true,
    isFeatured: true,
    isSponsored: false,
    isTrending: true,
    tags: ["custom", "premium", "metallic", "embossing"],
    quickActions: ["wishlist", "compare", "quickView"],
  },

  // Regular Products
  {
    id: "stationery-set",
    name: "Executive Stationery Set",
    description:
      "Complete stationery set with letterhead and envelopes for business correspondence",
    image: "/placeholder.svg?height=300&width=300",
    price: 24.99,
    originalPrice: 29.99,
    category: "paper",
    categoryName: "Paper Products",
    brand: "designit",
    rating: 4.6,
    reviews: 89,
    isNew: false,
    isFeatured: false,
    isSponsored: false,
    isTrending: false,
    tags: ["executive", "business", "complete-set"],
    quickActions: ["wishlist", "compare", "quickView"],
  },
  {
    id: "brochures",
    name: "Tri-fold Marketing Brochures",
    description:
      "Professional brochures with high-quality printing and vibrant colors",
    image: "/placeholder.svg?height=300&width=300",
    price: 29.99,
    originalPrice: 34.99,
    category: "paper",
    categoryName: "Paper Products",
    brand: "papercraft",
    rating: 4.7,
    reviews: 67,
    isNew: false,
    isFeatured: false,
    isSponsored: false,
    isTrending: false,
    tags: ["tri-fold", "professional", "marketing"],
    quickActions: ["wishlist", "compare", "quickView"],
  },
  {
    id: "journals",
    name: "Leather-bound Executive Journals",
    description:
      "Elegant journals with premium paper and genuine Italian leather binding",
    image: "/placeholder.svg?height=300&width=300",
    price: 34.99,
    originalPrice: 39.99,
    category: "paper",
    categoryName: "Paper Products",
    brand: "premium",
    rating: 4.8,
    reviews: 143,
    isNew: false,
    isFeatured: true,
    isSponsored: false,
    isTrending: false,
    tags: ["leather", "elegant", "premium", "italian"],
    quickActions: ["wishlist", "compare", "quickView"],
  },
  {
    id: "laser-mono",
    name: "LaserJet Pro Mono M404",
    description:
      "High-speed monochrome laser printer perfect for office environments",
    image: "/placeholder.svg?height=300&width=300",
    price: 249.99,
    originalPrice: 299.99,
    category: "printers",
    categoryName: "Laser Printers",
    brand: "lasertech",
    rating: 4.5,
    reviews: 312,
    isNew: false,
    isFeatured: true,
    isSponsored: false,
    isTrending: false,
    tags: ["high-speed", "monochrome", "office"],
    quickActions: ["wishlist", "compare", "quickView"],
  },
  {
    id: "toner-cartridge",
    name: "Premium Toner Cartridge Set",
    description:
      "Long-lasting toner cartridges compatible with all major printer models",
    image: "/placeholder.svg?height=300&width=300",
    price: 79.99,
    originalPrice: 89.99,
    category: "printers",
    categoryName: "Laser Printers",
    brand: "lasertech",
    rating: 4.4,
    reviews: 445,
    isNew: false,
    isFeatured: false,
    isSponsored: false,
    isTrending: false,
    tags: ["long-lasting", "compatible", "replacement"],
    quickActions: ["wishlist", "compare", "quickView"],
  },
  {
    id: "wireless-keyboard",
    name: "ErgoType Wireless Keyboard Pro",
    description:
      "Ergonomic wireless keyboard with customizable RGB keys and premium switches",
    image: "/placeholder.svg?height=300&width=300",
    price: 89.99,
    originalPrice: 109.99,
    category: "electronics",
    categoryName: "Electronic Goods",
    brand: "smartoffice",
    rating: 4.5,
    reviews: 289,
    isNew: false,
    isFeatured: false,
    isSponsored: false,
    isTrending: false,
    tags: ["ergonomic", "wireless", "RGB", "premium"],
    quickActions: ["wishlist", "compare", "quickView"],
  },
  {
    id: "office-tablet",
    name: "OfficePad Pro 12.9",
    description:
      "Professional tablet designed for business applications and digital note-taking",
    image: "/placeholder.svg?height=300&width=300",
    price: 349.99,
    originalPrice: 399.99,
    category: "electronics",
    categoryName: "Electronic Goods",
    brand: "smartoffice",
    rating: 4.7,
    reviews: 156,
    isNew: true,
    isFeatured: true,
    isSponsored: false,
    isTrending: false,
    tags: ["business", "digital", "note-taking", "12.9-inch"],
    quickActions: ["wishlist", "compare", "quickView"],
  },
];

const categories = [
  { value: "all", label: "All Categories" },
  { value: "paper", label: "Paper Products" },
  { value: "printers", label: "Laser Printers" },
  { value: "electronics", label: "Electronic Goods" },
];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "popularity", label: "Most Popular" },
];

const priceRanges = [
  { value: "all", label: "All Prices" },
  { value: "0-25", label: "$0 - $25" },
  { value: "25-50", label: "$25 - $50" },
  { value: "50-100", label: "$50 - $100" },
  { value: "100-250", label: "$100 - $250" },
  { value: "250+", label: "$250+" },
];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof allProducts)[0] | null
  >(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    const filtered = allProducts.filter((product) => {
      // Search filter
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      // Category filter
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      // Brand filter
      const matchesBrand =
        selectedBrand === "all" || product.brand === selectedBrand;

      // Price range filter
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

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
    });

    // Sort products
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "popularity":
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        filtered.sort(
          (a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)
        );
        break;
    }

    return filtered;
  }, [
    searchQuery,
    selectedCategory,
    selectedBrand,
    selectedPriceRange,
    sortBy,
  ]);

  // Separate products by sections
  const sponsoredProducts = filteredProducts.filter((p) => p.isSponsored);
  const trendingProducts = filteredProducts.filter(
    (p) => p.isTrending && !p.isSponsored
  );
  const regularProducts = filteredProducts.filter(
    (p) => !p.isSponsored && !p.isTrending
  );

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleQuickAction = (
    action: string,
    product: (typeof allProducts)[0]
  ) => {
    switch (action) {
      case "wishlist":
        toggleFavorite(product.id);
        break;
      case "quickView":
        setSelectedProduct(product);
        break;
      case "compare":
        // Handle compare action
        console.log("Compare:", product.name);
        break;
      default:
        break;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-rose-50 to-amber-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">
            Loading our amazing products...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-rose-50 to-amber-50 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient blobs */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-green-200 to-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute bottom-20 -left-20 w-96 h-96 bg-gradient-to-br from-rose-200 to-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-4000" />

        {/* Additional floating elements */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-1000" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-purple-200 to-violet-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-3000" />
      </div>

      {/* Enhanced Header with Glassmorphism */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 backdrop-filter backdrop-blur-xl bg-white/20 border-b border-white/30 sticky top-0 shadow-lg"
        style={{
          boxShadow:
            "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.9)",
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="backdrop-filter backdrop-blur-md bg-white/30 hover:bg-white/50 border border-white/40 shadow-lg transition-all duration-300"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <h1 className="text-2xl font-bold text-gray-900 font-display">
                Our Products
              </h1>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 backdrop-filter backdrop-blur-md bg-white/30 px-3 py-1 rounded-full border border-white/40">
                {filteredProducts.length} products
              </span>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Enhanced Search and Brand Filter Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative z-10 py-6"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Enhanced Search Bar */}
          <div className="relative mb-6">
            <div className="relative backdrop-filter backdrop-blur-xl bg-white/25 border border-white/40 rounded-3xl p-1 shadow-2xl">
              <div className="flex items-center">
                <Search className="h-5 w-5 text-gray-500 ml-4" />
                <Input
                  type="text"
                  placeholder="Search products, categories, or features..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent border-0 focus:ring-0 text-gray-900 placeholder-gray-500 px-4 py-3"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="mr-2 backdrop-filter backdrop-blur-md bg-white/40 hover:bg-white/60 border border-white/50"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Brand Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <div className="flex items-center space-x-3 overflow-x-auto pb-2">
              <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                Brands:
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedBrand("all")}
                className={`flex-shrink-0 px-4 py-2 rounded-2xl backdrop-filter backdrop-blur-md border transition-all duration-300 ${
                  selectedBrand === "all"
                    ? "bg-gradient-to-r from-amber-400/80 to-amber-500/80 border-amber-300/60 text-white shadow-lg shadow-amber-400/25"
                    : "bg-white/30 border-white/40 text-gray-700 hover:bg-white/50"
                }`}
              >
                <span className="text-sm font-medium">All Brands</span>
              </motion.button>
              {brands.map((brand) => (
                <motion.button
                  key={brand.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedBrand(brand.id)}
                  className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-2xl backdrop-filter backdrop-blur-md border transition-all duration-300 ${
                    selectedBrand === brand.id
                      ? `bg-gradient-to-r ${brand.color} border-white/60 text-white shadow-lg shadow-current/25`
                      : "bg-white/30 border-white/40 text-gray-700 hover:bg-white/50"
                  }`}
                >
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      width={16}
                      height={16}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-sm font-medium whitespace-nowrap">
                    {brand.name}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Filter Bar */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="backdrop-filter backdrop-blur-xl bg-white/25 border border-white/40 rounded-3xl p-6 mb-6 shadow-2xl"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label
                      htmlFor="category-select"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Category
                    </label>
                    <Select
                      value={selectedCategory}
                      onValueChange={setSelectedCategory}
                    >
                      <SelectTrigger
                        id="category-select"
                        className="backdrop-filter backdrop-blur-md bg-white/40 border-white/50"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem
                            key={category.value}
                            value={category.value}
                          >
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label
                      htmlFor="price-select"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Price Range
                    </label>
                    <Select
                      value={selectedPriceRange}
                      onValueChange={setSelectedPriceRange}
                    >
                      <SelectTrigger
                        id="price-select"
                        className="backdrop-filter backdrop-blur-md bg-white/40 border-white/50"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {priceRanges.map((range) => (
                          <SelectItem key={range.value} value={range.value}>
                            {range.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label
                      htmlFor="sort-select"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Sort By
                    </label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger
                        id="sort-select"
                        className="backdrop-filter backdrop-blur-md bg-white/40 border-white/50"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {sortOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label
                      htmlFor="view-mode"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      View
                    </label>
                    <div
                      id="view-mode"
                      className="flex backdrop-filter backdrop-blur-md bg-white/40 rounded-lg p-1 border border-white/50"
                    >
                      <Button
                        variant={viewMode === "grid" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("grid")}
                        className="flex-1"
                      >
                        <Grid className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("list")}
                        className="flex-1"
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>

      {/* Enhanced Products Sections */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 pb-20"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Sponsored Products Section */}
          {sponsoredProducts.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-3">
                <div className="backdrop-filter backdrop-blur-md bg-gradient-to-r from-amber-400/80 to-amber-500/80 p-2 rounded-xl border border-amber-300/60 shadow-lg">
                  <Award className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 font-display">
                  Sponsored Products
                </h2>
                <span className="backdrop-filter backdrop-blur-md bg-white/30 px-3 py-1 rounded-full text-sm text-gray-600 border border-white/40">
                  {sponsoredProducts.length} items
                </span>
              </div>

              <div className="overflow-x-auto">
                <div
                  className="flex space-x-6 pb-4"
                  style={{ width: "max-content" }}
                >
                  {sponsoredProducts.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={index}
                      viewMode="grid"
                      favorites={favorites}
                      onToggleFavorite={toggleFavorite}
                      onQuickAction={handleQuickAction}
                      onViewDetails={setSelectedProduct}
                      isHorizontalScroll={true}
                    />
                  ))}
                </div>
              </div>
            </motion.section>
          )}

          {/* Trending Products Section */}
          {trendingProducts.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-3">
                <div className="backdrop-filter backdrop-blur-md bg-gradient-to-r from-green-400/80 to-green-500/80 p-2 rounded-xl border border-green-300/60 shadow-lg">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 font-display">
                  Trending Now
                </h2>
                <span className="backdrop-filter backdrop-blur-md bg-white/30 px-3 py-1 rounded-full text-sm text-gray-600 border border-white/40">
                  {trendingProducts.length} items
                </span>
              </div>

              <div className="overflow-x-auto">
                <div
                  className="flex space-x-6 pb-4"
                  style={{ width: "max-content" }}
                >
                  {trendingProducts.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={index}
                      viewMode="grid"
                      favorites={favorites}
                      onToggleFavorite={toggleFavorite}
                      onQuickAction={handleQuickAction}
                      onViewDetails={setSelectedProduct}
                      isHorizontalScroll={true}
                    />
                  ))}
                </div>
              </div>
            </motion.section>
          )}

          {/* Regular Products Section */}
          {regularProducts.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="backdrop-filter backdrop-blur-md bg-gradient-to-r from-blue-400/80 to-blue-500/80 p-2 rounded-xl border border-blue-300/60 shadow-lg">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 font-display">
                    All Products
                  </h2>
                  <span className="backdrop-filter backdrop-blur-md bg-white/30 px-3 py-1 rounded-full text-sm text-gray-600 border border-white/40">
                    {regularProducts.length} items
                  </span>
                </div>
              </div>

              {regularProducts.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-20"
                >
                  <div className="backdrop-filter backdrop-blur-xl bg-white/25 border border-white/40 rounded-3xl p-12 max-w-md mx-auto shadow-2xl">
                    <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      No products found
                    </h3>
                    <p className="text-gray-600">
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                </motion.div>
              ) : (
                <div
                  className={`grid gap-6 ${
                    viewMode === "grid"
                      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                      : "grid-cols-1"
                  }`}
                >
                  {regularProducts.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={index}
                      viewMode={viewMode}
                      favorites={favorites}
                      onToggleFavorite={toggleFavorite}
                      onQuickAction={handleQuickAction}
                      onViewDetails={setSelectedProduct}
                    />
                  ))}
                </div>
              )}
            </motion.section>
          )}
        </div>
      </motion.main>

      {/* Enhanced Product Detail Modal */}
      <Dialog
        open={!!selectedProduct}
        onOpenChange={(open) => !open && setSelectedProduct(null)}
      >
        <DialogContent className="max-w-6xl p-0 rounded-3xl overflow-hidden backdrop-filter backdrop-blur-xl bg-white/90 border border-white/60 shadow-2xl max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              {/* Enhanced Header */}
              <DialogHeader className="p-6 border-b border-white/30 backdrop-filter backdrop-blur-md bg-white/30 sticky top-0 z-20">
                <div className="flex items-start justify-between">
                  <div className="flex-1 pr-4">
                    <DialogTitle className="text-3xl font-bold text-gray-900 font-display mb-2">
                      {selectedProduct.name}
                    </DialogTitle>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={`modal-star-${selectedProduct.id}-${i}`}
                            className={`h-5 w-5 ${
                              i < Math.floor(selectedProduct.rating)
                                ? "text-amber-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-gray-600">
                        {selectedProduct.rating} ({selectedProduct.reviews}{" "}
                        reviews)
                      </span>
                      <span className="text-xs text-gray-500 backdrop-filter backdrop-blur-md bg-white/40 px-3 py-1 rounded-full border border-white/40">
                        {selectedProduct.categoryName}
                      </span>
                    </div>
                  </div>
                  <DialogClose className="rounded-full p-3 backdrop-filter backdrop-blur-md bg-white/50 hover:bg-white/70 border border-white/50 transition-all duration-300">
                    <X className="h-6 w-6" />
                  </DialogClose>
                </div>
              </DialogHeader>

              <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Enhanced Product Image Section */}
                <div className="relative">
                  {/* Product badges */}
                  <div className="absolute top-4 left-4 z-10 flex flex-col space-y-2">
                    {selectedProduct.isSponsored && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="px-3 py-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-medium rounded-full shadow-lg"
                      >
                        Sponsored
                      </motion.span>
                    )}
                    {selectedProduct.isNew && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="px-3 py-1 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-medium rounded-full shadow-lg"
                      >
                        New
                      </motion.span>
                    )}
                    {selectedProduct.isTrending && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-full shadow-lg"
                      >
                        Trending
                      </motion.span>
                    )}
                    {selectedProduct.originalPrice && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="px-3 py-1 bg-gradient-to-r from-rose-500 to-rose-600 text-white text-sm font-medium rounded-full shadow-lg"
                      >
                        Sale
                      </motion.span>
                    )}
                  </div>

                  <div className="aspect-square rounded-3xl overflow-hidden backdrop-filter backdrop-blur-md bg-white/40 border border-white/50 shadow-xl">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full"
                    >
                      <Image
                        src={selectedProduct.image}
                        alt={selectedProduct.name}
                        width={600}
                        height={600}
                        className="object-contain w-full h-full p-8"
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Enhanced Product Details Section */}
                <div className="space-y-6">
                  {/* Brand Information */}
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full backdrop-filter backdrop-blur-md bg-white/40 border border-white/50 flex items-center justify-center">
                      <Image
                        src={
                          brands.find((b) => b.id === selectedProduct.brand)
                            ?.logo || "/placeholder.svg"
                        }
                        alt="Brand logo"
                        width={20}
                        height={20}
                        className="object-contain"
                      />
                    </div>
                    <span className="text-lg font-semibold text-gray-800">
                      {brands.find((b) => b.id === selectedProduct.brand)
                        ?.name || "Brand"}
                    </span>
                  </div>

                  {/* Description */}
                  <div className="backdrop-filter backdrop-blur-md bg-white/30 border border-white/40 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Product Description
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedProduct.description}
                    </p>
                  </div>

                  {/* Price Section */}
                  <div className="backdrop-filter backdrop-blur-md bg-white/30 border border-white/40 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Pricing
                    </h3>
                    <div className="flex items-center space-x-4">
                      <span className="text-4xl font-bold text-gray-900">
                        ${selectedProduct.price}
                      </span>
                      {selectedProduct.originalPrice && (
                        <div className="flex flex-col">
                          <span className="text-xl text-gray-500 line-through">
                            ${selectedProduct.originalPrice}
                          </span>
                          <span className="text-sm text-green-600 font-medium">
                            Save $
                            {(
                              selectedProduct.originalPrice -
                              selectedProduct.price
                            ).toFixed(2)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Features/Tags */}
                  <div className="backdrop-filter backdrop-blur-md bg-white/30 border border-white/40 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Key Features
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-4 py-2 backdrop-filter backdrop-blur-md bg-white/50 text-gray-700 text-sm rounded-full border border-white/50 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col space-y-3">
                    <Button className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 border-0 shadow-lg text-lg py-6 rounded-2xl">
                      <ShoppingCart className="h-5 w-5 mr-3" />
                      Add to Cart - ${selectedProduct.price}
                    </Button>

                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        onClick={() => toggleFavorite(selectedProduct.id)}
                        variant="outline"
                        className={`backdrop-filter backdrop-blur-md border-white/50 hover:bg-white/60 py-3 rounded-2xl ${
                          favorites.includes(selectedProduct.id)
                            ? "bg-rose-500/20 border-rose-400/60 text-rose-600"
                            : "bg-white/40"
                        }`}
                      >
                        <Heart
                          className={`h-4 w-4 mr-2 ${
                            favorites.includes(selectedProduct.id)
                              ? "fill-current"
                              : ""
                          }`}
                        />
                        {favorites.includes(selectedProduct.id)
                          ? "Favorited"
                          : "Add to Wishlist"}
                      </Button>

                      <Button
                        variant="outline"
                        className="backdrop-filter backdrop-blur-md bg-white/40 border-white/50 hover:bg-white/60 py-3 rounded-2xl"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Compare
                      </Button>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="backdrop-filter backdrop-blur-md bg-white/30 border border-white/40 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Product Information
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Product ID:</span>
                        <span className="font-mono">{selectedProduct.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Category:</span>
                        <span>{selectedProduct.categoryName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rating:</span>
                        <span>
                          {selectedProduct.rating}/5.0 (
                          {selectedProduct.reviews} reviews)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Availability:</span>
                        <span className="text-green-600 font-medium">
                          In Stock
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Enhanced Product Card Component
interface ProductCardProps {
  product: (typeof allProducts)[0];
  index: number;
  viewMode: "grid" | "list";
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onQuickAction: (action: string, product: (typeof allProducts)[0]) => void;
  onViewDetails: (product: (typeof allProducts)[0]) => void;
  isHorizontalScroll?: boolean;
}

function ProductCard({
  product,
  index,
  viewMode,
  favorites,
  onToggleFavorite,
  onQuickAction,
  onViewDetails,
  isHorizontalScroll = false,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`group relative backdrop-filter backdrop-blur-xl bg-white/25 border border-white/40 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${
        viewMode === "list" && !isHorizontalScroll
          ? "flex items-center p-6"
          : "p-6"
      } ${isHorizontalScroll ? "w-80 flex-shrink-0" : ""}`}
      style={{
        boxShadow:
          "0 20px 40px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.9)",
      }}
    >
      {/* Enhanced Product badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col space-y-2">
        {product.isSponsored && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="px-2 py-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-medium rounded-full shadow-lg"
          >
            Sponsored
          </motion.span>
        )}
        {product.isNew && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
            className="px-2 py-1 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-medium rounded-full shadow-lg"
          >
            New
          </motion.span>
        )}
        {product.isTrending && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="px-2 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-medium rounded-full shadow-lg"
          >
            Trending
          </motion.span>
        )}
        {product.originalPrice && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            className="px-2 py-1 bg-gradient-to-r from-rose-500 to-rose-600 text-white text-xs font-medium rounded-full shadow-lg"
          >
            Sale
          </motion.span>
        )}
      </div>

      {/* Enhanced Quick Actions */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute top-4 right-4 z-10 flex flex-col space-y-2"
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleFavorite(product.id)}
              className={`w-10 h-10 p-0 rounded-full backdrop-filter backdrop-blur-md border shadow-lg transition-all duration-300 ${
                favorites.includes(product.id)
                  ? "bg-rose-500/80 border-rose-400/60 text-white"
                  : "bg-white/40 border-white/50 text-gray-600 hover:bg-white/60"
              }`}
            >
              <Heart
                className={`h-4 w-4 ${
                  favorites.includes(product.id) ? "fill-current" : ""
                }`}
              />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onQuickAction("quickView", product)}
              className="w-10 h-10 p-0 rounded-full backdrop-filter backdrop-blur-md bg-white/40 border border-white/50 text-gray-600 hover:bg-white/60 shadow-lg"
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onQuickAction("compare", product)}
              className="w-10 h-10 p-0 rounded-full backdrop-filter backdrop-blur-md bg-white/40 border border-white/50 text-gray-600 hover:bg-white/60 shadow-lg"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Product image */}
      <div
        className={`relative overflow-hidden rounded-2xl backdrop-filter backdrop-blur-md bg-white/20 border border-white/30 ${
          viewMode === "list" && !isHorizontalScroll
            ? "w-32 h-32 flex-shrink-0 mr-6"
            : "w-full h-48 mb-4"
        }`}
      >
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

      {/* Enhanced Product info */}
      <div
        className={viewMode === "list" && !isHorizontalScroll ? "flex-1" : ""}
      >
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 font-display line-clamp-2">
            {product.name}
          </h3>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Enhanced Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={`product-star-${product.id}-${i}`}
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

        {/* Enhanced Price */}
        <div className="flex items-center justify-between mb-4">
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
          <span className="text-xs text-gray-500 backdrop-filter backdrop-blur-md bg-white/30 px-2 py-1 rounded-full border border-white/40">
            {product.categoryName}
          </span>
        </div>

        {/* Enhanced Actions */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(product)}
            className="flex-1 backdrop-filter backdrop-blur-md bg-white/40 border-white/50 hover:bg-white/60"
          >
            View Details
          </Button>
          <Button
            size="sm"
            className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 border-0 shadow-lg"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add to Cart
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
