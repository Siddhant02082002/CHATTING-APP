import { currentProfilePages } from "@/lib/currentProfilePage";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";

export default async function handler(req, res) {

    if (req.method !== "DELETE" && req.method !== "PATCH") {
        return res.status(405).json({ error: "METHOD NOT ALLOWED" });
    }

    try {
        const profile = await currentProfilePages(req);
        if (!profile) {
            return res.status(405).json({ error: "Unauthorised" });
        }

        const { channelId, serverId, messageId } = req.query;
        const { content } = req.body;
        // console.log(channelId, serverId, messageId)
        if (!serverId) {
            return res.status(400).json({ error: "server ID missing" });
        }
        if (!channelId) {
            return res.status(400).json({ error: "channel ID missing" });
        }

        const server = await db.server.findFirst({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: profile.id,
                    }
                }
            },
            include: {
                members: true,
            }
        })

        if (!server) {
            return res.status(404).json({ error: "Server Not Found" });
        }

        const channel = await db.channel.findFirst({
            where: {
                id: channelId,
                serverId: serverId,
            },
        })

        if (!channel) {
            return res.status(404).json({ error: "Channel Not Found" });
        }

        const member = server.members.find((member) => member.profileId === profile.id);
        if (!member) {
            return res.status(404).json({ error: "Member Not Found" });
        }

        let message = await db.message.findFirst({
            where: {
                id: messageId,
                channelId: channelId,
            },
            include: {
                member: {
                    include: {
                        profile: true,
                    }
                }
            }
        })

        if (!message || message.deleted) {
            return res.status(404).json({ error: "Message Not Found" })
        }

        const isMessageOwner = message.member.id === member.id;
        const isAdmin = member.role === MemberRole.ADMIN;
        const isModerator = member.role === MemberRole.MODERATOR;
        const canModify = isMessageOwner || isAdmin || isModerator;

        if (!canModify) {
            return res.status(401).json({ error: "Unauthorised Request" });
        }

        if (req.method === "DELETE") {
            message = await db.message.update({
                where: {
                    id: messageId,
                },
                data: {
                    fileUrl: null,
                    content: "This Message is deleted",
                    deleted: true,
                },
                include: {
                    member: {
                        include: {
                            profile: true,
                        }
                    }
                }
            })
        }
        if (req.method === "PATCH") {
            if (!isMessageOwner) {
                return res.status(401).json({ error: "Unauthorised Request" });
            }
            message = await db.message.update({
                where: {
                    id: messageId,
                },
                data: {
                    content,
                },
                include: {
                    member: {
                        include: {
                            profile: true,
                        }
                    }
                }
            })
        }
        const updateKey = `chat:${channelId}:messages:update`;

        res?.socket?.server?.io?.emit(updateKey, message);
        return res.status(200).json(message);
    } catch (error) {
        console.log("[MESSAGE_ID]", error);
        return res.status(500).json({ error: "Internal Error" });   
    }
}