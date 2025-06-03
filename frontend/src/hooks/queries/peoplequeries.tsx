import { useQuery } from "@tanstack/react-query";
import { displayLoggedInUser, displayPerson } from "@/api/peoples";
import { NewPerson } from "@/api/peoples";
import { UseQueryResult } from "@tanstack/react-query";

//query function declarations are set up differently from mutations; mutations take the data or data-object as a parameter within "mutationFn"; queries
//however take no parameters within their queryDn call, and instead accept parameters from the query-function itself (here, useDIsplayPerson).
//moreover, the query declaration requires the specification of a queryKey
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