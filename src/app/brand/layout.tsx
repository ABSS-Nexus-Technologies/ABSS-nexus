import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Official Brand Identity & Logo Suite | ABSS Nexus Technologies",
  description:
    "Official vector and high-resolution brand assets for ABSS Nexus Technologies across all 7 corporate logo categories based on the signature 'A' Orbital Mark.",
};

export default function BrandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
