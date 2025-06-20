'use client'
import React from 'react';
import LoginPerson from "../../components/loginPerson"
import ForgotBtn from '../../components/forgotPassBtn';
import AddPerson from '../../components/postPerson';
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter();
    return(
    <main>
      <div className="flex flex-col items-center justify-center p-50 gap-6">
        <h3 className="font-bold text-gray-700 text-2xl font-sans">People Database Tester</h3>
        <div className="flex flex-col items-start gap-2">
          <h3 className="self-start pl-8 not-last:font-bold text-gray-600 text-lg font-sans">Log In</h3>
          <LoginPerson/>
        </div>
        <div className="flex flex-col items-start gap-2">
            <button type="button" onClick={ ()=> router.push("/example/signup")} className=" bg-sky-900 hover:bg-sky-700 shadow-inner rounded-md active:scale-98 font-semibold px-4 transition duration-150 transform hover:scale-95 text-gray-50">Signup</button>
        </div>
        <ForgotBtn/>
      </div>
    </main>
    );
}
