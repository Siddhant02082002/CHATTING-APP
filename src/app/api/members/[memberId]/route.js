import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    
    const serverId = searchParams.get("serverId");
    if (!serverId) {
      return new NextResponse("Server ID missing", { status: 400 });
    }
    if (!params.memberId) {
      return new NextResponse("Member ID missing", { status: 400 });
    }
    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          deleteMany: {
            id: params.memberId,
            profileId: {
              not: profile.id,
            }
          }
        }
      },
      include: {
        members: {
          include: {
            profile: true,
          },
          orderBy:{
            role: "asc",
          }
        }
      }

    })
    return NextResponse.json(server);
  } catch (error) {
    return new NextResponse("INTERNAL ERROR",{status: 500});
  }
}
export async function PATCH(req, { params }) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const { role } = await req.json();
    const serverId = searchParams.get("serverId");
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    console.log(req.url)


    if (!serverId) {
      return new NextResponse("ServerId missing", { status: 400 });
    }

    if (!params.memberId) {
      return new NextResponse("MemberId missing", { status: 400 });
    }
    console.log("Server ", params.memberId)
    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          update: {
            where: {
              id: params.memberId,
              profileId: {
                not: profile.id
              }
            },
            data: {
              role: role
            }
          }
        }
      },
      include: {
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: "asc"
          }
        }
      }
    });

    return NextResponse.json(server)
  } catch (e) {
    console.log(e);
    return new NextResponse.json("Internal Error: ", { status: 500 });
  }
}