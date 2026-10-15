import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata = {
  metadataBase: new URL("https://Zenovahouse.com"),
  title: {
    default: "Zenova | Jewellery in Nepal",
    template: "%s | Zenova",
  },
  description:
    "Shop elegant jewellery in Nepal at Zenova. Discover Zenovas, earrings, necklaces, rings, bangles, anklets and jewellery sets for everyday wear, weddings and special occasions.",
  keywords: [
    "jewellery in Nepal",
    "jewelry in Nepal",
    "jewellery Nepal",
    "online jewellery Nepal",
    "online jewelry Nepal",
    "jewellery shop Nepal",
    "jewelry shop Nepal",
    "gold jewellery Nepal",
    "Zenova Nepal",
    "nose pins Nepal",
    "earrings Nepal",
    "necklaces Nepal",
    "rings Nepal",
    "bangles Nepal",
    "anklets Nepal",
    "bridal jewellery Nepal",
  ],
  authors: [
    {
      name: "Zenova",
    },
  ],
  creator: "Zenova",
  publisher: "Zenova",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    shortcut: "/logo.png",
    apple: [
      {
        url: "/logo.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_NP",
    url: "https://zenovahouse.com",
    siteName: "Zenova",
    title: "Zenova | Jewellery in Nepal",
    description:
      "Discover elegant jewellery in Nepal including Zenovas, earrings, necklaces, rings, bangles, anklets and jewellery sets.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Zenova Jewellery - Jewellery in Nepal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zenova | Jewellery in Nepal",
    description:
      "Shop elegant jewellery in Nepal for everyday wear, weddings and special occasions.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://zenovahouse.com",
  },
};
export default function RootLayout({ children }) {
  return (
    <html
      lang="en-NP"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
