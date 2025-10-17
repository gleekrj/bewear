import { productTable, productVariantTable } from "@/db/schema";

import ProductItem from "./product-item";

interface ProductListProps {
  title: string;
  products: (typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  })[];
}

const ProductList = ({ title, products }: ProductListProps) => {
  const validProducts = products.filter(
    (product) => product.variants && product.variants.length > 0,
  );

  if (validProducts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="mx-auto max-w-7xl px-5 md:px-0">
        <h3 className="text-lg font-semibold md:text-xl">{title}</h3>
      </div>
      <div className="flex w-full gap-4 overflow-x-auto px-5 md:mx-auto md:grid md:max-w-7xl md:grid-cols-4 md:gap-6 md:overflow-x-visible md:px-0 [&::-webkit-scrollbar]:hidden">
        {validProducts.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
