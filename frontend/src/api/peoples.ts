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
    lastname : string,
    username : string
}

export interface ForgotData {
    username : string,
    email : string,
}

export interface PassData {
    username : string,
    oldpass : string,
    newpass : string
}

//signup
export async function signUp(data : NewPerson){
    axios
        .post("http://localhost:3004/auth/signup", data, { withCredentials: true })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log("Problem posting new person");
            });
}

//login
export async function logIn(data : LoginData){
    axios
            .patch("http://localhost:3004/auth/login", data, {withCredentials: true})
            .then((response) =>{
                return response.data;
            })
            .catch((error) => {
                console.log("Problem logging in");
            });
}

//delete
export async function deletePerson(data : DeleteData){
    axios
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
    axios
            .patch(`http://localhost:3004/people/${data.firstname}`, {newFirstName: data.newname},  {withCredentials: true})
            .then((response) =>{
                return response.data;
            })
            .catch((error) => {
                console.log("Problem patching new name");
            });
}

//profile
export async function displayLoggedInUser(name : string){
    axios
            .get(`http://localhost:3004/people/${name}`)
            .then((response)=>{
                return response.data;
            })
            .catch((error)=>{
                console.log("Problem displaying profile");
            })
}
//forgotform1
export async function forgotForm1(data : ForgotData): Promise<boolean>{
    let match = true;
         axios
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
    axios
        .patch("http://localhost:3004/auth/reset/pass", data)
        .then( response =>{
            return response.data;
        })
        .catch(error =>{
            console.log("Problem changing password");
        })
}


