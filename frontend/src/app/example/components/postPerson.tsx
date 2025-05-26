'use client'
import React, { useState }  from "react";
import axios from "axios";
import { error } from "console";

const AddPerson = () => {
    const [firstname, setFirst] = useState("");
    const [email, setEmail] = useState("");
    const [lastname, setLast] = useState("");
    const [username, setUser] = useState("");
    const [age, setAge] = useState(0);
    const [isCool, setCool] = useState(false)
    const [password, setPass] = useState("");
    const [responseMessage, setResponse] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newPerson = {
            firstname,
            email,
            lastname,
            username,
            age,
            isCool,
            password
        }

        console.log("newPerson:", newPerson);
        axios
            .post("http://localhost:33333/auth/signup", newPerson)
            .then((response) =>{
                setResponse("Successful Post!");
                setFirst("");
                setLast("");
                setUser("");
                setEmail("");
                setAge(0);
                setCool(false);
                setPass("");
                setResponse("");
            })
            .catch((error) => {
                setResponse("Unsuccessful Post :(!");
            });
    };

//when writing the form for submitting a new person to the DB, the "setters" defined
//above are called, and each field's states are altered according to the input.
//The default for each field's "value=" field is the {~field~} set as the initial
//state (something empty or null), and if a change-event is detected the new value
//is set
    return (
        <div className="max-w-md flex-row font-semibold border border-black divide-y divide-black">
            <form onSubmit ={handleSubmit}>
                <input 
                id="firstname"
                type="text"
                placeholder="firstname"
                value={firstname}
                onChange={(e) => setFirst(e.target.value)}
                />
                <input 
                id="lastname"
                type="text"
                placeholder="lastname"
                value={lastname}
                onChange={(e) => setLast(e.target.value)}
                />
                <input 
                id="username"
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUser(e.target.value)}
                />
                 <input 
                id="email"
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                id="password"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPass(e.target.value)}
                />
                <input 
                id="age"
                type="number"
                placeholder="age"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                />
                <input 
                id="isCool"
                type="checkbox"
                placeholder="cool status"
                checked={isCool}
                onChange={(e) => setCool(e.target.checked)}
                />
                <button type="submit" className="shadow-md bg-sky-400 hover:bg-sky-200">Submit</button>
            </form>
            <p>{responseMessage}</p>
        </div>
    );
};

export default AddPerson;

