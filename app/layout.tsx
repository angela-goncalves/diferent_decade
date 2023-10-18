import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import "../styles/globals.css";
import { ThemeProvider } from "../components/ThemeProvider";

let title = "Photo Generator";
let description = "Generate your 80s look ";
let ogimage = "https://roomgpt-demo.vercel.app/og-image.png";
let sitename = "diferent-decade";

export const metadata: Metadata = {
  title,
  description,
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    images: [ogimage],
    title,
    description,
    url: "https://roomgpt-demo.vercel.app",
    siteName: sitename,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [ogimage],
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange>
          {" "}
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
