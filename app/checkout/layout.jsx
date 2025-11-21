export async function generateMetadata() {
  return {
    title: "Checkout",
    description: `Complete your purchase securely at TechStore checkout.`,
    openGraph: {
      title: "Checkout | TechStore",
      description: "Complete your purchase securely at TechStore checkout.",
      url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/checkout`,
      type: "website",
    },
  };
}

export default function ProfileLayout({ children }) {
  return <section>{children}</section>;
}