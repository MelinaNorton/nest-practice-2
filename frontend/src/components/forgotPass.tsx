'use client'
import React, { useState }  from "react";
import NewPassForm from "./newPassForm";
import { useForgotForm1 } from "@/hooks/mutations/peoplemutations";
import { forgotSchema1 } from "@/schemas/forgotSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler } from "react-hook-form";

export type forgotInputs = {
    username : string,
    email : string
}

const ForgotPass = () => {
    const [propsusername, setUsername] = useState("");
    const [response, setResponse] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const mutation = useForgotForm1();
    
    const {
    register,
    handleSubmit,
    formState: {errors},
    } = useForm<forgotInputs>({
        resolver: yupResolver(forgotSchema1),
        defaultValues: {
            username: '',
            email: '',
        } 
    })

    const onSubmit: SubmitHandler<forgotInputs> = (data) => {
        mutation.mutate({username: data.username, email: data.email}, {
            onSuccess: (match) => {
                if(match){
                    setUsername(data.username);
                    setValidEmail(true)
                }
                else{
                    setResponse("no email matches user :(");
                }
                return;
            }
         })
    }
    
    if(validEmail){
        return <NewPassForm username={propsusername} setUsername={setUsername}/>
    }
    return (
        <div className="pt-2 pb-2 pl-4 pr-1 rounded-md justify-self-center max-w-md flex-row shadow shadow-gray-600 font-sans">
            <form onSubmit ={handleSubmit(onSubmit)}>
                <input 
                id="Loginusername"
                type="text"
                placeholder="username"
                {...register('username')}
                className="font-bold text-gray-400"
                />
                <input 
                id="Loginemail"
                type="text"
                placeholder="email"
                {...register('email')}
                className="font-bold text-gray-400"
                />
                <br/>
                <br/>
                <button type="submit" className=" bg-sky-900 hover:bg-sky-700 shadow-inner rounded-md active:scale-98 font-semibold px-4 transition duration-150 transform hover:scale-95 text-gray-50">Submit</button>
                {errors.username && <p className="font-bold text-gray-800 italic">{errors.username.message}</p>}
                {errors.email && <p className="font-bold text-gray-800 italic">{errors.email.message}</p>}
                <p className="font-bold text-gray-800 italic">{response}</p>
            </form>
        </div>
    );
}
export default ForgotPass;
