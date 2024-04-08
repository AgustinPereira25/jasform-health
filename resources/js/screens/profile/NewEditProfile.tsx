import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Switch } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { z } from "zod";

import type { CreateUserParams, IHttpResponseError, User } from "@/api";
import { Button, icons, Input, Modal, LoadingOverlay } from "@/ui";
import ComboBox from "@/ui/form/Combobox";
import { tw } from "@/utils";
import { ROUTES } from "@/router";
import { isValidImageUrl } from "@/helpers/helpers";
import { createUser, updateUser } from "@/api";
import { handleAxiosFieldErrors } from "@/utils";
import { TextArea } from "@/ui/form/TextArea";
import { DeleteUserConfirm } from "./DeleteUserConfirm";
import { useUserStore } from "@/stores";

interface NewEditProfileForm {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    position_in_org?: string;
    organization?: string;
    subscription?: string;
    role?: string;
    isActive?: boolean;
    photo?: string;
}
interface NewEditProfileProps {
    initialData: User;
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

const userSchema = z
    .object({
        firstName: z.string().refine(
            name => name.trim().length > 0,
            { message: "Name is required" }
        ).refine(
            name => name.trim().length >= 2,
            { message: "Name must contain more than two letters" }
        ),
        lastName: z.string().refine(
            name => name.trim().length > 0,
            { message: "Last Name is required" }
        ).refine(
            name => name.trim().length >= 2,
            { message: "Last name must contain more than two letters" }
        ),
        email: z
            .string()
            .min(1, { message: "Email is required" })
            .email({ message: "Invalid email" }),
        photo: z.string()
            .optional()
            .refine(photo => photo === undefined || photo === '' || /([/|.|\w|\s|-])*\.(jpeg|jpg|webp|png)$/.test(photo), {
                message: "Invalid image URL"
            }),
        organization: z.string().refine(
            name => name.trim().length > 0,
            { message: "Organization Name is required" }
        ).refine(
            name => name.trim().length >= 2,
            { message: "Organization name must contain more than two letters" }
        ),
        position_in_org: z.string().optional(),
        role: z.string(),
        isActive: z.boolean(),
        // password: z
        //     .string()
        //     .trim()
        //     .min(8, { message: "Password needs at least 8 characters" }),
        // passwordConfirmation: z.string().trim(),
    })
// .refine((data) => data.password === data.passwordConfirmation, {
//     message: "Passwords must match",
//     path: ["passwordConfirmation"],
// });
type UserFormValues = z.infer<typeof userSchema>;

export const NewEditProfile: React.FC<NewEditProfileProps> = ({
    initialData: user = {},
}) => {
    const { user: loggedUser, setUser } = useUserStore();
    const location = useLocation();
    const pathname = location.pathname;

    //TODO: put this in a constants file
    const Roles = [
        { id: 1, name: "Admin" },
        { id: 2, name: "Creator" },
    ]; // TODO: el unico q prevalaece con esta structura

    const defaultRole: string = user.role_name ?? Roles[1]!.name;
    // For toggles
    const [enabledActive, setEnabledActive] = useState(user?.is_active ?? true);
    const [passwordInput, setPasswordInput] = useState(pathname.includes(ROUTES.newUser) ? "" : "");

    const [photoUrl, setPhotoUrl] = useState(user?.photo);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        setError,
    } = useForm<UserFormValues>({
        resolver: zodResolver(userSchema),
        //TODO: limpiar campos default
        defaultValues: {
            firstName: user?.first_name ?? "",
            lastName: user?.last_name ?? "",
            email: user?.email ?? "",
            position_in_org: user?.position_in_org ?? "",
            organization: user?.organization_name ?? "",
            role: user?.role_name ?? defaultRole,
            isActive: user?.is_active ?? true,
            photo: user?.photo ?? "",
        },
    });

    const queryClient = useQueryClient();

    const { mutate: createUserMutation, isPending: isPendingCreateUserMutation } =
        useMutation({
            mutationFn: createUser.mutation,
            onSuccess: (data) => {
                createUser.invalidates(queryClient);
                toast.success(`User "${data.data.data.first_name}" successfully created!`);
                navigate(ROUTES.users);
            },
            onError: (err: IHttpResponseError) => {
                if (err?.response?.data?.message) {
                    toast.error(err?.response.data.message);
                } else if (err?.response?.data?.error?.fields) {
                    const errors = err?.response.data.error.fields;
                    Object.entries(errors).forEach(([_, valArray]) => {
                        toast.error(`${valArray[0]}`);
                    });
                } else {
                    toast.error("There was an error trying to create the user. Please try again later.");
                }
                handleAxiosFieldErrors(err, setError);
            },
        });

    const { mutate: updateUserMutation, isPending: isPendingUpdateUserMutation } =
        useMutation({
            mutationFn: updateUser.mutation,
            onSuccess: (data) => {
                updateUser.invalidates(queryClient);
                toast.success(`User "${data.data.data.first_name}" successfully updated!`);
                if (pathname.includes(ROUTES.profile)) {
                    if (loggedUser?.id === data.data.data.id) {
                        setUser(data.data.data);
                    }
                    navigate(ROUTES.myDashboard);
                }
                navigate(ROUTES.users);
            },
            onError: (err: IHttpResponseError) => {
                if (err?.response?.data?.message) {
                    toast.error(err?.response.data.message);
                } else if (err?.response?.data?.error?.fields) {
                    const errors = err?.response.data.error.fields;
                    Object.entries(errors).forEach(([_, valArray]) => {
                        toast.error(`${valArray[0]}`);
                    });
                } else {
                    // if (err.response?.data.code === "RoleError") {
                    //     toast.error("There was an error trying to update the user role for ADMIN. Please try again later.");
                    // } else {
                    //     if (err.response?.data.code === "StatusError") {
                    //         toast.error("There was an error trying to update the user status for ADMIN. Please try again later.");
                    //     } else {
                    toast.error("There was an error trying to update the user. Please try again later.");
                    //     }
                    // }
                    navigate(ROUTES.users);
                }
                handleAxiosFieldErrors(err, setError);
                if (pathname.includes(ROUTES.profile)) {
                    navigate(ROUTES.myDashboard);
                } else {
                    navigate(ROUTES.users);
                }
            },
        });

    const onSubmit = (data: NewEditProfileForm) => {
        const user_CreateUserParams: CreateUserParams = {
            id: user.id,
            first_name: data.firstName,
            last_name: data.lastName,
            photo: data.photo,
            position_in_org: data.position_in_org,
            is_active: data.isActive,
            email: data.email,
            organization_name: data.organization,
            role_name: data.role,
            password: passwordInput === "" ? "" : passwordInput,
            passwordConfirmation: passwordInput
        }
        if (pathname.includes(ROUTES.newUser)) {
            createUserMutation(user_CreateUserParams);
        } else {
            updateUserMutation(user_CreateUserParams);
        }
    };
    const navigate = useNavigate();

    const [showDeletionModal, setshowDeletionModal] = useState(false);
    const handleOpenDeletionModal = () => {
        setshowDeletionModal(true);
    };
    const handleCloseDeletionModal = () => {
        setshowDeletionModal(false);
    };

    const [showPasswordModal, setshowPasswordModal] = useState(false);
    const handleOpenPasswordModal = () => {
        setshowPasswordModal(true);
    };
    const handleClosePasswordModal = () => {
        setshowPasswordModal(false);
    };

    return (
        <>
            {(isPendingCreateUserMutation || isPendingUpdateUserMutation) && (
                <LoadingOverlay />
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-center justify-between bg-white px-2 pb-4 text-base font-semibold leading-7">
                    <div className="flex items-center gap-1">
                        <Button variant="secondary" onClick={() => navigate(-1)}>
                            <icons.ArrowLeftIcon className={tw(`h-5 w-5`)} />
                            Return
                        </Button>
                        {pathname.includes(ROUTES.profile) ? (
                            <span className="pl-3 text-2xl text-black">{user.id && "My Profile"}</span>
                        ) : (
                            <span className="pl-3 text-2xl text-black">{user.id ? `Edit ${user?.first_name}'s Information` : 'New User Information'}</span>
                        )}
                    </div>
                    <div className="flex gap-5">
                        {user.id && !pathname.includes(ROUTES.profile) && (
                            <Button variant="secondary" onClick={handleOpenDeletionModal}>
                                <icons.TrashIcon className={tw(`h-5 w-5`)} />
                                Delete
                            </Button>
                        )}
                        {/* {user.id && pathname.includes(ROUTES.profile) && (
                        <Button variant="secondary" onClick={() => console.log("Review Terms & Conditions")}>
                            Review Terms & Conditions
                        </Button>
                    )} */}
                        <Button type="submit" variant="primary">
                            Save
                        </Button>
                    </div>
                </div>
                <div className="flex gap-6">
                    <div className="w-3/5 shrink-0 rounded-xl border-[1px] bg-white px-6 pb-2 pt-4 shadow-lg">
                        <div className="flex h-36 p-3">
                            <div className="flex w-40 shrink-0">
                                <span>Profile Photo</span>
                            </div>
                            <div className="flex shrink-0 overflow-hidden rounded-full">
                                <div className="relative p-0 bg-gray-100">
                                    <img
                                        src={isValidImageUrl(photoUrl ?? '') ? photoUrl : '/Profile-Hello-Smile1b.png'}
                                        alt="UserPhoto"
                                        className="object-scale-down h-[120px] w-[120px]"
                                    />
                                </div>
                            </div>
                        </div>
                        <hr className="mx-3" />
                        <div className={tw("flex h-16 p-3", errors.firstName && "pb-5")}>
                            <div className="flex w-40">
                                <span>First Name*</span>
                            </div>
                            <div className="flex grow">
                                <Input
                                    containerClassName="w-full"
                                    fullHeight
                                    type="text"
                                    id="firstName"
                                    placeholder="Enter First Name"
                                    {...register("firstName")}
                                    error={errors.firstName?.message}
                                    // value={passwordInput}
                                    defaultValue={user?.first_name}
                                />
                            </div>
                        </div>
                        <hr className="mx-3" />
                        <div className={tw("flex h-16 p-3", errors.lastName && "pb-5")}>
                            <div className="flex w-40">
                                <span>Last Name*</span>
                            </div>
                            <div className="flex grow">
                                <Input
                                    containerClassName="w-full"
                                    fullHeight
                                    type="text"
                                    id="lastName"
                                    placeholder="Enter Last Name"
                                    {...register("lastName")}
                                    error={errors.lastName?.message}
                                    //value={passwordInput}
                                    defaultValue={user?.last_name}
                                />
                            </div>
                        </div>
                        <hr className="mx-3" />
                        <div className={tw("flex h-16 p-3", errors.email && "pb-5")}>
                            <div className="flex w-40">
                                <span>Email Address*</span>
                            </div>
                            <div className="flex grow">
                                <Input
                                    containerClassName="w-full"
                                    fullHeight
                                    type="text"
                                    id="email"
                                    placeholder="Enter Email address"
                                    {...register("email")}
                                    error={errors.email?.message}
                                    //value={passwordInput}
                                    defaultValue={user?.email}
                                    disabled={Boolean(user.id) && !pathname.includes(ROUTES.newUser)}
                                />
                            </div>
                        </div>
                        <hr className="mx-3" />
                        <div className={tw("flex h-20 p-3", errors.photo && "pb-5")}>
                            <div className="flex w-40">
                                <span>Photo URL</span>
                            </div>
                            <div className="flex grow">
                                <TextArea
                                    className="resize-none"
                                    containerClassName="w-full h-full"
                                    fullHeight
                                    id="photo"
                                    placeholder="Photo URL"
                                    // {...register("photo", { required: "Photo is required" })}
                                    {...register("photo")}
                                    error={errors.photo?.message}
                                    defaultValue={user?.photo}
                                    onChange={(e) => {
                                        setPhotoUrl(e.target.value);
                                        void register("photo").onChange(e);
                                    }}
                                />
                            </div>
                        </div>
                        <hr className="mx-3" />
                        <div className={tw("flex h-16 p-3", errors.organization && "pb-5")}>
                            <div className="flex w-40">
                                <span>Organization*</span>
                            </div>
                            <div className="flex grow">
                                <Input
                                    containerClassName="w-full"
                                    fullHeight
                                    type="text"
                                    id="organization"
                                    placeholder="Organization"
                                    {...register("organization")}
                                    error={errors.organization?.message}
                                    // value={passwordInput}
                                    defaultValue={user?.organization_name}
                                />
                            </div>
                        </div>
                        <hr className="mx-3" />
                        <div className={tw("flex h-16 p-3", errors.position_in_org && "pb-5")}>
                            <div className="flex w-40">
                                <span>Position</span>
                            </div>
                            <div className="flex grow">
                                <Input
                                    containerClassName="w-full"
                                    fullHeight
                                    type="text"
                                    id="position_in_org"
                                    placeholder="Position in Organization"
                                    {...register("position_in_org")}
                                    error={errors.position_in_org?.message}
                                    //value={passwordInput}
                                    defaultValue={user?.position_in_org}
                                />
                            </div>
                        </div>
                        <hr className="mx-3" />
                        <div className="flex h-16 p-3">
                            <Button
                                variant="tertiary"
                                onClick={handleOpenPasswordModal}
                            >
                                <icons.KeyIcon />
                                Change Password
                            </Button>
                        </div>
                        <hr className="mx-3" />
                        {user.id && (
                            <>
                                <div className="flex h-16 p-3">
                                    <div className="flex w-32 flex-col">
                                        <span className="text-[#008001]">Active Forms:</span>
                                        <span className="text-[#CD3533]">Inactive Forms:</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span>{user?.active_forms}</span>
                                        <span>{user?.inactive_forms}</span>
                                    </div>
                                </div>
                                <hr className="mx-3" />
                                <div className="flex h-16 p-3">
                                    <div className="flex w-32">
                                        <span>Total Forms:</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span>{user?.total_forms}</span>
                                    </div>
                                </div>
                                <hr className="mx-3" />
                            </>
                        )}
                    </div>
                    {!pathname.includes(ROUTES.profile) &&
                        <div className="w-full rounded-xl border-[1px] bg-white px-6 pb-2 pt-4 shadow-lg">
                            {/* <div className="flex h-16 p-3">
                        <div className="flex w-40 items-center">
                            <span>Subscription Plan</span>
                        </div>
                        <div className="flex grow">
                            <ComboBox
                                id="subscription"
                                items={SubscriptionPlans}
                                defaultValue="Free"
                                {...register("subscription")}
                                onValueChange={(item) => {
                                    setValue("subscription", item.name);
                                }}
                            // onValueChange={(e) => console.log(e)}
                            />
                        </div>
                    </div>
                     <hr className="mx-3" />*/}
                            <div className="flex h-16 p-3">
                                <div className="flex w-40 items-center">
                                    <span>Role</span>
                                </div>
                                <div className="flex grow">
                                    <ComboBox
                                        id="role"
                                        items={Roles}
                                        defaultValue={defaultRole}
                                        {...register("role")}
                                        onValueChange={(item) => {
                                            setValue("role", item.name);
                                        }}
                                        onChange={(e) => {
                                            setValue("role", e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                            <hr className="mx-3" />
                            <div className="flex h-16 p-3 ">
                                <div className="flex w-40 items-center">
                                    <span>Is the User Active?</span>
                                </div>
                                <div className="flex grow">
                                    <Switch.Group
                                        as="div"
                                        className="flex items-center justify-between gap-2"
                                    >
                                        <Switch
                                            id="isActive"
                                            {...register("isActive")}
                                            checked={enabledActive}
                                            // onChange={setEnabledActive}
                                            onChange={(checked) => {
                                                setEnabledActive(checked);
                                                setValue("isActive", checked);
                                            }}
                                            className={classNames(
                                                enabledActive ? "bg-[#00519E]" : "bg-gray-200",
                                                "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#00519E] focus:ring-offset-2",
                                            )}
                                        >
                                            <span
                                                aria-hidden="true"
                                                className={classNames(
                                                    enabledActive ? "translate-x-5" : "translate-x-0",
                                                    "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                                                )}
                                            />
                                        </Switch>
                                    </Switch.Group>
                                </div>
                            </div>
                            <hr className="mx-3" />
                            {
                                (user.id && user.total_forms !== 0) && (
                                    <>
                                        {/* <div className="flex h-16 p-3 ">
                                    <Button variant="primary">User&apos;s Dashboard</Button>
                                </div> */}
                                        <hr className="mx-3" /><div className="flex h-16 p-3 ">
                                            <Button
                                                variant="primary"
                                                onClick={() => navigate(`/forms/byUserId/${user.id}`)}
                                            >
                                                User&apos;s Forms
                                            </Button>
                                        </div><hr className="mx-3" />
                                    </>
                                )
                            }
                        </div>
                    }

                </div>
                <Modal
                    show={showDeletionModal}
                    title="Confirm Deletion"
                    description="Are you sure you want to execute a deletion?"
                    onClose={handleCloseDeletionModal}
                >
                    <div className="flex h-16 p-3 m-auto">
                        <DeleteUserConfirm handleCloseDeletionModal={handleCloseDeletionModal} />
                    </div>
                </Modal>
                <Modal
                    show={showPasswordModal}
                    title="Update Password"
                    description="Complete the form below to update the password."
                    onClose={handleClosePasswordModal}
                >
                    <>
                        <div>
                            <Input
                                type="password"
                                id="actualPassword"
                                label="Current Password*"
                                placeholder="Enter Current Password"
                                value={passwordInput}
                                defaultValue={passwordInput}
                                onChange={e => setPasswordInput(e.target.value)}
                            />
                            <Input
                                type="password"
                                id="newPassword"
                                label="New Password*"
                                placeholder="Enter New Password"
                                value={passwordInput}
                                defaultValue={passwordInput}
                                onChange={e => setPasswordInput(e.target.value)}
                            // {...register("password")}
                            // error={errors.password?.message}
                            />
                            <Input
                                type="password"
                                id="newPasswordConfirmation"
                                label="New Password Confirmation*"
                                placeholder="Enter New Password Confirmation"
                                value={passwordInput}
                                defaultValue={passwordInput}
                                onChange={e => setPasswordInput(e.target.value)}
                            // {...register("passwordConfirmation")}
                            // error={errors.passwordConfirmation?.message}
                            />
                        </div>
                        <div className="flex h-16 p-3 m-auto">
                            <Button
                                variant="tertiary"
                                onClick={() => {
                                    setPasswordInput("")
                                    //TODO: Finished this
                                    console.log('Update Password CONFIRMED')
                                }}
                            >
                                Confirm New Password
                            </Button>
                        </div>
                    </>
                </Modal>
            </form>
        </>
    );
};
