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
        <form onSubmit={processNewCreds}>
            <input 
                id="code"
                type="text"
                placeholder="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                />
                <button type="submit" className="shadow-md bg-sky-400 hover:bg-sky-200">Submit</button>
        </form>
    );
}
export default NewPassForm;