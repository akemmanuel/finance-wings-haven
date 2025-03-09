
import { ReactNode } from "react";
import Header from "./Header";

interface ShellProps {
  children: ReactNode;
}

const Shell = ({ children }: ShellProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16 page-transition max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};

export default Shell;
