"use client";

import { useTheme } from "next-themes";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import {
  BellIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  MoonIcon,
  SunIcon,
  UserIcon,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { SignInButton, SignOutButton, useAuth } from "@clerk/nextjs";

function MobileNavbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const {isSignedIn} = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex md:hidden items-center space-x-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="mr-2"
      >
        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>

      <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <MenuIcon className="h-4 w-4" />
          </Button>
        </SheetTrigger>

        <SheetContent side="right" className="w-[300px]">
          <SheetTitle>Menu</SheetTitle>

          <nav className="flex flex-col space-y-6 mt-6">
            <Button
              variant="ghost"
              className="flex items-center gap-3 justify-start"
              asChild
            >
              <Link href="/">
                <span className="flex items-center gap-3">
                    <HomeIcon className="h-4 w-4" />
                    <span>Home</span>
                </span>
              </Link>
            </Button>

            {isSignedIn ? (
              <>
                <Button
                  variant="ghost"
                  className="flex items-center gap-3 justify-start"
                  asChild
                >
                  <Link href="/profile">
                    <span className="flex items-center gap-3">
                        <UserIcon className="h-4 w-4" />
                            <span>Profile</span>
                        </span>
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  className="flex items-center gap-3 justify-start"
                  asChild
                >
                  <Link href="/notification">
                    <span className="flex items-center gap-3">
                        <BellIcon className="h-4 w-4" />
                        <span>Notifications</span>
                    </span>
                  </Link>
                </Button>

                <SignOutButton>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-3 justify-start"
                    asChild
                  >
                    <span className="flex items-center gap-3">
                        <LogOutIcon className="h-4 w-4" />
                        <span>Log Out</span>
                    </span>
                  </Button>
                </SignOutButton>
              </>
            ) : (
              <SignInButton mode="modal">
                <Button
                  variant="ghost"
                  className="flex items-center justify-start gap-3"
                  asChild
                >
                  SignIn
                </Button>
              </SignInButton>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileNavbar;
