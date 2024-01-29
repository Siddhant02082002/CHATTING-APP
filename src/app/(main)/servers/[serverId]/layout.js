import ServerSidebar from "@/components/ServerSideBar/ServerSidebar";
const ServerIdLayout = ({ children, params }) => {
    return (
        <div className="h-full">
            <div
                className="flex h-full w-60 z-20 flex-col fixed inset-y-0">
                <ServerSidebar serverId={params.serverId} />
            </div>
            <main className="h-full md:pl-60">
                {children}
            </main>
        </div>
    );
}

export default ServerIdLayout;