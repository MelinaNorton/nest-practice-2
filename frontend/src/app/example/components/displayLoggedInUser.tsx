'use client'
import React, { useEffect, useState }  from "react";
import axios from "axios";


const Profile = () => {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [username, setUserName] = useState("");
    const [age, setAge] = useState(0);
    const [email, setEmail] = useState("");
    const [isCool, setIsCool] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [loggedInUsername, setLoggedInUser] = useState("");

    useEffect(() =>{
        const retrieved = localStorage.getItem('username');
        if(retrieved){
            console.log("retrieved username!");
            setLoggedInUser(retrieved);
        }
        else{
            console.log("problems getting username...");
        }
    })

    useEffect(()=>{
        axios
            .get(`http://localhost:3004/people/${loggedInUsername}`)
            .then((response)=>{
                setFirstName(response.data.firstname);
                setLastName(response.data.lastname);
                setUserName(response.data.username);
                setAge(response.data.age);
                setIsCool(response.data.isCool);
                setEmail(response.data.email);
                setLoaded(true);
            })
            .catch((error)=>{

            })
        })
        return (
            loaded ?
                <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 font-sans">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">User Info</h2>
                <div className="flex items-center gap-x-4 py-2 border-b last:border-b-0 ">
                    <span className="font-semibold text-gray-600">Username: </span>
                    <span className="text-gray-400">{username}</span>
                </div>
                <div className="flex justify-between py-2 border-b last:border-b-0">
                    <span className="font-semibold text-gray-600">First Name: </span>
                    <span className="text-gray-400">{firstname}</span>
                </div>
                <div className="flex justify-between py-2 border-b last:border-b-0">
                    <span className="font-semibold text-gray-600">Last Name: </span>
                    <span className="text-gray-400">{lastname}</span>
                </div>
                <div className="flex justify-between py-2 border-b last:border-b-0">
                    <span className="font-semibold text-gray-600">Age: </span>
                    <span className="text-gray-400">{age}</span>
                </div>
                <div className="flex justify-between py-2 border-b last:border-b-0">
                    <span className="font-semibold text-gray-600">Email: </span>
                    <span className="text-gray-400">{email}</span>
                </div>
                <div className="flex justify-between py-2">
                    <span className="font-semibold text-gray-600">Is Cool: </span>
                    <span className="text-gray-400">{isCool ? "Yes" : "No"}</span>
                </div>
                </div>
            :
            <p className="font-bold text-gray-400">Loading...</p>
        )
}
export default Profile;