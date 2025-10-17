import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";

import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import ProductList from "@/components/common/product-list";
import { db } from "@/db";
import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";

import ProductActions from "./components/product-actions";
import VariantSelector from "./components/variant-selector";

interface ProductVariantPageProps {
  params: Promise<{ slug: string }>;
}

const ProductVariantPage = async ({ params }: ProductVariantPageProps) => {
  const { slug } = await params;
  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.slug, slug),
    with: {
      product: {
        with: {
          variants: true,
        },
      },
    },
  });

  if (!productVariant) {
    return notFound();
  }

  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant.product.categoryId),
    with: { variants: true },
  });

  return (
    <>
      <Header />
      <div className="flex flex-col space-y-6 md:space-y-12">
        <div className="md:mx-auto md:max-w-7xl md:px-0">
          <div className="md:grid md:grid-cols-2 md:gap-12">
            <div className="relative aspect-square overflow-hidden md:aspect-auto md:h-[600px] md:rounded-3xl">
              <Image
                src={productVariant.imageUrl}
                alt={productVariant.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col space-y-6 md:py-8">
              <div className="px-5 md:px-0">
                <VariantSelector
                  selectedVariantSlug={productVariant.slug}
                  variants={productVariant.product.variants}
                />
              </div>
              <div className="px-5 md:px-0">
                <h2 className="text-lg font-semibold md:text-2xl">
                  {productVariant.product.name}
                </h2>
                <h3 className="text-muted-foreground text-sm md:text-base">
                  {productVariant.name}
                </h3>
                <h3 className="mt-2 text-lg font-semibold md:text-2xl">
                  {formatCentsToBRL(productVariant.priceInCents)}
                </h3>
              </div>
              <ProductActions productVariantId={productVariant.id} />
              <div className="px-5 md:px-0">
                <h4 className="mb-2 font-semibold md:text-lg">Descrição</h4>
                <p className="text-muted-foreground text-sm md:text-base">
                  {productVariant.product.description}
                </p>
              </div>
            </div>
          </div>
        </div>
        <ProductList title="Talvez você goste" products={likelyProducts} />
        <Footer />
      </div>
    </>
  );
};

export default ProductVariantPage;
