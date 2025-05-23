"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Heart, ShoppingCart, AlertCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export interface Toast {
  id: string;
  type: "success" | "error" | "info" | "warning";
  title: string;
  message?: string;
  duration?: number;
  action?: "cart" | "wishlist" | "none";
  productImage?: string;
  productName?: string;
}

interface ToastNotificationProps {
  toast: Toast;
  onClose: (id: string) => void;
}

export function ToastNotification({ toast, onClose }: ToastNotificationProps) {
  const getIcon = () => {
    switch (toast.action) {
      case "cart":
        return <ShoppingCart className="h-5 w-5" />;
      case "wishlist":
        return <Heart className="h-5 w-5 fill-current" />;
      default:
        switch (toast.type) {
          case "success":
            return <Check className="h-5 w-5" />;
          case "error":
            return <AlertCircle className="h-5 w-5" />;
          case "warning":
            return <AlertCircle className="h-5 w-5" />;
          default:
            return <Info className="h-5 w-5" />;
        }
    }
  };

  const getColorClasses = () => {
    switch (toast.type) {
      case "success":
        return "bg-green-500/80 border-green-400/60 text-white shadow-green-500/25";
      case "error":
        return "bg-red-500/80 border-red-400/60 text-white shadow-red-500/25";
      case "warning":
        return "bg-amber-500/80 border-amber-400/60 text-white shadow-amber-500/25";
      default:
        return "bg-blue-500/80 border-blue-400/60 text-white shadow-blue-500/25";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      className={`relative backdrop-filter backdrop-blur-xl border rounded-2xl p-4 shadow-2xl max-w-md w-full ${getColorClasses()}`}
      style={{
        boxShadow:
          "0 20px 40px rgba(0, 0, 0, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.2)",
      }}
    >
      <div className="flex items-start space-x-3">
        {/* Icon */}
        <div className="flex-shrink-0 mt-0.5">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
          >
            {getIcon()}
          </motion.div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-white mb-1">
                {toast.title}
              </h4>
              {toast.message && (
                <p className="text-sm text-white/80 mb-2">{toast.message}</p>
              )}

              {/* Product Info */}
              {toast.productImage && toast.productName && (
                <div className="flex items-center space-x-2 mt-2">
                  <div className="w-8 h-8 rounded-lg overflow-hidden bg-white/20">
                    <Image
                      src={toast.productImage}
                      alt={toast.productName}
                      width={32}
                      height={32}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <span className="text-xs text-white/90 font-medium truncate">
                    {toast.productName}
                  </span>
                </div>
              )}
            </div>

            {/* Close Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onClose(toast.id)}
              className="w-6 h-6 p-0 rounded-full bg-white/20 hover:bg-white/30 text-white border-0 flex-shrink-0"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface ToastContainerProps {
  toasts: Toast[];
  onClose: (id: string) => void;
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastNotification key={toast.id} toast={toast} onClose={onClose} />
        ))}
      </AnimatePresence>
    </div>
  );
}
