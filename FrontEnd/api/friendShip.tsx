import { myRoutes } from "@/const";
import { chatEndPoint, friendsEndPoint, searchBarReturn } from "@/types/Api";
import { useAxios } from "@/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const blockuser = (uid: string) => {
	const query = useQueryClient();

	const blockUser = async () => {
		try {
			const response = await useAxios(
				"put",
				friendsEndPoint.block + "?id_friend=" + uid
			);
			query.invalidateQueries({ queryKey: ["search"] });
			query.invalidateQueries({ queryKey: ["friends"] });
			query.removeQueries({
				queryKey: ["otheruser", "hamidjafy"],
			});
			return response;
		} catch (error) {
			console.log("error : ", error);
		}
	};
	return useMutation({ mutationFn: blockUser });
};

export const searchusers = () => {
	const searchUsers = async () => {
		try {
			const response = await useAxios<searchBarReturn>(
				"get",
				friendsEndPoint.search
			);
			return response.Object;
		} catch (error) {
			console.log("search error = ", error);
		}
		return null;
	};
	return useQuery({ queryKey: ["search"], queryFn: searchUsers });
};

export const adduser = (uid: string, username?: string) => {
	const query = useQueryClient();
	const addUser = async () => {
		try {
			const response = await useAxios(
				"post",
				friendsEndPoint.add + "?id_friend=" + uid
			);
			query.invalidateQueries({ queryKey: ["friends"] });
			query.invalidateQueries({ queryKey: ["otheruser", username] });
			return response;
		} catch (error) {
			console.log("add user error = ", error);
		}
	};
	return useMutation({ mutationFn: addUser });
};

export const removeuser = (uid: string, username?: string) => {
	const query = useQueryClient();
	const removeUser = async () => {
		try {
			const response = await useAxios(
				"put",
				friendsEndPoint.decline + "?id_friend=" + uid
			);
			query.invalidateQueries({ queryKey: ["friends"] });
			query.invalidateQueries({ queryKey: ["otheruser", username] });
			return response;
		} catch (error) {
			console.log("remove user error =", error);
		}
	};

	return useMutation({ mutationFn: removeUser });
};

export const unblockuser = (uid: string) => {
	const query = useQueryClient();
	const unblockUser = async () => {
		try {
			const response = await useAxios(
				"put",
				friendsEndPoint.unblock + "?id_friend=" + uid
			);
			query.invalidateQueries({ queryKey: ["search"] });
			query.invalidateQueries({ queryKey: ["friends"] });
			return response;
		} catch (error) {
			console.log("unblock error : ", error);
		}
	};
	return useMutation({ mutationFn: unblockUser });
};

export const acceptuser = (uid: string) => {
	const query = useQueryClient();
	const acceptkUser = async () => {
		try {
			const response = await useAxios(
				"put",
				friendsEndPoint.accept + "?id_friend=" + uid
			);
			query.invalidateQueries({ queryKey: ["friends"] });
			return response;
		} catch (error) {
			console.log("accept user error = ", error);
		}
	};
	return useMutation({ mutationFn: acceptkUser });
};

export const declineuser = (uid: string) => {
	const query = useQueryClient();
	const declineUser = async () => {
		try {
			const response = await useAxios(
				"put",
				friendsEndPoint.decline + "?id_friend=" + uid
			);
			query.invalidateQueries({ queryKey: ["friends"] });
			return response;
		} catch (error) {
			console.log("accept user error = ", error);
		}
	};

	return useMutation({
		mutationFn: declineUser,
	});
};

export const todirect = (uid: string) => {
	const router = useRouter();

	const toDirect = async () => {
		try {
			const response = await useAxios(
				"post",
				chatEndPoint.direct + "?id_friend=" + uid
			);
			console.log("todirect response = ", response);
			router.push("/chat" + "/" + uid);
			return response;
		} catch (error) {
			console.log("to direct error = ", error);
		}
	};

	return useMutation({
		mutationFn: toDirect,
	});
};
