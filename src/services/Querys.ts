import { QueryClient, UseBaseQueryOptions, useMutation, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Client, Video } from "./types";
const baseURL=`http://${import.meta.env.VITE_SERVER_ADDRESS}`
interface configInterface {
    config: { onSuccess: () => void; onError: () => void };
  }
export const allVideosQuery = () => ({
    queryKey: ["videos"],
    queryFn: async (): Promise<Video[]> => {
      const res = axios
        .get("http://127.0.0.1:8000/api/all-videos")
        .then((res) => res.data);
      return res;
    },
  });
  export const allClientsQuery = () => ({
    queryKey: ["clients"],
    queryFn: async (): Promise<Client[]> => {
      const res = axios
        .get("http://127.0.0.1:8000/api/all-pcs")
        .then((res) => res.data);
      return res;
    },
  });
  export const allVideosLoader = (queryClient: QueryClient) => async () => {
    const query = allVideosQuery();
    // ⬇️ return data or fetch it
    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };
  export const allClientsLoader = (queryClient: QueryClient) => async () => {
    const query = allClientsQuery();
    // ⬇️ return data or fetch it
    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };
  export const clientQuery = ({id}:{id:string|undefined}):UseBaseQueryOptions => ({
    
    queryKey: ["client",id],
    queryFn: async (): Promise<Client> => {
       
      const res = axios
        .get(`${baseURL}/api/pc/${id}`)
        .then((res) => res.data);
      return res;
    },
    enabled:!!id
    
  });
  
  export const useAddClient = ({config}:configInterface) => {
    const queryClient = useQueryClient()
 
    return useMutation({
      mutationFn: (newClient:Client) =>
        axios.post(`${baseURL}/api/all-pcs`, newClient),
      onSuccess: () => {
        config.onSuccess();
    
        // ✅ refetch the comments list for our blog post
        queryClient.invalidateQueries({ queryKey: ['clients'] })
      },
      onError(error:AxiosError, variables, context) {
          console.log(error.response?.data)
          
      },
    })
  }
 
  export const useUpdateClient = ({config}:configInterface) => {
    interface Props {
        newClient:Client
        id:number
    }
    const queryClient = useQueryClient()
    
    return useMutation({
      mutationFn: ({newClient,id}:Props) =>
        axios.patch(`${baseURL}/api/pc/${id}`, newClient),
      onSuccess: () => {
        config.onSuccess();
        // ✅ refetch the comments list for our blog post
        queryClient.invalidateQueries({ queryKey: ['clients'] })

      },
    })
  }
  
  export const useDeleteClient= ({config}:configInterface) => {
    interface Props {
    
        id:number
    }
    const queryClient = useQueryClient()
    
    return useMutation({
      mutationFn: ({id}:Props) =>
        axios.delete(`${baseURL}/api/pc/${id}`),
      onSuccess: () => {
        config.onSuccess();
        // ✅ refetch the comments list for our blog post
        queryClient.invalidateQueries({ queryKey: ['clients'] })

      },
    })
  }