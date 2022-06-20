import styles from "./index.module.scss"

interface Props {
    withBackdrop?: boolean;
}

const index = (props: Props) => {
    const { withBackdrop } = props;

    return (
        <>
            { withBackdrop && <div className={styles.backdrop}></div> }
            <div className={styles.loader}>Loading...</div>
        </>
    );
}

export default index;