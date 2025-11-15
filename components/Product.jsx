"use client";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
export default function Product({ product }) {
  const { addToCart } = useCart();
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          width={220}
          height={220}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4 flex-1">
        <h3 className="mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
        <p className="text-blue-600">${product.price.toFixed(2)}</p>
        {!product.countInStock && (
          <p className="text-red-600 mt-1">Out of Stock</p>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button
          onClick={() => addToCart(product)}
          disabled={!product.countInStock}
          className="flex-1 cursor-pointer"
        >
          Add to Cart
        </Button>
        <Button asChild variant="outline" className="flex-1">
          <Link href={`/products/${product.id}`}>View Product</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

// return (
//   <div
//     className="
//   group
//   rounded-2xl border border-gray-200
//   bg-white shadow-md hover:shadow-xl
//   transition-all duration-300
//   p-5 flex flex-col items-center
// "
//   >
//     {/* Product Image */}
//     <div
//       className="
//     w-full h-52
//     flex items-center justify-center
//     overflow-hidden rounded-xl
//     bg-gradient-to-b from-gray-50 to-gray-100
//     relative
//   "
//     >
//       <Image
//         src={product.image || "/default.jpg"}
//         alt={product.name}
//         width={220}
//         height={220}
//         className="object-contain transform group-hover:scale-105 transition-transform duration-300"
//       />
//       {product.isFeatured && (
//         <span
//           className="
//         absolute top-2 left-2
//         bg-yellow-400 text-gray-900 text-xs font-semibold
//         px-2 py-0.5 rounded-full shadow-sm
//       "
//         >
//           Featured
//         </span>
//       )}
//     </div>

//     {/* Product Info */}
//     <div className="w-full mt-4 text-center">
//       <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
//         {product.name}
//       </h3>

//       <p className="text-2xl font-bold text-gray-900 mt-2">
//         ${product.price?.toFixed(2) ?? "0.00"}
//       </p>

//       <p
//         className={`text-xs mt-1 ${
//           product.countInStock > 0 ? "text-green-600" : "text-red-500"
//         }`}
//       >
//         {product.countInStock > 0
//           ? `${product.countInStock} in stock`
//           : "Out of stock"}
//       </p>
//     </div>

//     {/* Buttons */}
//     <div className="grid grid-cols-2 gap-3 w-full mt-5">
//       <button
//         onClick={() => addToCart(product)}
//         disabled={product.countInStock === 0}
//         className={`
//     py-2.5 px-4 rounded-xl font-medium text-sm
//     transition-all duration-300 border cursor-pointer
//     ${
//       product.countInStock === 0
//         ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
//         : "bg-gray-800 text-white border-transparent hover:bg-gray-700 hover:shadow-md"
//     }
//   `}
//       >
//         {product.countInStock === 0 ? "Out of Stock" : "Add to Cart"}
//       </button>

//       <Link
//         href={`/products/${product.id}`}
//         className="
//     py-2.5 px-4 rounded-xl text-sm font-medium text-white text-center
//     bg-blue-500 hover:bg-blue-600
//     transition-colors duration-300 hover:shadow-md
//   "
//       >
//         View Product
//       </Link>
//     </div>
//   </div>
// );
