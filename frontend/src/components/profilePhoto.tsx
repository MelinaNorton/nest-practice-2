'use client'
import { useGetPhoto } from "@/hooks/queries/peoplequeries";
import React, { useState } from "react";
import { useEffect } from "react";

interface photoProps {
    username :string;
}
const ProfilePhoto: React.FC<photoProps> = ({ username }) => {
    const { data, isLoading, isError } = useGetPhoto(username);
    const [imgsrc, setImgSrc] = useState("");
    
    useEffect(() => {
        if (data) {
            setImgSrc(data);
        }
        else{
            setImgSrc("");
        }
    }, [data])

    return (
        <div className="pt-2 pb-2 pl-4 pr-1 rounded-md justify-self-center max-w-md flex-row shadow shadow-gray-600 font-sans">
            {imgsrc!="" ? <img src={imgsrc} className="rounded w-24 h-24 object-cover self-center"></img> : <p className="font-bold text-gray-800 italic justify-self-center">No Image found</p>}
        </div>
    );
}
export default ProfilePhoto;