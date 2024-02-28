
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";
import { useEffect } from "react";

import { recoverMutation } from "./loginAuth";
import { Button, Input, LoadingOverlay } from "@/ui";
import HomeTextAndImage from "@/components/HomeTextAndImage";
import { ROUTES } from "@/router";
import { useUserStore } from "@/stores";

const recoverSchema = z
    .object({
        email: z
            .string()
            .min(1, { message: "Email is required" })
            .email({ message: "Invalid email" }),
    });
type RecoverFormValues = z.infer<typeof recoverSchema>;

export const Recover = () => {
    const navigate = useNavigate();
    const { token } = useUserStore();
    useEffect(() => {
        if (token) {
            console.log("Login-token:", token);
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

    const { mutate: recoverUserMutation, isPending: isPendingRecoverUserMutation } =
        useMutation({
            mutationFn: recoverMutation.mutation,
            onError: (error: any) => {
                console.log("recoverUserMutation-error:", error);
                if (error.response) {
                    toast.error(error.response.data.message);
                } else if (error.request) {
                    toast.error('Request was made but no response was received');
                } else {
                    toast.error('Error', error.message);
                }
            },
        });

    const onSubmit = (data: RecoverFormValues) => {
        recoverUserMutation(data);
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
                    <div className="flex justify-center">
                        <h2 className="text-2xl font-medium text-gray-900">Recover Password</h2>
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
                            <div className="pb-8">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="block w-full"
                                >
                                    Send Reset Link
                                </Button>
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
