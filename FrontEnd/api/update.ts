import { myRoutes } from "@/const";
import { endPoints } from "@/types/Api";
import { useAxios } from "@/utils";
import { QueryClient, useMutation } from "@tanstack/react-query";

export const updateProfile = (
	newUsername: string,
	password: string,
	newPassword: string,
	newAvatar: string
) => {
	const updateInfo = async () => {
		try {
			const res = await useAxios("patch", endPoints.updateInfo, {
				newUsername: newUsername,
				password: password,
				newPassword: newPassword,
				newAvatar: newAvatar,
			});
			return res;
		} catch (error) {
			console.log("error = ", error);
		}
	};

	return useMutation({ mutationFn: updateInfo });
};
