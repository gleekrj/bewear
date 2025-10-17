import Image from "next/image";
import Link from "next/link";

import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";
import { cn } from "@/lib/utils";

interface ProductItemProps {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };
  textContainerClassname?: string;
}

const ProductItem = ({ product, textContainerClassname }: ProductItemProps) => {
  const firstVariant = product.variants[0];

  if (!firstVariant) {
    return null;
  }

  return (
    <Link
      href={`/product-variant/${firstVariant.slug}`}
      className="flex min-w-[200px] flex-col gap-4 md:min-w-0"
    >
      <div className="relative aspect-square overflow-hidden rounded-3xl">
        <Image
          src={firstVariant.imageUrl}
          alt={firstVariant.name}
          fill
          sizes="(max-width: 768px) 200px, 25vw"
          className="object-cover transition-transform hover:scale-105"
        />
      </div>
      <div
        className={cn(
          "flex max-w-[200px] flex-col gap-1 md:max-w-full",
          textContainerClassname,
        )}
      >
        <p className="truncate text-sm font-medium">{product.name}</p>
        <p className="text-muted-foreground truncate text-xs font-medium">
          {product.description}
        </p>
        <p className="truncate text-sm font-semibold">
          {formatCentsToBRL(firstVariant.priceInCents)}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
