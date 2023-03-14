import "./globals.css";

export const metadata = {
  title: "Multichain Explorer",
  description: "Blockchain Explorer for Ethereum and Polygon",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white">
        <section>
          <nav className="border-b border-gray-300 shadow px-6 py-4">
            <span className="text-3xl">Multichain Explorer</span>
          </nav>
          <div className="p-6">{children}</div>
        </section>
      </body>
    </html>
  );
}
