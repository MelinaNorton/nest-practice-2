'use client'
import React, { useState }  from "react";
import { useDisplayPerson } from "@/hooks/queries/peoplequeries";
import { useEffect } from "react";
import ProfilePhoto from "./profilePhoto";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/schemas/loginSchema";
import { SubmitHandler } from "react-hook-form";
import { findNameSchema } from "@/schemas/findNameSchema";

type findNameInputs = {
    tempname: string
}

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

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<findNameInputs>({
        resolver: yupResolver(findNameSchema),
        defaultValues: {
            tempname: '',
        }
     })
        
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
                setResponse("");
            }
            else{
                setResponse("User not found");
            }
    }, [data]);

    const onSubmit: SubmitHandler<findNameInputs> = (data) => {
        setSearching(true);
        setName(data.tempname);
        reset(); 
    }

    return (
        <div className="pt-2 pb-2 pl-4 pr-1 rounded-md justify-self-center max-w-md flex-row shadow shadow-gray-600 font-sans">
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    id="findname"
                    type="text"
                    placeholder="name"
                    {...register('tempname')}
                    className="font-bold text-gray-400"
                >
                </input>
                <br/>
                <br/>
                {isLoading ? <p>Loading...</p> : <button type="submit" className=" bg-sky-900 hover:bg-sky-700 shadow-inner rounded-md active:scale-98 font-semibold px-4 transition duration-150 transform hover:scale-95 text-gray-50">Submit</button>}
                <p className="font-bold text-gray-800 italic">{response}</p>
                {errors.tempname && <p className="font-bold text-gray-800 italic">{errors.tempname.message}</p>}
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
