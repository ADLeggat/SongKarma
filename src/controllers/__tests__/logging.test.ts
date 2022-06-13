import { NextApiResponse } from "next";
import { PrismaClient, Log } from "@prisma/client";
import { DeepMockProxy, mockDeep, mockReset } from "jest-mock-extended";
import { Api, getPrismaMock, LogContexts, LogTypes } from "~/util";
import prisma from "../../../prisma/prisma";
import { log } from "~/controllers";

jest.mock("../../../prisma/prisma", () => ({
    __esModule: true,
    default: mockDeep<PrismaClient>()
}));

describe("logging", () => {
    const prismaMock = getPrismaMock(prisma);
    
    beforeEach(() => {
        mockReset(prismaMock);
    });

    it("Creates a log when log method called", async () => {
        const logRes = await createLog(prismaMock);

        expect(logRes!.statusCode).toEqual(200);
        expect(logRes!.message).toEqual(Api.SOMETHING_WENT_WRONG);
    });

});

const createLog = async (prismaMock: DeepMockProxy<PrismaClient>) => {
    const logData = {
        userId: "userId",
        type: LogTypes.ERROR,
        context: LogContexts.API,
        message: "error message"
    };

    prismaMock.log.create.mockResolvedValue({...logData, id: "logId",} as Log);

    return await log(logData);
};

