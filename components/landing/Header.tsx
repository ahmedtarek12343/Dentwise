"use client";
import Link from "next/link";
import Image from "next/image";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

const Header = () => {
  const params = useSearchParams();
  const error = params.get("error");
  useEffect(() => {
    if (error === "unauthorized") {
      toast.error("You are not authorized to access this page");
    }
  }, [params, error]);
  return (
    <header className="sticky top-0 z-50 w-full px-6 py-2 border-b border-border/50 bg-background/80 backdrop-blur-md h-16">
      <div className="container h-full mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Dentwise Logo"
            width={32}
            height={32}
            className="w-11"
          />
          <span className="font-semibold text-lg">DentWise</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#howitworks"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            How it Works
          </a>
          <a
            href="#pricing"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Pricing
          </a>
          <a
            href="#faq"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            About
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <SignInButton mode="modal">
            <Button variant="ghost" size={"sm"}>
              Sign In
            </Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button size={"sm"}>Sign Up</Button>
          </SignUpButton>
        </div>
      </div>
    </header>
  );
};

export default Header;
