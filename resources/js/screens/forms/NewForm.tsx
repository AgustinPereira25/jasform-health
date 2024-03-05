import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Switch } from '@headlessui/react'
import { HexColorPicker } from 'react-colorful'
import { useLocation, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Input, LoadingOverlay, Modal, icons } from '@/ui'
import { handleAxiosFieldErrors, tw } from '@/utils'
import type { IHttpResponseError } from '@/api';
import { createForm, updateForm } from '@/api'
import type { CreateFormParams, Form } from '@/api';
import { ROUTES } from '@/router'
import { useUserStore } from '@/stores'
import { DeleteFormConfirm } from './components'
import { TextArea } from '@/ui/form/TextArea'
import { makeFormURLInstance } from '@/utils'
import { parseDate } from '@/helpers/helpers'

interface NewFormProps {
    initialData: Form;
};

interface NewForm {
    name?: string;
    welcomeTxt?: string;
    finalTxt?: string;
    description?: string;
    logo?: string;
    pcolor?: string;
    scolor?: string;
    borderRadius?: string;
    apiURL?: string;
    publicCode?: string;
    publishState?: boolean;
    enabledInitialData?: boolean;
    enabledLinkResponsesUser?: boolean;
};

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
};

const formSchema = z
    .object({
        name: z.string().refine(
            name => name.trim().length > 0,
            { message: "Name is required" }
        ).refine(
            name => name.trim().length >= 2,
            { message: "Name must contain more than two letters" }
        ),
        welcomeTxt: z.string().refine(
            welcomeTxt => welcomeTxt.trim().length > 0,
            { message: "Welcome Text is required" }
        ).refine(
            welcomeTxt => welcomeTxt.trim().length >= 2,
            { message: "Welcome Text must contain more than two letters" }
        ),
        description: z.string().refine(
            description => description.trim().length > 0,
            { message: "Description is required" }
        ).refine(
            description => description.trim().length >= 2,
            { message: "Description must contain more than two letters" }
        ),
        logo: z.string()
            .optional()
            .refine(logo => logo === undefined || logo === '' || /([/|.|\w|\s|-])*\.(jpeg|jpg|webp|png)$/.test(logo), {
                message: "Invalid logo URL"
            }),
        finalTxt: z.string(),
        pcolor: z.string().refine(
            pcolor => pcolor === '' || /^#[0-9A-Fa-f]{6}$/.test(pcolor),
            { message: "Invalid primary color" }
        ),
        scolor: z.string().refine(
            scolor => scolor === '' || /^#[0-9A-Fa-f]{6}$/.test(scolor),
            { message: "Invalid secondary color" }
        ),
        borderRadius: z.string().refine(
            borderRadius => borderRadius === '' || /^(\d+|\d+\.\d+)(px|%)?$/.test(borderRadius),
            { message: "Invalid border radius" }
        ),
        apiURL: z.string().refine(
            apiURL => apiURL === '' || /^(http|https):\/\/[^ "]+$/.test(apiURL),
            { message: "Invalid URL" }
        ),
        publicCode: z.string(),
        publishState: z.boolean(),
        enabledInitialData: z.boolean(),
        enabledLinkResponsesUser: z.boolean(),
    });

type FormValues = z.infer<typeof formSchema>;

// TODO - delete fileUploader file.
// TODO - Finish this implementation by seeing figma and replying the design with the components.
export const NewForm: React.FC<NewFormProps> = ({ initialData: form = {} }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;

    //Get current user
    const { user } = useUserStore();
    let userId = 0;
    if (user) {
        userId = user.id!;
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        setError,
    } = useForm<FormValues>({
        // // TODO - Complete this fields..
        defaultValues: {
            name: form.name ?? '',
            welcomeTxt: form.welcome_text ?? '',
            finalTxt: form.final_text ?? '',
            description: form.description ?? '',
            pcolor: form.primary_color ?? '',
            scolor: form.secondary_color ?? '',
            borderRadius: form.rounded_style ?? '',
            logo: form.logo ?? '',
            apiURL: form.api_url ?? '',
            publicCode: form.public_code ?? '',
            publishState: form.is_active ?? false,
            enabledInitialData: form.is_initial_data_required ?? false,
            enabledLinkResponsesUser: form.is_user_responses_linked ?? false,
        },
        resolver: zodResolver(formSchema),
    });

    const queryClient = useQueryClient();
    const { mutate: createFormMutation, isPending: isPendingCreateFormMutation } =
        useMutation({
            mutationFn: createForm.mutation,
            onSuccess: (data) => {
                createForm.invalidates(queryClient);
                toast.success(`Form "${data.name}" successfully created!`);
                navigate(ROUTES.forms);
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
                    toast.error("There was an error trying to create the form. Please try again later.");
                }
                handleAxiosFieldErrors(err, setError);
            },
        });

    const { mutate: updateFormMutation, isPending: isPendingUpdateFormMutation } =
        useMutation({
            mutationFn: updateForm.mutation,
            onSuccess: (data) => {
                updateForm.invalidates(queryClient);
                toast.success(`Form "${data.name}" successfully updated!`);
                navigate(ROUTES.forms);
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
                    toast.error("There was an error trying to update the form. Please try again later.");
                }
                handleAxiosFieldErrors(err, setError);
            },
        });

    const onSubmit = (data: NewForm) => {
        // console.log(data);
        // if (data.logo !== '') {
        //     if (!isURL(data.logo!)) {
        //         setError("logo", { message: "Invalid logo URL" });
        //         return;
        //     }
        // }
        // if (data.apiURL !== '') {
        //     if (!isURL(data.apiURL!)) {
        //         setError("apiURL", { message: "Invalid api URL" });
        //         return;
        //     }
        // }
        const form_CreateFormParams: CreateFormParams = {
            id: form.id,
            name: data.name,
            welcome_text: data.welcomeTxt,
            final_text: data.finalTxt,
            creation_date_time: parseDate(new Date().toString()!),
            description: data.description,
            primary_color: data.pcolor,
            secondary_color: data.scolor,
            rounded_style: data.borderRadius,
            logo: data.logo,
            api_url: data.apiURL,
            public_code: data.publicCode,
            is_active: data.publishState,
            is_initial_data_required: data.enabledInitialData,
            is_user_responses_linked: data.enabledLinkResponsesUser,
            user_id: userId,
        }
        console.log(form_CreateFormParams)
        if (pathname.includes(ROUTES.newForm)) {
            createFormMutation(form_CreateFormParams);
        } else {
            updateFormMutation(form_CreateFormParams);
        }
    };
    useEffect(() => {
        document.addEventListener("click", handleClickOutside, false);
        return () => {
            document.removeEventListener("click", handleClickOutside, false);
        };
    }, []);

    // const handleClickOutside = (event: MouseEvent) => {
    //     // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    //     if (primaryWrapperRef.current && (!primaryWrapperRef.current.contains(event.target) && !primaryPickerRef.current!.contains(event.target))) {
    //         setShowPrimaryColorPicker(false);
    //     }
    //     // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    //     if (secondaryWrapperRef.current && secondaryPickerRef.current && (!secondaryWrapperRef.current.contains(event.target as Node) && !secondaryPickerRef.current.contains(event.target as Node))) {
    //         setShowSecondaryColorPicker(false);
    //     }
    // };

    // const primaryWrapperRef = useRef<HTMLDivElement | null>(null);
    // const secondaryWrapperRef = useRef<HTMLDivElement | null>(null);
    const primaryWrapperRef = useRef<HTMLButtonElement | null>(null);
    const secondaryWrapperRef = useRef<HTMLButtonElement | null>(null);

    const primaryPickerRef = useRef<HTMLDivElement | null>(null);
    const secondaryPickerRef = useRef<HTMLDivElement | null>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (primaryWrapperRef.current && primaryPickerRef.current) {
            if (!primaryWrapperRef.current.contains(event.target as Node) && !primaryPickerRef.current.contains(event.target as Node)) {
                setShowPrimaryColorPicker(false);
            }
        }

        if (secondaryWrapperRef.current && secondaryPickerRef.current) {
            if (!secondaryWrapperRef.current.contains(event.target as Node) && !secondaryPickerRef.current.contains(event.target as Node)) {
                setShowSecondaryColorPicker(false);
            }
        }
    };

    // For toggles
    const [enabledPublishStatus, setEnabledPublishStatus] = useState(form.is_active ?? false);
    const [enabledLinkResponsesUser, setEnabledLinkResponsesUser] = useState(form.is_user_responses_linked ?? false);
    const [enabledInitialData, setEnabledInitialData] = useState(form.is_initial_data_required ?? false);

    // For color picker
    const [primaryColor, setPrimaryColor] = useState(form.primary_color ?? "#aabbcc"); //TODO- Put the default color from the form if it exists
    const [secondaryColor, setSecondaryColor] = useState(form.secondary_color ?? "#aabbcc"); //TODO- Put the default color from the form if it exists

    const [showPrimaryColorPicker, setShowPrimaryColorPicker] = useState(false);
    const [showSecondaryColorPicker, setShowSecondaryColorPicker] = useState(false);

    const [showDeletionModal, setshowDeletionModal] = useState(false);
    const handleOpenDeletionModal = () => {
        setshowDeletionModal(true);
    };
    const handleCloseDeletionModal = () => {
        setshowDeletionModal(false);
    };

    const handlePublicLinkClick = async () => {
        if (!pathname.includes(ROUTES.newForm)) {
            const URL = makeFormURLInstance(form.public_code!);
            await navigator.clipboard.writeText(URL);
            toast.success(`Link "${URL}" successfully copied to the clipboard!`);
        }
    }

    return (
        <>
            {(isPendingCreateFormMutation || isPendingUpdateFormMutation) && (
                <LoadingOverlay />
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="bg-white flex items-center justify-between px-2 pb-4 text-base font-semibold leading-7">
                    <div className="flex gap-1 items-center">
                        <Button
                            variant="secondary"
                            onClick={() => navigate(-1)}
                        >
                            <icons.ArrowLeftIcon className={tw(`w-5 h-5`)} />
                            Return
                        </Button>
                        <span className="pl-3 text-2xl text-black">
                            {!form.public_code && 'New'} Form&apos;s Information
                        </span>
                        {
                            form.id && (
                                <span className="text-2xl text-gray-500 italic">- Public Code: {form.public_code}</span>
                            )
                        }
                    </div>
                    <div className="flex gap-5">
                        {
                            form.id && (
                                <Button
                                    variant="secondary"
                                    onClick={handleOpenDeletionModal}
                                >
                                    <icons.TrashIcon className={tw(`w-5 h-5`)} />
                                    Delete
                                </Button>
                            )
                        }
                        {
                            form.id && (
                                <Button
                                    variant="primary"
                                    onClick={() => navigate(`/forms/${form.id}/questions`)}
                                >
                                    <icons.PencilSquareIcon className={tw(`w-5 h-5`)} />
                                    Edit Form&apos;s Questions
                                </Button>
                            )
                        }
                        <Button
                            type="submit"
                            variant="primary"
                        >
                            Save
                        </Button>
                    </div>
                </div>
                <Modal
                    show={showDeletionModal}
                    title="Confirm Deletion"
                    description="Are you sure you want to execute a deletion?"
                    onClose={handleCloseDeletionModal}
                >
                    <div className="flex h-16 p-3 m-auto">
                        <DeleteFormConfirm />
                    </div>
                </Modal>
                <div className="bg-white shadow-lg pt-4 px-6 pb-2 border-[1px] rounded-xl w-full">
                    <div className="flex gap-6 shrink-0">
                        <div className="w-full">
                            <div className={tw(
                                'flex p-3 h-16',
                                errors.name && 'pb-5'
                            )}
                            >
                                <div className="flex w-40">
                                    <span>Name*</span>
                                </div>
                                <div className="flex grow">
                                    <Input
                                        containerClassName="w-full"
                                        fullHeight
                                        type="text"
                                        id="name"
                                        placeholder="Enter Form Name"
                                        {...register("name")}
                                        error={errors.name?.message}
                                        // value={passwordInput}
                                        defaultValue={form?.name}
                                    />
                                </div>
                            </div>
                            <hr className="mx-3" />
                            <div className={tw(
                                'flex p-3 h-16',
                                errors.welcomeTxt && 'pb-5'
                            )}
                            >
                                <div className="flex w-40">
                                    <span>Welcome Text*</span>
                                </div>
                                <div className="flex grow">
                                    <Input
                                        containerClassName="w-full"
                                        fullHeight
                                        type="text"
                                        id="welcomeTxt"
                                        placeholder="Enter Welcome Text"
                                        {...register("welcomeTxt")}
                                        error={errors.welcomeTxt?.message}
                                        //value={passwordInput}
                                        defaultValue={''}
                                    />
                                </div>
                            </div>
                            <hr className="mx-3" />
                            <div className={tw(
                                'flex p-3 h-16',
                                errors.description && 'pb-5'
                            )}
                            >
                                <div className="flex w-40">
                                    <span>Description*</span>
                                </div>
                                <div className="flex grow">
                                    <Input
                                        containerClassName="w-full"
                                        fullHeight
                                        type="text"
                                        id="description"
                                        placeholder="Enter Description"
                                        {...register("description")}
                                        error={errors.description?.message}
                                        //value={passwordInput}
                                        defaultValue={''}
                                    />
                                </div>
                            </div>
                            <hr className="mx-3" />

                            <div className={tw(
                                'flex p-3 h-16',
                                errors.finalTxt && 'pb-5'
                            )}
                            >
                                <div className="flex w-40">
                                    <span>Final Text*</span>
                                </div>
                                <div className="flex grow">
                                    <Input
                                        containerClassName="w-full"
                                        fullHeight
                                        type="text"
                                        id="finalTxt"
                                        placeholder="Enter Final Text"
                                        {...register("finalTxt")}
                                        error={errors.finalTxt?.message}
                                        // value={passwordInput}
                                        defaultValue={form?.final_text}
                                    />
                                </div>
                            </div>
                            <hr className="mx-3" />
                            <div className={tw(
                                'flex p-3 h-20',
                                errors.logo && 'pb-5'
                            )}
                            >
                                <div className="flex w-40">
                                    <span>Logo URL</span>
                                </div>
                                <div className="flex grow">
                                    <TextArea
                                        className="resize-none"
                                        containerClassName="w-full h-full"
                                        fullHeight
                                        id="logo"
                                        placeholder="Enter Logo URL"
                                        {...register("logo")}
                                        error={errors.logo?.message}
                                        // value={passwordInput}
                                        defaultValue={form?.logo}
                                    />
                                </div>
                            </div>
                            <hr className="mx-3" />
                            <div className={tw(
                                'flex p-3 h-16',
                                errors.pcolor && 'pb-5'
                            )}
                            >
                                <div className="flex w-40">
                                    <span>Primary Color</span>
                                </div>
                                <div className="flex grow gap-2">
                                    <Input
                                        containerClassName="w-full"
                                        fullHeight
                                        type="text"
                                        id="pcolor"
                                        placeholder="Primary Color"
                                        {...register("pcolor")}
                                        error={errors.pcolor?.message}
                                        defaultValue={primaryColor}
                                        // value={primaryColor}
                                        onChange={(e) => setPrimaryColor(e.target.value)}
                                    />
                                    <Button ref={primaryWrapperRef} style={{
                                        backgroundColor: primaryColor,
                                        color: primaryColor.startsWith("#e") || primaryColor.startsWith("#f") ? 'black' : 'white',
                                        borderColor: primaryColor.startsWith("#e") || primaryColor.startsWith("#fff") ? 'black' : 'white',
                                    }}
                                        onClick={() => setShowPrimaryColorPicker(true)}
                                    >
                                        <icons.PaintBrushIcon className={tw(`w-5 h-5`)} />
                                    </Button>
                                    {showPrimaryColorPicker && (
                                        <div ref={primaryPickerRef} className="z-[1] absolute left-1/2 top-[35%]">
                                            <HexColorPicker color={primaryColor} onChange={(primaryColor) => {
                                                setPrimaryColor(primaryColor);
                                                setValue("pcolor", primaryColor);
                                            }} />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <hr className="mx-3" />
                            <div className={tw(
                                'flex p-3 h-16',
                                errors.scolor && 'pb-5'
                            )}
                            >
                                <div className="flex w-40">
                                    <span>Secondary Color</span>
                                </div>
                                <div className="flex grow gap-2">
                                    <Input
                                        containerClassName="w-full"
                                        fullHeight
                                        type="text"
                                        id="scolor"
                                        placeholder="Secondary Color"
                                        {...register("scolor")}
                                        error={errors.scolor?.message}
                                        defaultValue={secondaryColor}
                                        //value={secondaryColor}
                                        onChange={(e) => setSecondaryColor(e.target.value)}
                                    />
                                    <Button ref={secondaryWrapperRef} style={{
                                        backgroundColor: secondaryColor,
                                        color: secondaryColor.startsWith("#e") || secondaryColor.startsWith("#f") ? 'black' : 'white',
                                        borderColor: secondaryColor.startsWith("#e") || secondaryColor.startsWith("#fff") ? 'black' : 'white',
                                    }}
                                        onClick={() => setShowSecondaryColorPicker(true)}
                                    >
                                        <icons.PaintBrushIcon className={tw(`w-5 h-5`)} />
                                    </Button>
                                    {showSecondaryColorPicker && (
                                        <div ref={secondaryPickerRef} className="z-[1] absolute left-1/2 top-[42%]">
                                            <HexColorPicker color={secondaryColor} onChange={(secondaryColor) => {
                                                setSecondaryColor(secondaryColor);
                                                setValue("scolor", secondaryColor);
                                            }} />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <hr className="mx-3" />
                            <div className={tw(
                                'flex p-3 h-16',
                                errors.borderRadius && 'pb-5'
                            )}
                            >
                                <div className="flex w-40">
                                    <span>Border Radius</span>
                                </div>
                                <div className="flex grow">
                                    <Input
                                        containerClassName="w-full"
                                        fullHeight
                                        type="text"
                                        id="borderRadius"
                                        placeholder="Border Radius"
                                        {...register("borderRadius")}
                                        error={errors.borderRadius?.message}
                                        // value={passwordInput}
                                        defaultValue={''}
                                    />
                                </div>
                            </div>
                            <hr className="mx-3" />
                            <div className={tw(
                                'flex p-3 h-20',
                                errors.apiURL && 'pb-5'
                            )}
                            >
                                <div className="flex shrink-0 w-40">
                                    <span>API URL (callback)</span>
                                </div>
                                <div className="flex w-full">
                                    <TextArea
                                        className="resize-none"
                                        containerClassName="w-full"
                                        fullHeight
                                        id="apiURL"
                                        placeholder="Enter API URL"
                                        {...register("apiURL")}
                                        error={errors.apiURL?.message}
                                        // value={passwordInput}
                                        defaultValue={''}
                                    />
                                </div>
                            </div>
                            <hr className="mx-3" />
                        </div>
                        <div className="w-[40%] shrink-0">
                            <div className="flex p-3 h-16 items-center justify-between">
                                <span>Form&apos;s Publish State</span>
                                <div className="flex gap-3 pl-3">
                                    <Switch.Group as="div" className="flex items-center justify-between gap-2">
                                        <Switch
                                            {...register("publishState")}
                                            checked={enabledPublishStatus}
                                            onChange={(checked) => {
                                                setEnabledPublishStatus(checked);
                                                setValue("publishState", checked);
                                            }}
                                            className={classNames(
                                                enabledPublishStatus ? 'bg-[#065F46]' : 'bg-gray-200',
                                                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#00519E] focus:ring-offset-2'
                                            )}
                                        >
                                            <span
                                                aria-hidden="true"
                                                className={classNames(
                                                    enabledPublishStatus ? 'translate-x-5' : 'translate-x-0',
                                                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                                )}
                                            />
                                        </Switch>
                                    </Switch.Group>
                                    <span className={classNames(enabledPublishStatus ? 'text-[#065F46]' : 'text-red-600', 'w-16')}>{enabledPublishStatus ? 'Active' : 'Inactive'}</span>
                                </div>
                            </div>
                            <hr className="mx-3" />
                            <div className="flex p-3 h-16 items-center justify-between">
                                <span>Link Responses with user</span>
                                <div className="flex gap-3 pl-3">
                                    <Switch.Group as="div" className="flex items-center justify-between gap-2">
                                        <Switch
                                            {...register("enabledLinkResponsesUser")}
                                            checked={enabledLinkResponsesUser}
                                            onChange={(checked) => {
                                                setEnabledLinkResponsesUser(checked);
                                                setValue("enabledLinkResponsesUser", checked);
                                            }}
                                            className={classNames(
                                                enabledLinkResponsesUser ? 'bg-[#065F46]' : 'bg-gray-200',
                                                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#00519E] focus:ring-offset-2'
                                            )}
                                        >
                                            <span
                                                aria-hidden="true"
                                                className={classNames(
                                                    enabledLinkResponsesUser ? 'translate-x-5' : 'translate-x-0',
                                                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                                )}
                                            />
                                        </Switch>
                                    </Switch.Group>
                                    <span className={classNames(enabledLinkResponsesUser ? 'text-[#065F46]' : 'text-red-600', 'w-16')}>{enabledLinkResponsesUser ? 'Active' : 'Inactive'}</span>
                                </div>
                            </div>
                            <hr className="mx-3" />
                            <div className="flex p-3 h-16 items-center justify-between">
                                <span>Initial data required</span>
                                <div className="flex gap-3 pl-3">
                                    <Switch.Group as="div" className="flex items-center justify-between gap-2">
                                        <Switch
                                            {...register("enabledInitialData")}
                                            checked={enabledInitialData}
                                            onChange={(checked) => {
                                                setEnabledInitialData(checked);
                                                setValue("enabledInitialData", checked);
                                            }}
                                            className={classNames(
                                                enabledInitialData ? 'bg-[#065F46]' : 'bg-gray-200',
                                                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#00519E] focus:ring-offset-2'
                                            )}
                                        >
                                            <span
                                                aria-hidden="true"
                                                className={classNames(
                                                    enabledInitialData ? 'translate-x-5' : 'translate-x-0',
                                                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                                )}
                                            />
                                        </Switch>
                                    </Switch.Group>
                                    <span className={classNames(enabledInitialData ? 'text-[#065F46]' : 'text-red-600', 'w-16')}>{enabledInitialData ? 'Active' : 'Inactive'}</span>
                                </div>
                            </div>
                            <hr className="mx-3" />
                            {
                                !pathname.includes(ROUTES.newForm) && (
                                    <>
                                        <div className="flex px-3 h-16 items-center justify-between">
                                            <span>Creation Date: {parseDate(form.creation_date_time?.toString())}</span>
                                        </div>
                                        <hr className="mx-3" />
                                        <div className="flex px-3 h-16 items-center justify-between">
                                            <span>Last Modified Date: {parseDate(form.last_modified_date_time?.toString())}</span>
                                        </div>
                                        <hr className="mx-3" />
                                        <div className="flex px-3 h-16 items-center justify-between">
                                            <span>Instances: {form.form_instances_count ?? 0}</span>
                                        </div>
                                        <hr className="mx-3" />
                                        <div className="flex px-3 h-16 items-center justify-between">
                                            <span>Questions: {form.form_questions_count ?? 0}</span>
                                        </div>
                                    </>
                                )
                            }
                            <hr className="mx-3" />
                            <div className="flex p-3 h-16 ">
                                <Button
                                    variant="primary"
                                >
                                    <icons.CodeBracketIcon className={tw(`w-5 h-5`)} />
                                    Get Embedded Windows Code (iFrame)
                                </Button>
                            </div>
                            <hr className="mx-3" />
                            <div className="flex p-3 h-16 ">
                                <Button
                                    variant="primary"
                                    onClick={handlePublicLinkClick}
                                >
                                    <icons.ArrowTopRightOnSquareIcon className={tw(`w-5 h-5`)} />
                                    Get Public Link with Code to Share
                                </Button>
                            </div>
                            <hr className="mx-3" />
                            {
                                (!pathname.includes(ROUTES.newForm) && form.form_instances_count !== 0) && (
                                    <div className="flex p-3 h-16 ">
                                        <Button
                                            variant="primary"
                                            onClick={() => { navigate(`/form-instance/${form.id}?publicCode=${form.public_code}`) }}
                                        >
                                            <icons.EyeIcon className={tw(`w-5 h-5`)} />
                                            View form&apos;s instances
                                        </Button>
                                    </div>
                                )
                            }
                            <hr className="mx-3" />
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default NewForm;
