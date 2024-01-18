import { myRoutes } from "@/const";
import { UserData, endPoints } from "@/types/Api";
import { useAxios } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";

export const useUser = (tfaVerified: boolean, test: string) => {
	const getHero = async () => {
		try {
			const response = await useAxios<UserData>("get", endPoints.gethero);
			return response.userInfo;
		} catch (error) {
			localStorage.removeItem("isLoged");
			console.log("user fetched from ", test);
			console.log("get hero error = :", error);
			redirect(myRoutes.root);
		}
		return null;
	};

	return useQuery({
		queryKey: ["user"],
		queryFn: getHero,
		enabled: tfaVerified,
	});
};
