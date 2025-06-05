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
        <div className="pt-2 pb-2 pl-4 pr-1 rounded-md justify-self-center max-w-md flex-row shadow-sm shadow-gray-500 font-sans p-6">
            <form onSubmit={handleSubmit(onSubmit)} className= "flex flex-col gap-4 p-6">
                <div className="flex items-center">
                    <label htmlFor="firstname" className="font-bold text-gray-600 w-24">Firstname</label>
                    <input
                        id="firstname"
                        type="text"
                        placeholder="enter your firstname"
                        {...register('firstname')}
                        className="font-bold text-gray-400 border-2 border-gray-200 rounded-md text-center flex-1"
                    />
                </div>
                <div className="flex items-center">
                    <label htmlFor="lastname" className="font-bold text-gray-600 w-24">Lastname</label>
                    <input
                        id="lastname"
                        type="text"
                        placeholder="enter your lastname"
                        {...register('lastname')}
                        className="font-bold text-gray-400 border-2 border-gray-200 rounded-md text-center flex-1"
                    />
                </div>
                <div className="flex items-center">
                    <label htmlFor="username" className="font-bold text-gray-600 w-24">Username</label>
                    <input
                        id="username"
                        type="text"
                        placeholder="enter your username"
                        {...register('username')}
                        className="font-bold text-gray-400 border-2 border-gray-200 rounded-md text-center flex-1"
                    />
                </div>
                <div className="flex items-center">
                    <label htmlFor="firstname" className="font-bold text-gray-600 w-24">Email</label>
                    <input
                        id="email"
                        type="text"
                        placeholder="enter your email"
                        {...register('email')}
                        className="font-bold text-gray-400 border-2 border-gray-200 rounded-md text-center flex-1"
                    />
                </div>
                <div className="flex items-center">
                    <label htmlFor="firstname" className="font-bold text-gray-600 w-24">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="enter your password"
                        {...register('password')}
                        className="font-bold text-gray-400 border-2 border-gray-200 rounded-md text-center flex-1"
                    />
                </div>
                <div className="flex items-center">
                    <label htmlFor="age" className="font-bold text-gray-600 w-24">Age</label>
                    <input
                        id="age"
                        type="number"
                        placeholder="enter your age"
                        {...register('age')}
                        className="font-bold text-gray-400 border-2 border-gray-200 rounded-md text-center flex-1"
                    />
                </div>
                <div className="flex items-center">
                    <label htmlFor="isCool" className="font-bold text-gray-600 w-24">Cool Status</label>
                    <input
                        id="isCool"
                        type="checkbox"
                        placeholder="cool status"
                        {...register('isCool')}
                    />
                </div>
                <button type="submit" className=" bg-sky-900 hover:bg-sky-700 shadow-inner rounded-md active:scale-98 font-semibold px-4 transition duration-150 transform hover:scale-95 text-gray-50" >Submit</button>
            </form>
            {errors.username && <p className="font-bold text-gray-800 italic">{errors.username.message}</p>}
            <p className="font-bold text-gray-800 italic">{responseMessage}</p>
        </div>
    );
};
export default AddPerson;
