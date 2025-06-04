'use client'
import React, { useState } from "react";
import { useUploadPhoto } from "@/hooks/mutations/peoplemutations";

interface photoProps {
    username :string;
}

const UploadPhoto: React.FC<photoProps> = ({ username })=> {
    const [file, setSelectedFile] = useState<File | null>(null);
    const [response, setResponse] = useState("");
    const mutation = useUploadPhoto();

    const getFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if(e.target.files && e.target.files.length > 0){
            setSelectedFile(e.target.files[0]);
            setResponse("File located!");
        }
        else{
            setResponse("Please select an image file to upload");
        }
    }
    
    const handlePatch = () =>{
        if(file){
            const data = {
                username : username,
                file : file
            }
            mutation.mutate(data, {
                onSuccess: (data) =>{
                    setResponse("Successful upload!");
                    setSelectedFile(null);
                }
            })
        }
    }

    return (
        <div className="pt-2 pb-2 pl-4 pr-1 rounded-md justify-self-center max-w-md flex-row shadow shadow-gray-600 font-sans">
            <form>
                <input
                type="file"
                placeholder="enter file"
                onChange={(e) => getFile(e)}
                accept="image/*"
                className="font-bold text-gray-400">
                </input>
                <p className="font-bold text-gray-800 italic">{response}</p>
                <button type="submit" className=" bg-sky-900 hover:bg-sky-700 shadow-inner rounded-md active:scale-98 font-semibold px-4 transition duration-150 transform hover:scale-95 text-gray-50" onClick = {handlePatch}>Submit</button>
            </form>
        </div>
    );
}
export default UploadPhoto;