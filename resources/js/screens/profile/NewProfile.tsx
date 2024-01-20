import React from 'react'
import { Button, Input, icons } from '@/ui'
import { FileUploader } from '@/components'
import { useForm } from 'react-hook-form'
import type { User, UserRoles } from '@/api'
import ComboBox from '@/ui/form/Combobox'
import { tw } from '@/utils'

interface NewProfileForm {
    id?: number,
    firstName?: string,
    lastName?: string,
    email?: string,
    phone?: string,
    title?: string,
    organization?: string,
    subscription?: string,
    roles?: UserRoles[],
    status?: string
}
interface NewProfileProps {
    initialData: User,
}
export const NewProfile: React.FC<NewProfileProps> = ({ initialData: user = {} }) => {

    //TODO: put this in a constants file
    const SubscriptionPlans = [{ name: 'Free' }, { name: 'Premium' }, { name: 'Enterprise' }]; // solo name
    const Roles = [{ id: 1, name: 'Admin' }, { id: 2, name: 'User' }, { id: 3, name: 'Viewer' }]; // el unico q prevalaece con esta structura
    const Status = [{ name: 'Active' }, { name: 'Inactive' }, { name: 'Pending' }]; //solo name

    const defaultRole = user.roles ? user.roles[0].name : 'Admin';

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
            subscription: 'Free' ?? "",
            role: defaultRole,
            status: user?.status ?? "Active",
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
                        New User&apos;s Information
                    </span>
                </div>
                <div className='flex gap-5'>
                    {
                        user.id && (
                            <Button
                                variant="secondary"
                                onClick={() => console.log('pepe')}
                            >
                                <icons.TrashIcon className={tw(`w-5 h-5`)} />
                                Delete
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
            <div className="flex gap-6">
                <div className="bg-white shadow-lg pt-4 px-6 pb-2 border-[1px] rounded-xl w-3/5 shrink-0">
                    <div className='flex gap-8 p-3 h-36'>
                        <div className='flex shrink-0 w-40'>
                            <span>Profile Picture</span>
                        </div>
                        <div className="flex shrink-0 rounded-full overflow-hidden">
                            <div className='relative p-0 '>
                                <img
                                    src={user?.photo ?? ''}
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
                                defaultValue={defaultRole}
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