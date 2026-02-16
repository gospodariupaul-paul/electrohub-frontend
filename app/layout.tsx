import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GOSPO Electro Hub",
  description: "Platformă tehnică modernă și enterprise",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>

      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
