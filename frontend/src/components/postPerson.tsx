'use client'
import React, { useState } from "react";
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



        axios
            .post("http://localhost:3004/auth/signup", newPerson, { withCredentials: true })
            .then((response) => {
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
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="form-card">
            <form onSubmit={handleSubmit}>
                <input
                    id="firstname"
                    className = "w-full mb-4 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    type="text"
                    placeholder="firstname"
                    value={firstname}
                    onChange={(e) => setFirst(e.target.value)}
                />
                <input
                    id="lastname"
                    className = "form-input"
                    type="text"
                    placeholder="lastname"
                    value={lastname}
                    onChange={(e) => setLast(e.target.value)}
                />
                <input
                    id="username"
                    className = "form-input"
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUser(e.target.value)}
                />
                <input
                    id="email"
                    className = "form-input"
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    id="password"
                    className = "form-input"
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPass(e.target.value)}
                />
                <input
                    id="age"
                    className = "form-input"
                    type="number"
                    placeholder="age"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                />
                <input
                    id="isCool"
                    className = "form-input"
                    type="checkbox"
                    placeholder="cool status"
                    checked={isCool}
                    onChange={(e) => setCool(e.target.checked)}
                />
                <button type="submit" className="submitbtn clickable">Submit</button>
            </form>
            <p>{responseMessage}</p>
        </div>
        </div>
    );
};

export default AddPerson;

