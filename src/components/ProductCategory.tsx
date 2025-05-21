import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Plus, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: string;
};

export type CategoryProps = {
  products: Product[];
  categoryName: string;
  isInView: boolean;
};

export default function ProductCategory({
  products,
  categoryName,
  isInView,
}: CategoryProps) {
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* Horizontal scrolling product showcase */}
      <div className="relative overflow-hidden">
        <div className="flex overflow-x-hidden m-auto pb-12 pt-4 snap-x snap-mandatory hide-scrollbar">
          <div className="flex space-x-6 justify-center">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex-shrink-0 w-72 snap-center"
              >
                <div
                  className={`relative h-full w-full bg-white-400 bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-20 border border-gray-100 bg-transparent bg-opacity-20 border-opacity-30 rounded-3xl p-6 shadow-xl transform-3d hover:translate-z-4 transition-all duration-300 ${
                    expandedProduct === product.id ? "scale-105 shadow-2xl" : ""
                  }`}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Product image with 3D effect */}
                  <div className="relative w-full h-48 mb-6 overflow-hidden rounded-xl perspective">
                    <motion.div
                      className="w-full h-full transform-3d"
                      whileHover={{
                        rotateY: 5,
                        rotateX: -5,
                        scale: 1.05,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="object-contain w-full h-full transform translate-z-8"
                      />
                      {/* Subtle shadow beneath product */}
                      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/10 to-transparent rounded-b-xl" />
                    </motion.div>
                  </div>

                  {/* Product info */}
                  <h3 className="text-xl font-bold text-gray-900 font-display mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-700 font-body text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-amber-600 font-medium mb-4">
                    {product.price}
                  </p>

                  {/* Action buttons */}
                  <div className="flex justify-between items-center">
                    <Button
                      variant="outline"
                      size="sm"
                      className="relative overflow-hidden group border-white border-opacity-50"
                      onClick={() =>
                        setExpandedProduct(
                          expandedProduct === product.id ? null : product.id
                        )
                      }
                    >
                      <span className="relative z-10 flex items-center">
                        {expandedProduct === product.id
                          ? "Less Info"
                          : "More Info"}
                        <ChevronDown
                          className={`ml-1 h-3 w-3 transition-transform duration-300 ${
                            expandedProduct === product.id ? "rotate-180" : ""
                          }`}
                        />
                      </span>
                      <span className="absolute inset-0 bg-transparent bg-opacity-20 backdrop-filter backdrop-blur-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Button>

                    <Button
                      size="sm"
                      className="relative overflow-hidden bg-gradient-to-br from-amber-400 to-amber-500 border-0 shadow-sm"
                    >
                      <span className="relative z-10 flex items-center">
                        Get Quote
                        <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Button>
                  </div>

                  {/* Expanded product details */}
                  <AnimatePresence>
                    {expandedProduct === product.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-white border-opacity-30"
                      >
                        <p className="text-gray-700 font-body text-sm mb-3">
                          {product.description}
                        </p>
                        <ul className="text-sm text-gray-700 space-y-1 mb-4">
                          <li className="flex items-center">
                            <ChevronRight className="h-3 w-3 text-amber-500 mr-1" />
                            <span>Premium quality materials</span>
                          </li>
                          <li className="flex items-center">
                            <ChevronRight className="h-3 w-3 text-amber-500 mr-1" />
                            <span>Customization available</span>
                          </li>
                          <li className="flex items-center">
                            <ChevronRight className="h-3 w-3 text-amber-500 mr-1" />
                            <span>Bulk order discounts</span>
                          </li>
                        </ul>
                        <Button
                          className="w-full relative overflow-hidden bg-gradient-to-br from-amber-400 to-amber-500 border-0 shadow-sm"
                          size="sm"
                        >
                          <span className="relative z-10 flex items-center justify-center">
                            Add to Inquiry
                            <Plus className="ml-1 h-3 w-3" />
                          </span>
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Decorative elements */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 opacity-70">
                    <Image
                      src={"/images/flower1.png"}
                      alt="Decorative flower"
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll indicators */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-r from-white/30 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-l from-white/30 to-transparent pointer-events-none" />
      </div>

      {/* View all products button */}
      <div className="text-center mt-8">
        <Button
          variant="outline"
          size="lg"
          className="relative overflow-hidden group border-white border-opacity-50"
        >
          <span className="relative z-10 flex items-center">
            View All {categoryName}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
          <span className="absolute inset-0 bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity" />
        </Button>
      </div>
    </motion.div>
  );
}
