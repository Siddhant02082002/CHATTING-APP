import ServerSidebar from "@/components/ServerSideBar/ServerSidebar";
const ServerIdLayout = ({ children, params }) => {
    return (
        <div className="h-full">
            <div
                className="hidden md:flex w-60 flex-col fixed inset-y-0">
                <ServerSidebar serverId={params.serverId} />
            </div>
            <main className="md:pl-60 h-full">
                {children}
            </main>
        </div>
    );
}

export default ServerIdLayout;