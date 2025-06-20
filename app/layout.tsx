
import type { Metadata } from "next";
import { AuthProvider } from "./context/authContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "platform",
  description: "platform of students",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
