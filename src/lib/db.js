
import { PrismaClient } from "@prisma/client";
global.prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
    global.prisma = global.prisma;
}

export const db = global.prisma;
// import { PrismaClient } from "@prisma/client";

// // declare global {
// //     var prisma: PrismaClient | undefined;
// // };
// globalThis.prisma = g

// export const db = globalThisprisma || new PrismaClient();

// if(process.env.NODE_ENV !== 'production'){
//     globalThis.prisma = db
// }