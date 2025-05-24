"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  ArrowLeft,
  Calendar,
  User,
  CreditCard,
  Eye,
  Download,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";

interface OrderItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  category: string;
}

interface TrackingEvent {
  id: string;
  status: string;
  description: string;
  timestamp: string;
  location: string;
  isCompleted: boolean;
}

interface OrderDetails {
  orderNumber: string;
  status: "processing" | "shipped" | "in-transit" | "delivered" | "cancelled";
  orderDate: string;
  estimatedDelivery: string;
  actualDelivery?: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
  };
  paymentMethod: string;
  trackingEvents: TrackingEvent[];
  carrier: string;
  trackingNumber: string;
}

// Mock data for demonstration
const mockOrders: Record<string, OrderDetails> = {
  "ORD-1234567890": {
    orderNumber: "ORD-1234567890",
    status: "in-transit",
    orderDate: "2024-01-15",
    estimatedDelivery: "2024-01-22",
    items: [
      {
        id: "1",
        name: "Wireless Bluetooth Headphones",
        image: "/api/placeholder/80/80",
        price: 99.99,
        quantity: 1,
        category: "Electronics",
      },
      {
        id: "2",
        name: "USB-C Charging Cable",
        image: "/api/placeholder/80/80",
        price: 19.99,
        quantity: 2,
        category: "Accessories",
      },
    ],
    subtotal: 139.97,
    shipping: 9.99,
    tax: 11.2,
    total: 161.16,
    shippingAddress: {
      name: "John Doe",
      address: "123 Main Street, Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      phone: "+1 (555) 123-4567",
    },
    paymentMethod: "Visa ending in 4242",
    carrier: "FedEx",
    trackingNumber: "1234567890123456",
    trackingEvents: [
      {
        id: "1",
        status: "Order Placed",
        description:
          "Your order has been successfully placed and is being processed.",
        timestamp: "2024-01-15T10:30:00Z",
        location: "Online",
        isCompleted: true,
      },
      {
        id: "2",
        status: "Processing",
        description: "Your order is being prepared for shipment.",
        timestamp: "2024-01-16T14:20:00Z",
        location: "Warehouse - New Jersey",
        isCompleted: true,
      },
      {
        id: "3",
        status: "Shipped",
        description: "Your order has been shipped and is on its way.",
        timestamp: "2024-01-17T09:15:00Z",
        location: "FedEx Facility - Newark, NJ",
        isCompleted: true,
      },
      {
        id: "4",
        status: "In Transit",
        description:
          "Package is currently in transit to your delivery address.",
        timestamp: "2024-01-19T16:45:00Z",
        location: "FedEx Facility - Brooklyn, NY",
        isCompleted: true,
      },
      {
        id: "5",
        status: "Out for Delivery",
        description: "Package is out for delivery and will arrive today.",
        timestamp: "2024-01-22T08:00:00Z",
        location: "Local Delivery Facility",
        isCompleted: false,
      },
      {
        id: "6",
        status: "Delivered",
        description: "Package has been delivered successfully.",
        timestamp: "",
        location: "Your Address",
        isCompleted: false,
      },
    ],
  },
  "ORD-0987654321": {
    orderNumber: "ORD-0987654321",
    status: "delivered",
    orderDate: "2024-01-10",
    estimatedDelivery: "2024-01-17",
    actualDelivery: "2024-01-16",
    items: [
      {
        id: "3",
        name: "Smart Watch Series 8",
        image: "/api/placeholder/80/80",
        price: 299.99,
        quantity: 1,
        category: "Electronics",
      },
    ],
    subtotal: 299.99,
    shipping: 0,
    tax: 24.0,
    total: 323.99,
    shippingAddress: {
      name: "Jane Smith",
      address: "456 Oak Avenue",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90210",
      phone: "+1 (555) 987-6543",
    },
    paymentMethod: "Mastercard ending in 8888",
    carrier: "UPS",
    trackingNumber: "9876543210987654",
    trackingEvents: [
      {
        id: "1",
        status: "Order Placed",
        description:
          "Your order has been successfully placed and is being processed.",
        timestamp: "2024-01-10T11:00:00Z",
        location: "Online",
        isCompleted: true,
      },
      {
        id: "2",
        status: "Processing",
        description: "Your order is being prepared for shipment.",
        timestamp: "2024-01-11T13:30:00Z",
        location: "Warehouse - California",
        isCompleted: true,
      },
      {
        id: "3",
        status: "Shipped",
        description: "Your order has been shipped and is on its way.",
        timestamp: "2024-01-12T10:00:00Z",
        location: "UPS Facility - Los Angeles, CA",
        isCompleted: true,
      },
      {
        id: "4",
        status: "In Transit",
        description:
          "Package is currently in transit to your delivery address.",
        timestamp: "2024-01-15T14:20:00Z",
        location: "UPS Facility - Beverly Hills, CA",
        isCompleted: true,
      },
      {
        id: "5",
        status: "Out for Delivery",
        description: "Package is out for delivery and will arrive today.",
        timestamp: "2024-01-16T08:30:00Z",
        location: "Local Delivery Facility",
        isCompleted: true,
      },
      {
        id: "6",
        status: "Delivered",
        description:
          "Package has been delivered successfully to your front door.",
        timestamp: "2024-01-16T15:45:00Z",
        location: "456 Oak Avenue, Los Angeles, CA",
        isCompleted: true,
      },
    ],
  },
};

export default function TrackOrderPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<OrderDetails | null>(null);
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
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const order = mockOrders[searchQuery.toUpperCase()];
    if (order) {
      setSelectedOrder(order);
      setSearchError("");
    } else {
      setSearchError(
        "Order not found. Please check your order number and try again."
      );
      setSelectedOrder(null);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute bottom-20 -left-20 w-96 h-96 bg-gradient-to-br from-purple-200 to-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-200 to-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" />
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 backdrop-filter backdrop-blur-xl bg-white/20 border-b border-white/30 sticky top-0 shadow-lg"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button
                  variant="ghost"
                  size="sm"
                  className="backdrop-filter backdrop-blur-md bg-white/30 hover:bg-white/50 border border-white/40 shadow-lg transition-all duration-300"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 font-display">
                Track Your Order
              </h1>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {!selectedOrder ? (
          <SearchSection
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
            handleKeyPress={handleKeyPress}
            isSearching={isSearching}
            searchError={searchError}
          />
        ) : (
          <OrderDetailsSection
            order={selectedOrder}
            onBack={() => setSelectedOrder(null)}
            getStatusColor={getStatusColor}
            getStatusIcon={getStatusIcon}
          />
        )}
      </div>
    </div>
  );
}

function SearchSection({
  searchQuery,
  setSearchQuery,
  handleSearch,
  handleKeyPress,
  isSearching,
  searchError,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  isSearching: boolean;
  searchError: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <div className="backdrop-filter backdrop-blur-xl bg-white/20 border border-white/30 rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
            <Package className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2 font-display">
            Track Your Order
          </h2>
          <p className="text-gray-600">
            Enter your order number to get real-time tracking information
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <Label
              htmlFor="orderNumber"
              className="text-sm font-medium text-gray-700 mb-2 block"
            >
              Order Number
            </Label>
            <div className="relative">
              <Input
                id="orderNumber"
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
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
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
              className="p-4 bg-red-50 border border-red-200 rounded-xl"
            >
              <p className="text-red-600 text-sm">{searchError}</p>
            </motion.div>
          )}
        </div>

        <div className="mt-8 p-4 backdrop-filter backdrop-blur-md bg-blue-50/50 border border-blue-200/50 rounded-xl">
          <h3 className="font-semibold text-gray-900 mb-2">
            Sample Order Numbers:
          </h3>
          <div className="space-y-1 text-sm text-gray-600">
            <p>• ORD-1234567890 (In Transit)</p>
            <p>• ORD-0987654321 (Delivered)</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function OrderDetailsSection({
  order,
  onBack,
  getStatusColor,
  getStatusIcon,
}: {
  order: OrderDetails;
  onBack: () => void;
  getStatusColor: (status: string) => string;
  getStatusIcon: (status: string) => React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Order Header */}
      <div className="backdrop-filter backdrop-blur-xl bg-white/20 border border-white/30 rounded-3xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="backdrop-filter backdrop-blur-md bg-white/30 hover:bg-white/50 border border-white/40"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Search Another Order
          </Button>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="backdrop-filter backdrop-blur-md bg-white/40 border-white/50 hover:bg-white/60"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Receipt
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="backdrop-filter backdrop-blur-md bg-white/40 border-white/50 hover:bg-white/60"
            >
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2 font-display">
              Order #{order.orderNumber}
            </h2>
            <div
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                order.status
              )}`}
            >
              {getStatusIcon(order.status)}
              <span className="ml-2 capitalize">
                {order.status.replace("-", " ")}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="h-4 w-4 mr-2" />
              <span>
                Ordered: {new Date(order.orderDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Truck className="h-4 w-4 mr-2" />
              <span>
                {order.status === "delivered" && order.actualDelivery
                  ? `Delivered: ${new Date(
                      order.actualDelivery
                    ).toLocaleDateString()}`
                  : `Est. Delivery: ${new Date(
                      order.estimatedDelivery
                    ).toLocaleDateString()}`}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <Package className="h-4 w-4 mr-2" />
              <span>Carrier: {order.carrier}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                {order.trackingNumber}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tracking Timeline */}
        <div className="lg:col-span-2">
          <TrackingTimeline events={order.trackingEvents} />
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <OrderItemsList items={order.items} />
          <OrderSummaryCard order={order} />
          <ShippingAddressCard address={order.shippingAddress} />
        </div>
      </div>
    </motion.div>
  );
}

function TrackingTimeline({ events }: { events: TrackingEvent[] }) {
  return (
    <div className="backdrop-filter backdrop-blur-xl bg-white/20 border border-white/30 rounded-3xl p-6 shadow-2xl">
      <h3 className="text-xl font-bold text-gray-900 mb-6 font-display">
        Tracking Timeline
      </h3>
      <div className="space-y-6">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative flex items-start space-x-4"
          >
            {/* Timeline Line */}
            {index < events.length - 1 && (
              <div
                className={`absolute left-4 top-8 w-0.5 h-16 ${
                  event.isCompleted ? "bg-green-400" : "bg-gray-300"
                }`}
              />
            )}

            {/* Status Icon */}
            <div
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                event.isCompleted
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              {event.isCompleted ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <Clock className="h-4 w-4" />
              )}
            </div>

            {/* Event Details */}
            <div className="flex-1 min-w-0">
              <div className="backdrop-filter backdrop-blur-md bg-white/30 border border-white/40 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">
                    {event.status}
                  </h4>
                  {event.timestamp && (
                    <span className="text-xs text-gray-500">
                      {new Date(event.timestamp).toLocaleString()}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {event.description}
                </p>
                <div className="flex items-center text-xs text-gray-500">
                  <MapPin className="h-3 w-3 mr-1" />
                  {event.location}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function OrderItemsList({ items }: { items: OrderItem[] }) {
  return (
    <div className="backdrop-filter backdrop-blur-xl bg-white/20 border border-white/30 rounded-3xl p-6 shadow-2xl">
      <h3 className="text-lg font-bold text-gray-900 mb-4 font-display">
        Order Items
      </h3>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={item.image}
                alt={item.name}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 truncate">
                {item.name}
              </h4>
              <p className="text-sm text-gray-500">{item.category}</p>
              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">
                ${item.price.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrderSummaryCard({ order }: { order: OrderDetails }) {
  return (
    <div className="backdrop-filter backdrop-blur-xl bg-white/20 border border-white/30 rounded-3xl p-6 shadow-2xl">
      <h3 className="text-lg font-bold text-gray-900 mb-4 font-display">
        Order Summary
      </h3>
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-900">${order.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="text-gray-900">
            {order.shipping === 0 ? "Free" : `$${order.shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax</span>
          <span className="text-gray-900">${order.tax.toFixed(2)}</span>
        </div>
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between font-semibold">
            <span className="text-gray-900">Total</span>
            <span className="text-gray-900">${order.total.toFixed(2)}</span>
          </div>
        </div>
        <div className="mt-4 p-3 backdrop-filter backdrop-blur-md bg-blue-50/50 border border-blue-200/50 rounded-xl">
          <div className="flex items-center text-sm text-gray-600">
            <CreditCard className="h-4 w-4 mr-2" />
            <span>Paid with {order.paymentMethod}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShippingAddressCard({
  address,
}: {
  address: OrderDetails["shippingAddress"];
}) {
  return (
    <div className="backdrop-filter backdrop-blur-xl bg-white/20 border border-white/30 rounded-3xl p-6 shadow-2xl">
      <h3 className="text-lg font-bold text-gray-900 mb-4 font-display">
        Shipping Address
      </h3>
      <div className="space-y-3">
        <div className="flex items-center text-sm">
          <User className="h-4 w-4 mr-2 text-gray-500" />
          <span className="text-gray-900">{address.name}</span>
        </div>
        <div className="flex items-start text-sm">
          <MapPin className="h-4 w-4 mr-2 text-gray-500 mt-0.5" />
          <div className="text-gray-900">
            <p>{address.address}</p>
            <p>
              {address.city}, {address.state} {address.zipCode}
            </p>
          </div>
        </div>
        <div className="flex items-center text-sm">
          <Phone className="h-4 w-4 mr-2 text-gray-500" />
          <span className="text-gray-900">{address.phone}</span>
        </div>
      </div>
    </div>
  );
}
