'use client'
import React, { useState }  from "react";
import { useChangeFirstName } from "@/hooks/mutations/peoplemutations";
import { renameSchema } from "@/schemas/renameSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler } from "react-hook-form";

export type patchInputs = {
    newname: string,
    firstname: string
}

const PatchName = () => {
    const [responseMessage, setResponse] = useState("");
    const mutation = useChangeFirstName();

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<patchInputs>({
        resolver: yupResolver(renameSchema),
        defaultValues: {
            newname: '',
            firstname: ''
        }
    })

    const onSubmit: SubmitHandler<patchInputs> = (data) => {
        mutation.mutate({newname: data.newname, firstname: data.firstname},{
            onSuccess: (data) =>{
                setResponse("Successful Patch!");
                reset();
            },
            onError: (data) =>{
                setResponse("Unsuccessful Patch :(!");
            }
        }) 
    }

    return(
        <div className="pt-2 pb-2 pl-4 pr-1 rounded-md justify-self-center max-w-md flex-row shadow shadow-gray-600 font-sans">
            <form onSubmit ={handleSubmit(onSubmit)}>
                <input 
                id="firstname"
                type="text"
                placeholder="oldname"
                {...register('firstname')}
                className="font-bold text-gray-400"
                />
                <input 
                id="newfirstname"
                type="text"
                placeholder="firstname"
                {...register('newname')}
                className="font-bold text-gray-400"
                />
                <br/>
                <br/>
                <button type="submit" className=" bg-sky-900 hover:bg-sky-700 shadow-inner rounded-md active:scale-98 font-semibold px-4 transition duration-150 transform hover:scale-95 text-gray-50">Submit</button>
            </form>
            <p className="font-bold text-gray-800 italic">{responseMessage}</p>
        </div>
    );
}
export default PatchName;
