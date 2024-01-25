import { myRoutes } from "@/const";
import { UserData, endPoints } from "@/types/Api";
import { useAxios } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";

export const useUser = (tfaVerified: boolean, setChecked: any) => {
	const getHero = async () => {
		try {
			const response = await useAxios<UserData>("get", endPoints.gethero);
			if (setChecked !== undefined) setChecked(true);
			return response.userInfo;
		} catch (error) {
			localStorage.removeItem("isLoged");
			if (setChecked !== undefined) setChecked(true);
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
