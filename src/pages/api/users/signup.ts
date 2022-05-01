import { NextApiResponse } from "next";
import { signup } from "~/controllers/user";
import { ApiRequest, POST } from "~/util";


async function handler(req: ApiRequest, res: NextApiResponse) {
    switch(req.method) {
        case POST:
            const signupRes = await signup(req, res);
            return res.send(signupRes);
    }
};

export default handler;