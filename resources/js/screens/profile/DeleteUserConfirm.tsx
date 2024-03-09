import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { ROUTES } from "@/router";
import { deleteUser } from "@/api";
import { Button } from "@/ui";

interface DeleteUserConfirmProps {
    handleCloseDeletionModal: () => void;
};
export const DeleteUserConfirm: React.FunctionComponent<DeleteUserConfirmProps> = ({ handleCloseDeletionModal }) => {
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
                <Button aria-label="Cancel" variant="secondary" onClick={handleCloseDeletionModal} >
                    Cancel
                </Button>
                <Button variant="tertiary" onClick={handleDelete} >
                    Confirm
                </Button>
            </div>
        </div>
    );
}
