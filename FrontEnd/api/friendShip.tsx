import { myRoutes } from "@/const";
import { chatEndPoint, friendsEndPoint, searchBarReturn } from "@/types/Api";
import { useAxios } from "@/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const blockuser = (uid: string, friends: any, setInvalid: any) => {
	const search = useQueryClient();
	const blockUser = async () => {
		try {
			const response = await useAxios(
				"put",
				friendsEndPoint.block + "?id_friend=" + uid
			);
			if (friends !== undefined) friends.refetch();
			if (setInvalid !== undefined) setInvalid(true);
			search.invalidateQueries({ queryKey: ["search"] });
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

export const adduser = (uid: string, friends: any) => {
	const addUser = async () => {
		try {
			const response = await useAxios(
				"post",
				friendsEndPoint.add + "?id_friend=" + uid
			);
			friends.refetch();
			return response;
		} catch (error) {
			console.log("add user error = ", error);
		}
	};
	return useMutation({ mutationFn: addUser });
};

export const removeuser = (uid: string, friends: any) => {
	const removeUser = async () => {
		try {
			const response = await useAxios(
				"put",
				friendsEndPoint.decline + "?id_friend=" + uid
			);
			friends.refetch();
			return response;
		} catch (error) {
			console.log("remove user error =", error);
		}
	};

	return useMutation({ mutationFn: removeUser });
};

export const unblockuser = (uid: string, setInvalid: any) => {
	const search = useQueryClient();
	const unblockUser = async () => {
		try {
			const response = await useAxios(
				"put",
				friendsEndPoint.unblock + "?id_friend=" + uid
			);
			setInvalid(true);
			search.invalidateQueries({ queryKey: ["search"] });
			return response;
		} catch (error) {
			console.log("unblock error : ", error);
		}
	};
	return useMutation({ mutationFn: unblockUser });
};

export const acceptuser = (uid: string, setInvalid: any) => {
	const acceptkUser = async () => {
		try {
			const response = await useAxios(
				"put",
				friendsEndPoint.accept + "?id_friend=" + uid
			);
			setInvalid(true);
			return response;
		} catch (error) {
			console.log("accept user error = ", error);
		}
	};
	return useMutation({ mutationFn: acceptkUser });
};

export const declineuser = (uid: string, setInvalid: any) => {
	const declineUser = async () => {
		try {
			const response = await useAxios(
				"put",
				friendsEndPoint.decline + "?id_friend=" + uid
			);
			setInvalid(true);
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
			router.push(myRoutes.chat + "/" + uid);
			return response;
		} catch (error) {
			console.log("to direct error = ", error);
		}
	};

	return useMutation({
		mutationFn: toDirect,
	});
};
