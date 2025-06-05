import * as yup from 'yup';

export const signupSchema = yup.object({
    firstname: yup.string().required().max(20),
    email: yup.string().required().max(20),
    lastname: yup.string().required().max(20),
    username: yup.string().required().max(20),
    age: yup.number().required().min(0).max(110),
    isCool: yup.boolean().required(),
    password: yup.string().required().max(20)
});