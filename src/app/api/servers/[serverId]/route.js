import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
export async function DELETE(req,{params}){
    try {
        const profile = await currentProfile();
        if(!profile){
            return new NextResponse("Unauthorized",{status:401})
        }
        const server = await db.server.delete({
            where: {
                id: params.serverId,
                profileId: profile.id,
            }
        });
        return NextResponse.json(server);
    } catch (error) {
        console.log("Server Id Delete",error);
        return new Error("Internal Error",{status: 500});
    }
}