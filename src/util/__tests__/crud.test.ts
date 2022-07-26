import { getSession } from "next-auth/react";
import { ApiRequest, createJsonPayload, createWithValidation, doCallout, UserEntity, validate } from "~/util";

jest.mock("next-auth/react", () => ({
    __esModule: true,
    getSession: jest.fn()
        .mockReturnValueOnce(null)
        .mockReturnValueOnce({ user: {}})
}));

jest.mock("~/util/api", () => ({
    doCallout: jest.fn(),
    createJsonPayload: jest.fn()
}));

jest.mock("~/util/formValidation", () => ({
    validate: jest.fn()
        .mockReturnValueOnce([])
        .mockReturnValueOnce(["Error message"])
        .mockReturnValueOnce([])
}));

describe("Crud util", () => {

    it("Returns a call a creation method on resource creation", async () => {
        const createMethod = jest.fn();

        await createWithValidation({} as ApiRequest, UserEntity.TABLE_NAME, createMethod);

        expect(createMethod).toBeCalled();
    });

    it("Returns an error message on validation error", async () => {
        const createMethod = jest.fn();

        const errorMessage = await createWithValidation({} as ApiRequest, UserEntity.TABLE_NAME, createMethod);

        expect(errorMessage).toContain("Error message");
    });

    it("Returns a json payload and creates a log on failed resource creation", async () => {
        const createMethod = jest.fn().mockRejectedValue(new Error());

        await createWithValidation(
            { body: { email: "email"} } as ApiRequest, 
            UserEntity.TABLE_NAME, 
            createMethod
        );

        expect(doCallout).toBeCalled();
        expect(createJsonPayload).toBeCalled();
    });
});