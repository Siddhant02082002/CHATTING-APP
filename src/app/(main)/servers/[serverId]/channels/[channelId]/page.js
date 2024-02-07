import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import ChatHeader from "@/components/Chat/ChatHeader";
import ChatInput from "@/components/Chat/ChatInput";;
const ChannelId = async ({ params }) => {
    const profile = await currentProfile();
    if (!profile) {
        return redirectToSignIn();
    }
    const serverId = params.serverId;
    const channelId = params.channelId;
    // check if Channel Exist or not 
    const channel = await db.channel.findUnique({
        where:{
            id: params.channelId
        }
    });
    // if the current member is part of channel or not
    const member = await db.member.findFirst({
        where:{
            serverId: params.serverId,
            profileId: profile.id,
        }
    });
    if(!channel || !member) {
        redirect("/");
    }
    return (
        <div>
            <ChatHeader name={channel.name} serverId={serverId} type="channel"></ChatHeader>
            <ChatInput></ChatInput>
        </div>
    );
}

export default ChannelId;