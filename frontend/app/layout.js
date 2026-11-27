import "./globals.css";

export const metadata = {
  title: "Debashis Paul — Full-Stack & AI Developer",
  description: "Portfolio of Debashis Paul: full-stack engineer, ML builder, Springer-published researcher.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
