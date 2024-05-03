
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Tooltip } from "flowbite-react";

import type { RegisterParams } from "./loginAuth";
import { registerMutation, registerPreEmailValidationMutation } from "./loginAuth";
import { Button, Input, LoadingOverlay } from "@/ui";
import HomeTextAndImage from "@/components/HomeTextAndImage";
import { ROUTES } from "@/router";
import { useUserStore } from "@/stores";
import type { IHttpResponseError } from "@/api";

const registerSchema = z
    .object({
        firstName: z
            .string()
            .trim()
            .min(1, { message: "Please enter first name" }),
        lastName: z
            .string()
            .trim()
            .min(1, { message: "Please enter last name" }),
        organization: z
            .string()
            .trim()
            .min(1, { message: "Please enter your organization" }),
        email: z
            .string()
            .min(1, { message: "Email is required" })
            .email({ message: "Invalid email" }),
        emailValidationCode: z
            .string()
            .trim()
            .min(1, { message: "Email verification code is required" }),
        password: z
            .string()
            .trim()
            .min(8, { message: "Password needs at least 8 characters" })
            .refine(
                password => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password),
                { message: "Password dose not meet the rules" }
            ),
    });
type RegisterFormValues = z.infer<typeof registerSchema>;

export const Register = () => {
    const [isValidationCodeSent, setIsValidationCodeSent] = useState<boolean>(false);
    const [isOkResponse, setIsOkResponse] = useState<boolean>(false);

    const navigate = useNavigate();
    const { token } = useUserStore();
    useEffect(() => {
        if (token) {
            navigate(ROUTES.myDashboard);
        }
    }, []);

    const {
        formState: { errors },
        handleSubmit,
        register,
        getValues,
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
    });

    const { mutate: registerUserMutation, isPending: isPendingRegisterUserMutation } =
        useMutation({
            mutationFn: registerMutation.mutation,
            onSuccess: () => {
                toast.success(`Your user was successfully created! Try Login now`);
                navigate(ROUTES.login);
            },
            onError: (err: IHttpResponseError) => {
                if (err.message === "Request failed with status code 404") {
                    toast.error("There was an error trying to create the user. Please try again later.");
                } else {
                    if (err?.response?.data?.message) {
                        toast.error(err?.response.data.message);
                    } else if (err?.response?.data?.error) {
                        const error = err?.response?.data?.error;
                        if (typeof error === 'string') {
                            toast.error(error);
                        } else if (error?.fields) {
                            Object.entries(error.fields).forEach(([_, valArray]) => {
                                toast.error(`${valArray[0]}`);
                            });
                        }
                    } else {
                        toast.error("There was an error trying to create the user. Please try again later.");
                    }
                }
            },
        });

    const onSubmit = (data: RegisterFormValues) => {
        if (data.emailValidationCode && isOkResponse) {
            const user_RegisterParams: RegisterParams = {
                first_name: data.firstName,
                last_name: data.lastName,
                organization_name: data.organization,
                email: data.email,
                password: data.password,
                password_confirmation: data.password,
                role_name: "Creator",
                is_active: 1,
                emailValidationCode: data.emailValidationCode,
            }
            registerUserMutation(user_RegisterParams);
        }
    };

    const { mutate: registerPreValidationEmailMutation, isPending: isPendingRegisterPreValidationEmailMutation } =
        useMutation({
            mutationFn: registerPreEmailValidationMutation.mutation,
            onSuccess: () => {
                toast.warning(`A code has been sent to ${getValues("email")}. Please check your inbox.`);
                setIsOkResponse(true);
                setIsValidationCodeSent(true);
            },
            onError: (err: IHttpResponseError) => {
                setIsOkResponse(false);
                if (err.message === "Request failed with status code 404") {
                    toast.error("There was an error trying to send the code. Please try again later or contact support.");
                } else {
                    if (err?.response?.data?.message) {
                        toast.error(err?.response.data.message);
                    } else if (err?.response?.data?.error) {
                        const error = err?.response?.data?.error;
                        if (typeof error === 'string') {
                            toast.error(error);
                        } else if (error?.fields) {
                            Object.entries(error.fields).forEach(([_, valArray]) => {
                                toast.error(`${valArray[0]}`);
                            });
                        }
                    } else {
                        toast.error("There was an error trying to send the code. Please try again later.");
                    }
                }
            },
        });

    const sendCode = () => {
        setIsOkResponse(false);
        if (getValues("email")) {
            registerPreValidationEmailMutation(getValues("email"));
        } else {
            toast.error("Please enter your email");
        }
    };

    return (
        <>
            {(isPendingRegisterUserMutation || isPendingRegisterPreValidationEmailMutation) && (
                <LoadingOverlay />
            )}
            <div
                className="pointer-events-auto flex h-screen grow items-center justify-center gap-9 bg-gradient-to-r from-secondary to-primary px-6 py-12 lg:px-8"
            >
                <HomeTextAndImage />
                <div className="bg-white p-8 rounded-lg z-90 ">
                    <div className="flex justify-center mb-2 mt-[-20px]">
                        <h2 className="text-2xl font-medium text-primary">Create Account</h2>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-3">
                            <div>
                                <Input
                                    id="firstName"
                                    label="First Name"
                                    placeholder="Your name"
                                    containerClassName="mb-[-20px]"
                                    {...register("firstName")}
                                    error={errors.firstName?.message}
                                    autoComplete="new-password"
                                />
                            </div>
                            <div>
                                <Input
                                    id="lastName"
                                    label="Last Name"
                                    placeholder="Your last name"
                                    containerClassName="mb-[-20px]"
                                    {...register("lastName")}
                                    error={errors.lastName?.message}
                                    autoComplete="new-password"
                                />
                            </div>
                            <div>
                                <Input
                                    id="email"
                                    label="Email"
                                    placeholder="email@email.com"
                                    containerClassName="mb-[-20px]"
                                    {...register("email")}
                                    error={errors.email?.message}
                                    autoComplete="new-password"
                                />
                            </div>
                            <div>
                                <Input
                                    id="organization"
                                    label="Organization"
                                    placeholder="Your organization"
                                    containerClassName="mb-[-20px]"
                                    {...register("organization")}
                                    error={errors.organization?.message}
                                    autoComplete="new-password"
                                />
                            </div>
                            <div>
                                <Tooltip placement="left" content={"Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number"} className="text-nowrap w-64">
                                    <Input
                                        type="password"
                                        id="password"
                                        label="Password"
                                        placeholder="Enter password"
                                        containerClassName="mb-[-20px]"
                                        {...register("password")}
                                        error={errors.password?.message}
                                        autoComplete="new-password"
                                    />
                                </Tooltip>
                            </div>
                            {!isValidationCodeSent ? (
                                <div className="pb-8">
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        className="block w-full mb-[-20px]"
                                        onClick={sendCode}
                                    >
                                        Get validation code by email
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    <div>
                                        <Input
                                            id="emailValidationCode"
                                            label="Email validation code"
                                            placeholder="Email validation code"
                                            containerClassName="mb-[-10px]"
                                            {...register("emailValidationCode")}
                                            error={errors.emailValidationCode?.message}
                                            autoComplete="new-password"
                                            labelClassName="text-orange-400"
                                        />
                                    </div>
                                    <div className="flex justify-end mt-[-10px]">
                                        <button type="button" onClick={sendCode}
                                            className="text-sm font-medium text-blue-600">Resend code</button>
                                    </div>
                                    <div className="pb-8">
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            className="block w-full mb-[-20px]"
                                        >
                                            Create account
                                        </Button>
                                    </div>
                                </>
                            )}
                            <div className="flex justify-end mt-[-20px]">
                                <button onClick={() => navigate(ROUTES.recover)} className="text-sm font-medium text-blue-600">Forgot password?</button>
                            </div>
                        </div>
                    </form>
                    <div className="pb-2 mb-[-20px]">
                        <span className="text-sm">Already have a JASForm Account? </span>
                        <button onClick={() => navigate(ROUTES.login)} className="font-semibold text-blue-600 text-sm">Log in</button>
                    </div>
                </div >

            </div >
        </>
    );
};
