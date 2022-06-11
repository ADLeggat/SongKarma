import { NextApiResponse } from "next";
import { log } from "~/controllers";
import { Api, ApiRequest, createJsonPayload, LogData, POST } from "~/util";


async function handler(req: ApiRequest, res: NextApiResponse) {
    switch(req.method) {
        case POST:
            await log(req.body);
            return res.send(createJsonPayload(false, Api.SOMETHING_WENT_WRONG));
            break;
        default:
            const notAllowedRes = createJsonPayload(false, Api.METHOD_NOT_ALLOWED);
            return res.status(notAllowedRes.statusCode).send(notAllowedRes);
    }
};

export default handler;