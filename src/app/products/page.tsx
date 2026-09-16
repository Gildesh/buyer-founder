import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ProductGrid } from "@/components/ProductGrid";

export const metadata: Metadata = {
  title: "Products",
  description: "Fourteen tools across five categories — from wedge generation to enterprise modernization.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Product suite"
        title="All products"
        description="Fourteen tools across five categories — from evidence-gated wedge generation to enterprise legacy modernization."
      />
      <ProductGrid showHeader={false} />
    </>
  );
}
