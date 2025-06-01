'use client'
import React from "react";
import { useRouter } from 'next/navigation'


const ProfileBtn = () => {
    const router = useRouter();
    return(
        <button type="button" onClick={()=> router.push('./profile')} className= " bg-sky-900 hover:bg-sky-700 shadow-inner rounded-md active:scale-98 font-semibold px-4 transition duration-150 transform hover:scale-95 text-gray-50">See Profile</button>
    );
}
export default ProfileBtn;