import { NextResponse } from "next/server";
import { allProducts, serviceCatalog, blogPosts } from "@/lib/catalog";

export async function POST() {
  return NextResponse.json({
    success: true,
    message: "Static data catalog loaded (no database required for Vercel deployment)",
    products: allProducts.length,
    services: serviceCatalog.length,
    posts: blogPosts.length,
  });
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "KALINITECH SYSTEMS API is running",
    products: allProducts.length,
    services: serviceCatalog.length,
    posts: blogPosts.length,
  });
}
