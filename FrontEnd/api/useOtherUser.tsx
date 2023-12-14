import { endPoints, UserToShow } from "@/types/Api";
import { useAxios } from "@/utils";
import { useQuery } from "@tanstack/react-query";

const useOtherUser = (username: string) => {
    const getUser = async () => {
        console.log("user = ", username);
        try {
            const response = await useAxios<UserToShow>(
                "post",
                endPoints.getuser,
                { friend: username }
            );
            console.log("get user response = ", response);
            return response
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
    console.log('other user ', otheruser)
    return otheruser
};

export default useOtherUser;
