import { createUploadthing } from "uploadthing/next";
import { auth } from "@clerk/nextjs";
const f = createUploadthing();

const handleAuth = () => {
    const { userId } = auth();
    if (!userId) {
        throw new Error("Unauthorized User");
    }
    return { userId: userId };
}

// FileRouter for your app, can contain multiple FileRoutes
export const OurFileRouter = {
    // Define as many FileRoutes as you like, each with a unique routeSlug
    serverImage: f({ image: { maxFileSize: "4MB" } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => {}),

    messageFile: f(["image", "pdf"])
        .middleware(() => handleAuth())
        .onUploadComplete(() => { })
};
