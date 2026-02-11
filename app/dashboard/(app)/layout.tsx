import type { PropsWithChildren } from "react";
import { TopHeader } from "@/components/cells-ui/header";

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen">
      <TopHeader />
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}
