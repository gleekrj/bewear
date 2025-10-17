import BannerWithButton from "@/components/common/banner-with-button";
import CategorySelector from "@/components/common/category-selector";
import Footer from "@/components/common/footer";
import ProductList from "@/components/common/product-list";
import { categoryTable, productTable, productVariantTable } from "@/db/schema";

interface HomeMobileProps {
  products: (typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  })[];
  newlyCreatedProducts: (typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  })[];
  categories: (typeof categoryTable.$inferSelect)[];
}

const HomeMobile = ({
  products,
  newlyCreatedProducts,
  categories,
}: HomeMobileProps) => {
  return (
    <div className="space-y-6">
      {/* Banner 01 */}
      <div className="px-5">
        <BannerWithButton
          src="/banner_01_mobile.png"
          alt="Leve a vida com estilo"
          sizes="100vw"
          className="h-auto w-full rounded-3xl"
          priority
          buttonPosition={{
            top: "calc(75% + 15px)",
            left: "50%",
            width: "140px",
            height: "45px",
          }}
        />
      </div>

      {/* Mais Vendidos */}
      <ProductList title="Mais Vendidos" products={products} />

      {/* Categorias */}
      <div className="px-5">
        <CategorySelector categories={categories} />
      </div>

      {/* Banner 02 */}
      <div className="px-5">
        <BannerWithButton
          src="/banner_02_mobile.png"
          alt="Leve a vida com estilo"
          sizes="100vw"
          className="h-auto w-full rounded-3xl"
          buttonPosition={{
            top: "calc(75% + 15px)",
            left: "50%",
            width: "140px",
            height: "45px",
          }}
        />
      </div>

      {/* Novos Produtos */}
      <ProductList title="Novos Produtos" products={newlyCreatedProducts} />

      <Footer />
    </div>
  );
};

export default HomeMobile;
