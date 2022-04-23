import * as yup from 'yup';
import { UserEntity } from "./constants";

const isRequired = (table: string, field: string) => {
    const formattedTable = table === "user"? "": `${table}'s`;
    return `Please enter your ${formattedTable} ${field}`;
};

export const userSignInValidation = yup.object().shape({
    email: yup.string().trim().required(isRequired(UserEntity.TABLE_NAME, UserEntity.EMAIL)),
    password: yup.string().trim().required(isRequired(UserEntity.TABLE_NAME, UserEntity.PASSWORD))
});

export const userDetailsValidation = yup.object().shape({
    email: yup.string().trim().required(isRequired(UserEntity.TABLE_NAME, UserEntity.EMAIL)),
    username: yup.string().trim().required(isRequired(UserEntity.TABLE_NAME, UserEntity.USERNAME)),
    artistName: yup.string().trim().required(isRequired(UserEntity.TABLE_NAME, UserEntity.ARTIST_NAME))
});

export const passwordValidation = yup.object().shape({
    password: yup.string().trim().required(isRequired(UserEntity.TABLE_NAME, UserEntity.PASSWORD)),
    confirmPassword: yup.string().trim()
        .oneOf([yup.ref(UserEntity.PASSWORD)], UserEntity.PASSWORDS_MUST_MATCH)
        .required(isRequired(UserEntity.TABLE_NAME, UserEntity.PASSWORD_CONFIRMATION)),
});