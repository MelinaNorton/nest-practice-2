'use client'
import React from "react";
import { useRouter } from 'next/navigation'

const ForgotBtn = () => {
    const router = useRouter();
    return(
        <button type="button" onClick={()=> router.push('./example/forgotpass')} className= " bg-sky-900 hover:bg-sky-700 shadow-inner rounded-md active:scale-98 font-semibold px-4 transition duration-150 transform hover:scale-95 text-gray-50">Forgot Password?</button>
    );
}
export default ForgotBtn;
