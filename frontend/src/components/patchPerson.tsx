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
            .patch(`http://localhost:3004/people/${encodeURIComponent(oldname)}`, {newFirstName:firstname},  {withCredentials: true})
            .then((response) =>{
        setResponse("Successful Patch!");
                setNewName("");
            })
            .catch((error) => {
                setResponse("Unsuccessful Patch :(!");
            });
    }

    return(
        <div className="form-card">
            <form onSubmit ={handlePatch}>
                <input 
                id="oldname"
                className = "form-input"
                type="text"
                placeholder="oldname"
                value={oldname}
                onChange={(e) => setOldName(e.target.value)}
                />
                <input 
                id="newfirstname"
                className = "form-input"
                type="text"
                placeholder="firstname"
                value={firstname}
                onChange={(e) => setNewName(e.target.value)}
                />
                <button type="submit" className="submitbtn">Submit</button>
            </form>
            <p>{responseMessage}</p>
        </div>
    );
}

export default PatchName;