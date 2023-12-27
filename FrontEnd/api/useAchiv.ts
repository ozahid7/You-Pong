import { achievementReturn, endPoints } from "@/types/Api";
import { useAxios } from "@/utils";
import { useQuery } from "@tanstack/react-query";

export const useAchiv = (uid: string) => {
	const getAchiv = async () => {
		try {
			const response = await useAxios<achievementReturn>(
				"get",
				endPoints.getAchiv + "?id_user=" + uid
			);
			console.log("achiv response = ", response);
			return response.Object;
		} catch (error) {
			console.log("achiv response = ", error);
		}
		return null;
	};
	return useQuery({ queryKey: ["achiv"], queryFn: getAchiv });
};
