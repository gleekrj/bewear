"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import BannerWithButton from "@/components/common/banner-with-button";
import Footer from "@/components/common/footer";
import { categoryTable, productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";

import { Button } from "../ui/button";

interface HomeDesktopProps {
  products: (typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  })[];
  newlyCreatedProducts: (typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  })[];
  categories: (typeof categoryTable.$inferSelect)[];
}

const HomeDesktop = ({
  products,
  newlyCreatedProducts,
  categories,
}: HomeDesktopProps) => {
  const [currentPageBestsellers, setCurrentPageBestsellers] = useState(0);
  const [currentPageNewProducts, setCurrentPageNewProducts] = useState(0);

  const productsPerPage = 4;
  const totalPagesBestsellers = Math.ceil(products.length / productsPerPage);
  const totalPagesNewProducts = Math.ceil(
    newlyCreatedProducts.length / productsPerPage,
  );

  const getCurrentProducts = (
    productList: typeof products,
    currentPage: number,
  ) => {
    const startIndex = currentPage * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return productList.slice(startIndex, endIndex);
  };

  const handlePreviousBestsellers = () => {
    setCurrentPageBestsellers((prev) => Math.max(0, prev - 1));
  };

  const handleNextBestsellers = () => {
    setCurrentPageBestsellers((prev) =>
      Math.min(totalPagesBestsellers - 1, prev + 1),
    );
  };

  const handlePreviousNewProducts = () => {
    setCurrentPageNewProducts((prev) => Math.max(0, prev - 1));
  };

  const handleNextNewProducts = () => {
    setCurrentPageNewProducts((prev) =>
      Math.min(totalPagesNewProducts - 1, prev + 1),
    );
  };

  return (
    <div className="space-y-12">
      {/* Menu de Categorias */}
      <div className="mx-auto max-w-7xl">
        <nav className="flex items-center justify-center gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="hover:text-primary text-sm font-medium text-gray-700 transition-colors"
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Banner 01 */}
      <div className="mx-auto max-w-7xl">
        <BannerWithButton
          src="/banner_01_desktop.png"
          alt="Leve a vida com estilo"
          sizes="100vw"
          className="h-auto w-full rounded-3xl"
          priority
          buttonPosition={{
            top: "calc(75% + 25px)",
            left: "50%",
            width: "140px",
            height: "45px",
          }}
        />
      </div>

      {/* Mais Vendidos com Paginação */}
      <div className="space-y-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <h3 className="text-2xl font-bold">Mais Vendidos</h3>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePreviousBestsellers}
              disabled={currentPageBestsellers === 0}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNextBestsellers}
              disabled={currentPageBestsellers === totalPagesBestsellers - 1}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </Button>
          </div>
        </div>
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-4 gap-6">
            {getCurrentProducts(products, currentPageBestsellers).map(
              (product) => (
                <Link
                  key={product.id}
                  href={`/product-variant/${product.variants[0]?.slug}`}
                  className="group"
                >
                  <div className="relative aspect-square overflow-hidden rounded-3xl">
                    <Image
                      src={product.variants[0]?.imageUrl || ""}
                      alt={product.name}
                      fill
                      sizes="25vw"
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4 space-y-1">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-muted-foreground text-sm">
                      {product.description}
                    </p>
                    <p className="font-semibold">
                      {product.variants[0]?.priceInCents
                        ? formatCentsToBRL(product.variants[0].priceInCents)
                        : "R$ 0,00"}
                    </p>
                  </div>
                </Link>
              ),
            )}
          </div>
        </div>
      </div>

      {/* Layout de Colagem 2x1 para Banners */}
      <div className="mx-auto max-w-7xl px-5">
        {/* Container Principal Responsivo */}
        <div className="flex flex-col items-center justify-center py-16">
          {/* Container dos Banners Responsivo */}
          <div className="flex w-full max-w-5xl gap-6">
            {/* Container dos Banners 2 e 3 - 50% menor */}
            <div className="flex w-1/3 flex-col justify-between gap-6">
              <div className="relative rounded-3xl">
                <Image
                  src="/banner_02_desktop.png"
                  alt="Banner 2"
                  height={0}
                  width={0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="h-auto w-full object-contain"
                />
                {/* Link flutuante sobre o botão */}
                <button
                  onClick={() =>
                    alert(
                      "Produto Fora de Estoque\n\nEste produto não está disponível no momento.",
                    )
                  }
                  className="focus:ring-primary absolute -translate-x-1/2 -translate-y-1/2 transform rounded-lg transition-all duration-200 hover:scale-105 focus:ring-2 focus:ring-offset-2 focus:outline-none"
                  style={{
                    top: "80%",
                    left: "50%",
                    width: "120px",
                    height: "40px",
                  }}
                  aria-label="Comprar produto"
                />
              </div>
              <div className="relative rounded-3xl">
                <Image
                  src="/banner_03_desktop.png"
                  alt="Banner 3"
                  height={0}
                  width={0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="h-auto w-full object-contain"
                />
                {/* Link flutuante sobre o botão */}
                <button
                  onClick={() =>
                    alert(
                      "Produto Fora de Estoque\n\nEste produto não está disponível no momento.",
                    )
                  }
                  className="focus:ring-primary absolute -translate-x-1/2 -translate-y-1/2 transform rounded-lg transition-all duration-200 hover:scale-105 focus:ring-2 focus:ring-offset-2 focus:outline-none"
                  style={{
                    top: "80%",
                    left: "50%",
                    width: "120px",
                    height: "40px",
                  }}
                  aria-label="Comprar produto"
                />
              </div>
            </div>

            {/* Container do Banner 4 - Aumentado */}
            <div className="relative w-2/3 rounded-3xl">
              <Image
                src="/banner_04_desktop.png"
                alt="Banner 4"
                height={0}
                width={0}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="h-auto w-full object-contain"
              />
              {/* Link flutuante sobre o botão */}
              <button
                onClick={() =>
                  alert(
                    "Produto Fora de Estoque\n\nEste produto não está disponível no momento.",
                  )
                }
                className="focus:ring-primary absolute -translate-x-1/2 -translate-y-1/2 transform rounded-lg transition-all duration-200 hover:scale-105 focus:ring-2 focus:ring-offset-2 focus:outline-none"
                style={{
                  top: "80%",
                  left: "50%",
                  width: "120px",
                  height: "40px",
                }}
                aria-label="Comprar produto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Novos Produtos com Paginação */}
      <div className="space-y-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <h3 className="text-2xl font-bold">Novos Produtos</h3>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePreviousNewProducts}
              disabled={currentPageNewProducts === 0}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNextNewProducts}
              disabled={currentPageNewProducts === totalPagesNewProducts - 1}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </Button>
          </div>
        </div>
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-4 gap-6">
            {getCurrentProducts(
              newlyCreatedProducts,
              currentPageNewProducts,
            ).map((product) => (
              <Link
                key={product.id}
                href={`/product-variant/${product.variants[0]?.slug}`}
                className="group"
              >
                <div className="relative aspect-square overflow-hidden rounded-3xl">
                  <Image
                    src={product.variants[0]?.imageUrl || ""}
                    alt={product.name}
                    fill
                    sizes="25vw"
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 space-y-1">
                  <p className="font-medium">{product.name}</p>
                  <p className="text-muted-foreground text-sm">
                    {product.description}
                  </p>
                  <p className="font-semibold">
                    {product.variants[0]?.priceInCents
                      ? formatCentsToBRL(product.variants[0].priceInCents)
                      : "R$ 0,00"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomeDesktop;
