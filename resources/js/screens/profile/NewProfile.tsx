import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import type { User, UserRoles } from "@/api";
import { FileUploader } from "@/components";
import { Button, icons, Input } from "@/ui";
import ComboBox from "@/ui/form/Combobox";
import { tw } from "@/utils";
import { Switch } from "@headlessui/react";
import { isValidImageUrl } from "@/helpers/helpers";
interface NewProfileForm {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    title?: string;
    organization?: string;
    subscription?: string;
    roles?: UserRoles[];
    is_active?: boolean;
}
interface NewProfileProps {
    initialData: User;
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export const NewProfile: React.FC<NewProfileProps> = ({
    initialData: user = {},
}) => {
    //TODO: put this in a constants file
    const SubscriptionPlans = [
        { id: 1, name: "Free" },
        { id: 2, name: "Premium" },
        { id: 3, name: "Enterprise" },
    ]; // solo name
    const Roles = [
        { id: 1, name: "Admin" },
        { id: 2, name: "User" },
        { id: 3, name: "Viewer" },
    ]; // el unico q prevalaece con esta structura

    const defaultRole = user.roles ? user.roles[0]?.name : "Viewer";
    // For toggles
    const [enabledActive, setEnabledActive] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        // setError,
    } = useForm({
        defaultValues: {
            id: user.id ?? 0,
            firstName: user?.first_name ?? "",
            lastName: user?.last_name ?? "",
            email: user?.email ?? "",
            phone: user?.phone ?? "",
            title: user?.position_in_organization ?? "",
            organization: user?.organization_name ?? "",
            subscription: "Free" ?? "",
            role: defaultRole,
            is_active: user?.is_active ?? true,
        },
    });
    const onSubmit = (data: NewProfileForm) => {
        console.log(data);
        // if (!data.phone) {
        //     setError("phone", {
        //         type: "manual",
        //         message: "error!!!",
        //     },{shouldFocus: true})
        // }
    };
    const navigate = useNavigate();
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center justify-between bg-white px-2 pb-4 text-base font-semibold leading-7">
                <div className="flex items-center gap-1">
                    <Button variant="secondary" onClick={() => navigate(-1)}>
                        <icons.ArrowLeftIcon className={tw(`h-5 w-5`)} />
                        Return
                    </Button>
                    <span className="pl-3 text-2xl text-black">{user.id ? `Edit ${user?.first_name}'s Information` : 'New User Information'}</span>
                </div>
                <div className="flex gap-5">
                    {user.id && (
                        <Button variant="secondary" onClick={() => console.log("pepe")}>
                            <icons.TrashIcon className={tw(`h-5 w-5`)} />
                            Delete
                        </Button>
                    )}
                    <Button type="submit" variant="primary">
                        Save
                    </Button>
                </div>
            </div>
            <div className="flex gap-6">
                <div className="w-3/5 shrink-0 rounded-xl border-[1px] bg-white px-6 pb-2 pt-4 shadow-lg">
                    <div className="flex h-36 gap-8 p-3">
                        <div className="flex w-40 shrink-0">
                            <span>Profile Picture</span>
                        </div>
                        <div className="flex shrink-0 overflow-hidden rounded-full">
                            <div className="relative p-0 ">
                                <img
                                    src={isValidImageUrl(user?.photo ?? '') ? user?.photo : '/Profile-Hello-Smile1b.png'}
                                    alt="user"
                                    className="h-[120px] w-[120px]"
                                />
                                <Button
                                    variant="primary"
                                    onClick={() => console.log("pepe")}
                                    className="absolute bottom-0 left-0 right-0 w-full p-0 text-xs"
                                >
                                    Edit
                                </Button>
                            </div>
                        </div>
                        {/* ToDo: Agregar props como url del endpoint,etc para hacerlo mas generico */}
                        <FileUploader />
                    </div>
                    <hr className="mx-3" />
                    <div className={tw("flex h-16 p-3", errors.firstName && "pb-5")}>
                        <div className="flex w-40">
                            <span>First Name</span>
                        </div>
                        <div className="flex grow">
                            <Input
                                containerClassName="w-full"
                                fullHeight
                                type="text"
                                id="firstName"
                                placeholder="Enter first name"
                                {...register("firstName")}
                                // error={errors.firstName?.message}
                                // value={passwordInput}
                                defaultValue={user?.first_name}
                            />
                        </div>
                    </div>
                    <hr className="mx-3" />
                    <div className={tw("flex h-16 p-3", errors.lastName && "pb-5")}>
                        <div className="flex w-40">
                            <span>Last name</span>
                        </div>
                        <div className="flex grow">
                            <Input
                                containerClassName="w-full"
                                fullHeight
                                type="text"
                                id="lastName"
                                placeholder="Enter last name"
                                {...register("lastName")}
                                // error={errors.lname?.message}
                                //value={passwordInput}
                                defaultValue={user?.last_name}
                            />
                        </div>
                    </div>
                    <hr className="mx-3" />
                    <div className={tw("flex h-16 p-3", errors.email && "pb-5")}>
                        <div className="flex w-40">
                            <span>Email Address</span>
                        </div>
                        <div className="flex grow">
                            <Input
                                containerClassName="w-full"
                                fullHeight
                                type="text"
                                id="email"
                                placeholder="Enter Email address"
                                {...register("email")}
                                //error={errors.email?.message}
                                //value={passwordInput}
                                defaultValue={user?.email}
                            />
                        </div>
                    </div>
                    <hr className="mx-3" />
                    <div className={tw("flex h-16 p-3", errors.phone && "pb-5")}>
                        <div className="flex w-40">
                            <span>Phone Number</span>
                        </div>
                        <div className="flex grow">
                            <Input
                                containerClassName="w-full"
                                fullHeight
                                type="text"
                                id="phone"
                                placeholder="Phone Number"
                                {...register("phone", { required: "Phone is required" })}
                                // {...register("phone")}
                                error={errors.phone?.message}
                                defaultValue={user?.phone}
                            />
                        </div>
                    </div>
                    <hr className="mx-3" />
                    <div className={tw("flex h-16 p-3", errors.title && "pb-5")}>
                        <div className="flex w-40">
                            <span>Title</span>
                        </div>
                        <div className="flex grow">
                            <Input
                                containerClassName="w-full"
                                fullHeight
                                type="text"
                                id="title"
                                placeholder="Title"
                                {...register("title")}
                                //error={errors.title?.message}
                                //value={passwordInput}
                                defaultValue={user?.position_in_organization}
                            />
                        </div>
                    </div>
                    <hr className="mx-3" />
                    <div className={tw("flex h-16 p-3", errors.organization && "pb-5")}>
                        <div className="flex w-40">
                            <span>Organization</span>
                        </div>
                        <div className="flex grow">
                            <Input
                                containerClassName="w-full"
                                fullHeight
                                type="text"
                                id="organization"
                                placeholder="Organization"
                                {...register("organization")}
                                // error={errors.organization?.message}
                                // value={passwordInput}
                                defaultValue={user?.organization_name}
                            />
                        </div>
                    </div>
                    <hr className="mx-3" />
                    <div className="flex h-16 p-3">
                        <Button
                            variant="tertiary"
                        // onClick={() => console.log('pepe')}
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
                            />
                        </div>
                    </div>
                    <hr className="mx-3" />
                    <div className="flex h-16 p-3 ">
                        <div className="flex w-40 items-center">
                            <span>Is the user Active?</span>
                        </div>
                        <div className="flex grow">
                            <Switch.Group
                                as="div"
                                className="flex items-center justify-between gap-2"
                            >
                                <Switch
                                    checked={enabledActive}
                                    onChange={setEnabledActive}
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
                        user.id && (
                            <>
                                <div className="flex h-16 p-3 ">
                                    <Button variant="primary">User&apos;s Dashboard</Button>
                                </div><hr className="mx-3" /><div className="flex h-16 p-3 ">
                                    <Button variant="primary">User&apos;s Forms</Button>
                                </div><hr className="mx-3" /><div className="flex h-16 p-3 ">
                                    <Button variant="primary">User&apos;s Bills</Button>
                                </div><hr className="mx-3" /><div className="flex h-16 p-3 ">
                                    <Button variant="primary">User&apos;s Subscription History</Button>
                                </div><hr className="mx-3" />
                            </>
                        )
                    }
                </div>
            </div>
        </form>
    );
};
