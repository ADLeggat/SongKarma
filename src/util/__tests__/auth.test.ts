import { IncomingMessage } from "http";
import { generateToken, getPropsOrRedirect, Routes } from "~/util";
import { getSession } from "next-auth/react";

jest.mock("next-auth/react", () => ({
    __esModule: true,
    getSession: jest.fn()
        .mockReturnValueOnce(null)
        .mockReturnValueOnce({ user: {}})
}));

interface RedirectObject {
    redirect: {
        destination: string;
        permanent: boolean;
    }
}

describe("Auth util", () => {

    it("Redirects user to root route if not logged in and going to protected route", async () => {
        const redirectObject = await getPropsOrRedirect(
            {} as IncomingMessage, 
            { path: Routes.PROTECTED[0] }
        )  as RedirectObject;

        expect(redirectObject.redirect.destination).toEqual("/");
    });

    it("Redirects user to myKarma route if logged in and going to landing or auth page", async () => {
        const redirectObject = await getPropsOrRedirect(
            {} as IncomingMessage, 
            { path: "/" }
        )  as RedirectObject;

        expect(redirectObject.redirect.destination).toEqual("/myKarma");
    });

    it("Generates a token", async () => {
        expect(await generateToken(13)).not.toBeNull();
    });
});