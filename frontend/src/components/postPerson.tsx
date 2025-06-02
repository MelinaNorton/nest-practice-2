'use client'
import React, { useState } from "react";
import axios from "axios";
import { error } from "console";
import { useSignUp } from "@/hooks/peoplemutations";

const AddPerson = () => {
    const [firstname, setFirst] = useState("");
    const [email, setEmail] = useState("");
    const [lastname, setLast] = useState("");
    const [username, setUser] = useState("");
    const [age, setAge] = useState(0);
    const [isCool, setCool] = useState(false)
    const [password, setPass] = useState("");
    const [responseMessage, setResponse] = useState("");

    //HOOK INIT AN CALL
        const mutation = useSignUp();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //DATA TO BE SUBMITTED
        const newPerson = {
            firstname,
            email,
            lastname,
            username,
            age,
            isCool,
            password
        }

        
        mutation.mutate(newPerson, {
            onSuccess: (data) => {
                setResponse("Created New User!");
                setFirst("");
                setLast("");
                setUser("");
                setEmail("");
                setAge(0);
                setCool(false);
                setPass("");
            },
            onError: (error: any) => {
                setResponse("Unsuccessful Post :(!");
            }
        })

    };

    //when writing the form for submitting a new person to the DB, the "setters" defined
    //above are called, and each field's states are altered according to the input.
    //The default for each field's "value=" field is the {~field~} set as the initial
    //state (something empty or null), and if a change-event is detected the new value
    //is set
    return (
        <div className="pb-2 pl-4 pr-1 pt-2 rounded-md justify-self-center max-w-md flex-row shadow shadow-gray-600 font-sans">
            <form onSubmit={handleSubmit}>
                <input
                    id="firstname"
                    type="text"
                    placeholder="firstname"
                    value={firstname}
                    onChange={(e) => setFirst(e.target.value)}
                    className="font-bold text-gray-400"
                />
                <input
                    id="lastname"
                    type="text"
                    placeholder="lastname"
                    value={lastname}
                    onChange={(e) => setLast(e.target.value)}
                    className="font-bold text-gray-400"
                />
                <input
                    id="username"
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUser(e.target.value)}
                    className="font-bold text-gray-400"
                />
                <input
                    id="email"
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="font-bold text-gray-400"
                />
                <input
                    id="password"
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPass(e.target.value)}
                    className="font-bold text-gray-400"
                />
                <input
                    id="age"
                    type="number"
                    placeholder="age"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="font-bold text-gray-400"
                />
                <br/>
                <br/>
                <input
                    id="isCool"
                    type="checkbox"
                    placeholder="cool status"
                    checked={isCool}
                    onChange={(e) => setCool(e.target.checked)}
                />
                <br/>
                <br/>
                <button type="submit" className=" bg-sky-900 hover:bg-sky-700 shadow-inner rounded-md active:scale-98 font-semibold px-4 transition duration-150 transform hover:scale-95 text-gray-50" >Submit</button>
            </form>
            <p className="font-bold text-gray-800 italic">{responseMessage}</p>
        </div>
    );
};

export default AddPerson;

