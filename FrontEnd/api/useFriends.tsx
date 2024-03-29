import { FriendsReturn, endPoints } from "@/types/Api";
import { useAxios } from "@/utils";
import { useQuery } from "@tanstack/react-query";

const useFriends = () => {
	const getFriends = async () => {
		try {
			const response = await useAxios<FriendsReturn>(
				"get",
				endPoints.getFriend
			);
			return response.Object;
		} catch (error) {}
		return null;
	};

	return useQuery({
		queryKey: ["friends"],
		queryFn: getFriends,
	});
};

export default useFriends;
