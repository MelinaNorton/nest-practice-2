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
            .patch(`http://localhost:33333/people/${encodeURIComponent(oldname)}`, {newFirstName:firstname})
            .then((response) =>{
        setResponse("Successful Patch!");
                setNewName("");
            })
            .catch((error) => {
                setResponse("Unsuccessful Patch :(!");
            });
    }

    return(
        <div className="max-w-md flex-row font-semibold border border-black divide-y divide-black">
            <form onSubmit ={handlePatch}>
                <input 
                id="oldname"
                type="text"
                placeholder="oldname"
                value={oldname}
                onChange={(e) => setOldName(e.target.value)}
                />
                <input 
                id="newfirstname"
                type="text"
                placeholder="firstname"
                value={firstname}
                onChange={(e) => setNewName(e.target.value)}
                />
                <button type="submit" className="shadow-md bg-sky-400 hover:bg-sky-200">Submit</button>
            </form>
            <p>{responseMessage}</p>
        </div>
    );
}

export default PatchName;