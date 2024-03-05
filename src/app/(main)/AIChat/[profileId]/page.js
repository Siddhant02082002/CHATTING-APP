import ChatHeader from "@/components/Chat/ChatHeader";
import ChatInput from "@/components/Chat/ChatInput";
import ChatMessage from "@/components/Chat/ChatMessage";
import { MobileToggle } from "@/components/mobile-toggle";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

const AIChat = async () => {
    const profile = await currentProfile();
    if (!profile) {
        return redirectToSignIn();
    }
    const currentMember = await db.member.findFirst({
        where: {
            profileId: profile.id,
        },
        include: {
            profile: true,
        },
    });
    // const AiChatId = await db.aICHAT.findFirst({
    //     where: {
    //         profileId: profile.id,
    //     },
    //     include: {
    //         profile: true,
    //     }
    // })
    return (
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader></ChatHeader>
            <ChatMessage member={currentMember}
                name="CHAT"
                chatId={profile.id} 
                type="AI conversation"
                apiUrl="/api/AiChatMessage"
                paramKey="AiChatId"
                paramValue={profile.id}
                socketUrl="/api/socket/AI-messages"
                socketQuery={{
                    ProfileId: profile.id,
                }}></ChatMessage>
            <ChatInput apiUrl="/api/socket/AI-messages"></ChatInput>
        </div>
    )
}
export default AIChat;