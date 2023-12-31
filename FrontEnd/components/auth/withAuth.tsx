"use client";
import React, { useLayoutEffect, useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const withAuth = (Component: any) => {
    return (props: any) => {
        const router = useRouter();
        const [valid, setValid] = useState(false);
        var isAuth: boolean = false;
        if (typeof window !== "undefined") {
            isAuth =
                localStorage.getItem("isLogedIn") === "true" ? true : false;
            console.log("is auth = ", isAuth);
        }

        useEffect(() => {
            if (!isAuth) {
                router.push("/");
            }
            setValid(true);
        }, []);

        if (valid) return <Component {...props} />;
    };
};

export default withAuth;
