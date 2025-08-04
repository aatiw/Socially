import { currentUser } from "@clerk/nextjs/server";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { getUserByClerkId } from "@/actions/user.action";
import Link from "next/link";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Separator } from "@radix-ui/react-separator";
import { LinkIcon, MapIcon, MapPin, MapPinIcon } from "lucide-react";

async function Sidebar() {
    const user = await currentUser();
    if(!user) return <UnAuthenticSidebar />

    const useri = await getUserByClerkId(user.id)
    if (!useri) return null;
    
    return (
        <div>
            <div className="sticky top-20">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex flex-col items-center text-center">
                            <Link
                                href={`/profile/${useri.username}`}
                                className="flex flex-col items-center justify-center"
                            >
                                <Avatar className="w-20 h-20">
                                    <AvatarImage src={useri.image || "/avatar.png"} />
                                </Avatar>

                                <div className="mt-4 space-y-1">
                                    <h3 className="font-semibold">{useri.name}</h3>
                                    <p className="text-sm text-muted-foreground">{useri.username}</p>
                                </div>
                            </Link>

                            {useri.bio && <p className="text-sm text-muted-foreground">{useri.bio}</p>}

                            <div className="w-full">
                                <Separator className="my-4" />
                                    <div className="flex justify-between">
                                        <div>
                                            <p className="font-medium">{useri._count.following}</p>
                                            <p className="text-sm text-muted-foreground">Following</p>
                                        </div>
                                <Separator orientation="vertical" />
                                        <div>
                                            <p className="font-medium">{useri._count.followers}</p>
                                            <p className="text-sm text-muted-foreground">Followers</p>
                                        </div>
                                    </div>
                                <Separator className="my-4" />
                            </div>

                            <div className="w-full space-y-2 text-sm">
                                <div className="flex items-center text-muted-foreground">
                                    <MapPinIcon className="h-4 w-4 mr-2" />
                                    {useri.location || "No Location"}
                                </div>

                                <div className="flex items-center text-muted-foreground">
                                    <LinkIcon className="h-4 w-4 mr-2" />
                                    {useri.website ? (
                                        <a href={useri.website} className="hover:underline truncate" target="_blank">
                                            {useri.website}
                                        </a>
                                    ) : ("No website")}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
        
    )
}

export default Sidebar;


const UnAuthenticSidebar = () => (
    <div className="sticky top-20">
        <Card>
            <CardHeader>
                <CardTitle className="text-center text-xl font-semibold">Welcome back</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-center text-muted-foreground mb-4">
                    Login to access your profile and connect with others.
                </p>
                <SignInButton mode="modal">
                    <Button className="w-full" variant="outline">
                        Login
                    </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                    <Button className="w-full mt-2" variant="default">
                        Sign Up
                    </Button>
                </SignUpButton>
            </CardContent>
        </Card>
    </div>
)