import { createProduct } from "@/lib/actions/product";

const products = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 299.99,
    description:
      "High-quality wireless headphones with active noise cancellation, 30-hour battery life, and premium sound quality. Perfect for music lovers and professionals.",
    image:
      "https://images.unsplash.com/photo-1713618651165-a3cf7f85506c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBoZWFkcGhvbmVzfGVufDF8fHx8MTc2MzA1MjY0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    inStock: true,
    stockCount: 15,
  },
  {
    id: "2",
    name: "True Wireless Earbuds",
    price: 179.99,
    description:
      "Compact and powerful wireless earbuds with crystal-clear sound, IPX5 water resistance, and 24-hour battery life with charging case.",
    image:
      "https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGVhcmJ1ZHN8ZW58MXx8fHwxNzYzMDg0MzcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    inStock: true,
    stockCount: 22,
  },
  {
    id: "3",
    name: "Smart Fitness Watch",
    price: 249.99,
    description:
      "Advanced fitness tracking smartwatch with heart rate monitor, GPS, sleep tracking, and 7-day battery life. Compatible with iOS and Android.",
    image:
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMHdhdGNofGVufDF8fHx8MTc2MzEzMTcyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    inStock: true,
    stockCount: 8,
  },
  {
    id: "4",
    name: "Ultra-Thin Laptop",
    price: 1299.99,
    description:
      "13-inch ultrabook with Intel Core i7, 16GB RAM, 512GB SSD, and stunning 4K display. Perfect for professionals on the go.",
    image:
      "https://images.unsplash.com/photo-1511385348-a52b4a160dc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlcnxlbnwxfHx8fDE3NjMxNDU1Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    inStock: true,
    stockCount: 5,
  },
  {
    id: "5",
    name: "Professional Camera",
    price: 899.99,
    description:
      "24MP mirrorless camera with 4K video recording, advanced autofocus, and weather-sealed body. Includes 18-55mm kit lens.",
    image:
      "https://images.unsplash.com/photo-1431068799455-80bae0caf685?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzYzMDIyOTAxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    inStock: false,
    stockCount: 0,
  },
  {
    id: "6",
    name: "5G Smartphone",
    price: 799.99,
    description:
      'Latest flagship smartphone with 6.7" OLED display, triple camera system, 5G connectivity, and all-day battery life.',
    image:
      "https://images.unsplash.com/photo-1732998369893-af4c9a4695fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG9uZSUyMHNtYXJ0cGhvbmV8ZW58MXx8fHwxNzYzMTM2NzMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    inStock: true,
    stockCount: 12,
  },
];

export async function seedProducts() {
  try {
    for (const p of products) {
      const data = {
        name: p.name,
        slug: p.name + p.price,
        category: "TECHNOLOGY", // ← or CLOTHES depending on your schema
        image: p.image,
        price: p.price,
        brand: "Generic", // you can change this
        reviews: [],
        countInStock: p.stockCount, // ← renamed
        description: p.description,
        isFeatured: false,
      };

      const created = await createProduct(data);
      console.log("Created:", created.name);
    }

    return { success: true };
  } catch (error) {
    console.error("Seed error:", error);
    return { success: false, error };
  }
}
