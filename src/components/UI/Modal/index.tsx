import { Modal } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import styles from "./index.module.scss";

interface Props {
    children: React.ReactNode;
    onHide(): void;
    showModal: boolean;
    title: string|undefined;
};

function index(props: Props) {
    const { children, onHide, showModal, title } = props;
    return (
        <Modal show={showModal} onHide={onHide}>
            <Modal.Body className={styles.ModalBody}>
                 <h5 className="modal-title text_header mb-3 d-flex justify-content-between">
                     {title}
                     <span className={styles.Cross} onClick={onHide}>
                         <FaTimes/>
                     </span>
                 </h5>
                 {children}
            </Modal.Body>
        </Modal>
    );
}

export default index;