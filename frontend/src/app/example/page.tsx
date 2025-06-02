'use client'
import React from 'react';
import LoginPerson from "../../components/loginPerson"
import ForgotBtn from '../../components/forgotPassBtn';
import AddPerson from '../../components/postPerson';
import Profile from '../../components/displayLoggedInUser';

export default function Page() {
    return(
    <main>
      <div className="flex flex-col items-center justify-center p-50 gap-6">
        <h3 className="font-bold text-gray-700 text-2xl font-sans">People Database Tester</h3>
        <div className="flex flex-col items-start gap-2">
          <h3 className="self-start pl-8 not-last:font-bold text-gray-600 text-lg font-sans">Log In</h3>
          <LoginPerson/>
        </div>
        <div className="flex flex-col items-start gap-2">
                <h3 className="self-start pl-8 not-last:font-bold text-gray-600 text-lg font-sans">Sign Up</h3>
            <AddPerson/>
        </div>
        <ForgotBtn/>
      </div>
    </main>
    );
}
