import { NextApiResponse } from "next";
import { hashSync } from "bcryptjs";
import { PrismaClient, User } from "@prisma/client";
import { DeepMockProxy, mockDeep, mockReset } from "jest-mock-extended";
import httpMocks from "node-mocks-http";
import { login, signup } from "~/controllers";
import { ApiRequest, getPrismaMock, userDetailsValidation } from "~/util";
import prisma from "../../../prisma/prisma";
import { getSession } from "next-auth/react";

jest.mock("../../../prisma/prisma", () => ({
    __esModule: true,
    default: mockDeep<PrismaClient>()
}));

jest.mock("next-auth/react", () => ({
    __esModule: true,
    getSession: jest.fn()
}));

describe("signup", () => {
    const prismaMock = getPrismaMock(prisma);
    
    beforeEach(() => {
        mockReset(prismaMock);
    });

    it("Allows a user to sign up", async () => {
        const mockReq = createUserReq();
        const signupRes = await createUser(prismaMock, mockReq, false);

        expect(signupRes.statusCode).toEqual(201);
        expect(signupRes.success).toEqual(true);
        expect(signupRes.data.username).toEqual(mockReq.body.username);
    });

    it("Prevents user sign up if email already in use", async () => {
        const mockReq = createUserReq();
        const signupRes = await createUser(prismaMock, mockReq, true);

        expect(signupRes.statusCode).toEqual(200);
        expect(signupRes.success).toEqual(false);
    });

    it("Allows a user to log in", async () => {
        const credentials = getLogInCredentials(true);
        const logInRes = await doLogin(prismaMock, credentials, true);
        
        expect(logInRes.statusCode).toEqual(200);
        expect(logInRes.success).toEqual(true);
    });

    it("Prevents user log in with wrong password", async () => {
        const credentials = getLogInCredentials(false);
        const logInRes = await doLogin(prismaMock, credentials, true);
        
        expect(logInRes.statusCode).toEqual(200);
        expect(logInRes.success).toEqual(false);
    });

    it("Prevents login if user doesn't exist", async () => {
        const credentials = getLogInCredentials(true);
        const logInRes = await doLogin(prismaMock, credentials, false);
        
        expect(logInRes.statusCode).toEqual(200);
        expect(logInRes.success).toEqual(false);
    });
});

const createUser = async (
        prismaMock: DeepMockProxy<PrismaClient>, 
        mockReq: ApiRequest,
        hasExistingUser: boolean
    ) => {
    const mockRes = httpMocks.createRequest<NextApiResponse>();

    prismaMock.user.findUnique.mockResolvedValue(getUser(hasExistingUser) as User);
    prismaMock.user.create.mockResolvedValue(mockReq.body);

    return await signup(mockReq, mockRes);
};

const createUserReq = () => {
    const mockReq = httpMocks.createRequest<ApiRequest>();
    mockReq.body = {
        email: "test@test.com",
        password: "password",
        confirmPassword: "password",
        username: "username",
        artistName: "artistName",
        artistBio: "artistBio",
        receiveNews: true,
        isEmailVerified: false,
        authToken: "authToken"
    };
    mockReq.validations = userDetailsValidation;
    
    return mockReq;
};

const getLogInCredentials = (useCorrectPassword: boolean) => {
    const password = useCorrectPassword? "password" : "incorrect";
    return {
        email: "test@test.com",
        password,
    };
};

const doLogin = async (
        prismaMock: DeepMockProxy<PrismaClient>, 
        credentials: Record<string, string>,
        hasExistingUser: boolean
    ) => {

    prismaMock.user.findUnique.mockResolvedValue(getUser(hasExistingUser) as User);

    return await login(credentials);
};

const getUser = (hasExistingUser: boolean) => {
    if(hasExistingUser) {
        return { email: "test@test.com", password: hashSync("password", 12) };
    }
    return null;
}

