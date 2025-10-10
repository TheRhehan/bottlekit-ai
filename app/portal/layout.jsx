// app/portal/layout.jsx
import PortalGuard from "../components/PortalGuard";

export const metadata = {
  title: "BottleKit AI – Portal",
};

export default function PortalLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Client guard handles acceptance */}
        <PortalGuard>{children}</PortalGuard>
      </body>
    </html>
  );
}
