export const metadata = {
  title: "GOSPO Electro Hub",
  description: "Platformă tehnică enterprise pentru management inteligent",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ro" className="dark">
      <head>
        {/* FontAwesome pentru iconițe */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>

      <body className="bg-[#0a0f1f] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
