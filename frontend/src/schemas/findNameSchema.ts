import * as yup from 'yup'

export const findNameSchema = yup.object({
    tempname: yup.string().required().max(20)
})