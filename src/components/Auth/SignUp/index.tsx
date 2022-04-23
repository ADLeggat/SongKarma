import { BaseSyntheticEvent } from "react";
import { signIn } from 'next-auth/react';
import { Formik, Field } from 'formik';
import { Button, Col, Form, Row } from "react-bootstrap";
import { attempt, Auth, passwordValidation, userDetailsValidation } from "~/util";
import FieldErrorMessage from "~/components/UI/FieldErrorMessage";

interface Props {
    setHasAccount: (hasAccount: boolean) => void
};

interface FormFields {
    email: string;
    password: string;
    confirmPassword: string;
    username: string;
    artistName: string,
    artistBio?: string;
    profilePic?: string;
    receiveNews: boolean;
}

const index = (props: Props) => {
    const { setHasAccount } = props;

    const validation = userDetailsValidation
        .concat(passwordValidation);

    const initialValues = {
        email: "",
        password: "",
        confirmPassword: "",
        username: "",
        artistName: "",
        artistBio: "",
        profilePic: "", // url to location, e.g. S3 link
        receiveNews: false
    };

    const onSubmit = async (fields: FormFields) => {
        signIn(Auth.CREDENTIALS, {
            email: fields.email,
            password: fields.password
        })
        attempt(() => signUp(fields), () => {});
    };

    const signUp = async (fields: unknown) => {
        const res = await signUp(fields);
    };

    const onImageUpload = (e: BaseSyntheticEvent) => {
        if (!e.target.files) {
            return;
        }
    }

    return (
        <div className="centre mt-5">
            <Col xs={8} md={4}>
                <Row>
                    <Formik
                        validationSchema={validation}
                        onSubmit={onSubmit}
                        initialValues={initialValues}>
                        {({ handleSubmit, handleChange, values, touched, errors }) => (
                            <Form noValidate onSubmit={handleSubmit} id="clientDetailsForm">
                                <Form.Group controlId="email">
                                    <Form.Label className="required">Email</Form.Label>
                                    <Form.Control type="email" name="email" placeholder="email" required 
                                        isInvalid={!!(touched.artistName && errors.artistName)} 
                                        value={values.email} onChange={handleChange}/>
                                    <FieldErrorMessage message={errors.email} touched={touched.email}/>
                                </Form.Group>
                                <Form.Group controlId="password" className="mt-3">
                                    <Form.Label className="required">Password</Form.Label>
                                    <Form.Control type="password" name="password" placeholder="password" 
                                        autoComplete="true" required 
                                        isInvalid={!!(touched.password && errors.password)} 
                                        value={values.password} onChange={handleChange}/>
                                    <FieldErrorMessage message={errors.password} touched={touched.password}/>
                                </Form.Group>
                                <Form.Group controlId="confirmPassword" className="mt-3">
                                    <Form.Label className="required">Confirm Password</Form.Label>
                                    <Form.Control type="password" name="confirmPassword" placeholder="confirm password"
                                        isInvalid={!!(touched.confirmPassword && errors.confirmPassword)} 
                                        value={values.confirmPassword} onChange={handleChange} />
                                    <FieldErrorMessage message={errors.confirmPassword} touched={touched.confirmPassword}/>
                                </Form.Group>
                                <Form.Group controlId="username" className="mt-3">
                                    <Form.Label className="required">Username</Form.Label>
                                    <Form.Control type="text" name="username" placeholder="username" required 
                                        isInvalid={!!(touched.username && errors.username)} 
                                        value={values.username} onChange={handleChange}/>
                                    <FieldErrorMessage message={errors.username} touched={touched.username}/>
                                </Form.Group>
                                <Form.Group controlId="artistName" className="mt-3">
                                    <Form.Label className="required">Artist Name</Form.Label>
                                    <Form.Control type="text" name="artistName" placeholder="artist name" required 
                                        isInvalid={!!(touched.artistName && errors.artistName)} 
                                        value={values.artistName} onChange={handleChange}/>
                                    <FieldErrorMessage message={errors.artistName} touched={touched.artistName}/>
                                </Form.Group>
                                <Form.Group controlId="artistBio" className="mt-3">
                                    <Form.Label>Artist Bio</Form.Label>
                                    <Form.Control as="textarea" name="artistBio" placeholder="artist bio" rows={3}
                                        isInvalid={!!(touched.artistBio && errors.artistBio)} 
                                        value={values.artistBio} onChange={handleChange}/>
                                    <FieldErrorMessage message={errors.artistBio} touched={touched.artistBio}/>
                                </Form.Group>
                                <Form.Group controlId="profilePic" className="mt-3">
                                    <Form.Label>Profile Picture</Form.Label>
                                    <Form.Control type="file" name="profilePic" onChange={(e) => onImageUpload(e)}/>
                                </Form.Group>
                                <Form.Group controlId="receiveNews" className="mt-3">
                                    <Field id="receiveNews" type="checkbox" name="receiveNews" onChange={handleChange}/>
                                    <label htmlFor="receiveNews">
                                        Receive News
                                    </label>
                                </Form.Group>
                                <Form.Group>
                                    <Button type="submit" className="mt-3 btn btn-block">
                                        Sign Up
                                    </Button>
                                </Form.Group>
                            </Form>
                        )}
                    </Formik>
                </Row>
                <Row>
                    <span>
                        Already have an account? <a onClick={() => setHasAccount(true)}>Sign in</a>
                    </span>
                </Row>
            </Col>
        </div>
    );
}

export default index;