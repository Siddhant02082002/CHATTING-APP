import { ChannelType, MemberRole } from "@prisma/client";
import { db } from "@/lib/db";
import ServerHeader from "./ServerHeader";
import ServerSection from "./ServerSection";
import ServerChannel from "./ServerChannel";
import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
const ServerSidebar = async ({ serverId }) => {
    const profile = await currentProfile();
    if (!profile) {
        return redirect("/")
    }
    const serverDetails = await db.server.findUnique({
        where: {
            id: serverId
        },
        include: {
            channels: {
                orderBy: {
                    createdAt: "asc",
                },
            },
            members: {
                include: {
                    profile: true,
                },
                orderBy: {
                    role: "asc",
                }
            }
        },
    });
    if (!serverDetails) {
        return redirect("/");
    }
    const textChannel = serverDetails?.channels.filter((channel) => channel.type === "TEXT")
    const audioChannel = serverDetails?.channels.filter((channel) => channel.type === "AUDIO")
    const videoChannel = serverDetails?.channels.filter((channel) => channel.type === "VIDEO");
    const members = serverDetails?.members.filter((member) => member.profileId !== profile.id)
    const role = serverDetails?.members.find((member) => member.profileId === profile.id)?.role;
    return (
        <div className="flex flex-col h-full rounded-s-xl bg-neutral-700 bg-opacity-95">
            <ServerHeader server={serverDetails} role = {role}></ServerHeader>
            <div>
                {!!textChannel?.length > 0 && (
                    <div>
                        <ServerSection
                            sectionType="channels"
                            channelType={ChannelType.TEXT}
                            role={role}
                            label="Text Channels"
                        />
                        <div>
                            {/* <ServerChannel></ServerChannel> */}
                            {textChannel.map((channel) => (
                                <ServerChannel key={channel.id} channel={channel}
                                    role={role}
                                    server={serverDetails}>

                                </ServerChannel>
                            ))}
                        </div>
                    </div>
                )}
                {!!audioChannel?.length > 0 && (
                    <div>
                        <ServerSection
                            sectionType="channels"
                            channelType={ChannelType.TEXT}
                            role={role}
                            label="Audio Channels"
                        />
                        <div>
                            {/* <ServerChannel></ServerChannel> */}
                            {textChannel.map((channel) => (
                                <ServerChannel key={channel.id} channel={channel}
                                    role={role}
                                    server={serverDetails}>

                                </ServerChannel>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ServerSidebar
