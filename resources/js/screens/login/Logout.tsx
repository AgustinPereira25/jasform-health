import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

import { ROUTES } from "@/router";
import { useUserStore } from "@/stores";
import { logOutUserMutation } from "./loginAuth";

export const Logout = () => {
    const navigate = useNavigate();
    const { token, clearUser } = useUserStore();
    useEffect(() => {
        if (!token) {
            navigate(ROUTES.login);
        } else {
            logOutMutation();
        }
    }, []);

    const { mutate: logOutMutation } =
        useMutation({
            mutationFn: logOutUserMutation.mutation,
            onSuccess: () => {
                clearUser()
                localStorage.clear()
                navigate(ROUTES.login);
            },
        });
    return null;
};
