"use server"

import prisma from "@/lib/prisma";
import { getDbUserId } from "./user.action"

export async function getNotifications() {
    try {
        const userId = await getDbUserId();
        if(!userId) return [];

        const notifications = await prisma.notification.findMany({
            where:{userId,},
            include: {
                creator: {
                    select: {
                        id:true,
                        name: true,
                        username: true,
                        image: true,
                    },
                }, 
                posts : {
                    select:{
                        id: true,
                        content: true,
                        image: true,
                    },
                },
                comments:{
                    select:{
                        id:true,
                        content:true,
                        createdAt: true,
                    },
                },
            },
            orderBy: {
                createdAt:"desc",
            },
        });

        return notifications;
    } catch (error) {
        console.error("Error fetching notifications:", error);
        throw new Error("Failed to fetch notifications");
    }
}

export async function markNotificationAsRead(notificationsIds: string[]){
    try {
        await prisma.notification.updateMany({
            where:{
                id:{
                    in:notificationsIds,
                },
            },
            data: {
                read: true,
            },
        });

        return {success:true};
    } catch (error) {
        console.error("error marking notifcations as read", error);
        return {success:false};
    }
}