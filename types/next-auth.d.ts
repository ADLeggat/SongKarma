import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
// import { ObjectId } from "mongodb";

declare module "next-auth" {
    interface Session {
        user: User;
    }

    interface User {
        username: string;
        password: string;
    }
}
