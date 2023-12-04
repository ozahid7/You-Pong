"use client";
import { CustomButton, IntraButton, MyDialog, MyInput } from "@/components";
import { useEffect, useState } from "react";
import { baseURL, useAxios } from "@/utils";
import { endPoints, singUpData } from "@/types/Api";

const SignUp = (props: {
    isOpen: boolean;
    closemodal: Function;
    showSignIn: Function;
}) => {

    
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    let [isInvalidEmail, setIsInvalidEmail] = useState(false);
    let [isInvalidPass, setIsInvalidPass] = useState(false);
    let [isInvalidConfirmPass, setIsInvalidconfirmPass] = useState(false);
    const [isSubmited, setIsSubmited] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{1,4}$/;

    const signUp = async () => {
        const toSend: object = {
            email: email,
            password: pass,
        };
        try {
            const response = await useAxios<singUpData>(
                "post",
                endPoints.signup,
                toSend
            );
            console.log("response = ", response);
        } catch (error) {
            console.log("error = ", error);
        }
    };

    useEffect(() => {
        if (
            !isInvalidEmail &&
            !isInvalidPass &&
            isSubmited &&
            !isInvalidConfirmPass
        ) {
            setIsLoading(true);
            signUp();
            setIsSubmited(false);
        }
    }, [isInvalidEmail, isInvalidPass, isSubmited, isInvalidConfirmPass]);

    //check regex if it is valid to post the email and pass to the data base
    const handleSubmit = (e: any) => {
        e.preventDefault();
        !emailRegex.test(email)
            ? setIsInvalidEmail(true)
            : setIsInvalidEmail(false);
        setIsSubmited(true);
        pass.length < 8 ? setIsInvalidPass(true) : setIsInvalidPass(false);
        pass != confirmPass
            ? setIsInvalidconfirmPass(true)
            : setIsInvalidconfirmPass(false);
    };

    //set loader in the button to the default state
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, [isLoading]);

    //remove invalid error msg from inputs while typing
    const handleFocus = () => {
        setIsSubmited(false);
        setIsInvalidEmail(false);
        setIsInvalidPass(false);
        setIsInvalidconfirmPass(false);
    };

    const handleShowSignIn = () => {
        props.closemodal(false);
        props.showSignIn(true);
    };

    return (
        <MyDialog
            isOpen={props.isOpen}
            closemodal={() => {
                props.closemodal(false);
                setEmail("");
                setPass("");
                setConfirmPass("");
                setIsLoading(false);
            }}
            withCorner={false}
            customClass="absolute sm:h-[50%] max-h-[620px] max-w-[540px] h-[40%] md:w-[60%] w-[90%] s:w-[70%] h:min-h-[560px] min-h-[500px]"
        >
            <div className="flex items-center flex-col h-full overflow-auto">
                <div className="w-full flex justify-evenly items-end ">
                    <hr className="w-[30%] border border-palette-grey rounded-sm" />
                    <h2 className="text-gray-400 mt-4 font-body text-xl sm:text-2xl md:text-3xl font-bold ">
                        Sign Up
                    </h2>
                    <hr className="w-[30%] border border-palette-grey rounded-sm" />
                </div>
                <form
                    noValidate
                    onSubmit={handleSubmit}
                    action=""
                    className="h:w-[90%] w-full h-[70%] flex flex-col items-center px-2"
                >
                    <div
                        onFocus={handleFocus}
                        className="w-[80%] pt-2 flex flex-col items-center justify-evenly h-[70%]"
                    >
                        <MyInput
                            text="Email"
                            customclass="sm:min-h-[50px] min-w-[210px]"
                            type="email"
                            isPassword={false}
                            setInput={setEmail}
                            isValid={isInvalidEmail}
                            message="Email is invalid"
                        />
                        <MyInput
                            text="Password"
                            customclass="sm:min-h-[50px] min-w-[210px]"
                            type="password"
                            isPassword={true}
                            setInput={setPass}
                            isValid={isInvalidPass}
                            message="Enter at least 8 characters"
                        />
                        <MyInput
                            text="Confirm Password"
                            customclass="sm:min-h-[50px] min-w-[210px]"
                            type="password"
                            isPassword={true}
                            setInput={setConfirmPass}
                            isValid={isInvalidConfirmPass}
                            message="Passwords must match"
                        />
                    </div>
                    <div className="w-[80%] xl:w-full max-w-[340px] sm:h-[60px] flex justify-center items-center">
                        <CustomButton
                            text="Sign Up"
                            color="orange"
                            otherclass=""
                            isLoading={isLoading}
                        />
                    </div>
                    <div className="w-full flex  pt-3 justify-evenly items-end">
                        <hr className="w-[30%] border border-palette-grey rounded-sm" />
                        <h2 className="text-gray-300 font-body text-xl sm:text-2xl md:text-3xl font-bold ">
                            OR
                        </h2>
                        <hr className="w-[30%] border border-palette-grey rounded-sm" />
                    </div>
                </form>
                <form
                    method="post"
                    action={`${baseURL}auth/42`}
                    className="h:w-[90%] h-[30%] w-full flex flex-col justify-evenly  items-center px-2"
                >
                    <div className="w-[80%] xl:w-full max-w-[340px]  sm:h-[60px]  flex justify-center items-center">
                        <IntraButton type="" />
                    </div>
                    <span className="text-sm md:text-md lg:text-xl text-gray-500">
                        Don’t have an account ?{" "}
                        <span
                            onClick={handleShowSignIn}
                            className="text-blue-500 cursor-pointer text-sm md:text-md lg:text-xl"
                        >
                            Sign In
                        </span>{" "}
                    </span>
                </form>
            </div>
        </MyDialog>
    );
};

export default SignUp;
