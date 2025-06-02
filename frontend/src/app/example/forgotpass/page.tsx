import React from 'react';
import ForgotPass from '../../../components/forgotPass';

export default function Page() {
    return (
        <div className="flex flex-col items-center justify-center p-50 gap-6">
            <h3 className="self-start pl-110 not-last:font-bold text-gray-600 text-lg font-sans float float-left">Reset Forgotten Password</h3>
            <ForgotPass/>
        </div>
    );
}