import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { BoardProvider } from "./context/BoardContext";
import QueryProvider from "./providers/QueryProvider";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Kanban Board",
  description: "A dynamic and interactive Mini Kanban board built with Next.js, Tailwind CSS, and Typescript.",
  keywords: ["Kanban", "Board", "Next.js", "Typescript", "Tailwind CSS", "Project Management", "Workflow Management"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-sans antialiased`}
      >
         <QueryProvider>
        <BoardProvider>
        {children}
        </BoardProvider>
         </QueryProvider>
      </body>
    </html>
  );
}
