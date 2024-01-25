import axios, { AxiosError } from "axios";
import React from "react";

export const renderIcon = (icon: any, style?: string, elmsize?: number) => {
	return React.createElement(icon, { className: style, size: elmsize });
};

export const baseURL = `http://${process.env.NEXT_PUBLIC_HOST_IP}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/`;

const axiosInstance = axios.create({
	baseURL,
	withCredentials: true,
});

export const useAxios = async <T>(
	method: "get" | "post" | "put" | "delete" | "patch",
	endpoint: string,
	data?: Record<any, any>
): Promise<T> => {
	try {
		const response = await axiosInstance({
			method,
			url: endpoint,
			data,
		});
		return response.data;
	} catch (e) {
		throw e as AxiosError;
	}
};
