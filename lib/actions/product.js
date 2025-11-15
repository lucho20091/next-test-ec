"use server";
import { prisma } from "@/lib/prisma";

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
    return deleted;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

export const getProducts = async () => {
  try {
    const products = await prisma.product.findMany();
    return products;
  } catch (e) {
    return null;
  }
};

export const getProductById = async (id) => {
  try {
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
