'use client'
import React, { useState }  from "react";
import axios from "axios";

const DeletePerson = () => {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [username, setUserName] = useState("");
    const [response, setResponse] = useState("");

    const validateUserData = (e: React.FormEvent<HTMLFormElement>) => {
        if(!firstname || !lastname || !username){
            setResponse("Complete All Fields");
        }
        else if(firstname.length > 20){
            setResponse("Enter a valid firstname (<20 characters)");
        }
        else if(lastname.length > 20){
            setResponse("Enter a valid lastname (<20 characters)");
        }
        else if(username.length > 20){
            setResponse("Enter a valid username (<20 characters)");
        }
        else if(firstname.length == 0){
            setResponse("Enter a valid firstname (>0 characters)");
        }
        else if(lastname.length == 0){
            setResponse("Enter a valid lastname (>0 characters)");
        }
        else if(username.length == 0){
            setResponse("Enter a valid username (>0 characters)");
        }
        else{
            handleDelete(e);
        }
    }
    const handleDelete = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        axios
            .delete(`http://localhost:3004/people/${firstname}`)
            .then((response)=>{
                setResponse("Successful Delete!");
                setFirstName("");
                setLastName("");
                setUserName("");
            })
            .catch((error)=>{
                setResponse("Unsuccessful Delete :(");
            });
    }

    return(
        <div className="pt-2 pb-2 pl-4 pr-1 rounded-md justify-self-center max-w-md flex-row shadow shadow-gray-600 font-sans">
            <form onSubmit={validateUserData}>
                <input 
                id="deletefirstname"
                type="text"
                placeholder="firstname"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
                className="font-bold text-gray-400"
                />
                <input 
                id="deletelastname"
                type="text"
                placeholder="lastname"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
                className="font-bold text-gray-400"
                />
                <input 
                id="deleteusername"
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                className="font-bold text-gray-400"
                />
                <br/>
                <br/>
                <button type="submit" className=" bg-sky-900 hover:bg-sky-700 shadow-inner rounded-md active:scale-98 font-semibold px-4 transition duration-150 transform hover:scale-95 text-gray-50">Submit</button>
            </form>
            <p className="font-bold text-gray-800 italic">{response}</p>
        </div>
    );
}
export default DeletePerson;
