import React from 'react';
import AddPerson from '../components/postPerson';
import PatchName from '../components/patchPerson';
import DeletePerson from '../components/deletePerson';
import DisplayPerson from '../components/displayPerson';

export default function Page() {
    return (
        <div className = "flex flex-col items-center justify-center p-50 gap-6">
            <div className="flex flex-col items-start gap-2">
                <h3 className="self-start pl-8 not-last:font-bold text-gray-600 text-lg font-sans">Change a First Name</h3>
            <PatchName/>
            </div>
            <div className="flex flex-col items-start gap-2">
                <h3 className="self-start pl-8 not-last:font-bold text-gray-600 text-lg font-sans">Delete a Person</h3>
            <DeletePerson/>
            </div>
            <div className="flex flex-col items-start gap-2">
                <h3 className="self-start pl-8 not-last:font-bold text-gray-600 text-lg font-sans">Get Person Data</h3>
            <DisplayPerson/>
            </div>
        </div>
    );
}