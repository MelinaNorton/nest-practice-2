import * as yup from 'yup';

export const loginSchema = yup.object({
    username: yup.string().required().length(20),
    password: yup.string().required().length(20),
});