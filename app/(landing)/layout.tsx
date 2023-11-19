import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "@/components/ui/button";
import MainNav from "@/components/main/MainNav";
import { ModeToggle } from "@/components/ModeToggle";

interface LandingLayoutProps {
  children: React.ReactNode;
}

const LandingLayout = ({ children }: LandingLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav />
          <nav className="flex items-center gap-4">
            <ModeToggle />

            <Link
              href="/login"
              className={cn(
                buttonVariants({
                  variant: "secondary",
                  size: "sm",
                }),
                "px-4"
              )}
            >
              Login
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default LandingLayout;
