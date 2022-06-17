import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Auth, getUser } from "~/util";
import Layout from "~/components/Layout";
import { withMessage } from "~/hocs";

interface Props {
    updateMessage(setShowModal: Function|null, success: boolean, message: string): void; 
}
const index = (props: Props) => {
    const { updateMessage } = props;
    const router = useRouter();
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        verifyUser();
    }, [router.isReady]);

    const verifyUser = async () => {
        if(router.isReady) {
            const res = await getUser(router.query.authToken as string, true);
            if(res.data) {
                setIsVerified(true);
            } else {
                updateMessage(null, false, Auth.TOKEN_EXPIRED);
            }
        }
    };

    return (
        <Layout path="/auth/verify/[authToken]" title="Verify">
            <p className="centre mt-5">
                {isVerified?
                    "Thank you for signing up. You can now log into SongKarma." :
                    "SpinnerComponent"
                }
            </p>
        </Layout>
    );
}

export default withMessage(index);