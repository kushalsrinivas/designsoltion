"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, Plus, Minus, Trash2, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  brand?: string;
}

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export function CartSidebar({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartSidebarProps) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-filter backdrop-blur-sm z-40"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md backdrop-filter backdrop-blur-xl bg-white/25 border-l border-white/40 shadow-2xl z-50"
            style={{
              boxShadow:
                "-20px 0 40px rgba(0, 0, 0, 0.15), inset 1px 0 1px rgba(255, 255, 255, 0.2)",
            }}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/30">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-400/80 to-amber-500/80 flex items-center justify-center">
                    <ShoppingCart className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Shopping Cart
                    </h2>
                    <p className="text-sm text-gray-600">
                      {items.length} items
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="w-10 h-10 p-0 rounded-full backdrop-filter backdrop-blur-md bg-white/40 hover:bg-white/60 border border-white/50"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-gray-200/50 flex items-center justify-center mx-auto mb-4">
                      <ShoppingCart className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Your cart is empty
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Add some products to get started
                    </p>
                    <Button
                      onClick={onClose}
                      className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 border-0 shadow-lg text-white"
                    >
                      Continue Shopping
                    </Button>
                  </motion.div>
                ) : (
                  <AnimatePresence>
                    {items.map((item, index) => (
                      <CartItemCard
                        key={item.id}
                        item={item}
                        index={index}
                        onUpdateQuantity={onUpdateQuantity}
                        onRemove={onRemoveItem}
                      />
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t border-white/30 p-6 space-y-4">
                  {/* Order Summary */}
                  <div className="backdrop-filter backdrop-blur-md bg-white/30 border border-white/40 rounded-2xl p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">
                        {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-xs text-gray-500">
                        Free shipping on orders over $50
                      </p>
                    )}
                    <div className="border-t border-white/30 pt-2 flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Button
                    onClick={onCheckout}
                    className="w-full bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 border-0 shadow-lg text-white py-3 text-lg rounded-2xl"
                  >
                    <CreditCard className="h-5 w-5 mr-2" />
                    Proceed to Checkout
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

interface CartItemCardProps {
  item: CartItem;
  index: number;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

function CartItemCard({
  item,
  index,
  onUpdateQuantity,
  onRemove,
}: CartItemCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ delay: index * 0.05 }}
      className="backdrop-filter backdrop-blur-md bg-white/30 border border-white/40 rounded-2xl p-4 shadow-lg"
    >
      <div className="flex items-center space-x-4">
        {/* Product Image */}
        <div className="w-16 h-16 rounded-xl overflow-hidden bg-white/20 flex-shrink-0">
          <Image
            src={item.image}
            alt={item.name}
            width={64}
            height={64}
            className="object-contain w-full h-full"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 truncate">{item.name}</h4>
          {item.brand && <p className="text-sm text-gray-600">{item.brand}</p>}
          <p className="text-lg font-bold text-gray-900">
            ${item.price.toFixed(2)}
          </p>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))
            }
            className="w-8 h-8 p-0 rounded-full backdrop-filter backdrop-blur-md bg-white/40 hover:bg-white/60 border border-white/50"
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-8 text-center font-medium">{item.quantity}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="w-8 h-8 p-0 rounded-full backdrop-filter backdrop-blur-md bg-white/40 hover:bg-white/60 border border-white/50"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>

        {/* Remove Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(item.id)}
          className="w-8 h-8 p-0 rounded-full backdrop-filter backdrop-blur-md bg-red-500/20 hover:bg-red-500/40 border border-red-400/50 text-red-600"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </motion.div>
  );
}
