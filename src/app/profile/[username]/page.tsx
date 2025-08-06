import { getUserByUsername, getUserLikedPosts, getUserPosts, isFollowing } from "@/actions/profile.action";
import { notFound } from "next/navigation";
import ProfilePageClient from "./ProfilePageClient";

export async function generateMetadata({params}: {params: {username:string}}){
    const user = await getUserByUsername(params.username);
    if (!user) return;

    return {
        title: `${user.name ?? user.username}`,
        description: user.bio || `check out ${user.username}'s profile`
    }
}

async function ProfilePage({params}: { params: {username :string } }) {
    const user = await getUserByUsername(params.username);
    if (!user) notFound();

    const [posts, likedPosts, isCurrentUserFollowing] = await Promise.all([
        getUserPosts(user.id),
        getUserLikedPosts(user.id),
        isFollowing(user.id)
    ])
    console.log("paramas:", params);

    return <ProfilePageClient
    user={user}
    posts={posts}
    likedPosts={likedPosts}
    isFollowing={isCurrentUserFollowing}
    />
}

export default ProfilePage;