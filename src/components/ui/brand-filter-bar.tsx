"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Brand {
  id: string;
  name: string;
  logo: string;
  color: string;
}

interface BrandFilterBarProps {
  brands: Brand[];
  selectedBrands: string[];
  onBrandToggle: (brandId: string) => void;
  onClearAll: () => void;
  className?: string;
}

export function BrandFilterBar({
  brands,
  selectedBrands,
  onBrandToggle,
  onClearAll,
  className = "",
}: BrandFilterBarProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Filter by Brand</h3>
        {selectedBrands.length > 0 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClearAll}
            className="text-sm text-gray-600 hover:text-gray-900 backdrop-filter backdrop-blur-md bg-white/30 px-3 py-1 rounded-full border border-white/40 hover:bg-white/50 transition-all duration-300"
          >
            Clear All ({selectedBrands.length})
          </motion.button>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        {brands.map((brand) => {
          const isSelected = selectedBrands.includes(brand.id);

          return (
            <motion.button
              key={brand.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onBrandToggle(brand.id)}
              className={`relative flex items-center space-x-3 px-4 py-3 rounded-2xl backdrop-filter backdrop-blur-md border transition-all duration-300 ${
                isSelected
                  ? `bg-gradient-to-r ${brand.color} border-white/60 text-white shadow-lg`
                  : "bg-white/30 border-white/40 text-gray-700 hover:bg-white/50"
              }`}
              style={{
                boxShadow: isSelected
                  ? `0 8px 25px rgba(0, 0, 0, 0.15), 0 0 20px ${
                      brand.color.includes("blue")
                        ? "rgba(59, 130, 246, 0.3)"
                        : brand.color.includes("green")
                        ? "rgba(34, 197, 94, 0.3)"
                        : brand.color.includes("purple")
                        ? "rgba(147, 51, 234, 0.3)"
                        : brand.color.includes("orange")
                        ? "rgba(249, 115, 22, 0.3)"
                        : brand.color.includes("rose")
                        ? "rgba(244, 63, 94, 0.3)"
                        : "rgba(59, 130, 246, 0.3)"
                    }`
                  : "0 4px 15px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Brand Logo */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-filter backdrop-blur-md border ${
                  isSelected
                    ? "bg-white/20 border-white/40"
                    : "bg-white/40 border-white/50"
                }`}
              >
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </div>

              {/* Brand Name */}
              <span className="text-sm font-medium whitespace-nowrap">
                {brand.name}
              </span>

              {/* Selection Indicator */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-lg"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                </motion.div>
              )}

              {/* Glow Effect for Selected */}
              {isSelected && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/10 to-white/5 pointer-events-none"
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Selected Count */}
      {selectedBrands.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-filter backdrop-blur-md bg-white/30 border border-white/40 rounded-2xl p-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">
              {selectedBrands.length} brand
              {selectedBrands.length !== 1 ? "s" : ""} selected
            </span>
            <div className="flex -space-x-2">
              {selectedBrands.slice(0, 3).map((brandId) => {
                const brand = brands.find((b) => b.id === brandId);
                return brand ? (
                  <div
                    key={brandId}
                    className="w-6 h-6 rounded-full backdrop-filter backdrop-blur-md bg-white/40 border-2 border-white flex items-center justify-center"
                  >
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      width={12}
                      height={12}
                      className="object-contain"
                    />
                  </div>
                ) : null;
              })}
              {selectedBrands.length > 3 && (
                <div className="w-6 h-6 rounded-full backdrop-filter backdrop-blur-md bg-white/40 border-2 border-white flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">
                    +{selectedBrands.length - 3}
                  </span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
