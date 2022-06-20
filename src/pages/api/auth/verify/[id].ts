import { NextApiResponse } from "next";
import { updateUser } from "~/controllers";
import { Api, ApiRequest, createJsonPayload, GET, PATCH } from "~/util";


async function handler(req: ApiRequest, res: NextApiResponse) {
    switch(req.method) {
        case PATCH:
            const patchUserRes = await updateUser(req);
            return res.status(patchUserRes.statusCode).send(patchUserRes);
        default:
            const notAllowedRes = createJsonPayload(false, Api.METHOD_NOT_ALLOWED);
            return res.status(notAllowedRes.statusCode).send(notAllowedRes);
    }
};

export default handler;