export async function generateMetadata() {
  return {
    title: "Cart",
    description: `Review your shopping cart and proceed to checkout on TechStore.`,
    openGraph: {
      title: "Shopping Cart | TechStore",
      description: "Review your shopping cart and proceed to checkout on TechStore.",
      url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/cart`,
      type: "website",
    },
  };
}

export default function ProfileLayout({ children }) {
  return <section>{children}</section>;
}