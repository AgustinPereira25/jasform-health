import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ROUTES } from "@/router";
import { deleteUser } from "@/api";
import { Button } from "@/ui";
import { toast } from "react-toastify";

export const DeleteUserConfirm: React.FunctionComponent = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const queryClient = useQueryClient();
    const { mutate: deleteUserMutation } = useMutation({
        mutationFn: deleteUser.mutation,
        onSuccess: (_, requestedId) => {
            deleteUser.invalidates(queryClient, { userId: requestedId });
            toast.success("User successfully deleted!");
            navigate(ROUTES.users);
        },
        onError: () => {
            toast.error("Something went wrong!");
            navigate(ROUTES.users);
        },
    });

    const handleDelete = () => {
        deleteUserMutation(parseInt(id!));
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row gap-4 h-16 p-3">
                <Button variant="tertiary" onClick={handleDelete} >
                    Confirm
                </Button>
            </div>
        </div>
    );
}
