import React, { useEffect, useRef, useState } from 'react'
import { Button, Input, icons } from '@/ui'
import { FileUploader } from '@/components'
import { useForm } from 'react-hook-form'
import { tw } from '@/utils'
import type { Form } from '@/api'
import { Switch } from '@headlessui/react'
import { HexColorPicker } from 'react-colorful'
import { useNavigate } from 'react-router-dom'

interface NewFormProps {
    initialData: Form;
}
function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

// TODO - Finish this implementation by seeing figma and replying the design with the components.
export const NewForm: React.FC<NewFormProps> = ({ initialData: form = {} }) => {

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        // setValue,
        // setError,
    } = useForm({
        // // TODO - Complete this fields..
        defaultValues: {
            id: form.id ?? 0,
            name: form.name ?? '',
            welcomeTxt: form.welcome_text ?? '',
            description: form.description ?? '',
            pcolor: form.primary_color ?? '',
            scolor: form.secondary_color ?? '',
            borderRadius: form.rounded_style ?? '',
            logo: form.logo ?? '',
            apiURL: form.api_url ?? '',
            publicCode: form.public_code ?? '',
            publishState: form.is_active ?? false,
            // anonAnswers: form.anonymous_answers ?? false,
            // mandatoryInitialData: form.mandatory_initial_data ?? false,
        },
    });

    const onSubmit = (data: Form) => {
        console.log(data);
        // if (!data.phone) {
        //     setError("phone", {
        //         type: "manual",
        //         message: "error!!!",
        //     },{shouldFocus: true})
        // }
    };
    useEffect(() => {
        document.addEventListener("click", handleClickOutside, false);
        return () => {
            document.removeEventListener("click", handleClickOutside, false);
        };
    }, []);

    const handleClickOutside = (event: MouseEvent) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        if (primaryWrapperRef.current && (!primaryWrapperRef.current.contains(event.target) && !primaryPickerRef.current!.contains(event.target))) {
            setShowPrimaryColorPicker(false);
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        if (secondaryWrapperRef.current && secondaryPickerRef.current && (!secondaryWrapperRef.current.contains(event.target as Node) && !secondaryPickerRef.current.contains(event.target as Node))) {
            setShowSecondaryColorPicker(false);
        }
    };

    const primaryWrapperRef = useRef(null);
    const secondaryWrapperRef = useRef(null);

    const primaryPickerRef = useRef(null);
    const secondaryPickerRef = useRef(null);

    // For toggles
    const [enabledPublishStatus, setEnabledPublishStatus] = useState(false);
    const [enabledEncUnlData, setEnabledEncUnlData] = useState(false);
    // For color picker
    const [primaryColor, setPrimaryColor] = useState("#aabbcc"); //TODO- Put the default color from the form if it exists
    const [secondaryColor, setSecondaryColor] = useState("#aabbcc"); //TODO- Put the default color from the form if it exists

    const [showPrimaryColorPicker, setShowPrimaryColorPicker] = useState(false);
    const [showSecondaryColorPicker, setShowSecondaryColorPicker] = useState(false);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-white flex items-center justify-between px-2 pb-4 text-base font-semibold leading-7">
                <div className='flex gap-1 items-center'>
                    <Button
                        variant="secondary"
                        onClick={() => navigate(-1)}
                    >
                        <icons.ArrowLeftIcon className={tw(`w-5 h-5`)} />
                        Return
                    </Button>
                    <span className="pl-3 text-2xl text-black">
                        New Form&apos;s Information
                    </span>
                    {
                        form.id && (
                            <span className='text-2xl text-gray-500 italic'>- Form Code: {form.id}</span>
                        )
                    }
                </div>
                <div className='flex gap-5'>
                    <Button
                        variant="secondary"
                        onClick={() => console.log('pepe')}
                    >
                        <icons.TrashIcon className={tw(`w-5 h-5`)} />
                        Delete
                    </Button>
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
                        type='submit'
                        variant="primary"
                    >
                        Save
                    </Button>
                </div>
            </div>
            <div className='bg-white shadow-lg pt-4 px-6 pb-2 border-[1px] rounded-xl w-full'>
                <div className="flex gap-6 shrink-0">
                    <div className='shrink-0'>
                        <div className='flex gap-8 p-3 h-36'>
                            <div className='flex shrink-0 w-40'>
                                <span>Logo</span>
                            </div>
                            {/* <div className="flex shrink-0 rounded-full overflow-hidden">
                                    <div className='relative p-0 '>
                                        <img
                                            src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            alt="user"
                                            className='h-[120px] w-[120px]'
                                        />
                                        <Button
                                            variant="primary"
                                            onClick={() => console.log('pepe')}
                                            className='text-xs absolute bottom-0 right-0 left-0 w-full p-0'
                                        >
                                            Edit
                                        </Button>
                                    </div>
                                </div> */}
                            {/* ToDo: Agregar props como url del endpoint,etc para hacerlo mas generico */}
                            <FileUploader />
                        </div>
                        <hr className='mx-3' />
                        <div className={tw(
                            'flex p-3 h-16',
                            errors.name && 'pb-5'
                        )}
                        >
                            <div className='flex w-40'>
                                <span>Name*</span>
                            </div>
                            <div className="flex grow">
                                <Input
                                    containerClassName='w-full'
                                    fullHeight
                                    type="text"
                                    id="name"
                                    placeholder="Enter Form Name"
                                    {...register("name")}
                                    // error={errors.firstName?.message}
                                    // value={passwordInput}
                                    defaultValue={form?.name}
                                />
                            </div>
                        </div>
                        <hr className='mx-3' />
                        <div className={tw(
                            'flex p-3 h-16',
                            errors.welcomeTxt && 'pb-5'
                        )}
                        >
                            <div className='flex w-40'>
                                <span>Welcome Text*</span>
                            </div>
                            <div className="flex grow">
                                <Input
                                    containerClassName='w-full'
                                    fullHeight
                                    type="text"
                                    id="welcomeTxt"
                                    placeholder="Enter Welcome Text"
                                    {...register("welcomeTxt")}
                                    // error={errors.welcomeTxt?.message}
                                    //value={passwordInput}
                                    defaultValue={''}
                                />
                            </div>
                        </div>
                        <hr className='mx-3' />
                        <div className={tw(
                            'flex p-3 h-16',
                            errors.description && 'pb-5'
                        )}
                        >
                            <div className='flex w-40'>
                                <span>Description*</span>
                            </div>
                            <div className="flex grow">
                                <Input
                                    containerClassName='w-full'
                                    fullHeight
                                    type="text"
                                    id="description"
                                    placeholder="Enter Description"
                                    {...register("description")}
                                    //error={errors.email?.message}
                                    //value={passwordInput}
                                    defaultValue={''}
                                />
                            </div>
                        </div>
                        <hr className='mx-3' />
                        <div className={tw(
                            'flex p-3 h-16',
                            errors.pcolor && 'pb-5'
                        )}
                        >
                            <div className='flex w-40'>
                                <span>Primary Color</span>
                            </div>
                            <div className="flex grow gap-2">
                                <Input
                                    containerClassName='w-full'
                                    fullHeight
                                    type="text"
                                    id="pcolor"
                                    placeholder="Primary Color"
                                    {...register("pcolor")}
                                    // {...register("pcolor")}
                                    // error={errors.pcolor?.message}
                                    // defaultValue={''}
                                    value={primaryColor}
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
                                    <div ref={primaryPickerRef} className='z-[1] absolute left-1/2 top-[30%]'>
                                        <HexColorPicker color={primaryColor} onChange={setPrimaryColor} />
                                    </div>
                                )}
                            </div>
                        </div>
                        <hr className='mx-3' />
                        <div className={tw(
                            'flex p-3 h-16',
                            errors.scolor && 'pb-5'
                        )}
                        >
                            <div className='flex w-40'>
                                <span>Secondary Color</span>
                            </div>
                            <div className="flex grow gap-2">
                                <Input
                                    containerClassName='w-full'
                                    fullHeight
                                    type="text"
                                    id="scolor"
                                    placeholder="Secondary Color"
                                    {...register("scolor")}
                                    // {...register("pcolor")}
                                    // error={errors.pcolor?.message}
                                    // defaultValue={''}
                                    value={secondaryColor}
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
                                    <div ref={secondaryPickerRef} className='z-[1] absolute left-1/2 top-[30%]'>
                                        <HexColorPicker color={secondaryColor} onChange={setSecondaryColor} />
                                    </div>
                                )}
                            </div>
                        </div>
                        <hr className='mx-3' />
                        <div className={tw(
                            'flex p-3 h-16',
                            errors.borderRadius && 'pb-5'
                        )}
                        >
                            <div className='flex w-40'>
                                <span>Border Radius</span>
                            </div>
                            <div className="flex grow">
                                <Input
                                    containerClassName='w-full'
                                    fullHeight
                                    type="text"
                                    id="borderRadius"
                                    placeholder="Border Radius"
                                    {...register("borderRadius")}
                                    // error={errors.organization?.message}
                                    // value={passwordInput}
                                    defaultValue={''}
                                />
                            </div>
                        </div>
                        <hr className='mx-3' />
                    </div>
                    <div className="w-full">
                        <div className='flex p-3 h-16 items-center justify-between'>
                            <span>Form&apos;s Publish State</span>
                            <div className='flex gap-3 pl-3'>
                                <Switch.Group as="div" className="flex items-center justify-between gap-2">
                                    <Switch
                                        {...register("publishState")}
                                        checked={enabledPublishStatus}
                                        onChange={setEnabledPublishStatus}
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
                        <hr className='mx-3' />
                        <div className='flex p-3 h-16 items-center justify-between'>
                            <span>Anonymous user&apos;s answers</span>
                            <div className='flex gap-3 pl-3'>
                                <Switch.Group as="div" className="flex items-center justify-between gap-2">
                                    <Switch
                                        // {...register("anonAnswers")}
                                        checked={enabledEncUnlData}
                                        onChange={setEnabledEncUnlData}
                                        className={classNames(
                                            enabledEncUnlData ? 'bg-[#065F46]' : 'bg-gray-200',
                                            'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#00519E] focus:ring-offset-2'
                                        )}
                                    >
                                        <span
                                            aria-hidden="true"
                                            className={classNames(
                                                enabledEncUnlData ? 'translate-x-5' : 'translate-x-0',
                                                'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                            )}
                                        />
                                    </Switch>
                                </Switch.Group>
                                <span className={classNames(enabledEncUnlData ? 'text-[#065F46]' : 'text-red-600', 'w-16')}>{enabledEncUnlData ? 'Active' : 'Inactive'}</span>
                            </div>
                        </div>
                        <hr className='mx-3' />
                        <div className='flex p-3 h-16 items-center justify-between'>
                            <span>Request mandatory initial data</span>
                            <div className='flex gap-3 pl-3'>
                                <Switch.Group as="div" className="flex items-center justify-between gap-2">
                                    <Switch
                                        // {...register("mandatoryInitialData")}
                                        checked={enabledEncUnlData}
                                        onChange={setEnabledEncUnlData}
                                        className={classNames(
                                            enabledEncUnlData ? 'bg-[#065F46]' : 'bg-gray-200',
                                            'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#00519E] focus:ring-offset-2'
                                        )}
                                    >
                                        <span
                                            aria-hidden="true"
                                            className={classNames(
                                                enabledEncUnlData ? 'translate-x-5' : 'translate-x-0',
                                                'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                            )}
                                        />
                                    </Switch>
                                </Switch.Group>
                                <span className={classNames(enabledEncUnlData ? 'text-[#065F46]' : 'text-red-600', 'w-16')}>{enabledEncUnlData ? 'Active' : 'Inactive'}</span>
                            </div>
                        </div>
                        <hr className='mx-3' />
                        <div className='flex px-3 h-16 items-center justify-between'>
                            <span>Creation Date: 15/01/2024 03:45PM</span>
                        </div>
                        <hr className='mx-3' />
                        <div className='flex px-3 h-16 items-center justify-between'>
                            <span>Last Modified Date: 15/01/2024 03:45PM</span>
                        </div>
                        <hr className='mx-3' />
                        <div className='flex px-3 h-16 items-center justify-between'>
                            <span>Instances: 100</span>
                        </div>
                        <hr className='mx-3' />
                        <div className='flex px-3 h-16 items-center justify-between'>
                            <span>Questions: 10</span>
                        </div>
                        <hr className='mx-3' />
                        <div className='flex p-3 h-16 '>
                            <Button
                                variant='primary'
                            >
                                <icons.CodeBracketIcon className={tw(`w-5 h-5`)} />
                                Get Embedded Windows Code (iFrame)
                            </Button>
                        </div>
                        <hr className='mx-3' />
                        <div className='flex p-3 h-16 '>
                            <Button
                                variant='primary'
                            >
                                <icons.ArrowTopRightOnSquareIcon className={tw(`w-5 h-5`)} />
                                Get Public Link with Code to Share
                            </Button>
                        </div>
                        <hr className='mx-3' />
                        <div className='flex p-3 h-16 '>
                            <Button
                                variant='primary'
                            >
                                <icons.EyeIcon className={tw(`w-5 h-5`)} />
                                Preview the Form
                            </Button>
                        </div>
                        <hr className='mx-3' />
                    </div>
                </div>
                <div className={tw(
                    'flex p-3 h-16',
                    errors.apiURL && 'pb-5'
                )}
                >
                    <div className='flex shrink-0 w-40'>
                        <span>API URL (callback)</span>
                    </div>
                    <div className="flex w-full">
                        <Input
                            containerClassName='w-full'
                            fullHeight
                            type="text"
                            id="apiURL"
                            placeholder="Enter API URL"
                            {...register("apiURL")}
                            // error={errors.organization?.message}
                            // value={passwordInput}
                            defaultValue={''}
                        />
                    </div>
                </div>
                <hr className='mx-3' />
            </div>
        </form>
    )
}

export default NewForm;
