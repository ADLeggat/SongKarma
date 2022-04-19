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