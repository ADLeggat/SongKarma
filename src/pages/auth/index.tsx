import { useState } from "react";
import Layout from "~/components/Layout";
import SignIn from "~/components/Auth/SignIn";
import SignUp from "~/components/Auth/SignUp";

const index = () => {
    const [hasAccount, setHasAccount] = useState(true);

    return (
        <Layout path="auth" title="Auth">
            {hasAccount ? 
                <SignIn setHasAccount={setHasAccount}/> : 
                <SignUp setHasAccount={setHasAccount}/>
            }
        </Layout>
    );
}

export default index;