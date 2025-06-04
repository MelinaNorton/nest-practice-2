import { useQuery } from "@tanstack/react-query";
import { displayLoggedInUser, displayPerson } from "@/api/peoples";
import { NewPerson } from "@/api/peoples";
import { getPhoto } from "@/api/peoples";

export function useDisplayPerson(name : string) {
  return useQuery<NewPerson>({
    queryKey: ["person", name],
    queryFn: () => displayPerson(name),
    enabled: Boolean(name),
  });
}

export function useDisplayLoggedInUser(name : string) {
    return useQuery<NewPerson>({
        queryKey: ['loggediname', name],
        queryFn: () => displayLoggedInUser(name),
        enabled: Boolean(name),
    })
}

export function useGetPhoto(username : string){
  return useQuery<string>({
    queryKey:["photousername", username],
    queryFn: () => getPhoto(username),
    enabled: Boolean(username),
  })
}