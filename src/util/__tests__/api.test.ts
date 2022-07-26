import axios from "axios";
import { createJsonPayload, Crud, doCallout, GET } from "~/util";

jest.mock("axios", () => ({
    __esModule: true,
    default: jest.fn()
        .mockReturnValueOnce({ statusText: "OK", data: { callout: "SUCCESS"} })
        .mockReturnValueOnce({ statusText: "ERROR", data: {} })
}));

describe("Api util", () => {

    it("Returns data when callout successful", async () => {
        const data = await doCallout(GET, "www.my-api.com");

        expect(axios).toBeCalled();
        expect(data.callout).toEqual("SUCCESS");
    });

    it("Throws an error when callout not successful", async () => {
        let errorMessage: string;

        try {
            await doCallout(GET, "www.my-api.com");
        } catch(err) {
            errorMessage = (err as Error).message;

            expect(axios).toBeCalled();
            expect(errorMessage!).toEqual("ERROR");
        }
    });

    it("Creates a json payload with 201 status code on resource creation", () => {
        const payload = createJsonPayload(true, Crud.CREATED, { data: Crud.CREATED });

        expect(payload.statusCode).toEqual(201);
    });

    it("Creates a json payload with 200 status code on NOT resource creation", () => {
        const payload = createJsonPayload(true, Crud.UPDATED, { data: Crud.UPDATED });

        expect(payload.statusCode).toEqual(200);
    });
})