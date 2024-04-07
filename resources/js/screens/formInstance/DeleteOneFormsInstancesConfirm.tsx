import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { deleteOneInstanceById } from "@/api/formInstance";
import { Button } from "@/ui";

interface DeleteOneFormsInstancesConfirmProps {
    instanceIdToDelete: number;
    handleCloseDeletionOneInstanceModal?: () => void;
};
export const DeleteOneFormsInstancesConfirm: React.FunctionComponent<DeleteOneFormsInstancesConfirmProps> = ({ instanceIdToDelete, handleCloseDeletionOneInstanceModal }) => {
    const queryClient = useQueryClient();
    const { mutate: deleteAllInstancesByFormIdMutation } = useMutation({
        mutationFn: deleteOneInstanceById.mutation,
        onSuccess: (_, requestedId) => {
            deleteOneInstanceById.invalidates(queryClient, { id: requestedId });
            toast.success("One instance successfully deleted!");
            handleCloseDeletionOneInstanceModal?.();
        },
        onError: () => {
            toast.error("Something went wrong, please try again later or contact support.");
            handleCloseDeletionOneInstanceModal?.();
        },
    });

    const handleDelete = () => {
        deleteAllInstancesByFormIdMutation(instanceIdToDelete);
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row gap-4 h-16 p-3">
                <Button aria-label="Cancel" variant="secondary" onClick={handleCloseDeletionOneInstanceModal} >
                    Cancel
                </Button>
                <Button variant="tertiary" onClick={handleDelete} >
                    Confirm
                </Button>
            </div>
        </div>
    );
}
