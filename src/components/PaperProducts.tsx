import ProductCategory from "./ProductCategory";
import type { Product } from "./ProductCategory";

// Paper Products data
const paperProducts: Product[] = [
  {
    id: "notebook-premium",
    name: "Premium Notebook",
    description: "High-quality hardcover notebook with premium paper",
    image: "/images/placeholder.svg?height=300&width=300",
    price: "$12.99",
  },
  {
    id: "stationery-set",
    name: "Executive Stationery Set",
    description: "Complete stationery set with letterhead and envelopes",
    image: "/images/placeholder.svg?height=300&width=300",
    price: "$24.99",
  },
  {
    id: "business-cards",
    name: "Custom Business Cards",
    description: "Premium business cards with custom finishes",
    image: "/images/placeholder.svg?height=300&width=300",
    price: "From $19.99",
  },
  {
    id: "brochures",
    name: "Tri-fold Brochures",
    description: "Professional brochures with high-quality printing",
    image: "/images/placeholder.svg?height=300&width=300",
    price: "From $29.99",
  },
];

export default function PaperProducts({ isInView }: { isInView: boolean }) {
  return (
    <ProductCategory
      products={paperProducts}
      categoryName="Paper Products"
      isInView={isInView}
    />
  );
}
