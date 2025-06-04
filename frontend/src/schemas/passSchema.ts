import * as yup from 'yup';

export const passSchema = yup.object({
    pass: yup.string().required().max(20),
    checkPass: yup.string().required().max(20),
})