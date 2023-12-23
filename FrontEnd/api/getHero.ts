import { UserData, endPoints } from "@/types/Api";
import { useAxios } from "@/utils";
import { useQuery } from "@tanstack/react-query";

export const useUser = (tfaVerified: boolean) => {
	const getHero = async () => {
		try {
			const response = await useAxios<UserData>("get", endPoints.gethero);
			console.log("hero response = ", response.userInfo);
			return response.userInfo;
		} catch (error) {
			console.log("get hero error = :", error);
		}
		return null;
	};

	return useQuery({
		queryKey: ["user"],
		queryFn: getHero,
		enabled: tfaVerified,
	});
};
