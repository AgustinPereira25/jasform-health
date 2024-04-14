
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import { Tooltip } from "flowbite-react";

import type { RecoverChangePasswordParams } from "./loginAuth";
import { recoverChangePasswordMutation } from "./loginAuth";
import { Button, Input, LoadingOverlay } from "@/ui";
import HomeTextAndImage from "@/components/HomeTextAndImage";
import { ROUTES } from "@/router";
import { useUserStore } from "@/stores";
import type { IHttpResponseError } from "@/api";

const recoverSchema = z
    .object({
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
type RecoverFormValues = z.infer<typeof recoverSchema>;

export const RecoverPassword = () => {
    const [searchParams] = useSearchParams();
    const tokenFromUrl = searchParams.get('token') ?? '';
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
    } = useForm<RecoverFormValues>({
        resolver: zodResolver(recoverSchema),
    });

    const { mutate: recoverChangePasswordUserMutation, isPending: isPendingRecoverUserMutation } =
        useMutation({
            mutationFn: recoverChangePasswordMutation.mutation,
            onSuccess: () => {
                toast.success(`Your password has been updated successfully. Try login now.`);
                navigate(ROUTES.login);
            },
            onError: (err: IHttpResponseError) => {
                console.log("err", err);
                if (err.message === "Request failed with status code 404") {
                    toast.error("There was an error trying to reset your password. Please try again later.");
                } else {
                    if (err?.response?.data?.message) {
                        toast.error(err?.response.data.message);
                    } else if (err?.response?.data?.error) {
                        const error = err?.response?.data?.error;
                        if (typeof error === 'string') {
                            toast.error(error);
                        } else if (error && 'message' in error) {
                            toast.error(error.message);
                            if (error.message === "The token has expired. Please request a new one.") {
                                navigate(ROUTES.recover);
                            }
                        } else if (error && 'fields' in error && typeof error.fields === 'object') {
                            Object.entries(error.fields).forEach(([_, valArray]) => {
                                toast.error(`${valArray[0]}`);
                            });
                        }
                    } else {
                        toast.error("There was an error trying to reset your password. Please try again later.");
                    }
                }
            },
        });

    const onSubmit = (data: RecoverFormValues) => {
        const user_RecoverChangePasswordParams: RecoverChangePasswordParams = {
            token: tokenFromUrl,
            email: data.email,
            newPassword: data.password,
            newPassword_confirmation: data.password,
        }
        recoverChangePasswordUserMutation(user_RecoverChangePasswordParams);
    };

    return (
        <>
            {(isPendingRecoverUserMutation) && (
                <LoadingOverlay />
            )}
            <div
                className="pointer-events-auto flex h-screen grow items-center justify-center gap-9 bg-gradient-to-r from-secondary to-primary px-6 py-12 lg:px-8"
            >
                <HomeTextAndImage />
                <div className="bg-white p-8 rounded-lg z-90 ">
                    <div className="flex justify-center mb-6">
                        <h2 className="text-2xl font-medium text-primary">Change your Password</h2>
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
                                    Update my Password
                                </Button>
                            </div>
                            <div className="pb-2">
                                <span className="text-sm">Has the token expired? </span>
                                <button onClick={() => navigate(ROUTES.recover)} className="text-sm font-medium text-blue-600">Try to resend code</button>
                            </div>
                            <div className="pb-2">
                                <span className="text-sm">Already have a JASForm Account? </span>
                                <button onClick={() => navigate(ROUTES.login)} className="font-semibold text-blue-600 text-sm">Log in</button>
                            </div>
                        </div>
                    </form>
                    <div className="pb-2">
                        <span className="text-sm">Don&apos;t have a JASForm Account? </span>
                        <button onClick={() => navigate(ROUTES.register)} className="font-semibold text-blue-600 text-sm">Register now</button>
                    </div>
                </div>

            </div>
        </>
    );
};
