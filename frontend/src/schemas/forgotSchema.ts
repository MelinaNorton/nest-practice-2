import * as yup from 'yup';

export const forgotSchema1 = yup.object({
    username: yup.string().required().max(20),
    email: yup.string().required().max(20),
})

