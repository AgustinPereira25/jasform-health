import React from 'react'
import { Button, Input, icons } from '@/ui'
import { FileUploader } from '@/components'
import { useForm } from 'react-hook-form'
import { getUserQuery } from '@/api'
import { useQuery } from '@tanstack/react-query'
import ComboBox from '@/ui/form/Combobox'
import { tw } from '@/utils'
import type { Form } from '@/api'

interface NewFormProps {
    initialData: Form;
}
// TODO - Finish this implementation by seeing figma and replying the design with the components.
export const NewForm: React.FC<NewFormProps> = ({ initialData: form }) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        setError,
    } = useForm({
        // TODO - Complete this fields.. 
        defaultValues: {
            id: form?.id,
            firstName: user?.first_name,
            lastName: user?.last_name,
            email: user?.email,
            phone: user?.phone,
            title: user?.position_in_organization,
            organization: user?.organization_name,
            subscription: 'Free',
            role: 'Admin',
            status: user?.status,
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

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-white">
                <h2 className="flex items-center justify-between px-2 pb-4 text-base font-semibold leading-7 text-black">
                    New User’s Information
                    <div className='flex gap-5'>
                        <Button
                            type='submit'
                            variant="primary"
                        >
                            Save
                        </Button>
                    </div>
                </h2>
            </div>
            <div className="flex gap-6">
                <div className="bg-white shadow-lg pt-4 px-6 pb-2 border-[1px] rounded-xl w-3/5 shrink-0">
                    <div className='flex gap-8 p-3 h-36'>
                        <div className='flex shrink-0 w-40'>
                            <span>Profile Picture</span>
                        </div>
                        <div className="flex shrink-0 rounded-full overflow-hidden">
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
                        </div>
                        {/* ToDo: Agregar props como url del endpoint,etc para hacerlo mas generico */}
                        <FileUploader />
                    </div>
                    <hr className='mx-3' />
                    <div className={tw(
                        'flex p-3 h-16',
                        errors.firstName && 'pb-5'
                    )}
                    >
                        <div className='flex w-40'>
                            <span>First Name</span>
                        </div>
                        <div className="flex grow">
                            <Input
                                containerClassName='w-full'
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
                    <hr className='mx-3' />
                    <div className={tw(
                        'flex p-3 h-16',
                        errors.lastName && 'pb-5'
                    )}
                    >
                        <div className='flex w-40'>
                            <span>Last name</span>
                        </div>
                        <div className="flex grow">
                            <Input
                                containerClassName='w-full'
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
                    <hr className='mx-3' />
                    <div className={tw(
                        'flex p-3 h-16',
                        errors.email && 'pb-5'
                    )}
                    >
                        <div className='flex w-40'>
                            <span>Email Address</span>
                        </div>
                        <div className="flex grow">
                            <Input
                                containerClassName='w-full'
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
                    <hr className='mx-3' />
                    <div className={tw(
                        'flex p-3 h-16',
                        errors.phone && 'pb-5'
                    )}
                    >
                        <div className='flex w-40'>
                            <span>Phone Number</span>
                        </div>
                        <div className="flex grow">
                            <Input
                                containerClassName='w-full'
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
                    <hr className='mx-3' />
                    <div className={tw(
                        'flex p-3 h-16',
                        errors.title && 'pb-5'
                    )}
                    >
                        <div className='flex w-40'>
                            <span>Title</span>
                        </div>
                        <div className="flex grow">
                            <Input
                                containerClassName='w-full'
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
                    <hr className='mx-3' />
                    <div className={tw(
                        'flex p-3 h-16',
                        errors.organization && 'pb-5'
                    )}
                    >
                        <div className='flex w-40'>
                            <span>Organization</span>
                        </div>
                        <div className="flex grow">
                            <Input
                                containerClassName='w-full'
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
                    <hr className='mx-3' />
                    <div className='flex p-3 h-16'>
                        <Button
                            variant='tertiary'
                        // onClick={() => console.log('pepe')}
                        >
                            <icons.KeyIcon />
                            Change Password
                        </Button>
                    </div>
                    <hr className='mx-3' />
                    <div className='flex p-3 h-16'>
                        <div className='flex flex-col w-32'>
                            <span className='text-[#008001]'>Active Forms:</span>
                            <span className='text-[#CD3533]'>Inactive Forms:</span>
                        </div>
                        <div className='flex flex-col'>
                            <span>20</span>
                            <span>15</span>
                        </div>
                    </div>
                    <hr className='mx-3' />
                    <div className='flex p-3 h-16'>
                        <div className='flex w-32'>
                            <span>Total Forms:</span>
                        </div>
                        <div className='flex flex-col'>
                            <span>20</span>
                        </div>
                    </div>
                    <hr className='mx-3' />
                </div>
                <div className="bg-white shadow-lg pt-4 px-6 pb-2 border-[1px] rounded-xl w-full">
                    <div className='flex p-3 h-16'>
                        <div className='flex w-40'>
                            <span>Subscription Plan</span>
                        </div>
                        <div className="flex grow">
                            <ComboBox
                                id='subscription'
                                items={SubscriptionPlans}
                                defaultValue='Free'
                                {...register("subscription")}
                                onValueChange={(item) => {
                                    setValue("subscription", item.name);
                                }}
                            // onValueChange={(e) => console.log(e)}
                            />
                        </div>
                    </div>
                    <hr className='mx-3' />
                    <div className='flex p-3 h-16'>
                        <div className='flex w-40'>
                            <span>Role</span>
                        </div>
                        <div className="flex grow">
                            <ComboBox
                                id='role'
                                items={Roles}
                                defaultValue={'Admin'}
                                {...register("role")}
                                onValueChange={(item) => {
                                    setValue("role", item.name);
                                }}
                            />
                        </div>
                    </div>
                    <hr className='mx-3' />
                    <div className='flex p-3 h-16 '>
                        <div className='flex w-40'>
                            <span>Status</span>
                        </div>
                        <div className="flex grow">
                            <ComboBox
                                items={Status}
                                defaultValue={user?.status}
                                {...register("status")}
                                onValueChange={(item) => {
                                    setValue("status", item.name);
                                }}
                            />
                        </div>
                    </div>
                    <hr className='mx-3' />
                    <div className='flex p-3 h-16 '>
                        <Button
                            variant='primary'
                        >
                            User&apos;s Dashboard
                        </Button>
                    </div>
                    <hr className='mx-3' />
                    <div className='flex p-3 h-16 '>
                        <Button
                            variant='primary'
                        >
                            User&apos;s Forms
                        </Button>
                    </div>
                    <hr className='mx-3' />
                    <div className='flex p-3 h-16 '>
                        <Button
                            variant='primary'
                        >
                            User&apos;s Bills
                        </Button>
                    </div>
                    <hr className='mx-3' />
                    <div className='flex p-3 h-16 '>
                        <Button
                            variant='primary'
                        >
                            User&apos;s Subscription History
                        </Button>
                    </div>
                    <hr className='mx-3' />
                </div>
            </div>
        </form>
    )
}

export default NewForm;