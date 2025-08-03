import { currentUser } from "@clerk/nextjs/server";
import ModeToggle from "./ModeToggle";
import { Button } from "./ui/button";
import { BellIcon, HomeIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { SignInButton, UserButton } from "@clerk/nextjs";

async function DesktopNavbar() {
    const user = await currentUser();

  return (
    <div className="hidden md:flex items-center justify-between space-x-4">
        <ModeToggle />

        <Button variant="ghost" className="flex items-center gap-2" asChild>
            <Link href="/">
                <span className="flex items-center gap-2">
                    <HomeIcon className="h-4 w-4" />
                    <span className="hidden lg:inline">Home</span>
                </span>
            </Link>
        </Button>

        {user ? (
            <>
            <Button variant="ghost" className="flex items-center gap-2" asChild>
                <Link href="/notification">
                    <span className="flex items-center gap-2">
                        <BellIcon className="h-4 w-4" />
                        <span className="hidden lg:inline">Notifications</span>
                    </span>
                </Link>
            </Button>

            <Button variant="ghost" className="flex items-center gap-2" asChild>
                <Link href={`/profile/${
                    user.username ?? user.emailAddresses[0].emailAddress.split("@")[0]
                }`}>
                    <span className="flex items-center gap-2">
                        <UserIcon className="w-4 h-4" />
                        <span className="hidden lg:inline">Profile</span>
                    </span>
                </Link>
            </Button>
            <UserButton />
            </>
        ): (
            <SignInButton mode="modal">
                <Button variant="default">SignIn</Button>
            </SignInButton>
        )}
    </div>
  )
}

export default DesktopNavbar;