import { currentProfilePages } from "@/lib/currentProfilePage";
import { db } from "@/lib/db";


export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({ error: "METHOD NOT ALLOWED" })
    }
    try {
        const profile = await currentProfilePages(req);
        
        // console.log(req.body,req.query);
        if (!profile) {
            return res.status(403).json({ error: "Unauthorized" })
        }
        
        const {content,fileUrl} = req.body;
        const {serverId,channelId} = req.query;
        
        if(!serverId) {
            return res.status(400).json({error: "server Id missing"});
        }

        if(!channelId){
            return res.status(400).json({error: "Channel Id missing"});
        }

        if(!content){
            return res.status(400).json({error: "Message is missing"}); 
        }

        const server = await db.server.findFirst({
            where:{
                id: serverId,
                members:{
                    some:{
                        profileId: profile.id,
                    }
                }
            },
            include:{
                members: true,
            }
        });

        if(!server){
            return res.status(404).json({message:"Server Not Found"})
        }

        const channel = await db.channel.findFirst({
            where:{
                id: channelId,
                serverId: serverId,
            }
        });

        if(!channel){
            return res.status(404).json({message:"channel not found"});
        }
        const member = server.members.find((member)=>member.profileId===profile.id);

        if(!member){
            return res.status(404).json({message: "member not found"});
        }

        const message = await db.message.create({
            data:{
                content,
                fileUrl,
                channelId: channelId,
                memberId: member.id
            },
            include:{
                member:{
                    include:{
                        profile: true,
                    }
                }
            }
        })
        // console.log(message)
        const channelKey = `chat:${channelId}:messages`;
        res?.socket?.server?.io?.emit(channelKey,message);
        // console.log(message)
        return res.status(200).json(message)
    } catch (error) {
        console.log("Message Post",error);
        return res.status(500).json({message: "Internal Error"})
    }


}