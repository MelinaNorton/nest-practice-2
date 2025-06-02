'use client'
import React, { useState }  from "react";
import axios from "axios";

const PatchName = () => {
    const [oldname, setOldName] = useState("");
    const [firstname, setNewName] = useState("");
    const [responseMessage, setResponse] = useState("");

    const handlePatch= (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        
         axios
            .patch(`http://localhost:3004/people/${oldname}`, {newFirstName:firstname},  {withCredentials: true})
            .then((response) =>{
                setResponse("Successful Patch!");
                setNewName("");
            })
            .catch((error) => {
                setResponse("Unsuccessful Patch :(!");
            });
    }

    return(
        <div className="pt-2 pb-2 pl-4 pr-1 rounded-md justify-self-center max-w-md flex-row shadow shadow-gray-600 font-sans">
            <form onSubmit ={handlePatch}>
                <input 
                id="oldname"
                type="text"
                placeholder="oldname"
                value={oldname}
                onChange={(e) => setOldName(e.target.value)}
                className="font-bold text-gray-400"
                />
                <input 
                id="newfirstname"
                type="text"
                placeholder="firstname"
                value={firstname}
                onChange={(e) => setNewName(e.target.value)}
                className="font-bold text-gray-400"
                />
                <br/>
                <br/>
                <button type="submit" className=" bg-sky-900 hover:bg-sky-700 shadow-inner rounded-md active:scale-98 font-semibold px-4 transition duration-150 transform hover:scale-95 text-gray-50">Submit</button>
            </form>
            <p className="font-bold text-gray-800 italic">{responseMessage}</p>
        </div>
    );
}

export default PatchName;