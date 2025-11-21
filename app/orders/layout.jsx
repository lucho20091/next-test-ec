export async function generateMetadata() {
  return {
    title: "Orders",
    description: `View your past and current orders on TechStore.`,
    openGraph: {
      title: "My Orders | TechStore",
      description: "View your past and current orders on TechStore.",
      url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/orders`,
      type: "website",
    },
  };
}

export default function ProfileLayout({ children }) {
  return <section>{children}</section>;
}