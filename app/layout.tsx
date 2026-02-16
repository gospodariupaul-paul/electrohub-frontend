export const metadata = {
  title: "GOSPO Electro Hub",
  description: "Platformă tehnică modernă și enterprise",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ro">
      <head>
        {/* Font Awesome pentru iconițe */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>

      {/* IMPORTANT:
          - Fără background global
          - Fără culori globale
          - Fără padding global
          - Fără layout-uri care afectează dashboard-ul
          - Lăsăm fiecare pagină să-și controleze designul
      */}

      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
