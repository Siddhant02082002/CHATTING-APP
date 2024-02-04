import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {

    try {

        const profile = await currentProfile();
        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const serverId = searchParams.get('serverId');
        if (!serverId) {
            return new NextResponse("ServerID is Missing", { status: 401 });
        }

        if (!params?.channelId) {
            return new NextResponse("Channel Id is Missing", { status: 401 });
        }

        const server = await db.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR],
                        }
                    }
                }
            },
            data: {
                channels: {
                    delete: {
                        id: params.channelId,
                        name: {
                            not: "general",
                        }
                    }
                }
            }
        });
        console.log(server)
        return NextResponse.json(server);
    } catch (error) {
        return new NextResponse("Internal error", { status: 500 });
    }
}