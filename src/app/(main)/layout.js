import NavigationSidebar from "../../components/Navigation/NavigationSidebar.";


const MainLayout = ({ children }) => {
    return (
        <div className="h-full">
            <div className="h-full w-[72px] z-30 fixed inset-y-0">
                <NavigationSidebar></NavigationSidebar>
            </div>
            <main className="pl-[72px] h-full">{children}</main>
        </div >
    );
}

export default MainLayout;