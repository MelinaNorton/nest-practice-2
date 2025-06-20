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
        <div className="pt-2 pb-2 pl-4 pr-1 rounded-md justify-self-center max-w-md flex-row shadow-sm shadow-gray-500 font-sans p-6">
            <form onSubmit ={handleSubmit(onSubmit)} className= "flex flex-col gap-4 p-6">
                <div  className="flex items-center">
                    <label htmlFor="firstnameadd" className="font-bold text-gray-600 w-24">Firstname</label>
                    <input 
                    id="firstnameadd"
                    type="text"
                    placeholder="oldname"
                    {...register('firstname')}
                    className="font-bold text-gray-400 border-2 border-gray-200 rounded-md text-center flex-1"
                    />
                </div>
                <div  className="flex items-center">
                    <label htmlFor="newfirstname" className="font-bold text-gray-600 w-24">New Name</label>
                    <input 
                    id="newfirstname"
                    type="text"
                    placeholder="firstname"
                    {...register('newname')}
                    className="font-bold text-gray-400 border-2 border-gray-200 rounded-md text-center flex-1"
                    />
                </div>
                <button type="submit" className=" bg-sky-900 hover:bg-sky-700 shadow-inner rounded-md active:scale-98 font-semibold px-4 transition duration-150 transform hover:scale-95 text-gray-50">Submit</button>
            </form>
            <p className="font-bold text-gray-800 italic">{responseMessage}</p>
        </div>
    );
}
export default PatchName;
