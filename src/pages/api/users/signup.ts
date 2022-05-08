import { NextApiResponse } from "next";
import { signup } from "~/controllers/user";
import { ApiRequest, ApiResponse, POST } from "~/util";


async function handler(req: ApiRequest, res: NextApiResponse) {
    switch(req.method) {
        case POST:
            const signupRes = await signup(req, res);
            return res.status(getStatusCode(signupRes)).send(signupRes);
    }
};

const getStatusCode = (signupRes: ApiResponse) => {
    let code = 400;
    
    if(signupRes.success) {
        code = signupRes.data? 201 : 200;
    }

    return code;
}

export default handler;