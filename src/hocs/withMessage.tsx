import { AppProps } from "next/app";
import { useState } from "react";
import { MessageModal } from "~/components/Modals";

interface MessageData {
    title?: string;
    variant?: string;
    message?: string;
};

function index(WrappedComponent: any) {
    return (props: AppProps) => {
        const [messageData, setMessageData] = useState<MessageData|null>(null);

        const updateMessage = (setShowModal: Function|null, success: boolean, message: string) => {
            setShowModal && setShowModal(null);
            setMessageData({
                title: success? "Success" : "Error",
                variant: success? "success" : "danger",
                message: message
            });
        };

        return(
            <>
                <MessageModal title={messageData?.title} variant={messageData?.variant} message={messageData?.message} 
                    showModal={messageData !== null} onHide={() => setMessageData(null)}/>

                <WrappedComponent {...props} updateMessage={updateMessage}/>
            </>
        );
    }

};

export default index;