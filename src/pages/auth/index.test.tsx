import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from "@testing-library/react";
import Auth from ".";

describe("Auth page", () => {

    it("Initially renders the sign in form", () => {
        // @ts-ignore
        const { container } = render(<Auth/>);

        const signInForm = container.querySelector("#signInForm");
        expect(signInForm).toBeInTheDocument();

        const signUpForm = container.querySelector("#signUpForm");
        expect(signUpForm).not.toBeInTheDocument();
    });

    it("Renders the sign up form when the sign up link is clicked", () => {
        // @ts-ignore
        const { container, getByText } = render(<Auth/>);
        fireEvent.click(getByText("Sign up"));

        const signUpForm = container.querySelector("#signUpForm");
        expect(signUpForm).toBeInTheDocument();

        const signInForm = container.querySelector("#signInForm");
        expect(signInForm).not.toBeInTheDocument();
    });
});