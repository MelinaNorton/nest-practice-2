import React from 'react';
import AddPerson from "./components/postPerson";
import PatchName from './components/patchPerson';
import LoginPerson from "./components/loginPerson"

export default function Page() {
    return(
    <main>
      <h1>Welcome!</h1>
      <AddPerson />
      <PatchName />
      <LoginPerson />
    </main>
    );
}
