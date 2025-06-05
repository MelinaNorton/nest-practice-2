'use client'
import React, { useState } from "react";
import { useSignUp } from "@/hooks/mutations/peoplemutations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "@/schemas/signupSchema";
import { SubmitHandler } from "react-hook-form";

export type signupInputs = {
    firstname : string,
    lastname: string,
    username : string,
    email: string,
    age : number,
    password: string,
    isCool : boolean
}

const AddPerson = () => {
    const [responseMessage, setResponse] = useState("");
    const mutation = useSignUp();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<signupInputs>({
        resolver: yupResolver(signupSchema),
        defaultValues: {
            firstname: '',
            email: '',
            lastname: '',
            username: '',
            age: 0,
            isCool: false,
            password: '',

        },
    });
          
    const onSubmit: SubmitHandler<signupInputs> = (data) => {
        mutation.mutate({firstname:data.firstname, lastname:data.lastname, username:data.username, email:data.email, password:data.password, age:data.age, isCool:data.isCool}, {
            onSuccess: (data) => {
                setResponse("Created New User!");
            },
            onError: (error: any) => {
                setResponse("Unsuccessful Post :(!");
            }
        })
    }

    return (
        <div className="pb-2 pl-4 pr-1 pt-2 rounded-md justify-self-center max-w-md flex-row shadow shadow-gray-600 font-sans">
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    id="firstname"
                    type="text"
                    placeholder="firstname"
                    {...register('firstname')}
                    className="font-bold text-gray-400"
                />
                <input
                    id="lastname"
                    type="text"
                    placeholder="lastname"
                    {...register('lastname')}
                    className="font-bold text-gray-400"
                />
                <input
                    id="username"
                    type="text"
                    placeholder="username"
                    {...register('username')}
                    className="font-bold text-gray-400"
                />
                <input
                    id="email"
                    type="text"
                    placeholder="email"
                    {...register('email')}
                    className="font-bold text-gray-400"
                />
                <input
                    id="password"
                    type="password"
                    placeholder="password"
                    {...register('password')}
                    className="font-bold text-gray-400"
                />
                <input
                    id="age"
                    type="number"
                    placeholder="age"
                    {...register('age')}
                    className="font-bold text-gray-400"
                />
                <br/>
                <br/>
                <input
                    id="isCool"
                    type="checkbox"
                    placeholder="cool status"
                    {...register('isCool')}
                />
                <br/>
                <br/>
                <button type="submit" className=" bg-sky-900 hover:bg-sky-700 shadow-inner rounded-md active:scale-98 font-semibold px-4 transition duration-150 transform hover:scale-95 text-gray-50" >Submit</button>
            </form>
            {errors.username && <p className="font-bold text-gray-800 italic">{errors.username.message}</p>}
            <p className="font-bold text-gray-800 italic">{responseMessage}</p>
        </div>
    );
};
export default AddPerson;
