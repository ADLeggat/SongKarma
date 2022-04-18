import styles from "./index.module.scss";

interface Props {
    message?: string;
    touched?: boolean;
}

function ErrorMessage({ message, touched }: Props) {
    return (
        <>
            {message && touched &&
                <div className={styles.invalid}>
                    {message}
                </div>
            }
        </>
    );
}

export default ErrorMessage; 