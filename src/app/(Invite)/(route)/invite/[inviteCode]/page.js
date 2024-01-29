import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import axios from "axios";
import {redirect} from "next/navigation";
const InvitePeoplePage = async ({params}) => {
    const profile = await currentProfile();
    if (!profile) {
        return redirectToSignIn();
    }
    const inviteCode = params.inviteCode;
    if (!inviteCode) {
        return redirect("/");
    }
    const server = await db.server.findUnique({
        where: {
            inviteCode: inviteCode,
            members: {
                some: {
                    profileId: profile.id
                }
            }
        },
    })
    if(server){
        return redirect(`/servers/${server.id}`);
    }

    const newServer = await db.server.update({
        where:{
            inviteCode: params.inviteCode,
        },
        data: {
            members:{
                create:[
                    {
                        profileId: profile.id,
                    }
                ]
            }
        }
    });

    if(newServer){
        return redirect(`/servers/${newServer.id}`);
    }
    return null;
}

export default InvitePeoplePage;