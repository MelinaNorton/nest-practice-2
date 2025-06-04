'use client'
import { useGetPhoto } from "@/hooks/queries/peoplequeries";
import React, { useState } from "react";
import { useEffect } from "react";

interface photoProps {
    username :string;
}
const ProfilePhoto: React.FC<photoProps> = ({ username }) => {
    const { data, isLoading, isError } = useGetPhoto(username);
    const [response, setResponse] = useState("");
    const [imgsrc, setImgSrc] = useState("");
    const [found, setFound] = useState(true);
    
    //isLoading ? && found <p>Loading...</p> :
    useEffect(() => {
        if (data) {
            if (data == "") {
                setFound(false);
            }
            setImgSrc("http://localhost:3004"+data);
        }
    }, [data])

    return (
        <div className="pt-2 pb-2 pl-4 pr-1 rounded-md justify-self-center max-w-md flex-row shadow shadow-gray-600 font-sans">
            {found ? <img src={imgsrc} className="rounded w-24 h-24 object-cover self-center"></img> : <p>No Image found</p>}
        </div>
    );
}
export default ProfilePhoto;