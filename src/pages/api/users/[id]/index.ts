import { NextApiResponse } from "next";
import { getUser } from "~/controllers/user";
import { Api, ApiRequest, createJsonPayload, GET } from "~/util";


async function handler(req: ApiRequest, res: NextApiResponse) {
    switch(req.method) {
        case GET:
            const getUserRes = await getUser(req);
            return res.status(getUserRes.statusCode).send(getUserRes);
        default:
            const notAllowedRes = createJsonPayload(false, Api.METHOD_NOT_ALLOWED);
            return res.status(notAllowedRes.statusCode).send(notAllowedRes);
    }
};

export default handler;