"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Plus, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

// Product categories and items
const productCategories = [
  {
    id: "paper",
    year: "1",
    name: "Paper Products",
    description:
      "Introduced our first comprehensive line of high-quality paper products for businesses of all sizes.",
    color: "from-rose-200 to-rose-100",
    icon: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=40&h=40&fit=crop&crop=center",
    products: [
      {
        id: "notebook-premium",
        name: "Premium Notebook",
        description: "High-quality hardcover notebook with premium paper",
        image:
          "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=300&fit=crop&crop=center",
        price: "$12.99",
      },
      {
        id: "stationery-set",
        name: "Executive Stationery Set",
        description: "Complete stationery set with letterhead and envelopes",
        image:
          "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=300&fit=crop&crop=center",
        price: "$24.99",
      },
      {
        id: "business-cards",
        name: "Custom Business Cards",
        description: "Premium business cards with custom finishes",
        image:
          "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=300&fit=crop&crop=center",
        price: "From $19.99",
      },
      {
        id: "brochures",
        name: "Tri-fold Brochures",
        description: "Professional brochures with high-quality printing",
        image:
          "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=300&fit=crop&crop=center",
        price: "From $29.99",
      },
      {
        id: "journals",
        name: "Leather-bound Journals",
        description: "Elegant journals with premium paper and binding",
        image:
          "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=300&h=300&fit=crop&crop=center",
        price: "$34.99",
      },
    ],
  },
  {
    id: "printers",
    year: "2",
    name: "Laser Printers",
    description:
      "Diversified our product range with cutting-edge laser printing technology for professional use.",
    color: "from-amber-200 to-amber-100",
    icon: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=40&h=40&fit=crop&crop=center",
    products: [
      {
        id: "laser-mono",
        name: "LaserJet Pro Mono",
        description: "High-speed monochrome laser printer for office use",
        image:
          "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=300&h=300&fit=crop&crop=center",
        price: "$249.99",
      },
      {
        id: "laser-color",
        name: "ColorJet X5000",
        description: "Professional color laser printer with duplex printing",
        image:
          "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=300&h=300&fit=crop&crop=center",
        price: "$499.99",
      },
      {
        id: "toner-cartridge",
        name: "Premium Toner Cartridge",
        description: "Long-lasting toner cartridges for all printer models",
        image:
          "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=300&h=300&fit=crop&crop=center",
        price: "From $79.99",
      },
      {
        id: "printer-maintenance",
        name: "Printer Maintenance Kit",
        description: "Complete maintenance kit for laser printers",
        image:
          "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300&h=300&fit=crop&crop=center",
        price: "$129.99",
      },
      {
        id: "printer-paper",
        name: "Premium Laser Paper",
        description: "High-quality paper optimized for laser printers",
        image:
          "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=300&fit=crop&crop=center",
        price: "$19.99",
      },
    ],
  },
  {
    id: "electronics",
    year: "3",
    name: "Electronic Goods",
    description:
      "Further expanded our catalog with essential electronic business solutions for the modern workplace.",
    color: "from-green-200 to-green-100",
    icon: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=40&h=40&fit=crop&crop=center",
    products: [
      {
        id: "smart-scanner",
        name: "SmartScan Pro",
        description: "Portable document scanner with cloud integration",
        image:
          "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=300&h=300&fit=crop&crop=center",
        price: "$179.99",
      },
      {
        id: "wireless-keyboard",
        name: "ErgoType Wireless Keyboard",
        description: "Ergonomic wireless keyboard with customizable keys",
        image:
          "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop&crop=center",
        price: "$89.99",
      },
      {
        id: "office-tablet",
        name: "OfficePad Pro",
        description:
          "Tablet designed for business applications and note-taking",
        image:
          "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop&crop=center",
        price: "$349.99",
      },
      {
        id: "document-camera",
        name: "Document Camera HD",
        description: "High-definition camera for document presentation",
        image:
          "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=300&h=300&fit=crop&crop=center",
        price: "$199.99",
      },
      {
        id: "smart-projector",
        name: "MiniProjector Plus",
        description: "Compact smart projector for meetings and presentations",
        image:
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop&crop=center",
        price: "$299.99",
      },
    ],
  },
];

export default function ProductsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const router = useRouter();

  // Handle scroll-based animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsInView(true);
          }
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Get current category data for the modal
  const currentCategory = productCategories.find(
    (cat) => cat.id === selectedCategory
  );

  return (
    <section
      ref={sectionRef}
      className="relative z-10 py-20 overflow-hidden"
      style={{
        background:
          "linear-gradient(to right, rgba(236, 253, 245, 0.4), rgba(254, 242, 242, 0.4))",
      }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Original blobs */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-3000" />
        <div className="absolute bottom-20 -left-20 w-64 h-64 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />

        {/* Additional floating blobs */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-4000" />
        <div className="absolute top-2/3 left-1/3 w-48 h-48 bg-rose-100 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-1000" />
        <div className="absolute top-1/2 right-1/2 w-56 h-56 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-5000" />

        {/* Floating decorative elements */}
        <div className="absolute top-1/3 right-1/3 w-24 h-24 opacity-20 animate-float animation-delay-2000 pointer-events-none">
          <svg
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <title>Decorative circle</title>
            <path
              d="M180 100C180 144.183 144.183 180 100 180C55.8172 180 20 144.183 20 100C20 55.8172 55.8172 20 100 20C144.183 20 180 55.8172 180 100Z"
              stroke="rgba(217, 119, 6, 0.5)"
              strokeWidth="5"
            />
          </svg>
        </div>
        <div className="absolute bottom-1/4 left-1/4 w-32 h-32 opacity-20 animate-float animation-delay-3000 pointer-events-none">
          <svg
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <title>Decorative rectangle</title>
            <rect
              x="40"
              y="40"
              width="120"
              height="120"
              rx="24"
              stroke="rgba(190, 18, 60, 0.5)"
              strokeWidth="5"
            />
          </svg>
        </div>
        <div className="absolute top-2/3 right-1/5 w-20 h-20 opacity-20 animate-float animation-delay-4500 pointer-events-none">
          <svg
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <title>Decorative diamond</title>
            <path
              d="M20 100L100 20L180 100L100 180L20 100Z"
              stroke="rgba(22, 101, 52, 0.5)"
              strokeWidth="5"
            />
          </svg>
        </div>

        {/* Subtle dot patterns */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-amber-500 rounded-full" />
          <div className="absolute top-1/2 left-1/5 w-3 h-3 bg-rose-500 rounded-full" />
          <div className="absolute top-3/4 left-2/3 w-2 h-2 bg-green-500 rounded-full" />
          <div className="absolute top-1/6 left-3/4 w-3 h-3 bg-amber-500 rounded-full" />
          <div className="absolute top-5/6 left-1/6 w-4 h-4 bg-green-500 rounded-full" />
          <div className="absolute top-2/5 left-4/5 w-2 h-2 bg-rose-500 rounded-full" />
        </div>
      </div>

      {/* Decorative elements - hidden on small screens */}
      <div className="hidden sm:block absolute top-6 left-6 md:top-10 md:left-10 w-12 h-12 md:w-16 md:h-16 pointer-events-none">
        <Image
          src="/images/flower1.png"
          alt="Decorative flower"
          width={80}
          height={80}
          className="object-contain opacity-60"
        />
      </div>
      <div className="hidden sm:block absolute bottom-6 right-6 md:bottom-10 md:right-10 w-12 h-12 md:w-16 md:h-16 pointer-events-none">
        <Image
          src="/images/flower1.png"
          alt="Decorative flower"
          width={80}
          height={80}
          className="object-contain opacity-60"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 relative px-4"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-amber-200 rounded-full filter blur-xl opacity-30" />
          </div>
          <h2 className="relative z-10 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 font-display">
            Our Product Journey
          </h2>
          <p className="relative z-10 mt-3 sm:mt-4 text-base sm:text-lg text-gray-700 font-body max-w-2xl mx-auto px-4">
            Discover our evolution and the wide range of high-quality products
            designed to meet your business needs
          </p>
        </motion.div>

        {/* Timeline layout */}
        <div className="relative max-w-4xl mx-auto px-4">
          {/* Center line - hidden on mobile, visible on md+ */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-300/50 via-rose-300/50 to-green-300/50 transform -translate-x-1/2" />

          {/* Timeline items */}
          {productCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative mb-8 sm:mb-12 md:mb-16 flex flex-col md:flex-row md:items-center ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } md:items-start`}
            >
              {/* Timeline dot - positioned differently on mobile */}
              <div className="absolute left-4 md:left-1/2 top-6 md:top-auto md:transform md:-translate-x-1/2 flex items-center justify-center z-10">
                <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-white border-3 md:border-4 border-amber-400" />
              </div>

              {/* Content card */}
              <div
                className={`w-full md:w-5/12 pl-12 md:pl-0 ${
                  index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                }`}
              >
                <div className="relative backdrop-filter backdrop-blur-sm bg-white bg-opacity-20 border border-white border-opacity-30 rounded-2xl md:rounded-3xl p-4 sm:p-6 shadow-xl transform-3d hover:translate-z-4 transition-all duration-300">
                  <div
                    className={`absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-br ${category.color} opacity-20`}
                  />

                  {/* Year badge */}
                  <div className="absolute -top-2 -left-2 md:-top-3 md:-left-3 px-2 py-1 md:px-3 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full text-white text-xs md:text-sm font-medium shadow-md">
                    {category.year}
                  </div>

                  {/* Decorative flower - hidden on small screens */}
                  <div className="hidden sm:block absolute -top-3 -right-3 w-6 h-6 md:w-8 md:h-8 opacity-70">
                    <Image
                      src="/images/flower1.png"
                      alt="Decorative flower"
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>

                  <div className="relative z-10 pt-3 md:pt-4">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 font-display mb-2">
                      {category.name}
                    </h3>
                    <p className="text-gray-700 font-body text-sm mb-4 md:mb-6">
                      {category.description}
                    </p>

                    {category.products.length > 0 && (
                      <Button
                        onClick={() => setSelectedCategory(category.id)}
                        className="relative overflow-hidden bg-gradient-to-br from-amber-400 to-amber-500 border-0 shadow-sm text-sm md:text-base"
                        size="sm"
                      >
                        <span className="relative z-10 flex items-center">
                          View Products
                          <ArrowRight className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Empty space for alternating layout - only on desktop */}
              <div className="hidden md:block w-full md:w-5/12" />
            </motion.div>
          ))}

          {/* View More Products Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{
              duration: 0.6,
              delay: productCategories.length * 0.2 + 0.3,
            }}
            className="relative flex justify-center mt-16"
          >
            {/* Final timeline dot */}
            <div className="absolute left-1/2 top-0 transform -translate-x-1/2 flex items-center justify-center z-10">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 border-4 border-white shadow-lg" />
            </div>

            {/* View More Products Card */}
            <div className="relative backdrop-filter backdrop-blur-lg bg-white bg-opacity-30 border border-white border-opacity-40 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl mt-3 max-w-md w-full mx-4">
              {/* Background gradient */}
              <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-br from-amber-100/30 via-rose-100/20 to-green-100/30 opacity-60" />

              {/* Decorative elements - hidden on small screens */}
              <div className="hidden sm:block absolute -top-2 -right-2 w-10 h-10 md:w-12 md:h-12 opacity-60">
                <Image
                  src="/images/flower1.png"
                  alt="Decorative flower"
                  width={48}
                  height={48}
                  className="object-contain animate-pulse"
                />
              </div>
              <div className="hidden sm:block absolute -bottom-2 -left-2 w-8 h-8 md:w-10 md:h-10 opacity-50">
                <Image
                  src="/images/leaf.png"
                  alt="Decorative leaf"
                  width={40}
                  height={40}
                  className="object-contain animate-pulse"
                />
              </div>

              <div className="relative z-10 text-center">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 font-display mb-3">
                  Explore Our Complete Collection
                </h3>
                <p className="text-gray-700 font-body text-sm mb-4 md:mb-6">
                  Discover hundreds of premium products across all categories in
                  our comprehensive online store.
                </p>

                <Button
                  onClick={() => router.push("/products")}
                  className="relative overflow-hidden bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:via-amber-600 hover:to-amber-700 border-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 px-6 md:px-8 py-2.5 md:py-3 text-sm md:text-base font-medium"
                >
                  <span className="relative z-10 flex items-center">
                    <svg
                      className="mr-1.5 md:mr-2 h-4 w-4 md:h-5 md:w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <title>Shopping bag icon</title>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                    <span className="hidden sm:inline">View More Products</span>
                    <span className="sm:hidden">View Products</span>
                    <ArrowRight className="ml-1.5 md:ml-2 h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1" />
                  </span>

                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-700" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Products Modal */}
      <Dialog
        open={!!selectedCategory}
        onOpenChange={(open) => !open && setSelectedCategory(null)}
      >
        <DialogContent
          className="max-w-[95%] sm:max-w-[90%] xl:max-w-[80%] max-h-[90vh] p-0 rounded-xl md:rounded-2xl overflow-hidden"
          style={{
            background: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 255, 255, 0.5)",
            boxShadow:
              "0 10px 25px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.6)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative"
          >
            {/* Animated Flowers and Leaves */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {/* Top Left Flower */}
              <motion.div
                className="absolute -top-6 -left-6"
                animate={{
                  rotate: [0, 10, 0, -10, 0],
                  y: [0, -5, 0, 5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src="/images/flower1.png"
                  alt="Decorative flower"
                  width={60}
                  height={60}
                  className="opacity-80 rotate-45"
                />
              </motion.div>

              {/* Top Right Leaf */}
              <motion.div
                className="absolute -top-4 -right-4"
                animate={{
                  rotate: [0, -15, 0, 15, 0],
                  x: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 7,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              >
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2Z"
                    fill="rgba(22, 163, 74, 0.2)"
                  />
                  <path
                    d="M12 2C9 6.5 9 17.5 12 22C15 17.5 15 6.5 12 2Z"
                    fill="rgba(22, 163, 74, 0.3)"
                  />
                  <path
                    d="M2 12C6.5 9 17.5 9 22 12C17.5 15 6.5 15 2 12Z"
                    fill="rgba(22, 163, 74, 0.3)"
                  />
                </svg>
              </motion.div>

              {/* Bottom Left Leaf */}
              <motion.div
                className="absolute -bottom-4 -left-4"
                animate={{
                  rotate: [0, 15, 0, -15, 0],
                  scale: [1, 1.05, 1, 0.95, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 1,
                }}
              >
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 4C15 7 9 17 4 20C9 17 15 7 20 4Z"
                    fill="rgba(245, 158, 11, 0.3)"
                  />
                  <path
                    d="M4 4C9 7 15 17 20 20C15 17 9 7 4 4Z"
                    fill="rgba(245, 158, 11, 0.3)"
                  />
                </svg>
              </motion.div>

              {/* Bottom Right Flower */}
              <motion.div
                className="absolute -bottom-6 -right-6"
                animate={{
                  rotate: [0, -10, 0, 10, 0],
                  y: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 0.3,
                }}
              >
                <Image
                  src="/images/leaf.png"
                  alt="Decorative flower"
                  width={70}
                  height={70}
                  className="opacity-70 -rotate-45"
                />
              </motion.div>
            </div>

            {/* Floating elements - appear when dialog opens */}
            <motion.div
              className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
              }}
            >
              {/* Circles */}
              <motion.div
                className="absolute top-10 right-10 w-24 h-24 rounded-full bg-amber-200/20"
                variants={{
                  hidden: { scale: 0.8, opacity: 0, x: 20 },
                  visible: {
                    scale: 1,
                    opacity: 0.5,
                    x: 0,
                    transition: {
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "mirror",
                    },
                  },
                }}
              />
              <motion.div
                className="absolute bottom-20 left-20 w-32 h-32 rounded-full bg-rose-200/20"
                variants={{
                  hidden: { scale: 0.8, opacity: 0, y: 20 },
                  visible: {
                    scale: 1,
                    opacity: 0.4,
                    y: 0,
                    transition: {
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "mirror",
                      delay: 0.3,
                    },
                  },
                }}
              />
              <motion.div
                className="absolute top-1/2 -right-10 w-40 h-40 rounded-full bg-green-200/15"
                variants={{
                  hidden: { scale: 0.5, opacity: 0 },
                  visible: {
                    scale: 1,
                    opacity: 0.3,
                    transition: {
                      duration: 2.5,
                      repeat: Infinity,
                      repeatType: "mirror",
                      delay: 0.7,
                    },
                  },
                }}
              />

              {/* Decorative elements */}
              <motion.div
                className="absolute top-10 left-16"
                variants={{
                  hidden: { y: -20, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 0.7,
                    transition: {
                      y: {
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "mirror",
                      },
                      opacity: { duration: 0.8 },
                    },
                  },
                }}
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 5L23.5 15.5H35L25.5 22L29 33L20 26.5L11 33L14.5 22L5 15.5H16.5L20 5Z"
                    fill="rgba(245, 158, 11, 0.2)"
                    stroke="rgba(245, 158, 11, 0.5)"
                  />
                </svg>
              </motion.div>

              <motion.div
                className="absolute bottom-16 right-16"
                variants={{
                  hidden: { scale: 0, opacity: 0, rotate: -30 },
                  visible: {
                    scale: 1,
                    opacity: 0.6,
                    rotate: 0,
                    transition: {
                      scale: { duration: 0.8 },
                      rotate: { duration: 1 },
                      y: {
                        duration: 2.5,
                        repeat: Infinity,
                        repeatType: "mirror",
                        delay: 0.2,
                      },
                    },
                  },
                }}
              >
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="5"
                    y="5"
                    width="20"
                    height="20"
                    rx="4"
                    fill="rgba(224, 36, 94, 0.2)"
                    stroke="rgba(224, 36, 94, 0.5)"
                  />
                </svg>
              </motion.div>

              <motion.div
                className="absolute top-1/3 left-10"
                variants={{
                  hidden: { scale: 0, opacity: 0, rotate: 30 },
                  visible: {
                    scale: 1,
                    opacity: 0.7,
                    rotate: 0,
                    transition: {
                      scale: { duration: 0.6 },
                      rotate: { duration: 0.8 },
                      y: {
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "mirror",
                        delay: 0.5,
                      },
                    },
                  },
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L12 4L20 12L12 20L4 12Z"
                    fill="rgba(22, 163, 74, 0.2)"
                    stroke="rgba(22, 163, 74, 0.5)"
                  />
                </svg>
              </motion.div>
            </motion.div>

            <div className="relative z-10">
              <DialogHeader className="p-4 sm:p-6 border-b border-white/30">
                <DialogTitle className="text-xl sm:text-2xl font-display pr-8">
                  {currentCategory?.name} Collection
                </DialogTitle>
                <DialogClose className="absolute right-3 top-3 sm:right-4 sm:top-4 rounded-full p-1.5 bg-white/30 backdrop-blur-sm opacity-70 hover:opacity-100 transition-opacity">
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </DialogClose>
              </DialogHeader>

              <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-h-[60vh] sm:max-h-[70vh] overflow-y-auto">
                {currentCategory?.products.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="relative backdrop-filter backdrop-blur-sm bg-white/50 border border-white/60 rounded-xl md:rounded-2xl p-4 md:p-5 shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                      boxShadow:
                        "0 8px 20px rgba(0, 0, 0, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.8)",
                    }}
                  >
                    <div className="relative w-full h-32 sm:h-40 mb-3 md:mb-4 overflow-hidden rounded-lg md:rounded-xl perspective">
                      <motion.div
                        className="w-full h-full"
                        whileHover={{ rotateY: 5, rotateX: -5, scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={200}
                          height={200}
                          className="object-contain w-full h-full"
                        />
                      </motion.div>
                    </div>

                    <h4 className="text-base sm:text-lg font-bold text-gray-900 font-display mb-1">
                      {product.name}
                    </h4>
                    <p className="text-gray-700 font-body text-xs sm:text-sm mb-2 line-clamp-2">
                      {product.description}
                    </p>
                    <p className="text-amber-600 font-medium mb-3 text-sm sm:text-base">
                      {product.price}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-2 sm:justify-between sm:items-center">
                      <Button
                        variant="outline"
                        size="sm"
                        className="relative overflow-hidden group bg-white/50 border-white/60 hover:bg-white/70 transition-all text-xs sm:text-sm"
                      >
                        <span className="relative z-10 flex items-center">
                          Details
                          <ChevronRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                        </span>
                      </Button>

                      <Button
                        size="sm"
                        className="relative overflow-hidden bg-gradient-to-br from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 border-0 shadow-sm hover:shadow transition-all text-xs sm:text-sm"
                      >
                        <span className="relative z-10 flex items-center">
                          Get Quote
                          <Plus className="ml-1 h-3 w-3" />
                        </span>
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
