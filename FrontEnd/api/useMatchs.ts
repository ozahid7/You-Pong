import { endPoints, matchReturn } from "@/types/Api";
import { useAxios } from "@/utils";
import { useQuery } from "@tanstack/react-query";


export const useMatchs = (uid: string) => {
	const getHistory = async () => {
		try {
			const response = await useAxios<matchReturn>(
				"get",
				endPoints.getMatchs + "?id_user=" + uid
			);
			console.log("matchs response = ", response);
			return response.Object;
		} catch (error) {
			console.log("matchs response = ", error);
		}
		return null;
	};
	return useQuery({ queryKey: ["matchs"], queryFn: getHistory });
};