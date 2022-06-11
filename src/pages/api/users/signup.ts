import { NextApiResponse } from "next";
import { signup } from "~/controllers/user";
import { Api, ApiRequest, createJsonPayload, POST } from "~/util";


async function handler(req: ApiRequest, res: NextApiResponse) {
    switch(req.method) {
        case POST:
            const signupRes = await signup(req, res);
            return res.send(signupRes);
        default:
            const notAllowedRes = createJsonPayload(false, Api.METHOD_NOT_ALLOWED);
            return res.status(notAllowedRes.statusCode).send(notAllowedRes);
    }
};

export default handler;