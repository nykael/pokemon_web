import type { Metadata } from "next";
import { Provider } from "./provider";

export const metadata: Metadata = {
  title: "PokéDex",
  description: "created by Nykael Cardial",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <Provider>
        <body>
          {children}
        </body>
      </Provider>
    </html>
  );
}
