import { myRoutes } from "@/const";
import { endPoints, friendsEndPoint, UserToShow } from "@/types/Api";
import { useAxios } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { redirect, useRouter } from "next/navigation";

const useOtherUser = (username: string) => {
    const router = useRouter()
    const getUser = async () => {
        try {
            const response = await useAxios<UserToShow>(
                "post",
                endPoints.getuser,
                { friend: username }
            );
            console.log("get user response = ", response);
            return response;
        } catch (error) {
            console.log("get user error = :", error);
        }
        return null;
    };

    const otheruser = useQuery({
        queryKey: ["otheruser", username],
        queryFn: getUser,
        enabled: username !== "profile",
    });
    return otheruser;
};

export default useOtherUser;
