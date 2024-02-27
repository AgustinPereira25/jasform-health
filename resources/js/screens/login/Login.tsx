// import { GoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
// import { googleLogin } from "@/api";
// import { handleAxiosFieldErrors } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";
import { useEffect } from "react";

import { loginMutation } from "./loginAuth";
import { Button, Input, LoadingOverlay } from "@/ui";
import HomeTextAndImage from "@/components/HomeTextAndImage";
import { ROUTES } from "@/router";
import { useUserStore } from "@/stores";

const loginSchema = z
    .object({
        email: z
            .string()
            .min(1, { message: "Email is required" })
            .email({ message: "Invalid email" }),
        password: z
            .string()
            .trim()
            .min(1, { message: "Please enter Password" }),
    });
type LoginFormValues = z.infer<typeof loginSchema>;

export const Login = () => {
    const navigate = useNavigate();
    const { token } = useUserStore();
    useEffect(() => {
        if (token) {
            console.log("Login-token:", token);
            navigate(ROUTES.myDashboard);
        }
    }, []);

    const { setToken, setUser } = useUserStore();

    // const { mutate: googleLoginMutation } = useMutation({
    //   mutationFn: googleLogin.mutation,
    //   onSuccess: (data) => {
    //     void pushToast({ type: "success", title: "Welcome back!" });
    //     setToken(data.data.accessToken);
    //     navigate(ROUTES.base);
    //   },
    //   onError: (e) => {
    //     errorToast(e);

    //     // here we fail forwards, we are basically logging the user anyways
    //     // because we KNOW the login will fail
    //     void pushToast({ type: "success", title: "Welcome back!" });
    //     setToken("some token");
    //     navigate(ROUTES.base);
    //   },
    // });

    const {
        formState: { errors },
        handleSubmit,
        register,
    } = useForm<LoginFormValues>({
        defaultValues: {
            email: "angelalsmith@armyspy.com",
            password: "JASForm12345",
        },
        resolver: zodResolver(loginSchema),
    });

    const { mutate: loginUserMutation, isPending: isPendingLoginUserMutation } =
        useMutation({
            mutationFn: loginMutation.mutation,
            onSuccess: (data) => {
                console.log("loginUserMutation-data:", data);
                console.log("loginUserMutation-data.data.user:", data.data.user);
                console.log("loginUserMutation-data.data.accessToken:", data.data.accessToken);
                setUser(data.data.user);
                setToken(data.data.accessToken);
                toast.success('Login successfully!', {
                    autoClose: 1000
                });
                // navigate(ROUTES.base);
                navigate(ROUTES.myDashboard);
            },
            onError: (error: any) => {
                console.log("loginUserMutation-error:", error);
                if (error.response) {
                    toast.error(error.response.data.message);
                } else if (error.request) {
                    toast.error('Request was made but no response was received');
                } else {
                    toast.error('Error', error.message);
                }
            },
        });

    const onSubmit = (data: LoginFormValues) => {
        loginUserMutation(data);
    };

    return (
        <>
            {(isPendingLoginUserMutation) && (
                <LoadingOverlay />
            )}
            <div className="flex h-screen grow items-center justify-center gap-9 bg-gradient-to-r from-[#407EC9] to-[#00519E] px-6 py-12 lg:px-8">
                <HomeTextAndImage />
                <div className="bg-white p-8 rounded-lg">
                    <div className="flex justify-center">
                        <h2 className="text-2xl font-medium text-gray-900">Welcome!</h2>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-3">
                            <div>
                                <Input
                                    id="email"
                                    label="Email"
                                    placeholder="email@email.com"
                                    {...register("email")}
                                    error={errors.email?.message}
                                // value={emailInput}
                                // onChange={(e) => { setEmailInput(e.target.value); }}
                                />
                            </div>
                            <div>
                                <Input
                                    type="password"
                                    id="password"
                                    label="Password"
                                    placeholder="Enter Password"
                                    {...register("password")}
                                    error={errors.password?.message}
                                //value={passwordInput}
                                //onChange={(e) => { setPasswordInput(e.target.value); }}
                                />
                            </div>
                            <div className="flex justify-end">
                                <button className="text-sm font-medium text-blue-600">Forgot password?</button>
                            </div>
                            <div className="pb-8">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    //className="block w-full rounded-md bg-[#00519e] px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-[#407EC9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    className="block w-full"
                                // disabled={!isDirty || isPendingLogUserMutation}
                                >
                                    {/* {isPendingLogUserMutation ? (
                  <icons.SpinnerIcon className="h-5 w-5" />
                ) : (
                  "Log in"
                )} */}
                                    Log in
                                </Button>
                            </div>
                        </div>
                    </form>
                    <div className="pb-2">
                        <span className="text-sm">Don&apos;t have a JASForm Account? </span>
                        <button className="font-semibold text-sm">Register now</button>
                    </div>
                </div>

            </div>
        </>

    );
};
