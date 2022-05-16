import { PrismaClient } from "@prisma/client";
import { DeepMockProxy } from "jest-mock-extended";

export const getPrismaMock = (prisma: PrismaClient) => {
    return prisma as unknown as DeepMockProxy<PrismaClient>;
};