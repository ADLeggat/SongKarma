interface Props {
    setHasAccount: (hasAccount: boolean) => void
}

const index = (props: Props) => {
    const { setHasAccount } = props;

    return (
        <div className="d-flex justify-content-center">
            Already have an account? <a onClick={() => setHasAccount(true)}>Sign in</a>
        </div>
    );
}

export default index;