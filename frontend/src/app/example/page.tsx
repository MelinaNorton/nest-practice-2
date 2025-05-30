import React from 'react';
import AddPerson from "./components/postPerson";
import PatchName from './components/patchPerson';
import LoginPerson from "./components/loginPerson"
import ForgotPass from './components/forgotPass';

export default function Page() {
    return(
    <main>
      <div className="flex flex-col items-center justify-center p-50 gap-6">
        <h3 className="font-bold text-gray-700 text-2xl font-sans">People Database Tester</h3>
        <h3 className="self-start pl-110 not-last:font-bold text-gray-600 text-lg font-sans float float-left">Add New person</h3>
        <AddPerson />
        <h3 className="self-start pl-110 not-last:font-bold text-gray-600 text-lg font-sans float float-left">Change a First Name</h3>
        <PatchName />
        <h3 className="self-start pl-110 not-last:font-bold text-gray-600 text-lg font-sans float float-left">Log In</h3>
        <LoginPerson />
        <h3 className="self-start pl-110 not-last:font-bold text-gray-600 text-lg font-sans float float-left">Reset Forgotten Password</h3>
        <ForgotPass />
      </div>
    </main>
    );
}
