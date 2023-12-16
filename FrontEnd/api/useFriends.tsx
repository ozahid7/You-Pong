import { FriendsReturn, endPoints } from "@/types/Api";
import { useAxios } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const useFriends = () => {
    const getFriends = async () => {
        try {
            const response = await useAxios<FriendsReturn>(
                "get",
                endPoints.getFriend
            );
            return response.Object
        } catch (error) {
            console.log("error get Friends : ", error);
        }
        return null;
    };

    return useQuery({
        queryKey: ["friends"],
        queryFn: getFriends,
    });
};

export default useFriends;
