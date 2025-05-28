'use client'
import React, { useState }  from "react";
import axios from "axios";

const LoginPerson = () => {
    const [username, setUsername] = useState("");
    const [password, setPass] = useState("");
    const [response, setResponse] = useState("");

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
            })
            .catch((error) => {
                setResponse("Unsuccessful Post :(!");
            });
        
    }

    return (
        <div className="max-w-md flex-row font-semibold border border-black divide-y divide-black">
            <form onSubmit ={handleLogin}>
                <input 
                id="Loginusername"
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                id="Loginpassword"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPass(e.target.value)}
                />
                <button type="submit" className="shadow-md bg-sky-400 hover:bg-sky-200">Submit</button>
                <p>{response}</p>
            </form>
        </div>
    );
}

export default LoginPerson;