import React from 'react';
import AddPerson from '../components/postPerson';
import PatchName from '../components/patchPerson';

export default function Page() {
    return (
        <div className = "flex flex-col items-center justify-center p-50 gap-6">
            <h3 className="self-start pl-110 not-last:font-bold text-gray-600 text-lg font-sans float float-left">Add New person</h3>
            <AddPerson/>
            <h3 className="self-start pl-110 not-last:font-bold text-gray-600 text-lg font-sans float float-left">Change a First Name</h3>
            <PatchName/>
        </div>
    );
}