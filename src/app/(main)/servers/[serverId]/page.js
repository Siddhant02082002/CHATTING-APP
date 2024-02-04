
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect, useParams } from "next/navigation";
const serverIdPage = async ({ params }) => {
    const profile = await currentProfile();
    if (!profile) {
        redirectToSignIn();
    }
    const id = params?.serverId
    const server = await db.server.findUnique({
        where: {
            id: id,
            members: {
                some: {
                    profileId: profile.id,
                }
            },
        },
        include: {
            channels: {
                where: {
                    name: "general"
                }
            }
        }
    })

    const channelID = server.channels[0].id 
    return redirect(`/servers/${id}/channels/${channelID}`)
}

export default serverIdPage;