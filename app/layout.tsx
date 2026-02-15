export const metadata = {
  title: "GOSPO Electro Hub",
  description: "Aplicatie tehnica moderna",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ro">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
