"use client"

import "./globals.css";
import { Charka } from "./charka";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Charka>{children}</Charka>
      </body>
    </html>
  );
}
