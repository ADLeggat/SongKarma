import { Formik } from 'formik';
import { Button, Col, Form, Row } from "react-bootstrap";
import { Auth, Routes, tryCatchAsync, UserLoginFormFields, userSignInValidation } from "~/util";
import { FieldErrorMessage } from "~/components/UI";
import { signIn } from "next-auth/react";
import Router from "next/router";

interface Props {
    setHasAccount(hasAccount: boolean): void;
    updateMessage(setShowModal: Function|null, success: boolean, message: string): void;
}

const index = (props: Props) => {
    const { setHasAccount, updateMessage } = props;

    const initialValues = {
        email: "",
        password: ""
    };

    const onSubmit = (fields: UserLoginFormFields) => {
        tryCatchAsync(() => doSignIn(fields), () => {});
    };

    const doSignIn = async (fields: UserLoginFormFields) => {
        const res = await signIn(Auth.CREDENTIALS, {
            redirect: false,
            email: fields.email,
            password: fields.password
        }) ; 

        // @ts-ignore
        if(res.error) {
            // @ts-ignore
            updateMessage(null, false, res.error); 
        } else {
            Router.push(Routes.MY_KARMA);
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
                            <Form noValidate onSubmit={handleSubmit} id="clientDetailsForm">
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
                                <Form.Group>
                                    <Button type="submit" className="mt-3 btn btn-block">
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