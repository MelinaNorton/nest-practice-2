import * as yup from 'yup'

export const renameSchema = yup.object({
    oldname: yup.string().required().max(20),
    firstname: yup.string().required().max(20),
})