"use client";
import axios from "axios";
import { useState } from "react";
type username = { username: string; setUsername: (u: string) => void };

const SetPass = ({username, setUsername}:username) => {
    const [pass, setNewPass] = useState("");
    const [checkpass, setCheckPass] = useState("");
    const [success, setSuccess] = useState(false);
    const [response, setResponse] = useState("");
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
                })
                .catch(error =>{
                     setResponse("no email matches user :(");
                })
        }
    }
    if(success){
            return <p>Successful Reset!</p>
    }
    return(
        <form onSubmit={executeReset}>
            <input 
                id="newpass"
                className = "form-input"
                type="password"
                placeholder="new password"
                value={pass}
                onChange={(e) => setNewPass(e.target.value)}
                />
                <input 
                id="checkpass"
                className = "form-input"
                type="password"
                placeholder="retype password"
                value={checkpass}
                onChange={(e) => setCheckPass(e.target.value)}
                />
                <button type="submit" className="submitbtn">Submit</button>
                <p>{response}</p>
        </form>
    );
}
export default SetPass;