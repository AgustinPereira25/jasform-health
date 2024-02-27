import { useNavigate } from "react-router-dom";

import { ROUTES } from "@/router";
import { useUserStore } from "@/stores";

export const Logout = () => {

    const navigate = useNavigate();
    const { setToken, setUser } = useUserStore();

    setUser(null);
    setToken(null);
    navigate(ROUTES.login);
    return null;
};
