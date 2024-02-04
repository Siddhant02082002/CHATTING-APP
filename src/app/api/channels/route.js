import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { MemberRole } from "@prisma/client";

export async function POST(req) {
    try {
        const profile = await currentProfile();
        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const { name, type } = await req.json();
        const { searchParams } = new URL(req.url);
        const serverId = searchParams.get('serverId');
        if (!serverId) {
            return new NextResponse("Server Id is Missing", { status: 400 });
        }
        if (name === 'general') {
            return new NextResponse("general name is not Allowed", { status: 400 });
        }
    
        const server = await db.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR]
                        }
                    }
                }
            },
            data:{
                channels:{
                    create:{
                        profileId: profile.id,
                        name,
                        type,
                    }
                }
            }
        });
        return NextResponse.json(server);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error",{status: 500});
    }
}