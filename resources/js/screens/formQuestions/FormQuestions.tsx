import React from 'react'
import { Button, Input, icons } from '@/ui'
import { useForm } from 'react-hook-form'
import { tw } from '@/utils'
import { IFormQuestion } from '@/api'

interface FormQuestionsProps {
    initialData: IFormQuestion[];
}

// TODO - Finish this implementation by seeing figma and replying the design with the components.
export const QuestionsForm: React.FC<FormQuestionsProps> = ({ initialData: form = {} }) => {
    console.log(form);
    const {
        register,
        handleSubmit,
        formState: { errors },
        // setValue,
        // setError,
    } = useForm({
        // // TODO - Complete this fields.. 
        // defaultValues: {
        //     id: form.id ?? 0,
        //     name: form.name ?? '',
        //     welcomeTxt: form.welcome_text ?? '',
        //     description: form.description ?? '',
        //     pcolor: form.primary_color ?? '',
        //     scolor: form.secondary_color ?? '',
        //     borderRadius: form.rounded_style ?? '',
        //     logo: form.logo ?? '',
        //     apiURL: form.api_url ?? '',
        //     publicCode: form.public_code ?? '',
        //     publishState: form.status ?? false,
        //     // anonAnswers: form.anonymous_answers ?? false,
        //     // mandatoryInitialData: form.mandatory_initial_data ?? false,
        // },
    });

    const onSubmit = (data: IFormQuestion[]) => {
        console.log(data);
        // if (!data.phone) {
        //     setError("phone", {
        //         type: "manual",
        //         message: "error!!!",
        //     },{shouldFocus: true})
        // }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-white flex items-center justify-between px-2 pb-4 text-base font-semibold leading-7">
                <div className='flex gap-1 items-center'>
                    <Button
                        variant="secondary"
                        onClick={() => console.log('pepe')}
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
                                onClick={() => console.log('pepe')}
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

export default QuestionsForm;