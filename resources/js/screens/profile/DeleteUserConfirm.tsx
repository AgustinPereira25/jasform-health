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
        deleteUserMutation(id);
    }

    const handleCancel = () => {
        navigate(ROUTES.users);
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <p className="mb-4">Are you sure you want to delete this user?</p>
            <div className="flex flex-row gap-4 h-16 p-3">
                <Button variant="tertiary" onClick={handleDelete} >
                    Confirm
                </Button>
                <Button variant="secondary" onClick={handleCancel}>
                    Cancel and return
                </Button>
            </div>
        </div>
    );
}
