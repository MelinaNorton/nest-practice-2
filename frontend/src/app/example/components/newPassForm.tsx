import { useState } from "react";
import SetPass
from "./setPass";
type username = { username: string; setUsername: (u: string) => void };

const NewPassForm = ({username, setUsername}:username) => {
const [code, setCode] = useState("");
//temp hardcoded val
const [sentCode, setSentCode] = useState("1234");
const [matched, setMatched] = useState(false)

    const processNewCreds = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(code == sentCode){
            setMatched(true);
        }
    }
    
    if(matched){
        return <SetPass username={username} setUsername={setUsername}/>
    }
    return(
        <div className="pt-2 pb-2 pl-4 pr-1 rounded-md justify-self-center max-w-md flex-row shadow shadow-gray-600 font-sans">
            <form onSubmit={processNewCreds}>
                <input 
                    id="code"
                    type="text"
                    placeholder="code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="font-bold text-gray-400"
                    />
                    <br/>
                    <br/>
                    <button type="submit" className=" bg-sky-900 hover:bg-sky-700 shadow-inner rounded-md active:scale-98 font-semibold px-4 transition duration-150 transform hover:scale-95 text-gray-50">Submit</button>
            </form>
        </div>
    );
}
export default NewPassForm;