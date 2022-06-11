import { Formik } from 'formik';
import { Button, Col, Form, Row } from "react-bootstrap";
import { 
    Api, Auth, doCallout, LogContexts, LOGGING_URI, LogTypes, POST, Routes, tryCatch, UserLoginFormFields, 
    userSignInValidation 
} from "~/util";
import { FieldErrorMessage } from "~/components/UI";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "./index.module.scss";

interface Props {
    setHasAccount(hasAccount: boolean): void;
    updateMessage(setShowModal: Function|null, success: boolean, message: string): void;
    userId: string;
}

const index = (props: Props) => {
    const { setHasAccount, updateMessage, userId } = props;

    const router = useRouter();

    const initialValues = {
        email: "",
        password: ""
    };

    const onSubmit = (fields: UserLoginFormFields) => {
        tryCatch(
            async () => await doSignIn(fields), 
            async (err) => {
                const res = await doCallout(POST, LOGGING_URI, {
                    email: fields.email,
                    type: LogTypes.ERROR,
                    context: LogContexts.CLIENT,
                    message: err.message
                });
                updateMessage(null, false, res.message);
            }
        );
    };

    const doSignIn = async (fields: UserLoginFormFields) => {
        const res = await signIn(Auth.CREDENTIALS, {
            redirect: false,
            email: fields.email,
            password: fields.password
        }); 

        // @ts-ignore
        if(res.error) {
            // @ts-ignore
            updateMessage(null, false, res.error); 
        } else {
            router.push(Routes.MY_KARMA);
        }
    };

    return (
        <div className="centre mt-5">
            <Col xs={8} md={4}>
                <Row>
                    <Formik
                        validationSchema={userSignInValidation}
                        onSubmit={onSubmit}
                        initialValues={initialValues}>
                        {({ handleSubmit, handleChange, values, touched, errors }) => (
                            <Form noValidate onSubmit={handleSubmit} id="signInForm">
                                <Form.Group controlId="email">
                                    <Form.Control type="email" name="email" placeholder="email" required 
                                        isInvalid={!!(touched.email && errors.email)} 
                                        value={values.email} onChange={handleChange}/>
                                    <FieldErrorMessage message={errors.email} touched={touched.email}/>
                                </Form.Group>
                                <Form.Group controlId="password" className="mt-3">
                                    <Form.Control type="password" name="password" placeholder="password" 
                                        autoComplete="true" required 
                                        isInvalid={!!(touched.password && errors.password)} 
                                        value={values.password} onChange={handleChange}/>
                                    <FieldErrorMessage message={errors.password} touched={touched.password}/>
                                </Form.Group>
                                <Form.Group >
                                    <Button type="submit" className={`mt-3 btn ${styles.Button}`}>
                                        Sign In
                                    </Button>
                                </Form.Group>
                            </Form>
                        )}
                    </Formik>
                </Row>
                <Row>
                    <span>
                        Don't have an account? <a onClick={() => setHasAccount(false)}>Sign up</a>
                    </span>
                </Row>
            </Col>
        </div>
    );
}

export default index;