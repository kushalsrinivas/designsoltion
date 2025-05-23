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
  GitCompare,
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
import { CompareProductsModal } from "@/components/ui/compare-products-modal";
import { WishlistToggle } from "@/components/ui/wishlist-toggle";
import { AddToCartButton } from "@/components/ui/add-to-cart-button";
import { CartSidebar, type CartItem } from "@/components/ui/cart-sidebar";
import { WishlistPage } from "@/components/ui/wishlist-page";
import { CheckoutPage } from "@/components/ui/checkout-page";
import { ToastContainer, type Toast } from "@/components/ui/toast-notification";

interface DeliveryDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface PaymentMethod {
  type: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  cardholderName?: string;
}

interface OrderData {
  orderNumber: string;
  items: CartItem[];
  deliveryDetails: DeliveryDetails;
  paymentMethod: PaymentMethod;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  estimatedDelivery: string;
}

// Product interface
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
  quickActions: string[];
  specifications?: Record<string, string>;
}

// Brand data
const brands = [
  {
    id: "designit",
    name: "DesignIt Solutions",
    logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=120&h=40&fit=crop&crop=center",
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "papercraft",
    name: "PaperCraft Pro",
    logo: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=120&h=40&fit=crop&crop=center",
    color: "from-green-500 to-green-600",
  },
  {
    id: "lasertech",
    name: "LaserTech",
    logo: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=120&h=40&fit=crop&crop=center",
    color: "from-purple-500 to-purple-600",
  },
  {
    id: "smartoffice",
    name: "SmartOffice",
    logo: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=120&h=40&fit=crop&crop=center",
    color: "from-orange-500 to-orange-600",
  },
  {
    id: "premium",
    name: "Premium Plus",
    logo: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=120&h=40&fit=crop&crop=center",
    color: "from-rose-500 to-rose-600",
  },
];

// Extended product data with brands and sections
const allProducts: Product[] = [
  // Sponsored Products
  {
    id: "notebook-premium",
    name: "Premium Notebook Collection",
    description:
      "Luxury hardcover notebooks with premium paper for executive note-taking",
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop&crop=center",
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
    specifications: {
      "Paper Type": "Premium 120gsm",
      "Page Count": "200 pages",
      Size: "A5 (148 x 210 mm)",
      Binding: "Hardcover",
      Ruling: "Lined",
      "Cover Material": "Leather-bound",
      Weight: "450g",
      Warranty: "1 year",
    },
  },
  {
    id: "laser-color",
    name: "ColorJet X5000 Pro",
    description:
      "Professional color laser printer with duplex printing and wireless connectivity",
    image:
      "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=400&fit=crop&crop=center",
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
    specifications: {
      "Print Speed": "30 ppm color, 35 ppm mono",
      Resolution: "1200 x 1200 dpi",
      "Paper Capacity": "500 sheets",
      Connectivity: "Wi-Fi, Ethernet, USB",
      Duplex: "Automatic",
      Memory: "512 MB",
      Dimensions: "410 x 398 x 300 mm",
      Weight: "18.5 kg",
      Warranty: "3 years",
    },
  },

  // Trending Products
  {
    id: "smart-scanner",
    name: "SmartScan Pro 2024",
    description:
      "AI-powered document scanner with cloud integration and OCR technology",
    image:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop&crop=center",
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
    specifications: {
      "Scan Speed": "25 ppm",
      Resolution: "600 x 600 dpi",
      "Document Size": "A4, Letter, Legal",
      Connectivity: "Wi-Fi, USB-C",
      "OCR Languages": "50+ languages",
      "Cloud Storage": "Google Drive, Dropbox",
      "Battery Life": "8 hours",
      Weight: "1.2 kg",
      Warranty: "2 years",
    },
  },
  {
    id: "business-cards",
    name: "Executive Business Cards",
    description:
      "Premium business cards with metallic finishes and custom embossing",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center",
    price: 19.99,
    originalPrice: undefined,
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
    specifications: {
      "Card Stock": "350gsm premium",
      Finish: "Matte with spot UV",
      Size: "3.5 x 2 inches",
      Quantity: "500 cards",
      Printing: "Full color both sides",
      Turnaround: "3-5 business days",
      Customization: "Logo, text, colors",
      Packaging: "Premium box",
    },
  },

  // Regular Products
  {
    id: "stationery-set",
    name: "Executive Stationery Set",
    description:
      "Complete stationery set with letterhead and envelopes for business correspondence",
    image:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop&crop=center",
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
    specifications: {
      "Paper Weight": "100gsm letterhead",
      "Envelope Size": "DL and C5",
      Quantity: "100 letterheads, 50 envelopes",
      Printing: "Single color letterhead",
      Customization: "Company logo and details",
      Finish: "Professional matte",
      Turnaround: "5-7 business days",
      Packaging: "Protective sleeve",
    },
  },
  {
    id: "brochures",
    name: "Tri-fold Marketing Brochures",
    description:
      "Professional brochures with high-quality printing and vibrant colors",
    image:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop&crop=center",
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
    specifications: {
      "Paper Stock": "200gsm gloss",
      Size: "A4 tri-fold",
      Printing: "Full color both sides",
      Finish: "Gloss lamination",
      Quantity: "250 brochures",
      Folding: "Professional machine fold",
      Design: "Custom layout included",
      Turnaround: "3-5 business days",
    },
  },
  {
    id: "journals",
    name: "Leather-bound Executive Journals",
    description:
      "Elegant journals with premium paper and genuine Italian leather binding",
    image:
      "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&h=400&fit=crop&crop=center",
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
    specifications: {
      "Cover Material": "Genuine Italian leather",
      "Paper Type": "Cream 90gsm",
      "Page Count": "240 pages",
      Size: "A5 (148 x 210 mm)",
      Ruling: "Dot grid",
      Closure: "Elastic band",
      Bookmark: "Ribbon marker",
      Weight: "380g",
    },
  },
  {
    id: "laser-mono",
    name: "LaserJet Pro Mono M404",
    description:
      "High-speed monochrome laser printer perfect for office environments",
    image:
      "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=400&fit=crop&crop=center",
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
    specifications: {
      "Print Speed": "40 ppm",
      Resolution: "1200 x 1200 dpi",
      "Paper Capacity": "300 sheets",
      Connectivity: "Ethernet, USB",
      Duplex: "Manual",
      Memory: "256 MB",
      Dimensions: "360 x 360 x 280 mm",
      Weight: "12.8 kg",
      Warranty: "2 years",
    },
  },
  {
    id: "toner-cartridge",
    name: "Premium Toner Cartridge Set",
    description:
      "Long-lasting toner cartridges compatible with all major printer models",
    image:
      "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=400&fit=crop&crop=center",
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
    specifications: {
      "Page Yield": "3000 pages",
      Compatibility: "HP, Canon, Brother",
      Color: "Black toner",
      Quality: "OEM equivalent",
      Chip: "Smart chip included",
      Packaging: "Individual boxes",
      "Shelf Life": "24 months",
      Warranty: "1 year defect-free",
    },
  },
  {
    id: "wireless-keyboard",
    name: "ErgoType Wireless Keyboard Pro",
    description:
      "Ergonomic wireless keyboard with customizable RGB keys and premium switches",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop&crop=center",
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
    specifications: {
      "Key Switches": "Mechanical blue switches",
      Connectivity: "2.4GHz wireless + Bluetooth",
      "Battery Life": "30 days",
      Backlighting: "RGB per-key",
      Layout: "Full-size 104 keys",
      Compatibility: "Windows, Mac, Linux",
      Dimensions: "440 x 135 x 35 mm",
      Weight: "980g",
    },
  },
  {
    id: "office-tablet",
    name: "OfficePad Pro 12.9",
    description:
      "Professional tablet designed for business applications and digital note-taking",
    image:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop&crop=center",
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
    specifications: {
      Display: "12.9-inch Retina",
      Resolution: "2732 x 2048 pixels",
      Processor: "A15 Bionic chip",
      Storage: "256GB",
      RAM: "8GB",
      "Battery Life": "10 hours",
      Connectivity: "Wi-Fi 6, Bluetooth 5.0",
      Weight: "682g",
    },
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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [compareProducts, setCompareProducts] = useState<Product[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  // New state for cart, wishlist, and checkout
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCartSidebar, setShowCartSidebar] = useState(false);
  const [showWishlistPage, setShowWishlistPage] = useState(false);
  const [showCheckoutPage, setShowCheckoutPage] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const router = useRouter();

  // Load favorites and cart from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Toast management
  const addToast = (toast: Omit<Toast, "id">) => {
    const id = Date.now().toString();
    const newToast = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);

    // Auto remove toast after duration
    setTimeout(() => {
      removeToast(id);
    }, toast.duration || 5000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

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
    const product = allProducts.find((p) => p.id === productId);
    if (!product) return;

    setFavorites((prev) => {
      const isCurrentlyFavorited = prev.includes(productId);
      const newFavorites = isCurrentlyFavorited
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];

      // Show toast notification
      addToast({
        type: "success",
        title: isCurrentlyFavorited
          ? "Removed from Wishlist"
          : "Added to Wishlist",
        message: isCurrentlyFavorited
          ? `${product.name} removed from your wishlist`
          : `${product.name} added to your wishlist`,
        action: "wishlist",
        productImage: product.image,
        productName: product.name,
      });

      return newFavorites;
    });
  };

  const addToCart = (product: {
    id: string;
    name: string;
    price: number;
    image: string;
  }) => {
    const fullProduct = allProducts.find((p) => p.id === product.id);
    const brand = brands.find((b) => b.id === fullProduct?.brand);

    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);

      if (existingItem) {
        const updatedItems = prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );

        addToast({
          type: "success",
          title: "Quantity Updated",
          message: `${product.name} quantity increased in cart`,
          action: "cart",
          productImage: product.image,
          productName: product.name,
        });

        return updatedItems;
      }

      const newItem: CartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        brand: brand?.name,
      };

      addToast({
        type: "success",
        title: "Added to Cart",
        message: `${product.name} added to your cart`,
        action: "cart",
        productImage: product.image,
        productName: product.name,
      });

      return [...prev, newItem];
    });
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (id: string) => {
    const item = cartItems.find((item) => item.id === id);
    setCartItems((prev) => prev.filter((item) => item.id !== id));

    if (item) {
      addToast({
        type: "info",
        title: "Removed from Cart",
        message: `${item.name} removed from your cart`,
      });
    }
  };

  const handleCheckout = () => {
    setShowCartSidebar(false);
    setShowCheckoutPage(true);
  };

  const handleOrderComplete = (orderData: OrderData) => {
    setCartItems([]);
    addToast({
      type: "success",
      title: "Order Placed Successfully!",
      message: `Order ${orderData.orderNumber} has been confirmed`,
      duration: 8000,
    });
  };

  const addToCompare = (product: Product) => {
    setCompareProducts((prev) => {
      if (prev.find((p) => p.id === product.id)) {
        addToast({
          type: "info",
          title: "Already in Comparison",
          message: `${product.name} is already in your comparison list`,
        });
        return prev;
      }

      if (prev.length >= 4) {
        const updatedList = [...prev.slice(1), product];
        addToast({
          type: "success",
          title: "Added to Compare",
          message: `${product.name} added to comparison (oldest item removed)`,
        });
        return updatedList;
      }

      addToast({
        type: "success",
        title: "Added to Compare",
        message: `${product.name} added to comparison`,
      });
      return [...prev, product];
    });
  };

  const removeFromCompare = (productId: string) => {
    setCompareProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const clearCompareList = () => {
    setCompareProducts([]);
    setShowCompareModal(false);
  };

  const handleQuickAction = (action: string, product: Product) => {
    switch (action) {
      case "wishlist":
        toggleFavorite(product.id);
        break;
      case "quickView":
        setSelectedProduct(product);
        break;
      case "compare":
        addToCompare(product);
        break;
      default:
        break;
    }
  };

  // Get favorited products for wishlist page
  const favoritedProducts = allProducts.filter((product) =>
    favorites.includes(product.id)
  );

  // Show checkout page
  if (showCheckoutPage) {
    return (
      <CheckoutPage
        items={cartItems}
        onBack={() => setShowCheckoutPage(false)}
        onOrderComplete={handleOrderComplete}
      />
    );
  }

  // Show wishlist page
  if (showWishlistPage) {
    return (
      <WishlistPage
        products={favoritedProducts}
        brands={brands}
        onRemoveFromWishlist={toggleFavorite}
        onAddToCart={addToCart}
        onBack={() => setShowWishlistPage(false)}
      />
    );
  }

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
              {/* Wishlist Button */}
              <Button
                onClick={() => setShowWishlistPage(true)}
                variant="ghost"
                size="sm"
                className="backdrop-filter backdrop-blur-md bg-white/30 hover:bg-white/50 border border-white/40 shadow-lg transition-all duration-300"
              >
                <Heart className="h-4 w-4 mr-2" />
                Wishlist ({favorites.length})
              </Button>

              {/* Cart Button */}
              <Button
                onClick={() => setShowCartSidebar(true)}
                variant="ghost"
                size="sm"
                className="backdrop-filter backdrop-blur-md bg-white/30 hover:bg-white/50 border border-white/40 shadow-lg transition-all duration-300"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
              </Button>

              <span className="text-sm text-gray-600 backdrop-filter backdrop-blur-md bg-white/30 px-3 py-1 rounded-full border border-white/40">
                {filteredProducts.length} products
              </span>
              {compareProducts.length > 0 && (
                <Button
                  onClick={() => setShowCompareModal(true)}
                  className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 border-0 shadow-lg text-white"
                >
                  <GitCompare className="h-4 w-4 mr-2" />
                  Compare ({compareProducts.length})
                </Button>
              )}
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
                      onAddToCart={addToCart}
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
                      onAddToCart={addToCart}
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
                      onAddToCart={addToCart}
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
        <DialogContent className="max-w-[90%] xl:max-w-[80%] p-0 rounded-3xl overflow-hidden backdrop-filter backdrop-blur-xl bg-white/90 border border-white/60 shadow-2xl max-h-[90vh] overflow-y-auto">
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
                    <AddToCartButton
                      productId={selectedProduct.id}
                      productName={selectedProduct.name}
                      price={selectedProduct.price}
                      image={selectedProduct.image}
                      onAddToCart={addToCart}
                      className="w-full"
                      size="lg"
                    />

                    <div className="grid grid-cols-2 gap-3">
                      <WishlistToggle
                        productId={selectedProduct.id}
                        isFavorited={favorites.includes(selectedProduct.id)}
                        onToggle={toggleFavorite}
                        className="flex-1"
                      />

                      <Button
                        onClick={() => addToCompare(selectedProduct)}
                        variant="outline"
                        className="backdrop-filter backdrop-blur-md bg-white/40 border-white/50 hover:bg-white/60 py-3 rounded-2xl"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Compare
                      </Button>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="backdrop-filter backdrop-blur-md bg-white/30 border  border-white/40 rounded-2xl p-6">
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

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={showCartSidebar}
        onClose={() => setShowCartSidebar(false)}
        items={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
      />

      {/* Compare Products Modal */}
      <CompareProductsModal
        isOpen={showCompareModal}
        onClose={() => setShowCompareModal(false)}
        products={compareProducts}
        brands={brands}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
        onRemoveProduct={removeFromCompare}
        onClearAll={clearCompareList}
      />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
}

// Enhanced Product Card Component with new features
interface ProductCardProps {
  product: Product;
  index: number;
  viewMode: "grid" | "list";
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onQuickAction: (action: string, product: Product) => void;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: {
    id: string;
    name: string;
    price: number;
    image: string;
  }) => void;
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
  onAddToCart,
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
            <WishlistToggle
              productId={product.id}
              isFavorited={favorites.includes(product.id)}
              onToggle={onToggleFavorite}
              size="sm"
            />
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
              <GitCompare className="h-4 w-4" />
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
          <AddToCartButton
            productId={product.id}
            productName={product.name}
            price={product.price}
            image={product.image}
            onAddToCart={onAddToCart}
            size="sm"
            showText={false}
          />
        </div>
      </div>
    </motion.div>
  );
}
