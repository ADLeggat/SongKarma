import { NextApiRequest, NextApiResponse } from "next";
import { POST } from "~/util";


async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch(req.method) {
        case POST:
            return res.send({success: true});
    }
};

export default handler;