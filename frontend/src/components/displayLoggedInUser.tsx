'use client'
import React, { useEffect, useState }  from "react";
import axios from "axios";
import { useDisplayLoggedInUser } from "@/hooks/queries/peoplequeries";
import ProfilePhoto from "./profilePhoto";
import UploadPhoto from "./uploadPhoto";

const Profile = () => {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [username, setUserName] = useState("");
    const [age, setAge] = useState(0);
    const [email, setEmail] = useState("");
    const [isCool, setIsCool] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [loggedInUsername, setLoggedInUser] = useState("");
    const { data, isLoading, isError } = useDisplayLoggedInUser(loggedInUsername);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
                if (data) {
                    setFirstName(data.firstname);
                    setLastName(data.lastname);
                    setUserName(data.username);
                    setAge(data.age);
                    setEmail(data.email);
                    setIsCool(data.isCool);
    
                    setLoaded(true);
                }
    }, [data]);

    useEffect(() =>{
        setHasMounted(true);
        const retrieved = localStorage.getItem('username');
        if(retrieved){
            setLoggedInUser(retrieved);
        }
    },[])

    if(!hasMounted || isLoading || isError){
        return <p className="font-bold text-gray-400">Loading…</p>;
    }
        return (
                <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 font-sans">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">User Info</h2>
                <ProfilePhoto username={loggedInUsername}/>
                <div className="flex justify-between py-2 border-b last:border-b-0">
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
                <div className="flex justify-between py-2">
                    <UploadPhoto username = {loggedInUsername}/>
                </div >
                </div>
        )
}
export default Profile;