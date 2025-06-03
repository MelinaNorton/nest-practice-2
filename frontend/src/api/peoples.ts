import axios from 'axios';

export interface NewPerson {
  firstname: string;
  lastname: string;
  password: string;
  username: string;
  age: number;
  email: string;
  isCool: boolean;
}

export interface NewName {
    firstname: string;
    newname : string;
}

export interface LoginData {
    username: string;
}

export interface DeleteData {
    firstname : string,
}

export interface ForgotData {
    username : string,
    email : string,
}

export interface PassData {
    username : string,
    newpass : string
}

//signup
export async function signUp(data : NewPerson){
    const response = await axios
        .post("http://localhost:3004/auth/signup", data, { withCredentials: true })
            .then((response) => {
                return response.data;
            })
}

//login
export async function logIn(data : LoginData){
    const response = await axios
            .patch("http://localhost:3004/auth/login", data, {withCredentials: true})
            .then((response) =>{
                return response.data;
            })
}

//delete
export async function deletePerson(data : DeleteData){
    const response = await axios
            .delete(`http://localhost:3004/people/${data.firstname}`)
            .then((response)=>{
                return response.data;
            })
            .catch((error)=>{
                console.log("Problem deleting person");
            });
}

//patch
export async function changeFirstName(data : NewName){
    const response = await axios
            .patch(`http://localhost:3004/people/${data.firstname}`, {newFirstName: data.newname},  {withCredentials: true})
            .then((response) =>{
                return response.data;
            })
            .catch((error) => {
                console.log("Problem patching new name");
            });
}

//profile
export async function displayLoggedInUser(name : string): Promise<NewPerson>{
    try{const response = await axios
        .get<NewPerson>(`http://localhost:3004/people/${name}`)
        return response.data
    }
    catch (error) {
        console.error("Problem displaying profile:", error);
        throw error;
    }
}

//get person
export async function displayPerson(name : string): Promise<NewPerson>{
    try{const response = await axios
        .get<NewPerson>(`http://localhost:3004/people/${name}`)
        return response.data;
    }
    catch (error) {
        console.error("Problem displaying profile:", error);
        throw error;
    }
}

//forgotform1
export async function forgotForm1(data : ForgotData): Promise<boolean>{
    let match = true;
         const response = await axios
        .get(`http://localhost:3004/people/${data.username}`)
            .then(response=> {
                //setUsername("");
                if(response.data.email != data.email){
                    match = false;
                }
            })
            .catch((error) =>{
                console.log("Problem matching email to username");
            })
            return match
}
//patch password
export async function changePass(data : PassData){
    const response = await axios
        .patch("http://localhost:3004/auth/reset/pass", data)
        .then( response =>{
            return response.data;
        })
        .catch(error =>{
            console.log("Problem changing password");
        })
}


