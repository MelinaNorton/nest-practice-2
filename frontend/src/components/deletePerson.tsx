'use client'
import React, { useState }  from "react";
import { useDeletePerson } from "@/hooks/mutations/peoplemutations";
import { deleteSchema } from "@/schemas/deleteSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler } from "react-hook-form";

export type deleteInputs = {
    firstname: string,
    lastname: string,
    username: string
}

const DeletePerson = () => {
    const [response, setResponse] = useState("");
    const mutation = useDeletePerson();

    const {
            register,
            handleSubmit,
            reset,
            formState: { errors },
        } = useForm<deleteInputs>({
            resolver: yupResolver(deleteSchema),
            defaultValues: {
                firstname: '',
                lastname: '',
                username: ''
            },
        });

     const onSubmit: SubmitHandler<deleteInputs> = (data) =>{
        mutation.mutate({firstname : data.firstname},{
            onSuccess: (data) => {
                setResponse("Successful Delete!");
            },
            onError: (data) => {
                setResponse("Unsuccessful Delete :(");
            }
        }) 
    }    

    return(
                <div className="pt-2 pb-2 pl-4 pr-1 rounded-md justify-self-center max-w-md flex-row shadow shadow-gray-600 font-sans">
            <form onSubmit={handleSubmit(onSubmit)}>
                <input 
                id="deletefirstname"
                type="text"
                placeholder="firstname"
                {...register('firstname')}
                className="font-bold text-gray-400"
                />
                <input 
                id="deletelastname"
                type="text"
                placeholder="lastname"
                {...register('lastname')}
                className="font-bold text-gray-400"
                />
                <input 
                id="deleteusername"
                type="text"
                placeholder="username"
                {...register('username')}
                className="font-bold text-gray-400"
                />
                <br/>
                <br/>
                <button type="submit" className=" bg-sky-900 hover:bg-sky-700 shadow-inner rounded-md active:scale-98 font-semibold px-4 transition duration-150 transform hover:scale-95 text-gray-50">Submit</button>
            </form>
            {errors.username && <p className="font-bold text-gray-800 italic">{errors.username.message}</p>}
            {errors.lastname && <p className="font-bold text-gray-800 italic">{errors.lastname.message}</p>}
            {errors.firstname && <p className="font-bold text-gray-800 italic">{errors.firstname.message}</p>}
            <p className="font-bold text-gray-800 italic">{response}</p>
        </div>
    );
}
export default DeletePerson;
