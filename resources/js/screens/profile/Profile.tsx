import React from 'react'
import { Button, Input, icons } from '@/ui'
import { FileUploader } from '@/components'
import { useForm } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'
import { getUserQuery } from '@/api'
import { useParams } from 'react-router-dom'

export const Profile = () => {
    const { id } = useParams();

    const { data: user, isLoading: isLoadingUsers } = useQuery({
        ...getUserQuery(parseInt(id!)),
        // select: (users) =>
        //   users.map((user, idx) => {
        //     const selectedItem =
        //       activityItems[idx % activityItems.length] ?? activityItems[0];

        //     return {
        //       ...selectedItem,

        //       user: {
        //         imageUrl: selectedItem.user.imageUrl,
        //         name: user.name,
        //         id: user.id,
        //       },
        //     };
        //   }),
        // The query will not execute until the id exists
        enabled: !!id,
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        defaultValues: {
            firstName: 'pepepepepe',
            lastName: user?.last_name,
            email: user?.email,
            phone: user?.phone,
            title: user?.position_in_organization,
            organization: user?.organization_id,
        }
    });

    const onSubmit = (data: any) => {
        console.log(data);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-white">
                <h2 className="flex items-center justify-between px-2 pb-4 text-base font-semibold leading-7 text-black">
                    My Profile
                    <div className='flex gap-5'>
                        <Button
                            variant="secondary"
                            onClick={() => console.log('pepe')}
                        >
                            Review Terms & Conditions
                        </Button>
                        <Button
                            type='submit'
                            variant="primary"
                        >
                            Save
                        </Button>
                    </div>
                </h2>
            </div>
            <div className="bg-white shadow-lg pt-4 px-6 pb-2 border-[1px] rounded-xl w-3/5">
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
                <div className='flex p-3 h-16'>
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
                            defaultValue={user?.first_name}
                        // error={errors.password?.message}
                        // value={passwordInput}
                        />
                    </div>
                </div>
                <hr className='mx-3' />
                <div className='flex p-3 h-16'>
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
                            defaultValue={user?.last_name}
                        // error={errors.lname?.message}
                        //value={passwordInput}
                        />
                    </div>
                </div>
                <hr className='mx-3' />
                <div className='flex p-3 h-16 '>
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
                            defaultValue={user?.email}
                        //error={errors.email?.message}
                        //value={passwordInput}
                        />
                    </div>
                </div>
                <hr className='mx-3' />
                <div className='flex p-3 h-16 '>
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
                            {...register("phone")}
                            defaultValue={user?.phone}
                        //error={errors.phone?.message}
                        //value={passwordInput}
                        />
                    </div>
                </div>
                <hr className='mx-3' />
                <div className='flex p-3 h-16 '>
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
                            defaultValue={user?.position_in_organization}
                        //error={errors.title?.message}
                        //value={passwordInput}
                        />
                    </div>
                </div>
                <hr className='mx-3' />
                <div className='flex p-3 h-16 '>
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
                            defaultValue={user?.organization_id}
                        // error={errors.organization?.message}
                        // value={passwordInput}
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
        </form>
    )
}