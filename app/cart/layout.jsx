export async function generateMetadata() {
  return {
    title: "Cart",
    description: `View Cart`,
  };
}

export default function ProfileLayout({ children }) {
  return <section>{children}</section>;
}
