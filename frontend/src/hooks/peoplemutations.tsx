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

export function useSignUp(){
    const mutation = useMutation({
        mutationFn: (data : NewPerson) => signUp(data)
    });
    return mutation;
}

export function useLogIn(){
    const mutation = useMutation({
        mutationFn: (data: LoginData) => logIn(data)
    })
    return mutation;
}

export function useDeletePerson(){
    const mutation = useMutation({
        mutationFn: (data: DeleteData) => deletePerson(data)
        , onSuccess: (response) =>{
            return response;
        },
        onError: (response) => {

        }
    })
    return mutation;
}

export function useChangeFirstName(){
    const mutation = useMutation({
        mutationFn: (data: NewName) => changeFirstName(data)
        , onSuccess: (response) =>{
            return response;
        },
        onError: (response) =>{

        }
    })
    return mutation;
}

export function useForgotForm1(){
    const mutation = useMutation({
        mutationFn: (data : ForgotData) => forgotForm1(data)
    })
    return mutation;
}

export function useChangePass(){
    const mutation = useMutation({
        mutationFn: (data: PassData) => changePass(data)
        , onSuccess: (response) =>{
            return response
        },
        onError: (response) => {

        }
    }) 
    return mutation;
}
