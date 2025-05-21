import ProductCategory from "./ProductCategory";
import type { Product } from "./ProductCategory";

// Laser Printers data
const printerProducts: Product[] = [
  {
    id: "laser-color",
    name: "ColorJet X5000",
    description: "Professional color laser printer with duplex printing",
    image: "/images/placeholder.svg?height=300&width=300",
    price: "$499.99",
  },
  {
    id: "toner-cartridge",
    name: "Premium Toner Cartridge",
    description: "Long-lasting toner cartridges for all printer models",
    image: "/images/placeholder.svg?height=300&width=300",
    price: "From $79.99",
  },
  {
    id: "printer-maintenance",
    name: "Printer Maintenance Kit",
    description: "Complete maintenance kit for laser printers",
    image: "/images/placeholder.svg?height=300&width=300",
    price: "$129.99",
  },
  {
    id: "printer-paper",
    name: "Premium Laser Paper",
    description: "High-quality paper optimized for laser printers",
    image: "/images/placeholder.svg?height=300&width=300",
    price: "$19.99",
  },
];

export default function LaserPrinters({ isInView }: { isInView: boolean }) {
  return (
    <ProductCategory
      products={printerProducts}
      categoryName="Laser Printers"
      isInView={isInView}
    />
  );
}
