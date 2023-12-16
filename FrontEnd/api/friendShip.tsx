import { myRoutes } from "@/const";
import { chatEndPoint, friendsEndPoint, searchBarReturn } from "@/types/Api";
import { useAxios } from "@/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const blockuser = (username: string, friends: any, setInvalid: any) => {
    const search = searchusers();
    const blockUser = async () => {
        try {
            const response = await useAxios(
                "put",
                friendsEndPoint.block + "?username=" + username
            );
            console.log("response... = ", response);
            if (friends !== undefined) friends.refetch();
            if (setInvalid !== undefined) setInvalid(true);
            search.refetch();
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
            console.log("search response = ", response);
            return response.Object;
        } catch (error) {
            console.log("search response = ", error);
        }
        return null;
    };
    return useQuery({ queryKey: ["search"], queryFn: searchUsers });
};

export const adduser = (username: string, friends: any) => {
    const addUser = async () => {
        try {
            const response = await useAxios(
                "post",
                friendsEndPoint.add + "?username=" + username
            );
            console.log("add user response = ", response);
            friends.refetch();
            return response;
        } catch (error) {
            console.log("add user error = ", error);
        }
    };
    return useMutation({ mutationFn: addUser });
};

export const removeuser = (username: string, friends: any) => {
    const removeUser = async () => {
        try {
            const response = await useAxios(
                "put",
                friendsEndPoint.decline + "?username=" + username
            );
            console.log("remove user response = ", response);
            friends.refetch();
            return response;
        } catch (error) {
            console.log("remove user error =", error);
        }
    };

    return useMutation({ mutationFn: removeUser });
};

export const unblockuser = (username: string, setInvalid: any) => {
    const search = searchusers();
    const unblockUser = async () => {
        try {
            const response = await useAxios(
                "put",
                friendsEndPoint.unblock + "?username=" + username
            );
            setInvalid(true);
            console.log("unblock response... = ", response);
            search.refetch()
            return response;
        } catch (error) {
            console.log("unblock error : ", error);
        }
    };
    return useMutation({ mutationFn: unblockUser });
};

export const acceptuser = (username: string, setInvalid: any) => {
    const acceptkUser = async () => {
        try {
            const response = await useAxios(
                "put",
                friendsEndPoint.accept + "?username=" + username
            );
            console.log("accept user response = ", response);
            setInvalid(true);
            return response;
        } catch (error) {
            console.log("accept user error = ", error);
        }
    };
    return useMutation({ mutationFn: acceptkUser });
};

export const declineuser = (username: string, setInvalid: any) => {
    const declineUser = async () => {
        try {
            const response = await useAxios(
                "put",
                friendsEndPoint.decline + "?username=" + username
            );
            console.log("accept user response = ", response);
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

export const todirect = (username: string) => {
    const router = useRouter();
    const toDirect = async () => {
        try {
            const response = await useAxios(
                "post",
                chatEndPoint.direct + "?username=" + username
            );
            console.log("todirect response = ", response);
            router.push(myRoutes.chat + "/" + username);
            return response;
        } catch (error) {
            console.log("to direct error = ", error);
        }
    };

    return useMutation({
        mutationFn: toDirect,
    });
};
