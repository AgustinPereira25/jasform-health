import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

import { ROUTES } from "@/router";
import { useUserStore } from "@/stores";
import { logOutUserMutation } from "./loginAuth";

export const Logout = () => {
    console.log("logout")
    const navigate = useNavigate();
    const { token, setToken, setUser } = useUserStore();
    useEffect(() => {
        if (!token) {
            console.log("Logout-token:", token);
            navigate(ROUTES.login);
        } else {
            logOutMutation();
        }
    }, []);

    const { mutate: logOutMutation } =
        useMutation({
            mutationFn: logOutUserMutation.mutation,
            onSuccess: (data) => {
                console.log("logOutMutation-data:", data);
                setUser(null);
                setToken(null);
                navigate(ROUTES.login);
            },
        });
    return null;
};
