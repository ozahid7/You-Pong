import { friendsEndPoint } from "@/types/Api";
import { useAxios } from ".";


export const blockUser = async (username) => {
     try {
         const response = await useAxios("patch", friendsEndPoint.block, {
             friend: username,
         });
         console.log("response... = ", response);
     } catch (error) {
         console.log("error : ", error);
     }
};