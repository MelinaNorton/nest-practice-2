'use client'
import React from 'react';
import Profile from '../../../components/displayLoggedInUser';
import { useRouter } from 'next/navigation'

export default function Page() {
    const router = useRouter();
    return (
        <div className="flex flex-col items-center justify-center p-50 gap-6">
        <button onClick={ ()=> router.push('./protectedroute')} className=" bg-sky-900 hover:bg-sky-700 shadow-inner rounded-md active:scale-98 font-semibold px-4 transition duration-150 transform hover:scale-95 text-gray-50">Back</button>
        <Profile/>
        </div>
    );
}