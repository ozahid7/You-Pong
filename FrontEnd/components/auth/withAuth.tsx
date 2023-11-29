'use client'
import React, { useLayoutEffect, useState } from 'react'
import { useEffect } from 'react'
import { redirect } from 'next/navigation'

const withAuth = (Component: any) => {
    return function WithAuth(props: any){
        const [valid, setValid] = useState(false)
        var isAuth: boolean = false;
        if (typeof window !== 'undefined') {
            isAuth = localStorage.getItem('isLogedIn') === 'tfaStatus' ? true : false;
            console.log('is auth = ', isAuth)
        }

    useEffect(() => {
        if(!isAuth){
            redirect("/");
        }
        setValid(true)
    }, [])
        
    
    if (valid ) return <Component {...props}/>

    };
}

export default withAuth