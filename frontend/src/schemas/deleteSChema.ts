import * as yup from 'yup'

export const deleteSchema = yup.object({
    firstname: yup.string().required().max(20),
    lastname: yup.string().required().max(20),
    username: yup.string().required().max(20)
})