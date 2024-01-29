import { initialProfile } from "@/lib/inital-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { InitialServerCreateModal } from "@/components/modals/InitialServerCreateModal";
const SetupPage = async () => {

    const profile = await initialProfile();

    const server = await db.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })

    if (server) {
        return redirect(`/servers/${server.id}`);
    }
    return (

        <div>
            <InitialServerCreateModal></InitialServerCreateModal>
            {/* <UserButton afterSignOutUrl="/sign-in"></UserButton> */}
        </div>
        // <div>
        //     <h1>create server</h1>
        //     <Button>HELLp</Button>
        // </div>
    )

}
export default SetupPage;