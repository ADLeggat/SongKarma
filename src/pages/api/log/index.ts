import { NextApiResponse } from "next";
import { log } from "~/controllers";
import { Api, ApiRequest, createJsonPayload, POST } from "~/util";


async function handler(req: ApiRequest, res: NextApiResponse) {
    switch(req.method) {
        case POST:
            const loggingRes = await log(req.body);
            return res.status(loggingRes!.statusCode).send(loggingRes);
            break;
        default:
            const notAllowedRes = createJsonPayload(false, Api.METHOD_NOT_ALLOWED);
            return res.status(notAllowedRes.statusCode).send(notAllowedRes);
    }
};

export default handler;