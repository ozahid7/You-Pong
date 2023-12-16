import { friendsEndPoint } from "@/types/Api";
import { useAxios } from ".";


export const blockUser = async (username) => {
     try {
         const response = await useAxios(
             "put",
             friendsEndPoint.block + "?username=" + username
         );
         console.log("response... = ", response);
     } catch (error) {
         console.log("error : ", error);
     }
};