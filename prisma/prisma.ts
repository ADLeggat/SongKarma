import { PrismaClient } from "@prisma/client";
import { getPrismaMock } from "~/util";

declare global {
    var prisma: PrismaClient
}

const createPrismaClient = () => {
    const prisma = new PrismaClient();

    if(process.env.NODE_ENV === "test") {
        return getPrismaMock(prisma);
    }

    return prisma;
};

if (process.env.NODE_ENV === "production") {
    prisma = createPrismaClient();
} else {
    if (!global.prisma) {
        global.prisma = createPrismaClient();
        // if(process.env.NODE_ENV === "test") {
        //     global.prisma = prismaMock;
        // } else {
        //     global.prisma = new PrismaClient();
        // }
    }
    prisma = global.prisma;
}

export default prisma;
