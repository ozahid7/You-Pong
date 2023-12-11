"use client";
import React from "react";
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";

const UseQueryProvider = (Component: any) => {
    return function HOC(props: any) {
        const [client] = useState(() => new QueryClient());
        return (
            <QueryClientProvider client={client}>
                <Component {...props} />
            </QueryClientProvider>
        );
    };
};

export default UseQueryProvider;
