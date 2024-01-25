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
			return response.Object;
		} catch (error) {}
		return null;
	};
	return useQuery({ queryKey: ["achiv", uid], queryFn: getAchiv });
};
