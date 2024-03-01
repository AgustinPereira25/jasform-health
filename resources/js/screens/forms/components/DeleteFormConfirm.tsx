import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { ROUTES } from "@/router";
import { deleteForm } from "@/api";
import { Button } from "@/ui";

export const DeleteFormConfirm: React.FunctionComponent = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const queryClient = useQueryClient();
    const { mutate: deleteFormMutation } = useMutation({
        mutationFn: deleteForm.mutation,
        onSuccess: (_, requestedId) => {
            deleteForm.invalidates(queryClient, { formId: requestedId });
            toast.success("Form successfully deleted!");
            navigate(ROUTES.forms);
        },
        onError: () => {
            toast.error("Something went wrong!");
            navigate(ROUTES.forms);
        },
    });

    const handleDelete = () => {
        deleteFormMutation(parseInt(id!));
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
