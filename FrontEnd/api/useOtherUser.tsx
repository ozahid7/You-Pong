import { endPoints, UserToShow } from "@/types/Api";
import { useAxios } from "@/utils";
import { useQuery } from "@tanstack/react-query";

const useOtherUser = (username: string) => {
	const getUser = async () => {
		try {
			const response = await useAxios<UserToShow>(
				"post",
				endPoints.getuser,
				{
					friend: username,
				}
			);
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
