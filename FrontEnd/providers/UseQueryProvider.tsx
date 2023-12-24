"use client";
import React from "react";
import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";

const UseQueryProvider = ({ children }: { children: React.ReactNode }) => {
    const [client] = useState(() => new QueryClient());
    return (
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
    );
};

export default UseQueryProvider;
