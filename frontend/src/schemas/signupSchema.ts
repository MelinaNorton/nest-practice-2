import * as yup from 'yup';

export const signupSchema = yup.object({
    firstname: yup.string().required().length(20),
    email: yup.string().required().length(20),
    lastname: yup.string().required().length(20),
    username: yup.string().required().length(20),
    age: yup.number().required().max(110),
    isCool: yup.boolean(),
    password: yup.string().required().max(20)
})