'use client'
import React, { useState }  from "react";
import axios from "axios";

const DisplayPerson = () => {
    
    const [name, setName] = useState("");
    const [response, setResponse] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [username, setUserName] = useState("");
    const [age, setAge] = useState(0);
    const [email, setEmail] = useState("");
    const [isCool, setIsCool] = useState(false);
    const [searching, setSearching] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const validateUserData = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearching(true);

        if(!name) {
            setResponse("Complete Name Field");
        }
        else if(name.length > 20){
            setResponse("Enter a valid name (<20 characters)");
        }
        else{
            handleDisplay(e);
        }
    }

    const handleDisplay = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios
            .get(`http://localhost:3004/people/${name}`)
            .then((response) => {
                setLoaded(true);
                setResponse("Successful Get!");
                setFirstName(response.data.firstname);
                setLastName(response.data.lastname);
                setUserName(response.data.username);
                setAge(response.data.age);
                setIsCool(response.data.isCool);
                setEmail(response.data.email);
            })
            .catch((error)=>{
                setResponse("Unsuccessful Get :(!");
            })
            .finally(()=>{
                setSearching(false);
                setName("");
            });
    }
    return (
        <div className="pt-2 pb-2 pl-4 pr-1 rounded-md justify-self-center max-w-md flex-row shadow shadow-gray-600 font-sans">
            <form onSubmit={validateUserData}>
                <input
                    id="findname"
                    type="text"
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="font-bold text-gray-400"
                >
                </input>
                <br/>
                <br/>
                {searching ? <p>Loading...</p> : <button type="submit" className=" bg-sky-900 hover:bg-sky-700 shadow-inner rounded-md active:scale-98 font-semibold px-4 transition duration-150 transform hover:scale-95 text-gray-50">Submit</button>}
                <p className="font-bold text-gray-800 italic">{response}</p>
            </form>
            {loaded && 
            <div>
                <ul>
                    <li className="font-bold text-gray-400">{firstname}</li>
                    <li className="font-bold text-gray-400">{lastname}</li>
                    <li className="font-bold text-gray-400">{username}</li>
                    <li className="font-bold text-gray-400">{email}</li>
                    <li className="font-bold text-gray-400">{age} </li>
                    <li className="font-bold text-gray-400">{isCool ? <p>Is Cool</p> : <p>Is NOT Cool</p>}  </li>
                </ul>
            </div>
            }
        </div>
    );
}
export default DisplayPerson;