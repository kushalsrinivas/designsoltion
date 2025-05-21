import ProductCategory from "./ProductCategory";
import type { Product } from "./ProductCategory";

// Electronic Goods data
const electronicProducts: Product[] = [
  {
    id: "wireless-keyboard",
    name: "ErgoType Wireless Keyboard",
    description: "Ergonomic wireless keyboard with customizable keys",
    image: "/images/placeholder.svg?height=300&width=300",
    price: "$89.99",
  },
  {
    id: "office-tablet",
    name: "OfficePad Pro",
    description: "Tablet designed for business applications and note-taking",
    image: "/images/placeholder.svg?height=300&width=300",
    price: "$349.99",
  },
  {
    id: "document-camera",
    name: "Document Camera HD",
    description: "High-definition camera for document presentation",
    image: "/images/placeholder.svg?height=300&width=300",
    price: "$199.99",
  },
  {
    id: "smart-projector",
    name: "MiniProjector Plus",
    description: "Compact smart projector for meetings and presentations",
    image: "/images/placeholder.svg?height=300&width=300",
    price: "$299.99",
  },
];

export default function ElectronicGoods({ isInView }: { isInView: boolean }) {
  return (
    <ProductCategory
      products={electronicProducts}
      categoryName="Electronic Goods"
      isInView={isInView}
    />
  );
}
