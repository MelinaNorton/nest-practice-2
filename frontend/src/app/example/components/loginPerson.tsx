'use client'
import React, { useState }  from "react";
import axios from "axios";
import { useRouter } from 'next/navigation'

const LoginPerson = () => {
    const [username, setUsername] = useState("");
    const [password, setPass] = useState("");
    const [response, setResponse] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const router = useRouter();

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const loginData = {
            username,
            password
        }

        axios.defaults.withCredentials = true;
        axios
            .patch("http://localhost:3004/auth/login", loginData, {withCredentials: true})
            .then((response) =>{
                setResponse("Successful Post!");
                setUsername("");
                setPass("");
                setLoggedIn(true);
                router.push('./example/protectedroute');
            })
            .catch((error) => {
                setResponse("Unsuccessful Post :(!");
            });
        
    }
    if(loggedIn){
        return <p className="font-bold text-gray-800 italic">Successful login!</p>
    }
    return (
        <div className="pt-2 pb-2 pl-4 pr-1 rounded-md justify-self-center max-w-md flex-row shadow shadow-gray-600 font-sans">
            <form onSubmit ={handleLogin}>
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