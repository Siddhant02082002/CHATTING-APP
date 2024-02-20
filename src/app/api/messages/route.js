import { currentProfile } from "@/lib/current-profile";

export async function GET(req){

    try {
        const profile = await currentProfile();

        const {searchParams} = new URL(req.url);

        const cursor = searchParams.get("cursor");
        const channelId = searchParams.get("channelId");
    } catch (error) {
        
    }
}