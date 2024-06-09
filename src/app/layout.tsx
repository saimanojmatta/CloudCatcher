import type { Metadata } from "next";
import { Inter, Recursive } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";

const recursive = Recursive({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cloud Catcher",
  description: "Weather predictor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={recursive.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
         <Navbar/>
         {/* {children} */}
        <main  className="flex  flex-col min-h-[calc(100vh-3.5rem-1px)]">
          <div  className='flex-1 flex flex-col h-full'>
        {children}
          </div>
        </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
