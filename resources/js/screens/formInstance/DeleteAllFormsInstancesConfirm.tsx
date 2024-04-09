import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { deleteAllInstancesByFormId } from "@/api/formInstance";
import { Button } from "@/ui";

interface DeleteAllFormsInstancesConfirmProps {
    formId: string;
    handleCloseDeletionMasiveModal?: () => void;
};
export const DeleteAllFormsInstancesConfirm: React.FunctionComponent<DeleteAllFormsInstancesConfirmProps> = ({ formId, handleCloseDeletionMasiveModal }) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate: deleteAllInstancesByFormIdMutation } = useMutation({
        mutationFn: deleteAllInstancesByFormId.mutation,
        onSuccess: (_, requestedId) => {
            deleteAllInstancesByFormId.invalidates(queryClient, { formId: requestedId });
            toast.success("Form instances successfully deleted!");
            navigate(-1);
        },
        onError: () => {
            toast.error("Something went wrong, please try again later or contact support.");
            handleCloseDeletionMasiveModal?.();
        },
    });

    const handleDelete = () => {
        deleteAllInstancesByFormIdMutation(parseInt(formId));
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row gap-4 h-16 p-3">
                <Button aria-label="Cancel" variant="secondary" onClick={handleCloseDeletionMasiveModal} >
                    Cancel
                </Button>
                <Button variant="tertiary" onClick={handleDelete} >
                    Confirm
                </Button>
            </div>
        </div>
    );
}
