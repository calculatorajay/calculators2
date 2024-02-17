import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Calculators",
  description: "Generated by ChandoraAjay",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-zinc-400">
        <AppRouterCacheProvider>
           {children}
+        </AppRouterCacheProvider>
        </div>
        </body>
    </html>
  );
}