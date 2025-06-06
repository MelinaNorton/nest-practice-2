import axios from 'axios';

export interface NewPerson {
  firstname: string;
  lastname: string;
  password: string;
  username: string;
  age: number;
  email: string;
  isCool: boolean;
  image?: string;
}

export interface NewName {
    firstname: string;
    newname : string;
}

export interface LoginData {
    username: string,
    password: string
}

export interface DeleteData {
    firstname : string,
}

export interface ForgotData {
    username : string,
    email : string,
}

export interface PassData {
    password : string,
    username : string
}

export interface PhotoData{
    username : string,
    file : File
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
            .patch(`http://localhost:3004/people/${data.firstname}/rename`, {newFirstName: data.newname},  {withCredentials: true})
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
        .get<NewPerson>(`http://localhost:3004/people/${name}`);
        return response.data;
    }
    catch (error) {
        console.error("Problem displaying profile:", error);
        throw error;
    }
}

//get profile photo (if exists)
export async function getPhoto(username : string): Promise<string>{
    try{const response = await axios.get<string>(`http://localhost:3004/people/${username}/image`)
    if(response.data){
        console.log("image grabbed!");
        return response.data;
    }
    console.log("no image :(");
    return "";
    }
    catch (error) {
        console.error("Problem displaying profile photo:", error);
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
    console.log(data.username);
    const response = await axios
        .patch("http://localhost:3004/auth/reset/pass", data)
        .then( response =>{
            return response.data;
        })
        .catch(error =>{
            console.log("Problem changing password");
        })
}

//upload photo
export async function uploadPhoto(photoData : PhotoData){
    try{
        const formData = new FormData();
        formData.append('file', photoData.file)
        const response = await axios.patch(`http://localhost:3004/people/${photoData.username}`, formData);
        return response.data;
    }
    catch (error){
        console.error("Problem uploading :(");
        throw error;
    }
}


