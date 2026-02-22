import "./globals.css";
import { UserProvider } from "./context/UserContext";

export default function RootLayout({ children }: any) {
  return (
    <html lang="ro">
      <body>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
