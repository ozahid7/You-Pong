import { endPoints } from "@/types/Api";
import { useAxios } from "@/utils";
import { useMutation } from "@tanstack/react-query";

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
		} catch (error) {}
	};

	return useMutation({ mutationFn: updateInfo });
};
