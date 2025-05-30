import React from 'react';
import LoginPerson from "./components/loginPerson"
import ForgotBtn from './components/forgotPassBtn';

export default function Page() {
    return(
    <main>
      <div className="flex flex-col items-center justify-center p-50 gap-6">
        <h3 className="font-bold text-gray-700 text-2xl font-sans">People Database Tester</h3>
        <h3 className="self-start pl-110 not-last:font-bold text-gray-600 text-lg font-sans float float-left">Log In</h3>
        <LoginPerson />
        <ForgotBtn />
      </div>
    </main>
    );
}
