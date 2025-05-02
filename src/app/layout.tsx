import type {Metadata} from 'next';
import { Inter } from 'next/font/google'; // Changed font to Inter for better readability
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster"; // Import Toaster

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Canary Ball - Canary Basketball League Info',
  description: 'Visualize detailed information about the Canary Basketball League.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} flex flex-col min-h-screen antialiased`}>
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
           {children}
        </main>
        <Toaster /> {/* Add Toaster component */}
        <Footer />
      </body>
    </html>
  );
}
