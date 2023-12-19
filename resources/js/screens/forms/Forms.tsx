import { useState } from 'react';
import { Switch } from '@headlessui/react';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { deleteUser, getUsersQuery } from "@/api";
import { MODAL_ROUTES } from "@/router";
import { useNavigateModal } from "@/router/useNavigateModal";
import { Button, Input, errorToast, icons, useToastStore } from "@/ui";
import { tw } from "@/utils";

const statuses = {
  Completed: "text-green-400 bg-green-400/10",
  Error: "text-rose-400 bg-rose-400/10",
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const activityItems = [
  {
    user: {
      name: "Michael Foster",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    title: "2d89f0c8",
    organization: "main",
    status: "Active",
    plan: "25s",
    role: "Admin",
    dateTime: "2023-01-23T11:00",
  },
  {
    user: {
      name: "Lindsay Walton",
      imageUrl:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    title: "249df660",
    organization: "main",
    status: "Active",
    plan: "1m 32s",
    role: "Admin",
    dateTime: "2023-01-23T09:00",
  },
  {
    user: {
      name: "Courtney Henry",
      imageUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    title: "11464223",
    organization: "main",
    status: "Inactive",
    plan: "1m 4s",
    role: "Free",
    dateTime: "2023-01-23T00:00",
  },
  {
    user: {
      name: "Courtney Henry",
      imageUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    title: "dad28e95",
    organization: "main",
    status: "Active",
    plan: "2m 15s",
    role: "Free",
    dateTime: "2023-01-21T13:00",
  },
  {
    user: {
      name: "Michael Foster",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    title: "624bc94c",
    organization: "main",
    status: "Active",
    plan: "1m 12s",
    role: "Plus",
    dateTime: "2023-01-18T12:34",
  },
  {
    user: {
      name: "Courtney Henry",
      imageUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    title: "e111f80e",
    organization: "main",
    status: "Active",
    plan: "1m 56s",
    role: "Admin",
    dateTime: "2023-01-16T15:54",
  },
  // {
  //   user: {
  //     name: "Michael Foster",
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  //   },
  //   commit: "5e136005",
  //   branch: "main",
  //   status: "Active",
  //   plan: "3m 45s",
  //   role: "1 week ago",
  //   dateTime: "2023-01-16T11:31",
  // },
  // {
  //   user: {
  //     name: "Whitney Francis",
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  //   },
  //   commit: "5c1fd07f",
  //   branch: "main",
  //   status: "Active",
  //   plan: "37s",
  //   role: "2 weeks ago",
  //   dateTime: "2023-01-09T08:45",
  // },
] as const;

export const Forms = () => {
  const { pushToast } = useToastStore();
  const queryClient = useQueryClient();

  const { data: users, isLoading: isLoadingUsers } = useQuery({
    ...getUsersQuery(),
    select: (users) =>
      users.map((user, idx) => {
        const selectedItem =
          activityItems[idx % activityItems.length] ?? activityItems[0];

        return {
          ...selectedItem,

          user: {
            imageUrl: selectedItem.user.imageUrl,
            name: user.name,
            id: user.id,
          },
        };
      }),
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

  const navigateModal = useNavigateModal();
  // For toggles
  const [enabledActive, setEnabledActive] = useState(false);
  const [enabledAdmin, setEnabledAdmin] = useState(false);
  return (
    <>
      <div className="bg-white">
        <h2 className="flex items-center justify-between px-2 pb-7 text-base font-semibold leading-7 text-black">
          Forms
          <Button
            variant="primary"
            onClick={() => navigateModal(MODAL_ROUTES.userForm)}
          >
            + Create Form
          </Button>
        </h2>
      </div>
      <div className="bg-white shadow-lg p-2 pt-4 border-[1px] rounded-xl">
        <div className="flex gap-5">
          <Input
            type="search"
            id="title"
            label="Title"
            placeholder="Search by form title"
            //{...register("password")}
            //error={errors.password?.message}
          //value={passwordInput}
          //onChange={(e) => { setPasswordInput(e.target.value); }}
          />
          <Input
            type="search"
            id="date"
            label="Date"
            placeholder="Search by Daten"
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
        </div>
        <div className="border-gray-300 border-[1px] rounded-xl overflow-hidden">
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
                  TITLE
                </th>
                <th
                  scope="col"
                  className="hidden py-2 pl-0 pr-8 font-normal text-[#6B7280] sm:table-cell"
                >
                  LAST MODIFIED DATE
                </th>
                <th
                  scope="col"
                  className="py-2 pl-0 pr-4 text-right font-normal text-[#6B7280] sm:pr-8 sm:text-left lg:pr-20"
                >
                  # QUESTIONS
                </th>
                <th
                  scope="col"
                  className="hidden py-2 pl-0 pr-8 font-normal text-[#6B7280] md:table-cell lg:pr-20"
                >
                  # COMPLETED
                </th>
                <th
                  scope="col"
                  className="hidden py-2 pl-0 font-normal text-[#6B7280] sm:table-cell sm:pr-6 lg:pr-8"
                >
                  STATUS
                </th>
                <th
                  scope="col"
                  className="hidden py-2 pl-0 pr-4 font-normal text-[#6B7280] sm:table-cell sm:pr-6 lg:pr-8"
                >
                  GET LINK
                </th>
                <th
                  scope="col"
                  className="hidden py-2 pl-0 pr-4 text-right font-normal text-[#6B7280] sm:table-cell sm:pr-6 lg:pr-8"
                >
                  ACTIONS
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
              {activityItems?.map((item) => (
                <tr key={item.title}>
                  <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                    <div className="flex items-center gap-x-4">
                        <div className="truncate text-sm leading-6 text-black">
                          {item.user.name}
                        </div>
                    </div>
                  </td>
                  <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                    <div className="flex gap-x-3">
                      <div className="truncate text-sm leading-6 text-black">
                        {item.title}
                      </div>
                    </div>
                  </td>
                  <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-[#6B7280] md:table-cell lg:pr-20">
                    {item.plan}
                  </td>
                  <td className="hidden py-4 pl-0 pr-4 text-sm leading-6 text-[#6B7280] sm:table-cell sm:pr-6 lg:pr-8">
                    {item.role}
                  </td>
                  <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                    <div className="flex items-center gap-x-2 sm:justify-start">
                      <div className={item.status === 'Active' ? "rounded-3xl px-3 hidden bg-[#D1FAE5] text-green-950 sm:block" : "rounded-3xl px-3 hidden bg-[#fad1d1] text-red-950 sm:block"}>
                        {item.status}
                      </div>
                    </div>
                  </td>
                  <td className="hidden py-4 pl-3 text-center text-sm  text-[#6B7280] sm:table-cell sm:pr-6 lg:pr-8">
                    {/* <Button
                      variant="tertiary"
                      onClick={() => deleteUserMutation(item.user.id)}
                    >
                      <icons.TrashIcon className="h-5 w-5" />
                    </Button> */}
                    <icons.GetLinkIcon />
                  </td>
                  <td className="hidden py-4 pl-3 pr-1 text-right text-sm leading-6 text-[#6B7280] sm:table-cell sm:pr-6 lg:pr-8">
                    <icons.ThreeDotsIcon />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
