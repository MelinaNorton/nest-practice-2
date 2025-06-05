'use client'
import React, { useState }  from "react";
import axios from "axios";
import { useRouter } from 'next/navigation'
import { useLogIn } from "@/hooks/mutations/peoplemutations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/schemas/loginSchema";
import { SubmitHandler } from "react-hook-form";

export type loginInputs = {
    username: string,
    password: string,
}

const LoginPerson = () => {
    const [response, setResponse] = useState("");
    const router = useRouter();
    const mutation = useLogIn();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<loginInputs>({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const onSubmit: SubmitHandler<loginInputs> = (data) => {
        axios.defaults.withCredentials = true;
        mutation.mutate({username: data.username, password: data.password}, {
            onSuccess: () => {
                setResponse("Successful login!");
                localStorage.setItem("username", data.username);
                router.push("/example/protectedroute");
                reset();
            },
            onError: (error: any) => {
                setResponse("Unsuccessful login :(");
                reset();
            },
        });
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
                    id="Loginpassword"
                    type="password"
                    placeholder="password"
                    {...register('password')}
                    className="font-bold text-gray-400"
                    />
                    <br/>
                    <br/>
                    <button type="submit" className=" bg-sky-900 hover:bg-sky-700 shadow-inner rounded-md active:scale-98 font-semibold px-4 transition duration-150 transform hover:scale-95 text-gray-50">Submit</button>
                    {errors.username && <p className="font-bold text-gray-800 italic">{errors.username.message}</p>}
                    {errors.password && <p className="font-bold text-gray-800 italic">{errors.password.message}</p>}
                    <p className="font-bold text-gray-800 italic">{response}</p>
                </form>
            </div>
    );
}
export default LoginPerson;

