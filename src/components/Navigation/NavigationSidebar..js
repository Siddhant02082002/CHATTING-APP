import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import NavigationAction from "./NavigationAction";
import NavigationItem from "./NavigationItems";
import { Separator } from "@/components/ui/separator"
import NavigationAiChat from "./NavigationAiChat";
const NavigationSidebar = async () => {
    const profile = await currentProfile();
    if (!profile) {
        return redirect("/");
    }
    const servers = await db.server.findMany({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });
    return (
        <div className="flex">
            <div className="flex flex-col bg-zinc-800 w-fit h-screen">
                <NavigationAction></NavigationAction>
                <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-16 mx-auto" />
                <NavigationAiChat profileId = {profile.id}></NavigationAiChat>
                {servers.map((server) =>
                    <NavigationItem AiChat = {true} key={server.id} name={server.name} id={server.id} Logoimg={server.imageUrl}>
                    </NavigationItem>
                )}
            </div>
        </div>
    );
}

export default NavigationSidebar;