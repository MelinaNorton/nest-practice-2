import React from 'react';
import AddPerson from '../components/postPerson';
import PatchName from '../components/patchPerson';
import DeletePerson from '../components/deletePerson';

export default function Page() {
    return (
        <div className = "flex flex-col items-center justify-center p-50 gap-6">
            <h3 className="self-start pl-110 not-last:font-bold text-gray-600 text-lg font-sans float float-left">Add New person</h3>
            <AddPerson/>
            <h3 className="self-start pl-110 not-last:font-bold text-gray-600 text-lg font-sans float float-left">Change a First Name</h3>
            <PatchName/>
            <h3 className="self-start pl-110 not-last:font-bold text-gray-600 text-lg font-sans float float-left">Delete a Person</h3>
            <DeletePerson/>
        </div>
    );
}