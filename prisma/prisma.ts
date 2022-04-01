import { PrismaClient } from "@prisma/client";

class db {
    static prisma: PrismaClient;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
} else {
    if (!db.prisma) {
        db.prisma = new PrismaClient();
    }
    prisma = db.prisma;
}

export default prisma;
