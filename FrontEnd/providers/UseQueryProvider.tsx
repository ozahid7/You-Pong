"use client";
import React from "react";
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from "react-query";
import { useState } from "react";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";

const UseQueryProvider = (Component: any) => {
    return function HOC(props: any) {
        const [client] = useState(() => new QueryClient());
        return (
            <QueryClientProvider client={client} contextSharing={true}>
                <Component {...props} />
            </QueryClientProvider>
        );
    };
};

export default UseQueryProvider;
