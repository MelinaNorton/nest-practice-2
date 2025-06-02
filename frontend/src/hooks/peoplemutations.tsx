import { useMutation } from '@tanstack/react-query';
import { signUp } from '@/api/peoples';
import { NewPerson } from '@/api/peoples';
import { LoginData } from '@/api/peoples';
import { logIn } from '@/api/peoples';
import { DeleteData } from '@/api/peoples';
import { deletePerson } from '@/api/peoples';
import { NewName } from '@/api/peoples';
import { changeFirstName } from '@/api/peoples';
import { ForgotData } from '@/api/peoples';
import { forgotForm1 } from '@/api/peoples';
import { PassData } from '@/api/peoples';
import { changePass } from '@/api/peoples';

function useSignUp(){
    const mutation = useMutation({
        mutationFn: (data : NewPerson) => signUp(data)
        , onSuccess: (response) => {
            return response;
        },
        onError: (response) => {

        }
    });
}

function useLogIn(){
    const mutation = useMutation({
        mutationFn: (data: LoginData) => logIn(data)
        , onSuccess: (response) => {
            return response
        },
        onError: (response) => {

        }
    })
}

function useDeletePerson(){
    const mutation = useMutation({
        mutationFn: (data: DeleteData) => deletePerson(data)
        , onSuccess: (response) =>{
            return response;
        },
        onError: (response) => {

        }
    })
}

function useChangeFirstName(){
    const mutation = useMutation({
        mutationFn: (data: NewName) => changeFirstName(data)
        , onSuccess: (response) =>{
            return response;
        },
        onError: (response) =>{

        }
    })
}

function useForgotForm1(){
    const mutation = useMutation({
        mutationFn: (data : ForgotData) => forgotForm1(data)
        , onSuccess: (response) => {
            return response;
        },
        onError: (response) => {

        }
    })
}

function useChangePass(){
    const mutation = useMutation({
        mutationFn: (data: PassData) => changePass(data)
        , onSuccess: (response) =>{
            return response
        },
        onError: (response) => {

        }
    }) 
}
