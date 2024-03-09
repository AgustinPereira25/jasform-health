// import { GoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
// import { googleLogin } from "@/api";
// import { handleAxiosFieldErrors } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { Modal, Label, TextInput, Tooltip } from 'flowbite-react';

import { loginMutation } from "./loginAuth";
import { Button, Input, LoadingOverlay, BackgroundGradientAnimation } from "@/ui";
import HomeTextAndImage from "@/components/HomeTextAndImage";
import { ROUTES } from "@/router";
import { useUserStore } from "@/stores";
import { message } from "@/constants/message";

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

    //Todo: Clear this default values
    const {
        formState: { errors },
        handleSubmit,
        register,
    } = useForm<LoginFormValues>({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(loginSchema),
    });

    const { mutate: loginUserMutation, isPending: isPendingLoginUserMutation } =
        useMutation({
            mutationFn: loginMutation.mutation,
            onSuccess: (data) => {
                setUser(data.data.data.user);
                setToken(data.data.data.accessToken);
                navigate(ROUTES.myDashboard);
            },
            onError: (error: any) => {
                if (error.response) {
                    toast.error(error.response.data.error.message);
                } else if (error.request) {
                    toast.error('Request was made but no response was received');
                } else {
                    toast.error('Error', error.message);
                }
            },
        });

    const onSubmit = (data: LoginFormValues) => {
        console.info("onSubmit");
        loginUserMutation(data);
    };

    const [openModal, setOpenModal] = useState(false);
    const [goToFormDisabled, setGoToFormDisabled] = useState(true);
    const publicCodeRef = useRef<HTMLInputElement>(null);
    const auxCodeRef = useRef<HTMLInputElement>(null);

    const [publicCodeInputValue, setPublicCodeInputValue] = useState('');
    useEffect(() => {
        const isUpperCase = publicCodeInputValue === publicCodeInputValue.toUpperCase();
        const isSixLetters = publicCodeInputValue.length === 6;

        if (isUpperCase && isSixLetters) {
            setGoToFormDisabled(false);
        } else {
            setGoToFormDisabled(true);
        }
    }, [publicCodeInputValue]);

    return (
        <>
            <BackgroundGradientAnimation>
                {(isPendingLoginUserMutation) && (
                    <LoadingOverlay />
                )}
                <div
                    className="pointer-events-auto flex h-screen grow items-center justify-center gap-9 bg-gradient-to-r from-secondary to-primary px-6 py-12 lg:px-8"
                >
                    <HomeTextAndImage />
                    <div className="bg-white p-8 rounded-lg z-90 ">
                        <div className="flex justify-center mb-4">
                            <h2 className="text-2xl font-medium text-primary">Welcome!</h2>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid gap-2">
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
                                    <button onClick={() => navigate(ROUTES.recover)} className="text-sm font-medium text-blue-600">Forgot password?</button>
                                </div>
                                <div className="pb-2">
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
                            <button onClick={() => navigate(ROUTES.register)} className="font-semibold text-blue-600 text-sm">Register now</button>
                        </div>

                        <div className="pt-8">
                            <button onClick={() => setOpenModal(true)}
                                className="h-10 animate-shimmer items-center justify-center rounded-md border border-slate-100
    bg-[linear-gradient(110deg,#773DBD,45%,#3b1882,55%,#773DBD)] bg-[length:200%_100%] px-6 font-medium
    text-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400
    focus:ring-offset-2 focus:ring-offset-slate-50 block w-full hover:text-slate-300"
                            >
                                I have a Form Public Code
                            </button>

                        </div>
                    </div>

                </div>
            </BackgroundGradientAnimation>
            <Modal position={"center"} show={openModal} size="sm" popup onClose={() => setOpenModal(false)} initialFocus={publicCodeRef}>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="publicCodeRef" value="Form Public Code*" />
                            </div>
                            <Tooltip
                                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                                content={message.TOOLTIP_PUBLIC_FORM} className="text-nowrap w-full" placement="right"
                            >
                                <TextInput className="w-full uppercase" id="publicCode" ref={publicCodeRef} placeholder="ABCDEF" required
                                    value={publicCodeInputValue.toUpperCase()}
                                    onChange={(e) => setPublicCodeInputValue(e.target.value.toUpperCase())} maxLength={6} />
                            </Tooltip>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="auxCodeRef" value="Aux Code (optional)" />
                            </div>
                            <Tooltip
                                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                                content={message.TOOLTIP_FORM_AUX_CODE} className="text-nowrap w-full" placement="right"
                            >
                                <TextInput className="w-full" id="auxCode" ref={auxCodeRef} placeholder="Optional aux code" />
                            </Tooltip>
                        </div>
                        <div className="w-full flex gap-2 justify-between">
                            <Button variant="secondary" onClick={() => {
                                setOpenModal(false)
                            }}>Cancelar</Button>
                            <Button disabled={goToFormDisabled} variant="primary" className=
                                {!goToFormDisabled ? "bg-[#773DBD] hover:bg-[#3b1882]" : ""}
                                onClick={() => {
                                    navigate(ROUTES.instanceFormHome + "/" + publicCodeRef.current?.value + "?aux_code=" + auxCodeRef.current?.value);
                                }}>Go to Form</Button>
                        </div>

                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};
