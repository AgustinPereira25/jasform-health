import { useState } from 'react';
import { Switch } from '@headlessui/react';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { deleteUser, getUsersQuery } from "@/api";
import { MODAL_ROUTES, ROUTES } from "@/router";
import { useNavigateModal } from "@/router/useNavigateModal";
import { Button, Input, errorToast, icons, useToastStore } from "@/ui";
import { tw } from "@/utils";
import { FormDropdown } from '../forms/components';
import { FormDropdownItem } from '@/shared.types';
import { useNavigate } from 'react-router-dom';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export const Users = () => {
  const { pushToast } = useToastStore();
  const queryClient = useQueryClient();

  const { data: users, isLoading: isLoadingUsers } = useQuery({
    ...getUsersQuery(),
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
  });

  const { mutate: deleteUserMutation } = useMutation({
    mutationFn: deleteUser.mutation,
    onSuccess: (_, requestedId) => {
      deleteUser.invalidates(queryClient, { userId: requestedId });
      void pushToast({
        type: "success",
        title: "Success",
        message: "User successfully deleted!",
      });
    },
    onError: errorToast,
  });

  // const navigateModal = useNavigateModal();
  const navigate = useNavigate();
  // For toggles
  const [enabledActive, setEnabledActive] = useState(false);
  const [enabledAdmin, setEnabledAdmin] = useState(false);

  const FormDropdownOptions:FormDropdownItem[] = [{ name: "Edit", icon: <icons.PencilIcon /> }, { name: "Delete", icon: <icons.TrashIcon/>, newSection: true} ];
  
  const handleClick = () => {
    navigate(ROUTES.newUser);
  }
  return (
    <>
      <div className="bg-white">
        <h2 className="flex items-center justify-between px-2 pb-7 text-base font-semibold leading-7 text-black">
          Users
          <Button
            variant="primary"
            onClick={handleClick}
          >
            + Create User
          </Button>
        </h2>
      </div>
      <div className="bg-white shadow-lg p-2 pt-4 border-[1px] rounded-xl">
        <div className="flex gap-5">

          <Input
            type="search"
            id="nameEmail"            
            label="Name/Email"
            placeholder="Search by name or email"
            className='min-w-[210px]'
            //{...register("password")}
            //error={errors.password?.message}
          //value={passwordInput}
          //onChange={(e) => { setPasswordInput(e.target.value); }}
          />
          <Input
            type="search"
            id="titleOrg"            
            label="Title/Organization"
            placeholder="Search by title or organization"
            className='min-w-[245px]'
            //{...register("password")}
            //error={errors.password?.message}
          //value={passwordInput}
          //onChange={(e) => { setPasswordInput(e.target.value); }}
          />
          <Input
            type="search"
            id="planType"
            // cuando el input es type=search aparece un cross para limpiar input
            label="Plan Type"
            placeholder="Search by name or email"
            className='min-w-[210px]'
            //{...register("password")}
            //error={errors.password?.message}
          //value={passwordInput}
          //onChange={(e) => { setPasswordInput(e.target.value); }}
          />  
          <Switch.Group as="div" className="flex items-center justify-between gap-2">
            <span className="flex flex-grow flex-col">
              <Switch.Label as="span" className="text-sm font-medium leading-6 text-gray-900" passive>
                Show only Active
              </Switch.Label>
            </span>
            <Switch
              checked={enabledActive}
              onChange={setEnabledActive}
              className={classNames(
                enabledActive ? 'bg-[#00519E]' : 'bg-gray-200',
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#00519E] focus:ring-offset-2'
              )}
            >
              <span
                aria-hidden="true"
                className={classNames(
                  enabledActive ? 'translate-x-5' : 'translate-x-0',
                  'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                )}
              />
            </Switch>
          </Switch.Group> 
          <Switch.Group as="div" className="flex items-center justify-between gap-2">
            <span className="flex flex-grow flex-col">
              <Switch.Label as="span" className="text-sm font-medium leading-6 text-gray-900" passive>
                Show only Admin
              </Switch.Label>
            </span>
            <Switch
              checked={enabledAdmin}
              onChange={setEnabledAdmin}
              className={classNames(
                enabledAdmin ? 'bg-[#00519E]' : 'bg-gray-200',
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#00519E] focus:ring-offset-2'
              )}
            >
              <span
                aria-hidden="true"
                className={classNames(
                  enabledAdmin ? 'translate-x-5' : 'translate-x-0',
                  'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                )}
              />
            </Switch>
          </Switch.Group>      
        </div>
        <div className="border-gray-300 border-[1px] rounded-sm">
          <table className="w-full whitespace-nowrap text-left bg-white shadow-md">
            <colgroup>
              <col className="w-full sm:w-4/12" />
              <col className="lg:w-4/12" />
              <col className="lg:w-2/12" />
              <col className="lg:w-1/12" />
              <col className="lg:w-1/12" />
              <col className="lg:w-1/12" />
            </colgroup>
            <thead className="text-sm leading-6 border-gray-300 border-b-[1px] bg-gray-200">
              <tr>
                <th
                  scope="col"
                  className="py-2 pl-4 pr-8 font-normal text-[#6B7280] sm:pl-6 lg:pl-8"
                >
                  NAME
                </th>
                <th
                  scope="col"
                  className="hidden py-2 pl-0 pr-8 font-normal text-[#6B7280] sm:table-cell"
                >
                  TITLE / ORGANIZATION
                </th>
                <th
                  scope="col"
                  className="py-2 pl-0 pr-4 text-right font-normal text-[#6B7280] sm:pr-8 sm:text-left lg:pr-20"
                >
                  STATUS
                </th>
                {/* <th
                  scope="col"
                  className="hidden py-2 pl-0 pr-8 font-normal text-[#6B7280] md:table-cell lg:pr-20"
                >
                  PLAN
                </th> */}
                <th
                  scope="col"
                  className="hidden py-2 pl-0 pr-4 text-right font-normal text-[#6B7280] sm:table-cell sm:pr-6 lg:pr-8"
                >
                  ROLE
                </th>
                <th
                  scope="col"
                  className="hidden py-2 pl-0 pr-4 text-right font-normal text-[#6B7280] sm:table-cell sm:pr-6 lg:pr-8"
                >
                  <span className="sr-only">Action</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {isLoadingUsers && (
                <tr className="h-full items-center">
                  <td colSpan={5}>
                    <div className="flex justify-center p-9">
                      <icons.SpinnerIcon />
                    </div>
                  </td>
                </tr>
              )}
              {users?.map((item) => (
                <tr key={item.id}>
                  <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                    <div className="flex items-center gap-x-4">
                      <img
                        src={item.photo}
                        alt=""
                        className="h-8 w-8 rounded-full bg-gray-800"
                      />
                      <div className="flex flex-col">
                        <div className="truncate text-sm leading-6 text-black">
                          {item.first_name}
                          {item.last_name}
                        </div>
                        <div className="truncate text-sm leading-6 text-gray-500">
                          {item.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                    <div className="flex gap-x-3">
                      <div className="flex flex-col">
                          <div className="truncate text-sm leading-6 text-black">
                            {item.position_in_organization}
                          </div>
                          <div className="truncate text-sm leading-6 text-gray-500">
                            {/* {item.organization_id} */}
                            MediCall
                          </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                    <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                      {/* <div
                        className={tw(
                          statuses[item.status as keyof typeof statuses],
                          "flex-none rounded-full p-1",
                        )}
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-current" />
                      </div> */}
                      <div className={item.status === 'Active' ? "text-[#065F46] sm:block" : "text-[#a82d2d] sm:block"}>
                        {item.status}
                      </div>
                    </div>
                  </td>
                  {/* <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-[#6B7280] md:table-cell lg:pr-20">
                    plan??
                  </td> */}
                  <td className="hidden py-4 pl-0 pr-4 text-right text-sm leading-6 text-[#6B7280] sm:table-cell sm:pr-6 lg:pr-8">
                    Admin
                  </td>
                  {/* <td className="hidden py-4 pl-0 pr-4 text-right text-sm leading-6 text-[#6B7280] sm:table-cell sm:pr-6 lg:pr-8">
                    <a href={`/users/${item.id}`} className="text-[#00519E]">Edit</a>
                  </td>
                  <td className="hidden py-4 pl-0 pr-4 text-right text-sm leading-6 text-[#6B7280] sm:table-cell sm:pr-6 lg:pr-8">
                    <a href="/" className="text-[#00519E]">Delete</a>
                  </td> */}
                  <td className="hidden py-4 pl-3 pr-1 text-right text-sm leading-6 text-[#6B7280] sm:table-cell sm:pr-6 lg:pr-8">
                    <FormDropdown
                      mode='USERS' 
                      items={FormDropdownOptions}
                      param={item.id}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="h-[100px]">
        </div>
      </div>
    </>
  );
};
