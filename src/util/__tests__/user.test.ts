import { doCallout, signup } from "~/util";

jest.mock("~/util/api", () => ({
    doCallout: jest.fn()
}));

describe("User util", () => {

    it("Calls the signup API route on user sign up", async () => {
        await signup({});

        expect(doCallout).toBeCalled();
    });
});