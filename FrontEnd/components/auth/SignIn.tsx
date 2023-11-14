"use client";
import {
    CustomButton,
    IntraButton,
    MyContainer,
    MyDialog,
    MyInput,
} from "@/components"
import axios from "axios"
import Link from "next/link";
import { useEffect, useState } from "react";

const SignIn = (props: {
    isOpen: boolean;
    closemodal: Function;
    showSignUp: Function;
}) => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    let [isInvalidEmail, setIsInvalidEmail] = useState(false);
    let [isInvalidPass, setIsInvalidPass] = useState(false);
    const [isSubmited, setIsSubmited] = useState(false);

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    
    useEffect(() => {
        console.log('use effect')
        if (!isInvalidEmail && !isInvalidPass && isSubmited) {
            console.log("valid input");
            const toSend: object = {
                email: email,
                password: pass,
            };
            const apiUrl = "http://localhost:4000/auth/local/signin";
            axios
                .post(apiUrl, toSend)
                .then((data: any) => {
                    console.log("chouf: ", data.data.access_token);
                })
                .catch((error) => {
                    console.log("eeeerrro: ", error);
                });
            setIsSubmited(false);
        }
    }, [isInvalidEmail, isInvalidPass, isSubmited]);
    
    //check regex if it is valid to post the email and pass to the data base
    const handleSubmit = (e: any) => {
        e.preventDefault();
        !emailRegex.test(email)
        ? setIsInvalidEmail(true)
        : setIsInvalidEmail(false);
        setIsSubmited(true);
        pass.length < 8 ? setIsInvalidPass(true) : setIsInvalidPass(false);
    };

    //remove invalid error msg from inputs while typing
    const handleFocus = () => {
        setIsSubmited(false);
        setIsInvalidEmail(false);
        setIsInvalidPass(false);
    };

    //show signup from sign in modal
    const handleShowSignup = () => {
        props.closemodal(false);
        props.showSignUp(true);
    };

    return (
        <MyDialog
            isOpen={props.isOpen}
            closemodal={() => {
                props.closemodal(false);
                setEmail("");
                setPass("");
            }}
            withCorner={false}
            customClass="absolute sm:h-[50%] sm:max-h-[520px] lg:max-h-[580px] h:max-h-[440px] max-h-[400px] max-w-[510px] h-[40%] md:w-[60%] w-[90%] s:w-[70%] min-h-[500px]"
        >
            <div className="flex items-center flex-col h-full overflow-auto">
                <div className="w-full flex justify-evenly items-end ">
                    <hr className="w-[30%] border border-palette-grey rounded-sm" />
                    <h2 className="text-gray-400 mt-4 font-body text-xl sm:text-2xl md:text-3xl font-bold ">
                        Sign In
                    </h2>
                    <hr className="w-[30%] border border-palette-grey rounded-sm" />
                </div>
                <form
                    action=""
                    noValidate
                    className="h:w-[90%] w-full h-[70%] flex flex-col justify-evenly items-center px-2"
                    onSubmit={handleSubmit}
                >
                    <div
                        onFocus={handleFocus}
                        className="w-[80%] flex flex-col items-center justify-around h-[50%]"
                    >
                        <MyInput
                            text="Email"
                            customclass="sm:min-h-[50px] min-w-[210px]"
                            type="email"
                            isPassword={false}
                            setInput={setEmail}
                            isValid={isInvalidEmail}
                            inputclass=""
                            message="Email is invalid"
                        />
                        <MyInput
                            text="Password"
                            customclass="sm:min-h-[50px] min-w-[210px]"
                            type="password"
                            isPassword={true}
                            setInput={setPass}
                            isValid={isInvalidPass}
                            message="Invalid Password"
                        />
                    </div>
                    <div className="md:w-[79%] w-[80%] xl:w-full max-w-[320px] sm:h-[60px] flex justify-center items-center">
                        <CustomButton
                            text="Sign In"
                            color="orange"
                            otherclass=""
                            // handleclick={handleSubmit}
                        />
                    </div>
                    <div className="w-full flex justify-evenly items-end">
                        <hr className="w-[30%] border border-palette-grey rounded-sm" />
                        <h2 className="text-gray-300 font-body text-xl sm:text-2xl md:text-3xl font-bold ">
                            OR
                        </h2>
                        <hr className="w-[30%] border border-palette-grey rounded-sm" />
                    </div>
                </form>
                <form
                    method="post"
                    action="http://localhost:4000/auth/42/callback"
                    className="h:w-[90%] h-[30%] w-full flex flex-col justify-evenly  items-center px-2"
                >
                    <div className="w-[80%] xl:w-full max-w-[320px]  sm:h-[60px]  flex justify-center items-center">
                        <IntraButton type="login" />
                        </div>
                <span className="text-[12px] sm:text-[14px] md:text-md mt-2 lg:text-xl text-gray-500">
                    Already have an account ?{" "}
                    <span
                        onClick={handleShowSignup}
                        className="text-blue-500 text-sm md:text-md cursor-pointer lg:text-xl"
                    >
                        Sign Up
                    </span>{" "}
                </span>
                </form>
            </div>
        </MyDialog>
    );
};

export default SignIn;
