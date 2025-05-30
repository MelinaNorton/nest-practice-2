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
                setResponse("error matching user :(");
                setUsername("");
                setEmail("");
                return;
            })
    }
    if(validEmail){
        return <NewPassForm username={username} setUsername={setUsername}/>
    }
    return (
        <div className="pt-2 pb-2 pl-4 pr-1 rounded-md justify-self-center max-w-md flex-row shadow shadow-gray-600 font-sans">
            <form onSubmit ={handleForgottenPass}>
                <input 
                id="Loginusername"
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="font-bold text-gray-400"
                />
                <input 
                id="Loginemail"
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
export default ForgotPass;