import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useUserStore } from "@/stores";
import { NewEditProfile } from "./NewEditProfile";
import { ROUTES } from "@/router";
// import { UserRoles } from '@/api'

export const Profile = () => {
    const navigate = useNavigate();
    const { user, token } = useUserStore();
    useEffect(() => {
        if (!token) {
            navigate(ROUTES.login);
        }
    }, []);
    return (
        <NewEditProfile initialData={user!} />
    )
    // const defaultRole = user!.roles?.length === 0 ? 'Admin': user!.roles![0]!.name;
};
