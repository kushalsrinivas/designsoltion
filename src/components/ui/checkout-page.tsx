"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CreditCard,
  MapPin,
  Package,
  CheckCircle,
  Wallet,
  Smartphone,
  Tag,
  Clock,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CartItem } from "@/components/ui/cart-sidebar";
import Image from "next/image";

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

interface CheckoutPageProps {
  items: CartItem[];
  onBack: () => void;
  onOrderComplete: (orderData: OrderData) => void;
}

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
  type: "card" | "upi" | "wallet";
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  upiId?: string;
  walletType?: string;
}

const steps = [
  { id: 1, title: "Delivery Details", icon: MapPin },
  { id: 2, title: "Payment Method", icon: CreditCard },
  { id: 3, title: "Order Summary", icon: Package },
  { id: 4, title: "Order Confirmation", icon: CheckCircle },
];

export function CheckoutPage({
  items,
  onBack,
  onOrderComplete,
}: CheckoutPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [deliveryDetails, setDeliveryDetails] = useState<DeliveryDetails>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
    type: "card",
  });
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discount: number;
  } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 50 ? 0 : 5.99;
  const discount = appliedCoupon
    ? (subtotal * appliedCoupon.discount) / 100
    : 0;
  const total = subtotal + shipping - discount;

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleApplyCoupon = () => {
    // Mock coupon validation
    const validCoupons = {
      SAVE10: { discount: 10 },
      WELCOME20: { discount: 20 },
      FIRST15: { discount: 15 },
    };

    if (validCoupons[couponCode as keyof typeof validCoupons]) {
      setAppliedCoupon({
        code: couponCode,
        discount:
          validCoupons[couponCode as keyof typeof validCoupons].discount,
      });
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const orderData = {
      orderNumber: `ORD-${Date.now()}`,
      items,
      deliveryDetails,
      paymentMethod,
      subtotal,
      shipping,
      discount,
      total,
      estimatedDelivery: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ).toLocaleDateString(),
    };

    setOrderNumber(orderData.orderNumber);
    setIsProcessing(false);
    setCurrentStep(4);
    onOrderComplete(orderData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-rose-50 to-amber-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute bottom-20 -left-20 w-96 h-96 bg-gradient-to-br from-green-200 to-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
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
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="backdrop-filter backdrop-blur-md bg-white/30 hover:bg-white/50 border border-white/40 shadow-lg transition-all duration-300"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Cart
              </Button>
              <h1 className="text-2xl font-bold text-gray-900 font-display">
                Checkout
              </h1>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Progress Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative z-10 py-6"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="backdrop-filter backdrop-blur-xl bg-white/25 border border-white/40 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                        currentStep >= step.id
                          ? "bg-gradient-to-r from-green-400 to-green-500 text-white shadow-lg"
                          : "bg-white/40 text-gray-500"
                      }`}
                    >
                      <step.icon className="h-5 w-5" />
                    </div>
                    <div className="hidden sm:block">
                      <p
                        className={`text-sm font-medium ${
                          currentStep >= step.id
                            ? "text-green-600"
                            : "text-gray-500"
                        }`}
                      >
                        Step {step.id}
                      </p>
                      <p
                        className={`text-xs ${
                          currentStep >= step.id
                            ? "text-gray-900"
                            : "text-gray-400"
                        }`}
                      >
                        {step.title}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`hidden sm:block w-16 h-0.5 mx-4 transition-all duration-300 ${
                        currentStep > step.id ? "bg-green-400" : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 pb-20"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Step Content */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <DeliveryDetailsStep
                    key="delivery"
                    details={deliveryDetails}
                    onUpdate={setDeliveryDetails}
                    onNext={handleNextStep}
                  />
                )}
                {currentStep === 2 && (
                  <PaymentMethodStep
                    key="payment"
                    method={paymentMethod}
                    onUpdate={setPaymentMethod}
                    onNext={handleNextStep}
                    onPrev={handlePrevStep}
                  />
                )}
                {currentStep === 3 && (
                  <OrderSummaryStep
                    key="summary"
                    items={items}
                    deliveryDetails={deliveryDetails}
                    paymentMethod={paymentMethod}
                    couponCode={couponCode}
                    appliedCoupon={appliedCoupon}
                    onCouponChange={setCouponCode}
                    onApplyCoupon={handleApplyCoupon}
                    onPlaceOrder={handlePlaceOrder}
                    onPrev={handlePrevStep}
                    isProcessing={isProcessing}
                  />
                )}
                {currentStep === 4 && (
                  <OrderConfirmationStep
                    key="confirmation"
                    orderNumber={orderNumber}
                    items={items}
                    total={total}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <OrderSummarySidebar
                items={items}
                subtotal={subtotal}
                shipping={shipping}
                discount={discount}
                total={total}
                appliedCoupon={appliedCoupon}
              />
            </div>
          </div>
        </div>
      </motion.main>
    </div>
  );
}

// Step Components
function DeliveryDetailsStep({
  details,
  onUpdate,
  onNext,
}: {
  details: DeliveryDetails;
  onUpdate: (details: DeliveryDetails) => void;
  onNext: () => void;
}) {
  const handleInputChange = (field: keyof DeliveryDetails, value: string) => {
    onUpdate({ ...details, [field]: value });
  };

  const isValid =
    details.firstName &&
    details.lastName &&
    details.email &&
    details.phone &&
    details.address &&
    details.city &&
    details.state &&
    details.zipCode;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="backdrop-filter backdrop-blur-xl bg-white/25 border border-white/40 rounded-3xl p-8 shadow-2xl"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400/80 to-blue-500/80 flex items-center justify-center">
          <MapPin className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Delivery Details</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="firstName" className="text-gray-700 font-medium">
            First Name
          </Label>
          <Input
            id="firstName"
            value={details.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            className="mt-1 backdrop-filter backdrop-blur-md bg-white/40 border-white/50"
            placeholder="John"
          />
        </div>
        <div>
          <Label htmlFor="lastName" className="text-gray-700 font-medium">
            Last Name
          </Label>
          <Input
            id="lastName"
            value={details.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            className="mt-1 backdrop-filter backdrop-blur-md bg-white/40 border-white/50"
            placeholder="Doe"
          />
        </div>
        <div>
          <Label htmlFor="email" className="text-gray-700 font-medium">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={details.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="mt-1 backdrop-filter backdrop-blur-md bg-white/40 border-white/50"
            placeholder="john@example.com"
          />
        </div>
        <div>
          <Label htmlFor="phone" className="text-gray-700 font-medium">
            Phone
          </Label>
          <Input
            id="phone"
            value={details.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className="mt-1 backdrop-filter backdrop-blur-md bg-white/40 border-white/50"
            placeholder="+1 (555) 123-4567"
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="address" className="text-gray-700 font-medium">
            Address
          </Label>
          <Input
            id="address"
            value={details.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            className="mt-1 backdrop-filter backdrop-blur-md bg-white/40 border-white/50"
            placeholder="123 Main Street"
          />
        </div>
        <div>
          <Label htmlFor="city" className="text-gray-700 font-medium">
            City
          </Label>
          <Input
            id="city"
            value={details.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
            className="mt-1 backdrop-filter backdrop-blur-md bg-white/40 border-white/50"
            placeholder="New York"
          />
        </div>
        <div>
          <Label htmlFor="state" className="text-gray-700 font-medium">
            State
          </Label>
          <Input
            id="state"
            value={details.state}
            onChange={(e) => handleInputChange("state", e.target.value)}
            className="mt-1 backdrop-filter backdrop-blur-md bg-white/40 border-white/50"
            placeholder="NY"
          />
        </div>
        <div>
          <Label htmlFor="zipCode" className="text-gray-700 font-medium">
            ZIP Code
          </Label>
          <Input
            id="zipCode"
            value={details.zipCode}
            onChange={(e) => handleInputChange("zipCode", e.target.value)}
            className="mt-1 backdrop-filter backdrop-blur-md bg-white/40 border-white/50"
            placeholder="10001"
          />
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <Button
          onClick={onNext}
          disabled={!isValid}
          className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 border-0 shadow-lg text-white px-8 py-3 rounded-2xl"
        >
          Continue to Payment
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
}

function PaymentMethodStep({
  method,
  onUpdate,
  onNext,
  onPrev,
}: {
  method: PaymentMethod;
  onUpdate: (method: PaymentMethod) => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="backdrop-filter backdrop-blur-xl bg-white/25 border border-white/40 rounded-3xl p-8 shadow-2xl"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400/80 to-green-500/80 flex items-center justify-center">
          <CreditCard className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Payment Method</h2>
      </div>

      <div className="space-y-4 mb-6">
        {/* Payment Method Tabs */}
        <div className="flex space-x-2 backdrop-filter backdrop-blur-md bg-white/30 rounded-2xl p-2">
          <button
            type="button"
            onClick={() => onUpdate({ ...method, type: "card" })}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl transition-all duration-300 ${
              method.type === "card"
                ? "bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-lg"
                : "text-gray-600 hover:bg-white/40"
            }`}
          >
            <CreditCard className="h-4 w-4" />
            <span>Credit Card</span>
          </button>
          <button
            type="button"
            onClick={() => onUpdate({ ...method, type: "upi" })}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl transition-all duration-300 ${
              method.type === "upi"
                ? "bg-gradient-to-r from-green-400 to-green-500 text-white shadow-lg"
                : "text-gray-600 hover:bg-white/40"
            }`}
          >
            <Smartphone className="h-4 w-4" />
            <span>UPI</span>
          </button>
          <button
            type="button"
            onClick={() => onUpdate({ ...method, type: "wallet" })}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl transition-all duration-300 ${
              method.type === "wallet"
                ? "bg-gradient-to-r from-purple-400 to-purple-500 text-white shadow-lg"
                : "text-gray-600 hover:bg-white/40"
            }`}
          >
            <Wallet className="h-4 w-4" />
            <span>Wallet</span>
          </button>
        </div>

        {/* Payment Form */}
        {method.type === "card" && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="cardNumber" className="text-gray-700 font-medium">
                Card Number
              </Label>
              <Input
                id="cardNumber"
                value={method.cardNumber || ""}
                onChange={(e) =>
                  onUpdate({ ...method, cardNumber: e.target.value })
                }
                className="mt-1 backdrop-filter backdrop-blur-md bg-white/40 border-white/50"
                placeholder="1234 5678 9012 3456"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="expiryDate"
                  className="text-gray-700 font-medium"
                >
                  Expiry Date
                </Label>
                <Input
                  id="expiryDate"
                  value={method.expiryDate || ""}
                  onChange={(e) =>
                    onUpdate({ ...method, expiryDate: e.target.value })
                  }
                  className="mt-1 backdrop-filter backdrop-blur-md bg-white/40 border-white/50"
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <Label htmlFor="cvv" className="text-gray-700 font-medium">
                  CVV
                </Label>
                <Input
                  id="cvv"
                  value={method.cvv || ""}
                  onChange={(e) => onUpdate({ ...method, cvv: e.target.value })}
                  className="mt-1 backdrop-filter backdrop-blur-md bg-white/40 border-white/50"
                  placeholder="123"
                />
              </div>
            </div>
          </div>
        )}

        {method.type === "upi" && (
          <div>
            <Label htmlFor="upiId" className="text-gray-700 font-medium">
              UPI ID
            </Label>
            <Input
              id="upiId"
              value={method.upiId || ""}
              onChange={(e) => onUpdate({ ...method, upiId: e.target.value })}
              className="mt-1 backdrop-filter backdrop-blur-md bg-white/40 border-white/50"
              placeholder="user@paytm"
            />
          </div>
        )}

        {method.type === "wallet" && (
          <div className="space-y-3">
            <Label className="text-gray-700 font-medium">Select Wallet</Label>
            <div className="grid grid-cols-2 gap-3">
              {["PayPal", "Apple Pay", "Google Pay", "Amazon Pay"].map(
                (wallet) => (
                  <button
                    type="button"
                    key={wallet}
                    onClick={() => onUpdate({ ...method, walletType: wallet })}
                    className={`p-4 rounded-xl border transition-all duration-300 ${
                      method.walletType === wallet
                        ? "bg-gradient-to-r from-purple-400 to-purple-500 text-white border-purple-300 shadow-lg"
                        : "backdrop-filter backdrop-blur-md bg-white/40 border-white/50 text-gray-700 hover:bg-white/60"
                    }`}
                  >
                    {wallet}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <Button
          onClick={onPrev}
          variant="outline"
          className="backdrop-filter backdrop-blur-md bg-white/40 border-white/50 hover:bg-white/60 px-8 py-3 rounded-2xl"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={onNext}
          className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 border-0 shadow-lg text-white px-8 py-3 rounded-2xl"
        >
          Review Order
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
}

function OrderSummaryStep({
  items,
  couponCode,
  appliedCoupon,
  onCouponChange,
  onApplyCoupon,
  onPlaceOrder,
  onPrev,
  isProcessing,
}: {
  items: CartItem[];
  deliveryDetails: DeliveryDetails;
  paymentMethod: PaymentMethod;
  couponCode: string;
  appliedCoupon: { code: string; discount: number } | null;
  onCouponChange: (code: string) => void;
  onApplyCoupon: () => void;
  onPlaceOrder: () => void;
  onPrev: () => void;
  isProcessing: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {/* Order Items */}
      <div className="backdrop-filter backdrop-blur-xl bg-white/25 border border-white/40 rounded-3xl p-8 shadow-2xl">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-400/80 to-amber-500/80 flex items-center justify-center">
            <Package className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Order Summary</h2>
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center space-x-4 p-4 backdrop-filter backdrop-blur-md bg-white/30 border border-white/40 rounded-2xl"
            >
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-white/20">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{item.name}</h4>
                <p className="text-sm text-gray-600">
                  Quantity: {item.quantity}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Coupon Code */}
      <div className="backdrop-filter backdrop-blur-xl bg-white/25 border border-white/40 rounded-3xl p-6 shadow-2xl">
        <div className="flex items-center space-x-3 mb-4">
          <Tag className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Coupon Code</h3>
        </div>
        <div className="flex space-x-3">
          <Input
            value={couponCode}
            onChange={(e) => onCouponChange(e.target.value)}
            placeholder="Enter coupon code"
            className="flex-1 backdrop-filter backdrop-blur-md bg-white/40 border-white/50"
          />
          <Button
            onClick={onApplyCoupon}
            variant="outline"
            className="backdrop-filter backdrop-blur-md bg-white/40 border-white/50 hover:bg-white/60"
          >
            Apply
          </Button>
        </div>
        {appliedCoupon && (
          <p className="text-sm text-green-600 mt-2">
            Coupon &quot;{appliedCoupon.code}&quot; applied!{" "}
            {appliedCoupon.discount}% off
          </p>
        )}
      </div>

      <div className="flex justify-between">
        <Button
          onClick={onPrev}
          variant="outline"
          className="backdrop-filter backdrop-blur-md bg-white/40 border-white/50 hover:bg-white/60 px-8 py-3 rounded-2xl"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={onPlaceOrder}
          disabled={isProcessing}
          className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 border-0 shadow-lg text-white px-8 py-3 rounded-2xl"
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Processing...
            </>
          ) : (
            <>
              <CheckCircle className="h-4 w-4 mr-2" />
              Place Order
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
}

function OrderConfirmationStep({
  orderNumber,
  items,
  total,
}: {
  orderNumber: string;
  items: CartItem[];
  total: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="backdrop-filter backdrop-blur-xl bg-white/25 border border-white/40 rounded-3xl p-8 shadow-2xl text-center"
    >
      <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-400 to-green-500 flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="h-10 w-10 text-white" />
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Order Confirmed!
      </h2>
      <p className="text-gray-600 mb-6">
        Thank you for your order. We&apos;ll send you a confirmation email
        shortly.
      </p>

      <div className="backdrop-filter backdrop-blur-md bg-white/30 border border-white/40 rounded-2xl p-6 mb-6">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Order Number</p>
            <p className="font-bold text-gray-900">{orderNumber}</p>
          </div>
          <div>
            <p className="text-gray-600">Total Amount</p>
            <p className="font-bold text-gray-900">${total.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-gray-600">Items</p>
            <p className="font-bold text-gray-900">{items.length} products</p>
          </div>
          <div>
            <p className="text-gray-600">Estimated Delivery</p>
            <p className="font-bold text-gray-900">5-7 business days</p>
          </div>
        </div>
      </div>

      <div className="flex space-x-4 justify-center">
        <Button
          variant="outline"
          className="backdrop-filter backdrop-blur-md bg-white/40 border-white/50 hover:bg-white/60"
        >
          <Clock className="h-4 w-4 mr-2" />
          Track Order
        </Button>
        <Button className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 border-0 shadow-lg text-white">
          <Truck className="h-4 w-4 mr-2" />
          Continue Shopping
        </Button>
      </div>
    </motion.div>
  );
}

function OrderSummarySidebar({
  items,
  subtotal,
  shipping,
  discount,
  total,
  appliedCoupon,
}: {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  appliedCoupon: { code: string; discount: number } | null;
}) {
  return (
    <div className="backdrop-filter backdrop-blur-xl bg-white/25 border border-white/40 rounded-3xl p-6 shadow-2xl sticky top-24">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal ({items.length} items)</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">
            {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              Discount ({appliedCoupon?.code})
            </span>
            <span className="font-medium text-green-600">
              -${discount.toFixed(2)}
            </span>
          </div>
        )}
        {shipping > 0 && (
          <p className="text-xs text-gray-500">
            Free shipping on orders over $50
          </p>
        )}
      </div>

      <div className="border-t border-white/30 pt-3">
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
