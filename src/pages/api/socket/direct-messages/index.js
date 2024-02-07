
import { currentProfilePages } from "@/lib/currentProfilePage";;
import { db } from "@/lib/db";

export default async function handler(req,res){

    if(req.method !== "POST"){
        return res.status(405).json({error:"Method Not allowed"})
    }
    try{
        const profile = await currentProfilePages(req);
        console.log(profile)
        if(!profile){
            return res.status(401).json({error:"Unauthorized"})
        }
        const {content,fileUrl} = req.body;
        const {conversationId} = req.query;
        if(!conversationId){
            return res.status(401).json({error:"conversationId Missing"});
        }
        
        if(!content){
            return res.status(401).json({error:"connot allow empty content"});
        }
        
        const conversation = await db.conversation.findFirst({
            where:{
                id: conversationId,
                OR:[
                    {
                        memberOne: {
                            profileId: profile.id,
                        }
                    },
                    {
                        memberTwo:{
                            profileId: profile.id,
                        }
                    }
                ]
            },
            include:{
                memberOne:{
                    include:{
                        profile: true,
                    }
                },
                memberTwo:{
                    include:{
                        profile: true,
                    }
                }
            }
        })
        
        // console.log("conversationId",conversation)
        // if(!conversation){
        //     return res
        // }

        const member = conversation.memberOne.profileId === profile.id? conversation.memberOne:conversation.memberTwo

        const message = await db.directMessage.create({
            data:{
                content: content,
                fileUrl: fileUrl,
                conversationId: conversationId,
                memberId: member.id
            },
            include:{
                member: {
                    include:{
                        profile: true,
                    }
                }
            }
        });

        const channelKey = `chat:${conversationId}:messages`;

        res?.socket?.server?.io?.emit(channelKey,message);
        return res.status(200).json(message);
    }
    catch(e){
        console.log(e);
        return res.status(500).json({message: "Internal Error"})
    }
}