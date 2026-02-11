import type { PropsWithChildren } from "react";

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen">
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}
