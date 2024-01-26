import { useState } from "react";
import { Switch } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";

import { getFormsQuery } from "@/api";
import { MODAL_ROUTES } from "@/router";
import { useNavigateModal } from "@/router/useNavigateModal";
import type { FormDropdownItem } from "@/shared.types";
import { Button, icons, Input } from "@/ui";
import { tw } from "@/utils";
import { FormDropdown } from "./components";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const Forms = () => {
  // const { pushToast } = useToastStore();
  // const queryClient = useQueryClient();

  const { data: forms, isLoading: isLoadingForms } = useQuery({
    ...getFormsQuery(),
    // select: (users) =>
    //   users.map((user, idx) => {
    //     const selectedItem =
    //       activityItems[idx % activityItems.length] ?? activityItems[0];

    //     return {
    //       ...selectedItem,

    //       user: {
    //         imageUrl: selectedItem.user.imageUrl,
    //         name: 'name',
    //         id: user.id,
    //       },
    //     };
    //   }),
  });

  // const { mutate: deleteUserMutation } = useMutation({
  //   mutationFn: deleteUser.mutation,
  //   onSuccess: (_, requestedId) => {
  //     deleteUser.invalidates(queryClient, { userId: requestedId });
  //     void pushToast({
  //       type: "success",
  //       title: "Success",
  //       message: "User successfully deleted!",
  //     });
  //   },
  //   onError: errorToast,
  // });

  const navigateModal = useNavigateModal();
  // For toggles
  const [enabledActive, setEnabledActive] = useState(false);

  const FormDropdownOptions: FormDropdownItem[] = [
    { name: "Edit", icon: <icons.PencilIcon /> },
    // { name: "Duplicate", icon: <icons.DocumentDuplicateIcon /> },
    { name: "Get Link", icon: <icons.LinkIcon /> },
    { name: "Delete", icon: <icons.TrashIcon />, newSection: true },
  ];
  return (
    <>
      <div className="bg-white">
        <h2 className="flex items-center justify-between px-2 pb-7 text-base font-semibold leading-7 text-black">
          Forms
          <Button
            variant="primary"
            onClick={() => navigateModal(MODAL_ROUTES.userForm)}
          >
            <icons.PlusIcon className={tw(`h-5 w-5`)} />
            Create Form
          </Button>
        </h2>
      </div>
      <div className="rounded-xl border-[1px] bg-white p-2 pt-4 shadow-lg">
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
            type="date"
            id="date"
            label="Date"
            placeholder="Search by Daten"
          //{...register("password")}
          //error={errors.password?.message}
          //value={passwordInput}
          //onChange={(e) => { setPasswordInput(e.target.value); }}
          />
          <Switch.Group
            as="div"
            className="flex items-center justify-between gap-2"
          >
            <span className="flex flex-grow flex-col">
              <Switch.Label
                as="span"
                className="text-sm font-medium leading-6 text-gray-900"
                passive
              >
                Show only Active
              </Switch.Label>
            </span>
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
        <div className="rounded-sm border-[1px] border-gray-300">
          <table className="w-full whitespace-nowrap bg-white text-left shadow-md">
            <colgroup>
              <col className="w-full sm:w-4/12" />
              <col className="lg:w-4/12" />
              <col className="lg:w-2/12" />
              <col className="lg:w-1/12" />
              <col className="lg:w-1/12" />
              <col className="lg:w-1/12" />
            </colgroup>
            <thead className="border-b-[1px] border-gray-300 bg-gray-200 text-sm leading-6">
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
                {/* <th
                  scope="col"
                  className="hidden py-2 pl-0 pr-4 font-normal text-[#6B7280] sm:table-cell sm:pr-6 lg:pr-8"
                >
                  GET LINK
                </th> */}
                <th
                  scope="col"
                  className="hidden py-2 pl-0 pr-4 text-right font-normal text-[#6B7280] sm:table-cell sm:pr-6 lg:pr-8"
                ></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {isLoadingForms && (
                <tr className="h-full items-center">
                  <td colSpan={5}>
                    <div className="flex justify-center p-9">
                      <icons.SpinnerIcon />
                    </div>
                  </td>
                </tr>
              )}
              {forms?.map((item) => (
                <tr key={item.id}>
                  <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                    <div className="flex items-center gap-x-4">
                      <div className="truncate text-sm leading-6 text-black">
                        {item.name}
                      </div>
                    </div>
                  </td>
                  <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                    <div className="flex gap-x-3">
                      <div className="truncate text-sm leading-6 text-black">
                        {item.creation_date?.toString()}
                      </div>
                    </div>
                  </td>
                  <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-[#6B7280] md:table-cell lg:pr-20">
                    99
                  </td>
                  <td className="hidden py-4 pl-0 pr-4 text-sm leading-6 text-[#6B7280] sm:table-cell sm:pr-6 lg:pr-8">
                    99
                  </td>
                  <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                    <div className="flex items-center gap-x-2 sm:justify-start">
                      <div
                        className={
                          item.status === "Active"
                            ? "text-[#065F46] sm:block"
                            : "text-[#a82d2d] sm:block"
                        }
                      >
                        {item.status}
                      </div>
                    </div>
                  </td>
                  {/* <td className="hidden py-4 pl-3 text-center text-sm  text-[#6B7280] sm:table-cell sm:pr-6 lg:pr-8">
                    <Button
                      variant="tertiary"
                      onClick={() => console.log('delete')}
                    >
                      <icons.LinkIcon />
                    </Button>
                  </td> */}
                  <td className="hidden py-4 pl-3 pr-1 text-right text-sm leading-6 text-[#6B7280] sm:table-cell sm:pr-6 lg:pr-8">
                    <FormDropdown
                      items={FormDropdownOptions}
                      mode="FORM"
                      param={item.id}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="h-[100px]"></div>
    </>
  );
};
