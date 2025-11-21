export async function generateMetadata() {
  return {
    title: "Shipping",
    description: `Enter your shipping information for your TechStore order.`,
    openGraph: {
      title: "Shipping Information | TechStore",
      description: "Enter your shipping information for your TechStore order.",
      url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/shipping`,
      type: "website",
    },
  };
}

export default function ProfileLayout({ children }) {
  return <section>{children}</section>;
}