// app/portal/layout.jsx
import PortalGuard from "../components/PortalGuard";

export const metadata = {
  title: "BottleKit AI – Portal",
};

export default function PortalLayout({ children }) {
  // Client guard enforces Terms acceptance
  return <PortalGuard>{children}</PortalGuard>;
}
