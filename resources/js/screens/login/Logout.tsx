import { useNavigate } from "react-router-dom";
// import { useMutation } from "@tanstack/react-query";

import { ROUTES } from "@/router";
import { useUserStore } from "@/stores";
// import { logOutMutation } from "./loginAuth";

export const Logout = () => {
    console.log("logout")
    const navigate = useNavigate();
    const { setToken, setUser } = useUserStore();

    // const { mutate: loginOutMutation } =
    //     useMutation({
    //         mutationFn: logOutMutation.mutation,
    //         onSuccess: (data) => {
    //             console.log("loginOutMutation-data:", data);
    //             setUser(null);
    //             setToken(null);
    //             navigate(ROUTES.login);
    //         },
    //     });

    // loginOutMutation();
    setUser(null);
    setToken(null);
    navigate(ROUTES.login);
    return null;
};
