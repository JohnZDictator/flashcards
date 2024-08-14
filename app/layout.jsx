import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"], 
  weight:["100", "200", "300", "400", "500", "600", "700", "800"],  
  variable: '--font-jetbrainsMono',
});


export const metadata = {
  title: "Flashy",
  description: "Master Any Subject with AI-Powered Flashcards",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={jetbrainsMono.variable}>
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
