"use server";
import { prisma } from "@/lib/prisma";
import { unstable_cache, revalidateTag } from "next/cache";

// Helper function to introduce a delay for demonstration purposes
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const getCachedProducts = unstable_cache(
  async () => {
    // await delay(1000); // Removed artificial delay
    const products = await prisma.product.findMany();
    return products;
  },
  ["main-products"],
  {
    tags: ["products"],
    revalidate: 300,
  }
);
export const createProduct = async (data) => {
  try {
    const product = await prisma.product.create({
      data: {
        name: data.name,
        slug: data.slug,
        category: data.category, // must be "CLOTHES" or "TECHNOLOGY"
        image: data.image,
        price: data.price,
        brand: data.brand,
        reviews: data.reviews || [],
        countInStock: data.countInStock,
        description: data.description,
        isFeatured: data.isFeatured || false,
      },
    });
    revalidateTag("products");
    return product;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const editProduct = async (id, data) => {
  try {
    const updated = await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug,
        category: data.category,
        image: data.image,
        price: data.price,
        brand: data.brand,
        reviews: data.reviews,
        countInStock: data.countInStock,
        description: data.description,
        isFeatured: data.isFeatured,
      },
    });
    revalidateTag("products");
    return updated;
  } catch (error) {
    console.error("Error editing product:", error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const deleted = await prisma.product.delete({
      where: { id },
    });
    revalidateTag("products");
    return deleted;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

export const getProducts = async () => {
  try {
    const products = await getCachedProducts();
    return products;
  } catch (e) {
    console.error("Error fetching products:", e);
    return null;
  }
};

export const getProductById = async (id) => {
  try {
    // await delay(1000); // Removed artificial delay
    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
    });
    if (!product) return null;
    return product;
  } catch (e) {
    return null;
  }
};