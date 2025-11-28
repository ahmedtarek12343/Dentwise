"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import NavLink from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  CalendarIcon,
  CrownIcon,
  HomeIcon,
  MicIcon,
  UserCog2Icon,
} from "lucide-react";
import { Skeleton } from "../ui/skeleton";

const Navbar = () => {
  const { user, isLoaded } = useUser();
  const pathname = usePathname();

  return (
    <nav className="fixed px-7 top-0 left-0 right-0 z-50 py-2 border-b border-border/50 bg-background/80 backdrop-blur-md h-16">
      <div className="container mx-auto flex justify-between items-center h-full">
        {/* LOGO */}
        <div className="flex items-center gap-2">
          <NavLink href="/dashboard" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Logo"
              width={32}
              height={32}
              className="w-11"
            />
          </NavLink>
        </div>
        <div className="flex items-center gap-6 mr-auto ml-5">
          <NavLink
            href="/dashboard"
            className={`flex items-center gap-2 transition-colors ${
              pathname === "/dashboard"
                ? "text-foreground hover:text-primary font-medium"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <HomeIcon className="w-4 h-4" />
            <span className="hidden md:inline">Dashboard</span>
          </NavLink>
          <NavLink
            href="/appointments"
            className={`flex items-center gap-2 transition-colors hover:text-foreground ${
              pathname === "/appointments"
                ? "text-foreground"
                : "text-muted-foreground"
            }`}
          >
            <CalendarIcon className="w-4 h-4" />
            <span className="hidden md:inline">Appointments</span>
          </NavLink>

          <NavLink
            href="/voice"
            className={`flex items-center gap-2 transition-colors hover:text-foreground ${
              pathname === "/voice"
                ? "text-foreground"
                : "text-muted-foreground"
            }`}
          >
            <MicIcon className="w-4 h-4" />
            <span className="hidden md:inline">Voice</span>
          </NavLink>
          <NavLink
            href="/pro"
            className={`flex items-center gap-2 transition-colors hover:text-foreground ${
              pathname === "/pro" ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            <CrownIcon className="w-4 h-4" />
            <span className="hidden md:inline">Pro</span>
          </NavLink>
          {user?.emailAddresses[0].emailAddress ===
            process.env.NEXT_PUBLIC_ADMIN_EMAIL && (
            <NavLink
              href="/admin"
              className={`flex items-center gap-2 transition-colors hover:text-foreground ${
                pathname === "/admin"
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              <UserCog2Icon className="w-4 h-4" />
              <span className="hidden md:inline">Admin</span>
            </NavLink>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex flex-col items-end">
              <span className="text-sm font-medium text-foreground">
                {user?.firstName} {user?.lastName}
              </span>
              <span className="text-xs text-muted-foreground">
                {user?.emailAddresses?.[0]?.emailAddress}
              </span>
            </div>
            {!isLoaded && (
              <div className="flex gap-2">
                <div className="flex flex-col gap-1 items-end mt-3">
                  <Skeleton className="w-22 h-4" />
                  <Skeleton className="w-44 h-4" />
                </div>
                <Skeleton className="w-8 h-8 mt-3 rounded-full" />
              </div>
            )}
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
