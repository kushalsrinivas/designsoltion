"use client";

import { useState } from "react";
import { CompareCard } from "./compare-card";

const sampleProducts = [
  {
    id: "1",
    name: "MacBook Pro 16-inch M3 Max",
    description: "Professional laptop with M3 Max chip",
    image: "/api/placeholder/400/400",
    price: 3499,
    originalPrice: 3999,
    category: "laptops",
    categoryName: "Laptops",
    brand: "apple",
    rating: 4.8,
    reviews: 1247,
    isNew: true,
    isFeatured: true,
    isSponsored: false,
    isTrending: true,
    tags: ["professional", "high-performance"],
    inStock: true,
    specifications: {
      Display: "16.2-inch Liquid Retina XDR",
      Processor: "Apple M3 Max",
      Memory: "32GB Unified Memory",
      Storage: "1TB SSD",
      "Battery Life": "22 hours",
      Weight: "2.16 kg",
      Warranty: "1 year",
      Connectivity: "Wi-Fi 6E, Bluetooth 5.3",
    },
  },
  {
    id: "2",
    name: "Dell XPS 15 OLED",
    description: "Premium Windows laptop with OLED display",
    image: "/api/placeholder/400/400",
    price: 2299,
    originalPrice: 2599,
    category: "laptops",
    categoryName: "Laptops",
    brand: "dell",
    rating: 4.5,
    reviews: 892,
    isNew: false,
    isFeatured: false,
    isSponsored: true,
    isTrending: false,
    tags: ["premium", "oled"],
    inStock: false,
    specifications: {
      Display: "15.6-inch OLED 4K",
      Processor: "Intel Core i7-13700H",
      Memory: "16GB DDR5",
      Storage: "512GB SSD",
      "Battery Life": "8 hours",
      Weight: "1.96 kg",
      Warranty: "2 years",
      Connectivity: "Wi-Fi 6E, Bluetooth 5.2",
    },
  },
];

const sampleBrands = {
  apple: {
    id: "apple",
    name: "Apple",
    logo: "/api/placeholder/40/40",
    color: "#007AFF",
  },
  dell: {
    id: "dell",
    name: "Dell",
    logo: "/api/placeholder/40/40",
    color: "#0084FF",
  },
};

export function CompareCardDemo() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [highlightedSpec, setHighlightedSpec] = useState<string | null>(null);
  const [products, setProducts] = useState(sampleProducts);

  const handleRemove = (productId: string) => {
    setProducts(products.filter((p) => p.id !== productId));
  };

  const handleToggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Product Comparison
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Compare products side by side with our redesigned comparison cards.
            Hover over specifications to highlight them across all cards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {products.map((product) => (
            <CompareCard
              key={product.id}
              product={product}
              brand={sampleBrands[product.brand as keyof typeof sampleBrands]}
              onRemove={handleRemove}
              onToggleFavorite={handleToggleFavorite}
              isFavorite={favorites.includes(product.id)}
              highlightedSpec={highlightedSpec}
              onSpecHover={setHighlightedSpec}
              className="w-full max-w-sm"
            />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              No products to compare
            </h3>
            <p className="text-gray-600">
              All products have been removed from comparison.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
