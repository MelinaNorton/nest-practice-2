'use client'
import React, { useState }  from "react";
import axios from "axios";
import NewPassForm from "./newPassForm";

const ForgotPass = () => {
    const [username, setUsername] = useState("");
    const [password, setPass] = useState("");
    const [checkpass, setCheckPass] = useState("");
    const [email, setEmail] = useState("");
    const [response, setResponse] = useState("");
    const [validEmail, setValidEmail] = useState(false);

    const handleForgottenPass = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validateData = {
            username,
            email
        }

     axios
        .get(`http://localhost:3004/people/${validateData.username}`)
            .then(response=> {
                //setUsername("");
                setEmail("");
                console.log("valid email!");
                if(response.data.email == email){
                    setValidEmail(true)
                }
                else{
                    setResponse("no email matches user :(");
                    setUsername("");
                    setEmail("");
                }
                return;
            })
            .catch((error) =>{
                setResponse("no email matches user :(");
                setUsername("");
                setEmail("");
                return;
            })
    }
    if(validEmail){
        return <NewPassForm username={username} setUsername={setUsername}/>
    }
    return (
        <div className="form-card">
            <form onSubmit ={handleForgottenPass}>
                <input 
                id="Loginusername"
                className = "form-input"
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                id="Loginemail"
                className = "form-input"
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="submitbtn">Submit</button>
                <p>{response}</p>
            </form>
        </div>
    );
}
export default ForgotPass;