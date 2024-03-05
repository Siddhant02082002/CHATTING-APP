import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";
import { DirectMessage } from "@prisma/client";
import { db } from "@/lib/db";
export const dynamic = 'force-dynamic'
const MESSAGES_BATCH = 10;
export async function GET(req) {
    try {
        const profile = await currentProfile();
        // console.log("CHECK")
        const { searchParams } = new URL(req.url);
        const cursor = searchParams.get("cursor");
        // const ProfileId = searchParams.get("profileId");

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        // if (!conversationId) {
        //     return new NextResponse("Conversation ID missing", { status: 400 });
        // }

        let messages = [];

        if (cursor) {
            messages = await db.aICHAT.findMany({
                take: MESSAGES_BATCH,
                skip: 1,
                cursor: {
                    id: cursor,
                },
                where: {
                    profileId: profile.id,
                },
                include: {
                    profile: true,
                },
                orderBy: {
                    createdAt: "desc",
                }
            })
        } else {
            messages = await db.aICHAT.findMany({
                take: MESSAGES_BATCH,
                where: {
                    profileId: profile.id,
                },
                include: {
                    profile: true,

                },
                orderBy: {
                    createdAt: "desc",
                }
            });
        }

        let nextCursor = null;

        if (messages.length === MESSAGES_BATCH) {
            nextCursor = messages[MESSAGES_BATCH - 1].id;
        }

        return NextResponse.json({
            items: messages,
            nextCursor
        });
    } catch (error) {
        console.log("[AI_MESSAGES_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
