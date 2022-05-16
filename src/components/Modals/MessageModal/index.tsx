import { Modal } from "~/components/UI";
import { Alert } from "react-bootstrap"

interface Props {
    message: string|undefined;
    onHide(): void;
    showModal: boolean;
    title: string|undefined;
    variant: string|undefined;
};

function index(props: Props) {
    const { message, onHide, showModal, title, variant } = props;
    return (
        <Modal title={title} showModal={showModal} onHide={onHide}>
            <Alert variant={variant}>
                {message}
            </Alert>
        </Modal>
    );
}

export default index;