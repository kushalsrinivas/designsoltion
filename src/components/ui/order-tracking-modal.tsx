"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Search,
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

interface TrackingEvent {
  id: string;
  status: string;
  description: string;
  timestamp: string;
  location: string;
  isCompleted: boolean;
}

interface OrderSummary {
  orderNumber: string;
  status: "processing" | "shipped" | "in-transit" | "delivered" | "cancelled";
  orderDate: string;
  estimatedDelivery: string;
  actualDelivery?: string;
  carrier: string;
  trackingNumber: string;
  recentEvent: TrackingEvent;
}

// Mock data for demonstration
const mockOrderSummaries: Record<string, OrderSummary> = {
  "ORD-1234567890": {
    orderNumber: "ORD-1234567890",
    status: "in-transit",
    orderDate: "2024-01-15",
    estimatedDelivery: "2024-01-22",
    carrier: "FedEx",
    trackingNumber: "1234567890123456",
    recentEvent: {
      id: "4",
      status: "In Transit",
      description: "Package is currently in transit to your delivery address.",
      timestamp: "2024-01-19T16:45:00Z",
      location: "FedEx Facility - Brooklyn, NY",
      isCompleted: true,
    },
  },
  "ORD-0987654321": {
    orderNumber: "ORD-0987654321",
    status: "delivered",
    orderDate: "2024-01-10",
    estimatedDelivery: "2024-01-17",
    actualDelivery: "2024-01-16",
    carrier: "UPS",
    trackingNumber: "9876543210987654",
    recentEvent: {
      id: "6",
      status: "Delivered",
      description:
        "Package has been delivered successfully to your front door.",
      timestamp: "2024-01-16T15:45:00Z",
      location: "456 Oak Avenue, Los Angeles, CA",
      isCompleted: true,
    },
  },
};

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OrderTrackingModal({
  isOpen,
  onClose,
}: OrderTrackingModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [orderSummary, setOrderSummary] = useState<OrderSummary | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchError("Please enter an order number");
      return;
    }

    setIsSearching(true);
    setSearchError("");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    const order = mockOrderSummaries[searchQuery.toUpperCase()];
    if (order) {
      setOrderSummary(order);
      setSearchError("");
    } else {
      setSearchError("Order not found. Please check your order number.");
      setOrderSummary(null);
    }

    setIsSearching(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "text-yellow-600 bg-yellow-100";
      case "shipped":
        return "text-blue-600 bg-blue-100";
      case "in-transit":
        return "text-purple-600 bg-purple-100";
      case "delivered":
        return "text-green-600 bg-green-100";
      case "cancelled":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processing":
        return <Clock className="h-4 w-4" />;
      case "shipped":
      case "in-transit":
        return <Truck className="h-4 w-4" />;
      case "delivered":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const handleClose = () => {
    setSearchQuery("");
    setOrderSummary(null);
    setSearchError("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg z-50"
          >
            <div className="backdrop-filter backdrop-blur-xl bg-white/20 border border-white/30 rounded-3xl shadow-2xl h-full md:h-auto overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/20">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Package className="h-4 w-4 text-white" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900 font-display">
                    Track Order
                  </h2>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  className="backdrop-filter backdrop-blur-md bg-white/30 hover:bg-white/50 border border-white/40"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(100vh-8rem)] md:max-h-96">
                <div className="space-y-4">
                  <div>
                    <Label
                      htmlFor="modalOrderNumber"
                      className="text-sm font-medium text-gray-700 mb-2 block"
                    >
                      Order Number
                    </Label>
                    <div className="relative">
                      <Input
                        id="modalOrderNumber"
                        type="text"
                        placeholder="e.g., ORD-1234567890"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="backdrop-filter backdrop-blur-md bg-white/40 border-white/50 focus:border-blue-400 focus:ring-blue-400/20 text-gray-900 placeholder-gray-500 pr-12"
                        disabled={isSearching}
                      />
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  <Button
                    onClick={handleSearch}
                    disabled={isSearching}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-2 rounded-xl shadow-lg transition-all duration-300"
                  >
                    {isSearching ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" />
                        Track Order
                      </>
                    )}
                  </Button>

                  {searchError && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-red-50 border border-red-200 rounded-xl"
                    >
                      <p className="text-red-600 text-sm">{searchError}</p>
                    </motion.div>
                  )}

                  {orderSummary && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <div className="backdrop-filter backdrop-blur-md bg-white/30 border border-white/40 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-gray-900 text-sm">
                            Order #{orderSummary.orderNumber}
                          </h3>
                          <div
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              orderSummary.status
                            )}`}
                          >
                            {getStatusIcon(orderSummary.status)}
                            <span className="ml-1 capitalize">
                              {orderSummary.status.replace("-", " ")}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex justify-between">
                            <span>Order Date:</span>
                            <span>
                              {new Date(
                                orderSummary.orderDate
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>
                              {orderSummary.status === "delivered" &&
                              orderSummary.actualDelivery
                                ? "Delivered:"
                                : "Est. Delivery:"}
                            </span>
                            <span>
                              {orderSummary.status === "delivered" &&
                              orderSummary.actualDelivery
                                ? new Date(
                                    orderSummary.actualDelivery
                                  ).toLocaleDateString()
                                : new Date(
                                    orderSummary.estimatedDelivery
                                  ).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Carrier:</span>
                            <span>{orderSummary.carrier}</span>
                          </div>
                        </div>

                        <div className="mt-4 p-3 backdrop-filter backdrop-blur-md bg-blue-50/50 border border-blue-200/50 rounded-lg">
                          <h4 className="font-medium text-gray-900 mb-1 text-sm">
                            Latest Update
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">
                            {orderSummary.recentEvent.description}
                          </p>
                          <div className="flex items-center text-xs text-gray-500">
                            <MapPin className="h-3 w-3 mr-1" />
                            {orderSummary.recentEvent.location}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(
                              orderSummary.recentEvent.timestamp
                            ).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <Link href="/track-order" onClick={handleClose}>
                        <Button
                          variant="outline"
                          className="w-full backdrop-filter backdrop-blur-md bg-white/40 border-white/50 hover:bg-white/60"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Full Tracking Details
                        </Button>
                      </Link>
                    </motion.div>
                  )}

                  <div className="p-3 backdrop-filter backdrop-blur-md bg-blue-50/50 border border-blue-200/50 rounded-xl">
                    <h4 className="font-medium text-gray-900 mb-1 text-sm">
                      Sample Orders:
                    </h4>
                    <div className="space-y-1 text-xs text-gray-600">
                      <p>• ORD-1234567890 (In Transit)</p>
                      <p>• ORD-0987654321 (Delivered)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Hook for using the modal
export function useOrderTrackingModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return {
    isOpen,
    openModal,
    closeModal,
    OrderTrackingModal: (
      props: Omit<OrderTrackingModalProps, "isOpen" | "onClose">
    ) => <OrderTrackingModal {...props} isOpen={isOpen} onClose={closeModal} />,
  };
}
