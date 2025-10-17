import { desc } from "drizzle-orm";
import React from "react";

import { Header } from "@/components/common/header";
import HomeDesktop from "@/components/common/home-desktop";
import HomeMobile from "@/components/common/home-mobile";
import { db } from "@/db";
import { productTable } from "@/db/schema";

const Home = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });
  const newlyCreatedProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: {
      variants: true,
    },
  });

  const categories = await db.query.categoryTable.findMany({});

  return (
    <>
      <Header />
      <div className="hidden md:block">
        <HomeDesktop
          products={products}
          newlyCreatedProducts={newlyCreatedProducts}
          categories={categories}
        />
      </div>
      <div className="md:hidden">
        <HomeMobile
          products={products}
          newlyCreatedProducts={newlyCreatedProducts}
          categories={categories}
        />
      </div>
    </>
  );
};

export default Home;
