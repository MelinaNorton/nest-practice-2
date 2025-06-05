"use client";
import { useState } from "react";
type username = { username: string; setUsername: (u: string) => void };
import { useRouter } from 'next/navigation'
import { useChangePass } from "@/hooks/mutations/peoplemutations";
import { passSchema } from "@/schemas/passSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler } from "react-hook-form";

export type passInputs = {
    pass: string,
    checkPass: string
}

const SetPass = ({username, setUsername}:username) => {
    const [success, setSuccess] = useState(false);
    const [response, setResponse] = useState("");
    const router = useRouter();
    const mutation = useChangePass();
    setUsername(username);
    
    const {
            register,
            handleSubmit,
            formState: { errors },
        } = useForm<passInputs>({
            resolver: yupResolver(passSchema),
            defaultValues: {
                pass: '',
                checkPass: '',
            },
        });

        const onSubmit: SubmitHandler<passInputs> = (data) => {
            if(data.pass == data.checkPass && (username != '')){
                console.log("USERNAME: ", username);
                console.log("NEWPASS, ", data.checkPass);
                mutation.mutate({password:data.pass, username : username}, {
                    onSuccess: (data) => {
                        setSuccess(true);
                        router.push('./');
                    },
                    onError: (error: any) => {
                        setResponse("no email matches user :(");
                    }
                })
            }
                else{
                    setResponse("passwords dont match")
                }
        }
    
    if(success){
            return <p className="font-bold text-gray-400">Success!</p>
    }
    return(
        <div className="pt-2 pb-2 pl-4 pr-1 rounded-md justify-self-center max-w-md flex-row shadow shadow-gray-600 font-sans">
            <form onSubmit={handleSubmit(onSubmit)}>
                <input 
                    id="newpass"
                    type="password"
                    placeholder="new password"
                    {...register('pass')}
                    className="font-bold text-gray-400"
                    />
                    <input 
                    id="checkpass"
                    type="password"
                    placeholder="retype password"
                    {...register('checkPass')}
                    className="font-bold text-gray-400"
                    />
                    <br/>
                    <br/>
                    <button type="submit" className=" bg-sky-900 hover:bg-sky-700 shadow-inner rounded-md active:scale-98 font-semibold px-4 transition duration-150 transform hover:scale-95 text-gray-50">Submit</button>
                    <p className="font-bold text-gray-800 italic">{response}</p>
                    {errors.pass && <p className="font-bold text-gray-800 italic">{errors.pass.message}</p>}
                    {errors.checkPass && <p className="font-bold text-gray-800 italic">{errors.checkPass.message}</p>}
            </form>
        </div>
    );
}
export default SetPass;
