
import { db } from "./db";
import { getAuth } from "@clerk/nextjs/server";

export const currentProfilePages = async (req) => {
    const { userId } = getAuth(req);
    if (!userId) {
        return null;
    }
    const profile = await db.profile.findUnique({
        where: {
            userId: userId
        }
    });
    return profile;
}