import { PrismaClient } from "@prisma/client";
import { getPrismaMock } from "~/util";

declare global {
    var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient({ log: ["info"] });

if(process.env.NODE_ENV !== "test") {
    global.prisma = prisma;
} else {
    global.prisma = getPrismaMock(prisma);
}

export default prisma;