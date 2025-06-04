'use client'
import React, { useState }  from "react";
import axios from "axios";
import { useRouter } from 'next/navigation'
import { useLogIn } from "@/hooks/mutations/peoplemutations";

const LoginPerson = () => {
    const [username, setUsername] = useState("");
    const [password, setPass] = useState("");
    const [response, setResponse] = useState("");
    const router = useRouter();
    const mutation = useLogIn();

    //DATA TO BE SUBMITTED
     const loginData = {
            username,
            password
        }

    const validateData = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!password || !username){
            setResponse("Enter both a password and username");
        }
        else if(password.length > 20){
            setResponse("Enter a password");
        }
        else if(username.length > 20){
            setResponse("Enter a valid username (< 20 characters)");
        }
        else{
             handleLogin(e);
        }
    }
    
    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //actually use hook (NEED to call mutation.mutate in order to execute call)
        axios.defaults.withCredentials = true;
        mutation.mutate(loginData, {
            onSuccess: (data) => {
                setResponse("Successful login!");
                setUsername("");
                setPass("");
                localStorage.setItem("username", username);
                router.push("/example/protectedroute");
            },
            onError: (error: any) => {
                setResponse("Unsuccessful login :(");
            },
        });
    }
    
    return (
        <div className="pt-2 pb-2 pl-4 pr-1 rounded-md justify-self-center max-w-md flex-row shadow shadow-gray-600 font-sans">
            <form onSubmit ={validateData}>
                <input 
                id="Loginusername"
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="font-bold text-gray-400"
                />
                <input 
                id="Loginpassword"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPass(e.target.value)}
                className="font-bold text-gray-400"
                />
                <br/>
                <br/>
                <button type="submit" className=" bg-sky-900 hover:bg-sky-700 shadow-inner rounded-md active:scale-98 font-semibold px-4 transition duration-150 transform hover:scale-95 text-gray-50">Submit</button>
                <p className="font-bold text-gray-800 italic">{response}</p>
            </form>
        </div>
    );
}
export default LoginPerson;