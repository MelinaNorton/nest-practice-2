'use client'
import React, { useState }  from "react";
import axios from "axios";

const ForgotPass = () => {
    const [username, setUsername] = useState("");
    const [password, setPass] = useState("");
    const [checkpass, setCheckPass] = useState("");
    const [email, setEmail] = useState("");
    const [response, setResponse] = useState("");

    const handleForgottenPass = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(password != checkpass){
            setResponse("Passwords don't match!!");
            return;
        }

        const validateData = {
            username,
            password,
            email
        }

        axios
            .patch("http://localhost:3004/auth/forgot/pass", validateData)
            .then(response=> {
                setResponse("Successful Post!");
                setUsername("");
                setEmail("");
                setPass("");
            })
            .catch((error) =>{
                setResponse("Unsuccessfull Post!");
                setUsername("");
                setEmail("");
                setPass("");
            })
    }
    
    return (
        <div className="max-w-md flex-row font-semibold border border-black divide-y divide-black">
            <form onSubmit ={handleForgottenPass}>
                <input 
                id="Loginusername"
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                id="Loginemail"
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                id="Newpass"
                type="password"
                placeholder="new password"
                value={password}
                onChange={(e) => setPass(e.target.value)}
                />
                <input 
                id="Checkpass"
                type="checkpass"
                placeholder="retype password"
                value={password}
                onChange={(e) => setCheckPass(e.target.value)}
                />
                <button type="submit" className="shadow-md bg-sky-400 hover:bg-sky-200">Submit</button>
                <p>{response}</p>
            </form>
        </div>
    );
}
export default ForgotPass;