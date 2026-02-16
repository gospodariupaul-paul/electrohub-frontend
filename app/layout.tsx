export const metadata = {
  title: "GOSPO Electro Hub",
  description: "Platformă tehnică enterprise pentru management inteligent",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ro">
      <head>
        {/* Font general + iconițe */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>

      {/* IMPORTANT:
          - NU punem background global
          - NU punem culori globale
          - NU punem padding global
          - Dashboard-ul rămâne intact
      */}

      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
