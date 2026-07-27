import type { ReactNode } from "react";

export default function PublicSiteShell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      data-public-site="true"
      className={`public-site min-h-screen ${className}`.trim()}
    >
      {children}
    </div>
  );
}
