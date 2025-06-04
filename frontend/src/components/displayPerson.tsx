'use client'
import React, { useState }  from "react";
import { useDisplayPerson } from "@/hooks/queries/peoplequeries";
import { useEffect } from "react";
import ProfilePhoto from "./profilePhoto";

const DisplayPerson = () => {
    const [name, setName] = useState("");
    const [tempname, setTempName] = useState("");
    const [response, setResponse] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [username, setUserName] = useState("");
    const [age, setAge] = useState(0);
    const [email, setEmail] = useState("");
    const [isCool, setIsCool] = useState(false);
    const [searching, setSearching] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const { data, isLoading, isError } = useDisplayPerson(name);

    //in order to trigger the hook only when the "name" variable is defined/set to tempname, useEffect is necessary to wait
     useEffect(() => {
            if (data) {
                setFirstName(data.firstname);
                setLastName(data.lastname);
                setUserName(data.username);
                setAge(data.age);
                setEmail(data.email);
                setIsCool(data.isCool);

                setLoaded(true);
                setResponse("Successful Get!");
            }
    }, [data]);

    const validateUserData = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearching(true);

        if(!tempname) {
            setResponse("Complete Name Field");
        }
        else if(tempname.length > 20){
            setResponse("Enter a valid name (<20 characters)");
        }
        else{
            setName(tempname);
        }
    }

    return (
        <div className="pt-2 pb-2 pl-4 pr-1 rounded-md justify-self-center max-w-md flex-row shadow shadow-gray-600 font-sans">
            <form onSubmit={validateUserData}>
                <input
                    id="findname"
                    type="text"
                    placeholder="name"
                    value={tempname}
                    onChange={(e) => setTempName(e.target.value)}
                    className="font-bold text-gray-400"
                >
                </input>
                <br/>
                <br/>
                {isLoading ? <p>Loading...</p> : <button type="submit" className=" bg-sky-900 hover:bg-sky-700 shadow-inner rounded-md active:scale-98 font-semibold px-4 transition duration-150 transform hover:scale-95 text-gray-50">Submit</button>}
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
                    <li>
                        <ProfilePhoto username = {username}/>
                    </li>
                </ul>
            </div>
            }
        </div>
    );
}
export default DisplayPerson;