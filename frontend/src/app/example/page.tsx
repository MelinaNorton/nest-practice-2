import React from 'react';
import AddPerson from "./components/postPerson";
import PatchName from './components/patchPerson';
import LoginPerson from "./components/loginPerson"
import ForgotPass from './components/forgotPass';

export default function Page() {
    return(
    <main>
      <h1>Welcome!</h1>
      <AddPerson />
      <PatchName />
      <LoginPerson />
      <ForgotPass />
    </main>
    );
}
