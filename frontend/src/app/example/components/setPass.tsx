"use client";
import axios from "axios";
import { useState } from "react";
type username = { username: string; setUsername: (u: string) => void };
import { useRouter } from 'next/navigation'

const SetPass = ({username, setUsername}:username) => {
    const [pass, setNewPass] = useState("");
    const [checkpass, setCheckPass] = useState("");
    const [success, setSuccess] = useState(false);
    const [response, setResponse] = useState("");
    const router = useRouter();

    setUsername(username);

    const executeReset = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        if(pass == checkpass){
            const resetData = {
                username,
                password : pass
            }
            axios
                .patch("http://localhost:3004/auth/reset/pass", resetData)
                .then( respone =>{
                    setNewPass("");
                    setCheckPass("");
                    console.log("password reset!");
                    setSuccess(true);
                    router.push('./');
                })
                .catch(error =>{
                     setResponse("no email matches user :(");
                })
        }
    }
    if(success){
            return <p className="font-bold text-gray-400">Success!</p>
    }
    return(
        <div className="pt-2 pb-2 pl-4 pr-1 rounded-md justify-self-center max-w-md flex-row shadow shadow-gray-600 font-sans">
            <form onSubmit={executeReset}>
                <input 
                    id="newpass"
                    type="password"
                    placeholder="new password"
                    value={pass}
                    onChange={(e) => setNewPass(e.target.value)}
                    className="font-bold text-gray-400"
                    />
                    <input 
                    id="checkpass"
                    type="password"
                    placeholder="retype password"
                    value={checkpass}
                    onChange={(e) => setCheckPass(e.target.value)}
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
export default SetPass;