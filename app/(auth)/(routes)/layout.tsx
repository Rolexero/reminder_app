import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard auth",
  description: "Admin Dashboard auth",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center h-full">{children}</div>
  );
}
