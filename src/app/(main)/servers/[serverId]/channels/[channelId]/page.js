import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import ChatHeader from "@/components/Chat/ChatHeader";
import ChatInput from "@/components/Chat/ChatInput"; import ChatMessage from "@/components/Chat/ChatMessage";
import { ChannelType } from "@prisma/client";
import { MediaRoom } from "@/components/mediaRoom";
;
const ChannelId = async ({ params }) => {
    const profile = await currentProfile();
    if (!profile) {
        return redirectToSignIn();
    }
    const serverId = params.serverId;
    const channelId = params.channelId;
    // check if Channel Exist or not 
    const channel = await db.channel.findUnique({
        where: {
            id: params.channelId
        }
    });
    // if the current member is part of channel or not
    const member = await db.member.findFirst({
        where: {
            serverId: params.serverId,
            profileId: profile.id,
        }
    });
    if (!channel || !member) {
        redirect("/");
    }
    return (
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader name={channel.name} serverId={serverId} type="channel"></ChatHeader>
            {channel.type === ChannelType.TEXT && (
                <>
                    <ChatMessage member={member}
                        name={channel.name}
                        chatId={channel.id}
                        type="channel"
                        apiUrl="/api/messages"
                        socketUrl="/api/socket/messages"
                        socketQuery={{
                            channelId: channel.id,
                            serverId: channel.serverId,
                        }}
                        paramKey="channelId"
                        paramValue={channel.id}></ChatMessage>
                    <ChatInput type="channel" apiUrl="/api/socket/messages" query={{ channelId: channel.id, serverId: channel.serverId }}></ChatInput>
                </>
            )}
            { channel.type === ChannelType.AUDIO && (
                <MediaRoom chatId={channel.id} audio={true} video={false}/>
            )}
            { channel.type === ChannelType.VIDEO && (
                <MediaRoom chatId={channel.id} audio={true} video={true}/>
            )}
        </div>
    );
}

export default ChannelId;