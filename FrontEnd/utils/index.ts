import { singInData } from "@/types/Api";
import axios, { AxiosResponse, AxiosError } from "axios";
import React from "react";

export const renderIcon = (icon: any, style?: string, elmsize?: number) => {
    return React.createElement(icon, { className: style, size: elmsize });
};

const baseURL = "http://localhost:4000/";

const axiosInstance = axios.create({
    baseURL,
    withCredentials: true
});

export const useAxios = async <T> (
    method: "get" | "post" | "put" | "delete",
    endpoint: string,
    data?: Record<any, any>
): Promise<T> => {
    try {
        const response = await axiosInstance({
            method,
            url: endpoint,
            data,
        });
        return response.data
    }catch(e){
        throw e as AxiosError
    }
};
