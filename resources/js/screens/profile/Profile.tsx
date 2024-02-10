import { useUserStore } from "@/stores";
import { NewEditProfile } from "./NewEditProfile";
// import { UserRoles } from '@/api'

export const Profile = () => {
    const { user } = useUserStore();
    return (
        <NewEditProfile initialData={user!} />
    )
    // const defaultRole = user!.roles?.length === 0 ? 'Admin': user!.roles![0]!.name;
};
