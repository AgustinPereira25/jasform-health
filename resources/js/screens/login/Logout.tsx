import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

import { ROUTES } from "@/router";
import { useUserStore } from "@/stores";
import { logOutMutation } from "./loginAuth";

export const Logout = () => {
    console.log("logout")
    const navigate = useNavigate();
    const { token, setToken, setUser } = useUserStore();
    useEffect(() => {
        if (!token) {
            console.log("Logout-token:", token);
            navigate(ROUTES.login);
        } else {
            loginOutMutation();
        }
    }, []);

    const { mutate: loginOutMutation } =
        useMutation({
            mutationFn: logOutMutation.mutation,
            onSuccess: (data) => {
                console.log("loginOutMutation-data:", data);
                setUser(null);
                setToken(null);
                navigate(ROUTES.login);
            },
        });
    return null;
};
