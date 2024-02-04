import { /*Inter*/ Open_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";
import Bagimg from "../../public/bagimg.jpg";
import a from "../../public/a.jpg"
import c from "../../public/c.jpg"
import { ModalProvider } from "@/components/providers/modal-provider";
const font = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Chat Application",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>

        <body className={cn(
          font.className,
          "bg-white dark:bg-[#313338]"
        )} style={{/* backgroundImage: `url(${c.src})`,*/ backgroundSize: 'cover' }}> <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem="false"
          disableTransitionOnChange
        >
            <ModalProvider />
            {children}
          </ThemeProvider></body>
      </html>
    </ClerkProvider>
  );
}