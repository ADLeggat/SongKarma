import { NextApiResponse } from "next";
import { log } from "~/controllers";
import { Api, ApiRequest, createJsonPayload, POST } from "~/util";


async function handler(req: ApiRequest, res: NextApiResponse) {
    console.log("API REQ BODY: ", req.body);
    switch(req.method) {
        case POST:
            await log({
                type: req.body.type,
                context: req.body.context,
                message: req.body.message
            });
        default:
            const notAllowedRes = createJsonPayload(false, Api.METHOD_NOT_ALLOWED);
            return res.status(notAllowedRes.statusCode).send(notAllowedRes);
    }
};

export default handler;