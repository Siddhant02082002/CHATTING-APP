import { currentProfile } from "@/lib/current-profile";
// import { NextResponse } from "next/server";
import { DirectMessage } from "@prisma/client";
import { db } from "@/lib/db";

export async function GET(req) {
    try {
        const profile = await currentProfile();

        const { searchParams } = new URL(req.url);
        const cursor = searchParams.get("cursor");
        const conversationId = searchParams.get("conversationId");

        if (!profile) {
            return res.status(401).json({ error: "Unauthorized" })
            // return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!conversationId) {
            return res.status(401).json({ error: "Unauthorized" })
        }

        let messages = [];

        if (cursor) {
            messages = await db.directMessage.findMany({
                take: 10,
                skip: 1,
                cursor: {
                    id: cursor,
                },
                where: {
                    conversationId,
                },
                include: {
                    member: {
                        include: {
                            profile: true,
                        }
                    }
                },
                orderBy: {
                    createdAt: "desc",
                }
            })
        } else {
            messages = await db.directMessage.findMany({
                take: 10,
                where: {
                    conversationId,
                },
                include: {
                    member: {
                        include: {
                            profile: true,
                        }
                    }
                },
                orderBy: {
                    createdAt: "desc",
                }
            });
        }

        let nextCursor = null;

        if (messages.length === 10) {
            nextCursor = messages[10 - 1].id;
        }

        return NextResponse.json({
            items: messages,
            nextCursor
        });
    } catch (error) {
        console.log("[DIRECT_MESSAGES_GET]", error);
        return res.status(401).json({ error: "Unauthorized" })
    }
}
