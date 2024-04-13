
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { Tooltip } from "flowbite-react";

import type { RegisterParams } from "./loginAuth";
import { registerMutation } from "./loginAuth";
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
        const user_RegisterParams: RegisterParams = {
            first_name: data.firstName,
            last_name: data.lastName,
            organization_name: data.organization,
            email: data.email,
            password: data.password,
            password_confirmation: data.password,
            role_name: "Creator",
            is_active: 1
        }
        registerUserMutation(user_RegisterParams);
    };

    return (
        <>
            {(isPendingRegisterUserMutation) && (
                <LoadingOverlay />
            )}
            <div
                className="pointer-events-auto flex h-screen grow items-center justify-center gap-9 bg-gradient-to-r from-secondary to-primary px-6 py-12 lg:px-8"
            >
                <HomeTextAndImage />
                <div className="bg-white p-8 rounded-lg z-90 ">
                    <div className="flex justify-center mb-6">
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
                                    placeholder="Your Organization"
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
                                        placeholder="Enter Password"
                                        {...register("password")}
                                        error={errors.password?.message}
                                        autoComplete="new-password"
                                    />
                                </Tooltip>
                            </div>
                            <div className="pb-8">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="block w-full"
                                >
                                    Create account
                                </Button>
                            </div>
                            <div className="flex justify-end">
                                <button onClick={() => navigate(ROUTES.recover)} className="text-sm font-medium text-blue-600">Forgot password?</button>
                            </div>
                        </div>
                    </form>
                    <div className="pb-2">
                        <span className="text-sm">Already have a JASForm Account? </span>
                        <button onClick={() => navigate(ROUTES.login)} className="font-semibold text-blue-600 text-sm">Log in</button>
                    </div>
                </div >

            </div >
        </>
    );
};
